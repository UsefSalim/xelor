const fs = require('fs');
const chalk = require('chalk');

const success = chalk.bold.green;
// const run = chalk.bold.blue;
const { log: terminal } = console;
const path = process.cwd();

exports.configEslintPrettier = () => {
  if (!fs.existsSync('../.vscode')) {
    fs.mkdir(`${path}/../.vscode`, () => {
      fs.appendFile(
        `${path}/../.vscode/settings.json`,
        `{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "[javascript]": {
  "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}`,
        (err) => {
          if (err) throw err;
        }
      );
    });
  } else {
    fs.appendFile(
      `${path}/../.vscode/settings.json`,
      `{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}`,
      (err) => {
        if (err) throw err;
      }
    );
  }
  fs.appendFile(
    `${path}/.prettierrc`,
    `{
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.appendFile(
    `${path}/.eslintrc.json`,
    `{
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": ["airbnb-base", "prettier"],
  "plugins": ["prettier"],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "no-confusing-arrow": "off",
    "linebreak-style": "off",
    "no-unused-expressions": "off",
    "no-use-before-define": "off",
    "no-shadow": "off",
    "arrow-parens": ["off"],
    "comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore"
      }
    ],
    "no-plusplus": "off",
    "complexity": ["error", 6],
    "default-case": "error",
    "import/no-unresolved" :"off"
  }
}`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.existsSync('package.json') &&
    fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.dep =
          'npm i -D prettier eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-config-airbnb-base';
      }
      fs.writeFile(`${path}/package.json`, JSON.stringify(jsonFile), (err) => {
        err && terminal('err', err);
      });
    });
  !fs.existsSync('package.json') &&
    fs.readFile(
      `${__dirname}/../static/server/package.json`,
      'utf-8',
      (err, data) => {
        fs.appendFile(`${path}/package.json`, data, (err) => {
          if (err) {
            throw err;
          } else {
            const jsonFile = JSON.parse(data);
            if (!err) {
              jsonFile.scripts.dev = 'nodemon server.js';
              jsonFile.scripts.dep =
                'npm i -D prettier eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-config-airbnb-base';
            }
            fs.writeFile(
              `${path}/package.json`,
              JSON.stringify(jsonFile),
              (err) => {
                err && terminal('err', err);
              }
            );
          }
        });
      }
    );
  terminal(success('eslint and prettier files added 👌👌'));
  terminal(
    'install dependencies eslint and prettier  ⇛',
    success('npm run dep')
  );
};
