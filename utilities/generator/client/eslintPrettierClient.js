const fs = require('fs');
const chalk = require('chalk');

const success = chalk.bold.green;
// const run = chalk.bold.blue;
const { log: terminal } = console;
const path = `${process.cwd()}/..`;

exports.configEslintPrettierClient = () => {
  if (!fs.existsSync('../.vscode')) {
    fs.mkdir(`${path}/.vscode`, () => {
      fs.appendFile(
        `${path}/.vscode/settings.json`,
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
  }
  !fs.existsSync('../client/.prettierrc') &&
    fs.appendFile(
      `${path}/client/.prettierrc`,
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
  !fs.existsSync('../client/.eslintrc.js') &&
    fs.appendFile(
      `${path}/client/.eslintrc.js`,
      `module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'import/extensions': 0,
    'react/prop-types': 0,
    'linebreak-style': 0,
    'react/state-in-constructor': 0,
    'import/prefer-default-export': 0,
    'max-len': [
      2,
      250,
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    'camelcase': 0,
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_d',
          '_dh',
          '_h',
          '_id',
          '_m',
          '_n',
          '_t',
          '_text',
        ],
      },
    ],
    'object-curly-newline': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [
          'Link',
        ],
        specialLink: [
          'to',
          'hrefLeft',
          'hrefRight',
        ],
        aspects: [
          'noHref',
          'invalidHref',
          'preferButton',
        ],
      },
    ],
  },
};
`,
      (err) => {
        if (err) throw err;
      }
    );
  fs.existsSync('../client/package.json') &&
    fs.readFile(`${path}/client/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.dep =
          'yarn add -D eslint-plugin-react-hooks eslint-plugin-react eslint-plugin-prettier eslint-plugin-jsx-a11y eslint-plugin-import eslint-config-prettier eslint-config-airbnb prettier eslint';
      }
      fs.writeFile(
        `${path}/client/package.json`,
        JSON.stringify(jsonFile),
        (err) => {
          err && terminal('err', err);
        }
      );
    });
  fs.existsSync('../client/package.json') &&
    fs.readFile(`${process.cwd()}/package.json`, 'utf-8', (err, data) => {
      const jsonFile = JSON.parse(data);
      if (!err) {
        jsonFile.scripts.dep = 'npm run dep --prefix ../client';
      }
      fs.writeFile(
        `${process.cwd()}/package.json`,
        JSON.stringify(jsonFile),
        (err) => {
          err && terminal('err', err);
        }
      );
    });
  terminal(success('eslint and prettier files added 👌👌'));
  terminal(
    'install dependencies eslint and prettier  ⇛',
    success('npm run dep')
  );
};
