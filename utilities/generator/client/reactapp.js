const fs = require('fs');
const chalk = require('chalk');

const success = chalk.bold.green;
const danger = chalk.bold.red;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();

exports.createReactApp = () => {
  if (fs.existsSync('package.json') && fs.existsSync('server.js')) {
    fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        if (fs.existsSync('../client')) {
          jsonFile.scripts.reactapp = 'cd ../client && npx create-react-app .';
        } else {
          jsonFile.scripts.reactapp = 'cd .. && npx create-react-app client';
        }
      }
      fs.writeFile(`${path}/package.json`, JSON.stringify(jsonFile), (err) => {
        err && terminal('err', err);
      });
    });

    terminal('Create react app ⇛ ', success('npm run reactapp'));
    terminal(run('npm start'));
  } else {
    terminal(
      danger('make sure to configure your server before using react ⇛'),
      run('xelor server')
    );
  }
};
