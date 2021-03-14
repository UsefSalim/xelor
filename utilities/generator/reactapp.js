const fs = require('fs');

const { log: terminal } = console;
const path = process.cwd();

exports.createReactApp = () => {
  if (fs.existsSync('package.json') && fs.existsSync('server.js')) {
    fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.reactapp = 'npx create-react-app client';
        jsonFile.scripts.client = 'npm start --prefix client';
        jsonFile.scripts.start =
          'concurrently "npm run server" "npm run client"';
      }
      fs.writeFile(`${path}/package.json`, JSON.stringify(jsonFile), (err) => {
        err && terminal('err', err);
      });
    });
    terminal('(create reeact app )> npm run reactapp');
    terminal('> npm start');
  } else {
    terminal(
      "veiller configurer votre serverur avant d'utuliser react > go make:server"
    );
  }
};
