var express = require("express");
var cors = require('cors')
var bodyParser = require('body-parser')
// "In memory" database repository example
const AccountRepository = require('./database/accountRepository.js')


let BASE_URL = '/api/dictionary-service'
var dictionaryService = express();
var accountRepository = new AccountRepository();

dictionaryService.use(cors())
dictionaryService.use(bodyParser.json())
dictionaryService.use(bodyParser.urlencoded({ extended: true }))
dictionaryService.use((_, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    next()
  })

//Build simple API service 
dictionaryService.get(`${BASE_URL}/accounts/:id`, (req, res) => {
  var id = req.params.id;
  var account = accountRepository.getById(id)

    if (account == null)
      { res.status(404).send('Not found');}

    res.json(account)
  })

module.exports = {
    dictionaryService,
    BASE_URL,
    accountRepository
  }