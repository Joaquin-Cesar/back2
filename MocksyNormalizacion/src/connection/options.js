import path from "path";
const{pathname: filename} = new URL('../db/mydb.sqlite', import.meta.url)
 
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
  
        filename: filename
      },
      useNullAsDefault: true
    }
  };
  
  export default options;
