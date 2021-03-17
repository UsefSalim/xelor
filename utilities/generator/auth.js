const fs = require('fs');

const { log: terminal } = console;
const path = process.cwd();
const staticFiles = `${__dirname}/../static/api/auth`;

const creationFiles = (staticFiles, type, Model = 'auth') => {
  fs.readFile(`${staticFiles}/${Model}.${type}.js`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      fs.writeFile(
        `${path}/${type}/${Model}.${type}.js`,
        data,
        'utf8',
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
};

const insertFiles = (staticFiles, type, Model = 'auth') => {
  if (!fs.existsSync(`./${type}`)) {
    fs.mkdir(`${path}/${type}`, (err) => {
      if (err) throw err;
    });
    creationFiles(staticFiles, `${type}`, Model);
  } else {
    creationFiles(staticFiles, `${type}`, Model);
  }
};
exports.creatAuth = () => {
  if (fs.existsSync('package.json') && fs.existsSync('server.js')) {
    fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.auth = 'npm i jsonwebtoken bcrypt';
      }
      fs.writeFile(`${path}/package.json`, JSON.stringify(jsonFile), (err) => {
        err && terminal('err', err);
      });
    });
    insertFiles(staticFiles, 'controllers');
    insertFiles(staticFiles, 'middlewares');
    insertFiles(staticFiles, 'routes');
    insertFiles(staticFiles, 'validations');
    insertFiles(staticFiles, 'models', 'user');
    terminal('(install dependencies)> npm run auth');
    terminal('> npm start');
  } else {
    terminal(
      "veiller configurer votre serverur avant d'utuliser react > go make:server"
    );
  }
};