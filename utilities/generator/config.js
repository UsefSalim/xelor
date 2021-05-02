const shell = require('shelljs');
const chalk = require('chalk');
const fs = require('fs');

const danger = chalk.bold.red;
const success = chalk.bold.green;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();

exports.mern = (ProjectName) => {
  try {
    shell.exec('git clone https://github.com/UsefSalim/-Xelor-.git');
    shell.exec('rm -r ./-Xelor-/.git');
    shell.exec(`mv ./-Xelor-/ ${path}/${ProjectName}`);
    terminal(success('Files created succesfuly ✌✌'));
    // fs.readFile(
    //   `${path}/${ProjectName}/server/package.json`,
    //   'utf-8',
    //   (err, data) => {
    //     const jsonFile = JSON.parse(data);
    //     if (!err) {
    //       jsonFile.name = ProjectName;
    //     }
    //     fs.writeFile(
    //       `${path}/${ProjectName}/server/package.json`,
    //       JSON.stringify(jsonFile),
    //       (err) => {
    //         err && terminal('err', err);
    //       }
    //     );
    //   }
    // );
    terminal(run('Install Dependencies ... 🕒🕒'));
    shell.exec(`npm i -g pnpm `);
    shell.exec(`cd ./${ProjectName}/server && pnpm i && pnpm up xelor`);
    shell.exec(`cd ./${ProjectName}/client && pnpm i && pnpm up xelor`);
    shell.exec(`cd ./${ProjectName} && code .`);
    shell.exec(`cd ./${ProjectName}/server && pnpm run dev`);
  } catch (error) {
    terminal(danger(error));
  }
};
exports.mernAuth = (ProjectName) => {
  try {
    shell.exec('git clone https://github.com/UsefSalim/-XelorAuth-.git');
    shell.exec('rm -r ./-XelorAuth-/.git');
    shell.exec(`mv ./-XelorAuth-/ ${path}/${ProjectName}`);
    // fs.readFile(
    //   `${path}/${ProjectName}/server/package.json`,
    //   'utf-8',
    //   (err, data) => {
    //     const jsonFile = JSON.parse(data);
    //     if (!err) {
    //       jsonFile.name = ProjectName;
    //     }
    //     fs.writeFile(
    //       `${path}/${ProjectName}/server/package.json`,
    //       JSON.stringify(jsonFile),
    //       (err) => {
    //         err && terminal('err', err);
    //       }
    //     );
    //   }
    // );
    terminal(success('Files created succesfuly ✌✌'));
    terminal(run('Install Dependencies ... 🕒🕒'));

    shell.exec(`npm i -g pnpm `);
    shell.exec(`cd ./${ProjectName}/server && pnpm i  && pnpm up xelor`);
    shell.exec(`cd ./${ProjectName}/client && pnpm i  && pnpm up xelor`);
    shell.exec(`cd ./${ProjectName} && code .`);
    shell.exec(`cd ./${ProjectName}/server && pnpm run dev`);
  } catch (error) {
    terminal(danger(error));
  }
};
exports.server = (ProjectName) => {
  try {
    shell.exec('git clone https://github.com/UsefSalim/-server-.git');
    shell.exec('rm -r ./-server-/.git');
    // fs.readFile(`${path}/-server-/package.json`, 'utf-8', (err, data) => {
    //   const jsonFile = JSON.parse(data);
    //   if (!err) {
    //     jsonFile.name = ProjectName;
    //   }
    //   fs.writeFile(
    //     `${path}/-server-/package.json`,
    //     JSON.stringify(jsonFile),
    //     (err) => {
    //       err && terminal('err', err);
    //     }
    //   );
    // });
    shell.exec(`mv ./-server-/ ${path}/${ProjectName}`);
    terminal(success('Files created succesfuly ✌✌'));
    terminal(run('Install Dependencies ... 🕒🕒'));
    shell.exec(`npm i -g pnpm `);
    shell.exec(`cd ./${ProjectName}  && pnpm i  && pnpm up xelor`);
    shell.exec(`cd ./${ProjectName}  && code .`);
    shell.exec(`cd ./${ProjectName} && pnpm run dev`);
  } catch (error) {
    terminal(danger(error));
  }
};
