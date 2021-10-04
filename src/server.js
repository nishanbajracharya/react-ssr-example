require('ignore-styles');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

const PORT = 3000;

const express = require('express');
const path = require('path');
const fs = require('fs');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const App = require('./App');

const app = express();

app.use('^/$', (req, res) => {
  fs.readFile(
    path.resolve(__dirname, '..', 'build/index.html'),
    'utf-8',
    (err, data) => {
      console.log(data);
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(
            React.createElement(App.default)
          )}</div>`
        )
      );
    }
  );
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
  console.log(`Server started at :${PORT}`);
});
