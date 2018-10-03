'use strict'

const path = require('path');

const fileService = require('./file.service');


module.exports.createi18Files = () => {

  let dictionary;
  const dictionaryPath = path.resolve(__dirname, '../files/input/dictionary.csv');
  const dictionaries = {
    es: {},
    en: {}
  };

  fileService.getJsonFromCsv(dictionaryPath)
    .then((dictionaryData) => {

      dictionary = dictionaryData;

      dictionary.forEach((item) => {
        dictionaries.es[item.Key] = item.ES;
        dictionaries.en[item.Key] = item.EN;
      });

      return Promise.all([
        fileService.createJsonFile(dictionaries.es, 'es.json'),
        fileService.createJsonFile(dictionaries.en, 'en.json')
      ]);
    })
    .then(() => fileService.createMoFiles(dictionary))
    .then(() => console.log(`done!!!`))
    .catch((err) => console.error(err))
}