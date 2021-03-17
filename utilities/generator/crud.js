const fs = require('fs');
const chalk = require('chalk');

const sucess = chalk.bold.green;
const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();
const staticFiles = `${__dirname}/../static/api/crud`;
const staticFilesEmpty = `${__dirname}/../static/api/crud/empty-crud`;

const creationFiles = (staticFiles, Model, type) => {
  fs.readFile(`${staticFiles}/crud.${type}.js`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const result = data.replace(/ModelName/g, Model);
      fs.writeFile(
        `${path}/${type}/${Model}.${type}.js`,
        result,
        'utf8',
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
};

const insertFiles = (staticFiles, Name, type) => {
  if (!fs.existsSync(`./${type}`)) {
    fs.mkdir(`${path}/${type}`, (err) => {
      if (err) throw err;
    });
    creationFiles(staticFiles, Name, `${type}`);
  } else {
    creationFiles(staticFiles, Name, `${type}`);
  }
};

exports.createCrud = (Name) => {
  insertFiles(staticFiles, Name, 'controllers');
  insertFiles(staticFiles, Name, 'models');
  insertFiles(staticFiles, Name, 'routes');
  insertFiles(staticFiles, Name, 'validations');
  terminal(sucess(`crud`), run(Name), sucess(`created succesfuly`));
};
exports.createEmtyCrud = (Name) => {
  insertFiles(staticFilesEmpty, Name, 'controllers');
  insertFiles(staticFilesEmpty, Name, 'models');
  insertFiles(staticFilesEmpty, Name, 'routes');
  insertFiles(staticFilesEmpty, Name, 'validations');
  terminal(sucess(`crud`), run(Name), sucess(`created succesfuly`));
};
