const axios = require('axios');
const fs = require('fs').promises;
const { exec } = require('child_process');
const path = require('path');

const BITBUCKET_WORKSPACE="workspace-name"
const BITBUCKET_USERNAME="your-username" // not your e-mail. You can check in BitBucket account settings https://bitbucket.org/account/settings/
const BITBUCKET_APP_PASSWORD="your-app-password" // create an App Password in BitBucket account settings https://bitbucket.org/account/settings/app-passwords/
const PAGE_SIZE = 99;

async function createProjectFolder(projectName) {
  try {
    const folderExists = await fs.stat(projectName).catch(() => false);
    if (!folderExists) await fs.mkdir(projectName);
  } catch (error) {
    if (!error.message.startsWith('EEXIST')) console.error(`❌ Error creating folder '${projectName}':`, error.message);
  }
}

async function gitClone(folderPath, cloneUrl, repoSlug) {
  const repoFolderPath = path.join(folderPath, repoSlug);
  try {
    const folderExists = await fs.stat(repoFolderPath).catch(() => false);

    if (!folderExists) {
      const command = `cd ${folderPath} && git clone ${cloneUrl}`;
      const childProcess = exec(command);

      await new Promise((resolve, reject) => {
        childProcess.on('exit', (code) => {
          if (code === 0) {
            console.log(`👍 Git clone successfull for ${repoFolderPath}`);
            resolve();
          } else {
            reject(new Error(`❌ Error in git clone. Error code: ${code}`));
          }
        });

        let stdout = '';
        let stderr = '';

        childProcess.stdout.on('data', (data) => {
          stdout += data;
        });

        childProcess.stderr.on('data', (data) => {
          stderr += data;
        });
      });
    } else {
      console.log(`🚫 The repo folder ${repoFolderPath} already exists. Ignoring git clone.`);
    }
  } catch (error) {
    console.error(`❌ Error verifying folder existance '${repoFolderPath}':`, error.message);
  }
}

function formatFoldername(folderName) {
  return folderName.trim().replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
}

function formatDescription(description) {
  return description.trim().replace(/,/g, '');
}

async function addToCsvFile(csvFilePath, record) {
  try {
    const fileExists = await fs.stat(csvFilePath).catch(() => false);
    const csvHeaders = 'name,description,language,size,created_at,url\n';
    const csvInfo = `${record.name},${formatDescription(record?.description)},${record?.language},${record.size},${new Date(record.created_on).toLocaleDateString()},${record.links.html.href ?? 'url not found'}\n`;

    if (!fileExists) await fs.writeFile(csvFilePath, csvHeaders);

    await fs.appendFile(csvFilePath, csvInfo);
  } catch (error) {
    console.error(`❌ Error adding register into CSV file '${csvFilePath}':`, error.message);
  }
}

async function fechAndCloneBitbucketRepos(pageNumber) {
  try {
    const auth = {
      username: BITBUCKET_USERNAME,
      password: BITBUCKET_APP_PASSWORD,
    };

    const response = await axios.get(
      `https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}?pagelen=${PAGE_SIZE}&page=${pageNumber}`,
      { auth }
    );

    const repositories = response.data.values;

    repositories.forEach(async (repository) => {
      const projectName = repository.project.name;
      const formattedProjectName = formatFoldername(projectName);
      const projectPath = `./${formattedProjectName}`

      await createProjectFolder(formattedProjectName);
      await gitClone(projectPath, repository.links.clone.find(el => el.name === 'ssh').href, repository.slug);
      await addToCsvFile(`${projectPath}/repos.csv`, repository);
    });

    if (response.data?.next) return await fechAndCloneBitbucketRepos(pageNumber + 1)
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

console.log('⏳ Fetching and cloning repositories...');
fechAndCloneBitbucketRepos(1);