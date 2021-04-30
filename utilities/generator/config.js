const shell = require('shelljs');

const path = process.cwd();

exports.mern = (ProjectName) => {
  shell.exec('git clone https://github.com/UsefSalim/-Xelor-.git');
  shell.exec('rm -r ./-Xelor-/.git');
  shell.exec(`mv ./-Xelor-/ ${path}/${ProjectName}`);
  shell.exec(`cd ./${ProjectName}/server && npm ci`);
  shell.exec(`cd ./${ProjectName}/client && yarn install`);
};
exports.mernAuth = (ProjectName) => {
  shell.exec('git clone https://github.com/UsefSalim/-XelorAuth-.git');
  shell.exec('rm -r ./-XelorAuth-/.git');
  shell.exec(`mv ./-XelorAuth-/ ${path}/${ProjectName}`);
  shell.exec(`cd ./${ProjectName}/server && npm ci`);
  shell.exec(`cd ./${ProjectName}/client && yarn install`);
};
