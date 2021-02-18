const fs = require('fs');

const path = process.cwd();

fs.readFile('./utilities/static/server.js', 'utf-8', (err, data) => {
  fs.appendFile(`${path}/server.js`, data, (err) => {
    if (err) throw err;
  });
});

fs.readFile('./.gitignore', 'utf-8', (err, data) => {
  fs.appendFile(`${path}/.txt`, data, (err) => {
    if (err) throw err;
  });
});
