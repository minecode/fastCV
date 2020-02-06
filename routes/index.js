var express = require('express');
var router = express.Router();

const path = require('path');
const pathOfModules = '../public/modules/';
const pathOfTemplates = '../public/templates/';
const fs = require('fs');

var listOfModules = [];
var contentModules = {};

var listOfTemplates = [];
var contentTemplates = {};


fs.readdirSync(path.join(__dirname, pathOfModules), {
    withFileTypes: true
  })
  .filter(child => !child.isDirectory())
  .map(child => child.name)
  .filter(name => name.endsWith('.json'))
  .forEach((name) => {
    listOfModules.push(name.split('.json')[0]);
    var content = fs.readFileSync(path.join(__dirname, pathOfModules + name)).toString('utf-8');
    contentModules[name.split('.json')[0]] = JSON.stringify(content);
  });

fs.readdirSync(path.join(__dirname, pathOfTemplates), {
    withFileTypes: true
  })
  .filter(child => !child.isDirectory())
  .map(child => child.name)
  .filter(name => name.endsWith('.json'))
  .forEach((name) => {
    listOfTemplates.push(name.split('.json')[0]);
    var content = fs.readFileSync(path.join(__dirname, pathOfTemplates + name)).toString('utf-8');
    contentTemplates[name.split('.json')[0]] = JSON.stringify(content);
  });

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Fast CV',
    description: 'A simple web application to generate a CV, based on templates',
    listOfModules: JSON.stringify(listOfModules),
    contentModules: JSON.stringify(contentModules),
    listOfTemplates: JSON.stringify(listOfTemplates),
    contentTemplates: JSON.stringify(contentTemplates)
  });
});

module.exports = router;