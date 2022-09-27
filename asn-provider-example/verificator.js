//In real projects it should be a test class (mocha, jasmine, junit, unnit, etc)

const path = require('path')
const packageJson = require('./package.json')
const { dictionaryService, accountRepository } = require('./dictionaryService.js')
const Verifier = require('@pact-foundation/pact').Verifier

//Our api server port 
const port = 3000;
const consumerName = "asn-web-client"
const providerName = "owd-api-gateway"

// We use PactBroker web service.
// That case allows to public contract verification back and add other features like contract versions and tags
let options = {
    provider: providerName,
    providerBaseUrl: `http://localhost:${port}`, //example API url
    pactBrokerUrl: 'http://dev.corepartners.com/pactBroker/',
    pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
    pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
    publishVerificationResult: true, //publish result back to  PactBroker to close communication loop between consumers and provider
    consumerVersionTags: ['repl'],
    providerVersion: '1.0.' + packageJson.version, //provider version for the current verification, will be pushed to PactBroker

    //Contract state handling example
    //Allows you to set up data on the provider by injecting it into the data source before the interaction is run
    stateHandlers: {
      "account exists": () => {
        accountRepository.init()
        return Promise.resolve(`Accounts added to the db`)
      },
      "account not exists": () => {
        accountRepository.clear()
        return Promise.resolve(`Accounts removed from the fake db`)
      }
    }
  }

//Run Provider dictionary API Server example
let server = dictionaryService.listen(port, () => {
    console.log(`Server running on port ${port}`);

    //run Pact contract verification
    new Verifier(options)
   .verifyProvider()
   .then(output => {
     console.log('Pact Verification Complete!')
     console.log(output)
     server.close()
   })
   .catch(e => {
     console.error('Pact verification failed :(', e)
     server.close()
   })  
});