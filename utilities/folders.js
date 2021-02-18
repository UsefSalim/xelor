const fs = require('fs');
const path = process.cwd();

exports.createServer = (modelName) => {
  fs.mkdir(`${path}/controllers`, () => {
    if (err) throw err;
  })
  fs.mkdir(`${path}/models`, function () {
    if (err) throw err;
  })
  fs.mkdir(`${path}/routes`, function () {
    if (err) throw err;
  })
  fs.mkdir(`${path}/validations`, function () {
    if (err) throw err;
  })
  fs.mkdir(`${path}/config`, function () {
    fs.appendFile(`${path}/config/.env`,
      `MONGO_URI = 
       NODE_ENV =`,
      function (err) {
        if (err) throw err;
      });
  })

  fs.readFile('./static/server.js', function (err, data) {
    fs.appendFile(`${path}/server.js`, data, function (err) {
      if (err) throw err;
    })
  })


  fs.readFile('./.gitignore', function (err, data) {
    fs.appendFile(`${path}/.gitignore`, data,
      function (err) {
        if (err) throw err;
      });
  })
  fs.readFile('./README.md', function (err, data) {
    fs.appendFile(`${path}/mernp.README.md`, data,
      function (err) {
        if (err) throw err;
      });
  })
  fs.readFile(`${path}/package.json`, "utf-8", (err, data) => {
    if (!err) {
      let package = JSON.parse(data);
      package.scripts.dev = "nodemon server.js"
    } else {
      fs.readFile('./static/package.json', function (err, data) {
        fs.appendFile(`${path}/package.json`,
          data
          ,
          function (err) {
            if (err) throw err;
          });
      })
    }
    fs.writeFile(`./package.json`, JSON.stringify(package), (err) => {
      err
        ? console.log("err", err)
        : console.log('package.json updated !')
    })
  });
}

