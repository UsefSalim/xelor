const fs = require('fs');

const { log: terminal } = console;
const path = process.cwd();
const staticFiles = `${__dirname}/../static/api/crud`;

const creationFiles = (Model, type) => {
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

const insertFiles = (Name, type) => {
  if (!fs.existsSync(`./${type}`)) {
    fs.mkdir(`${path}/${type}`, (err) => {
      if (err) throw err;
    });
    creationFiles(Name, `${type}`);
  } else {
    creationFiles(Name, `${type}`);
  }
};

exports.createCrud = (Name) => {
  insertFiles(Name, 'controllers');
  insertFiles(Name, 'models');
  insertFiles(Name, 'routes');
  insertFiles(Name, 'validations');
  terminal(`crud ${Name} created succesfuly`);
};
