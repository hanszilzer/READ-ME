const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the project title:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a project description:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Enter installation instructions:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Enter usage information:',
  },
  {
    type: 'input',
    name: 'credits',
    message: 'List collaborators, third-party assets, or tutorials:',
  },
  {
    type: 'input',
    name: 'license',
    message: 'Enter the project license (comma-separated):',
  },
  {
    type: 'input',
    name: 'features',
    message: 'Enter the project features (comma-separated):',
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('README.md has been created successfully.');
    }
  });
}

function init() {
  inquirer.prompt(questions)
    .then((answers) => {
        const licenses = answers.license.split(',').map((license) => `- ${license.trim()}`).join('\n');
        const features = answers.features.split(',').map((feature) => `- ${feature.trim()}`).join('\n');
        
        const readmeContent = `
# ${answers.title}

## Description

${answers.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Licenses](#licenses)

## Installation

${answers.installation}

## Usage

${answers.usage}

## Credits

${answers.credits}

## License

This project is licensed under the following licenses:

${licenses}

## Features

This project has the following features: 

${features}`;

        writeToFile('README.md', readmeContent);
    });
}

init();
