const path = require("path")
const options = {
    mysql: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
      },
      pool: { min: 0, max: 7 }
    },
    sqlite3: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '../db/mydb.sqlite')
      },
      useNullAsDefault: true
    }
  };
  
  module.exports = options;
