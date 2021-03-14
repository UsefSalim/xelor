const fs = require('fs');

const { log: terminal } = console;
const path = process.cwd();
exports.updateServerEjs = () => {
  fs.readFile(`${path}/server.js`, 'utf-8', (err, data) => {
    if (!err) {
      const newData = data.split('//');
      const middlewares = newData[2]
        .concat(`app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(ejsLayout);
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});`);
      const requirePackages = newData[1]
        .concat(`const ejsLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const staticRoute = require('./routes/static.routes')`);
      // terminal(newData);
      const indexRoute = newData[4].concat(`app.use(staticRoute);`);
      const serverEjs = `${newData[0]} \r\n //`
        .concat(`${requirePackages}  \r\n // `)
        .concat(`${middlewares}\r\n //`)
        .concat(`${newData[3]} \r\n //`)
        .concat(`${indexRoute}\r\n //`)
        .concat(`${newData[5]}`);
      fs.writeFile(`${path}/server.js`, serverEjs, (err) => {
        err && terminal('err', err);
      });
      fs.existsSync('package.json') &&
        fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
          const jsonFile = JSON.parse(data);
          if (!err) {
            jsonFile.scripts.ejs =
              'npm i ejs express-ejs-layouts connect-flash express-session';
          }
          fs.writeFile(
            `${path}/package.json`,
            JSON.stringify(jsonFile),
            (err) => {
              err && terminal('err', err);
            }
          );
        });
      !fs.existsSync('./public') &&
        fs.mkdir(`${path}/public`, () => {
          fs.mkdir(`${path}/public/css`, () => {});
          fs.mkdir(`${path}/public/images`, () => {});
          fs.mkdir(`${path}/public/js`, () => {});
        });
      !fs.existsSync('./views') &&
        fs.mkdir(`${path}/views`, () => {
          fs.readFile(
            `${__dirname}/../static/ejs/layout.ejs`,
            'utf-8',
            (err, data) => {
              fs.appendFile(`${path}/views/layout.ejs`, data, (err) => {
                if (err) throw err;
              });
            }
          );
          fs.readFile(
            `${__dirname}/../static/ejs/index.ejs`,
            'utf-8',
            (err, data) => {
              fs.appendFile(`${path}/views/index.ejs`, data, (err) => {
                if (err) throw err;
              });
            }
          );
        });
      !fs.existsSync('./routes/static.routes.js') &&
        fs.readFile(
          `${__dirname}/../static/ejs/routes/static.routes.js`,
          'utf-8',
          (err, data) => {
            if (err) throw err;
            fs.appendFile(`./routes/static.routes.js`, data, (err) => {
              if (err) throw err;
            });
          }
        );
      !fs.existsSync('./controllers/static.controller.js') &&
        fs.readFile(
          `${__dirname}/../static/ejs/controllers/static.controller.js`,
          'utf-8',
          (err, data) => {
            if (err) throw err;
            fs.appendFile(`./controllers/static.controller.js`, data, (err) => {
              if (err) throw err;
            });
          }
        );
      terminal('ejs template engine configured ');
      terminal(
        '(install express-ejs-layouts connect-flash express-session )> npm run ejs '
      );
      terminal('> npm run dev');
    } else {
      terminal(
        "veiller configurer votre serverur avant d'utuliser ejs > go make:server"
      );
    }
  });
};
