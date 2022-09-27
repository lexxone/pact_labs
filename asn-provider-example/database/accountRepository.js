let accountDataTable = require('./accountData.json')

// Simple object repository
class AccountRepository {
    constructor() {
      this.entities = []
      this.init()
    }
  
    init(){
      accountDataTable.forEach(x => this.insert(x));
    }

    fetchAll() {
      return this.entities
    }
  
    getById(id) {
      return this.entities.find(entity => id === entity.id)
    }
  
    insert(entity) {
      this.entities.push(entity)
    }
  
    clear() {
      this.entities = []
    }
  }
  
  module.exports = AccountRepository