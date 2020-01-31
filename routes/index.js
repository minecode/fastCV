var express = require('express');
var router = express.Router();

const path = require("path");
const pathOfModules = '../public/modules/';
const fs = require('fs');

var listOfModules = []
var contentFiles = {}

fs.readdirSync(path.join(__dirname, pathOfModules), {
    withFileTypes: true
  })
  .filter(child => !child.isDirectory())
  .map(child => child.name)
  .filter(name => name.endsWith(".json"))
  .forEach((name) => {
    listOfModules.push(name.split('.json')[0])
    var content = fs.readFileSync(path.join(__dirname, pathOfModules + name)).toString('utf-8');
    contentFiles[name.split('.json')[0]] = JSON.stringify(content)
  });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Fast CV',
    description: 'A simple web application to generate a CV, based on templates',
    listOfModules: JSON.stringify(listOfModules),
    contentFiles: JSON.stringify(contentFiles)
  });
});

module.exports = router;