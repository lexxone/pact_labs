const path = require('path')
const pact = require('@pact-foundation/pact-node')

const consumerName = "asn-web-client"
const providerName = "owd-api-gateway"

const pactFile = path.resolve(`./pacts/${consumerName}-${providerName}.json`.toLowerCase())

  // STEP 2: Publish to broker
const opts = {
  pactFilesOrDirs: [pactFile],
  pactBroker: 'http://dev.corepartners.com/pactBroker/',
  pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
  pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
  tags: ['prod'],
  consumerVersion: '1.0.0.0',
}

pact
  .publishPacts(opts)
  .then((res) => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to http://dev.corepartners.com/pactBroker/pacts/provider/GettingStartedOrderApi/consumer/GettingStartedOrderWeb/latest and login with')
    console.log('=> Username: dXfltyFMgNOFZAxr8io9wJ37iUpY42M')
    console.log('=> Password: O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1')
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed :(. \n:', e)
  })