# Bitbucket Workspace Repository Cloner

## Table of Contents

- [Bitbucket Workspace Repository Cloner](#bitbucket-workspace-repository-cloner)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Configuration](#configuration)
    - [Running the Script](#running-the-script)
  - [Finding Variable Values on Bitbucket](#finding-variable-values-on-bitbucket)
  - [Example Output](#example-output)
    - [Generated CSV file](#generated-csv-file)
  - [License](#license)
  - [How to Contribute](#how-to-contribute)

## Overview

This Node.js script allows you to list and clone all repositories from a project within a Bitbucket workspace. It also generates a CSV file with repository details. The script provides options for pagination, ensuring that you can retrieve all repositories in the project.

## Dependencies

Before using this script, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [npm](https://www.npmjs.com/) - Node.js package manager.
- [Git](https://git-scm.com/) - Version control system.

## Installation

1. Clone or download this repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install the required npm packages:

```bash
npm install
```

## Usage

### Configuration

Before using the script, you need to configure your Bitbucket workspace and authentication by populating the following variables in the script:

- `BITBUCKET_USERNAME`: Your Bitbucket username.
- `BITBUCKET_APP_PASSWORD`: An Bitbucket app password.

Customize the script further by setting your preferred pagination and page size:

- `PAGE_SIZE`: The number of repositories to retrieve per API request. Max is 100.

### Running the Script

1. Open your terminal and navigate to the project directory where the script is located.

2. Execute the script by running the following command:

```bash
npm start
```

The script will start fetching and cloning repositories from your Bitbucket workspace based on the configurations you provided.

## Finding Variable Values on Bitbucket

To find the values for the variables on the Bitbucket website:

- **BITBUCKET_USERNAME**: Your Bitbucket username can be located in your Bitbucket [account settings](https://bitbucket.org/account/settings/).

- **BITBUCKET_APP_PASSWORD**: Generate an app password specifically for this script. To create an app password, navigate to your Bitbucket settings, then to "Access management" > "[App passwords](https://bitbucket.org/account/settings/app-passwords/)" and generate a new password.

## Example Output

The script will generate a folder structure with project names and CSV files containing repository details. You can find the cloned repositories and CSV files in your project directory.

### Generated CSV file

The generated csv file will display for user the following information from each cloned repository:
* Name
* Description
* Main programming language
* Size in bytes
* Creation Date
* BitBucket URL
## License

This project is licensed under the MIT License. Refer to the [LICENSE](LICENSE) file for detailed information.

## How to Contribute

We welcome contributions from the community to improve and expand this project. If you would like to contribute, follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of this repository. This will create a copy of the project in your GitHub account.

2. **Clone Your Fork**: In your terminal, clone your forked repository to your local machine:

```bash
git clone https://github.com/your-username/bitbucket-repo-cloner.git
```

3. **Create a Branch**: Create a new branch for your contribution. Make sure to give it a descriptive name:

```bash
git checkout -b feature/my-contribution
```

4. **Make Changes**: Make your desired changes or improvements to the codebase.

5. **Test Your Changes**: Before submitting a pull request, ensure that your changes work as expected and haven't introduced any new issues.

6. **Commit Your Changes**: Commit your changes with a descriptive commit message:

```bash
git commit -m "Add feature: my contribution"
```

7. **Push to Your Fork**: Push your changes to your forked repository on GitHub:

```bash
git push origin feature/my-contribution
```

8. **Create a Pull Request**: Go to the original repository on GitHub, and you should see a "Compare & pull request" button. Click it to open a pull request. Provide a clear title and description for your changes.

9. **Review and Collaboration**: Your pull request will be reviewed by the project maintainers. Be prepared to address any feedback or make further changes if needed.

10. **Merge**: Once your pull request is approved, it will be merged into the main project. Congratulations, you've contributed to the project!

Thank you for contributing to our open-source project!