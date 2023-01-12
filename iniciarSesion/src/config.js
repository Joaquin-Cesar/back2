export default {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/coderhouse'
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://Joaquin:Joaquin@cluster0.ggzahbb.mongodb.net/sesiones?retryWrites=true&w=majority'
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'coderhouse',
            password: 'coderhouse',
            database: 'coderhouse'
        }
    },
    fileSystem: {
        path: './DB'
    }
}
