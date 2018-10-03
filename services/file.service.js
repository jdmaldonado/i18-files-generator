'use strict'

const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const filesPath = path.resolve(__dirname, '..', `files/i18n`);

module.exports.getJsonFromCsv = (filePath) => {
  return csv().fromFile(filePath);
}

module.exports.createJsonFile = (data, fileName) => {
  return new Promise((resolve, reject) => {
    const dataJson = JSON.stringify(data, null, 2);

    fs.writeFile(`${filesPath}/${fileName}`, dataJson, (err) => {
      if (err) {
        reject();
      }
      resolve();
    });
  });
}

module.exports.createMoFiles = (dictionary) => {

  return new Promise((resolve, reject) => {
    
    dictionary.forEach((item) => {
      fs.appendFileSync(`${filesPath}/es.mo`, `\n`);
      fs.appendFileSync(`${filesPath}/es.mo`, `msgid "${item.Key}"`);
      fs.appendFileSync(`${filesPath}/es.mo`, `\n`);
      fs.appendFileSync(`${filesPath}/es.mo`, `msgstr "${item.ES}"`);
      fs.appendFileSync(`${filesPath}/es.mo`, `\n`);

      fs.appendFileSync(`${filesPath}/en.mo`, `\n`);
      fs.appendFileSync(`${filesPath}/en.mo`, `msgid "${item.Key}"`);
      fs.appendFileSync(`${filesPath}/en.mo`, `\n`);
      fs.appendFileSync(`${filesPath}/en.mo`, `msgstr "${item.EN}"`);
      fs.appendFileSync(`${filesPath}/en.mo`, `\n`);
    });

    resolve();
  });

}