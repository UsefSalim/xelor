const fs = require('fs');
const chalk = require('chalk');

const sucess = chalk.bold.green;
const danger = chalk.bold.red;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();

exports.createReactApp = () => {
  if (fs.existsSync('package.json') && fs.existsSync('server.js')) {
    fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.reactapp =
          'npx create-react-app client && npm i concurrently';
        jsonFile.scripts.client = 'npm start --prefix client';
        jsonFile.scripts.start = 'concurrently "npm run dev" "npm run client"';
      }
      fs.writeFile(`${path}/package.json`, JSON.stringify(jsonFile), (err) => {
        err && terminal('err', err);
      });
    });

    terminal('Create react app ⇛ ', sucess('npm run reactapp'));
    terminal(run('npm start'));
  } else {
    terminal(
      danger("veiller configurer votre serverur avant d'utuliser react ⇛"),
      run('xelor server')
    );
  }
};
