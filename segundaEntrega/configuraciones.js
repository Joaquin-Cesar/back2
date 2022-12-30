 export default{
  fileSystem: {
    path: './archivos'
},
mongodb:{  
 url : 'mongodb://localhost:27017/ecommerce',
options: {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  serverSelectionTimeoutMs: 5000
}},

firebase: {
  "type": "service_account",
  "project_id": "ecommerce-7dbe9",
  "private_key_id": "2d82f88c33b2515e965458edc248140a62b9bf87",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCir/gOEcQWKosE\nBbj5Gmn/0T8lurX3+i6em6ib8TvmOoVH7M/vBl8x4zoFbqAGmE1YFspbdguKfbTE\n2SDuwV5qnRZri0x2XXwuc708ByThVPrAMPt/nW8LVRhDPXNZihJUIRBvvJ7HL6mj\nvowRwlaJAdZ8d39OwLuJwrplNbU6jwPq5B//nmaXI0yUM2dWyFYFX++UzpTweFXM\nVDDFbxp6kvd+WWELB4qc0ZZqClg1VjW6+JFjyH1Oc0ZPGFt8MQItsRGvC9StsEjw\nBwBwl9JwMziW39m1yZ/tDp4gt51yJLgVumbfXZLsdVEWG/KYAQJKajNJF1qJWqtu\n0+QnDxwFAgMBAAECggEAI37XVWKE8P0pRaBmAlvEAt/Jslaxe0BnyY1W1Wdl1U6x\nY8cEezddr8nPD/5aBfZW8cBPOHNiAz54IXbqW41vJz3M9Xv4G987x/rSr/UzE8Lx\nztshFG/qGYPgflM7Bq88XoS0TFzQG8+HaMWbVAidztjKzm9YJHuir2UAPDLirrrK\nH0Ie1Ee+jnTNpbOfiPQb+B9QnvYfW1haieskIs9nDB5jrZQ+G1P7AasTNGr+MohE\nHmhiBCnFWMYtx13aLIg0fPaEywG7Ak9tDqSQT0QeKz7XICCbt9chenvA/ee7RXgy\nLcuWkilsh2gi1vyOqj8CreFzfvh04SaQ0jIfYtvexQKBgQDc9AVzd+RdB7z9Z+ir\nGUe3rX+/8xnGNsuyf9XDrzms0tzeJdW2qaG9J1ShVOhGxnccRfRUhSCtflm9goZu\nD2MzcIhkrUHOr54BQf1NZFOZcoyNXsaT1115DJEd/kfj1I6w2o42MUaRM+4stKF1\nSRC2ZaYxKp7nMrJnUWmtFJavXwKBgQC8fgSS4qpbX/ecarvl7UQWtA4Tso7ULWy5\nmfw7Y08M8yXx4yjGnymkLhsivsOHA0zDgkq3NiKVdMPtteShmPJiPdkZi6vftuFB\nCVV3nKGnBK/YuuMwjkou+eQUBbTdWNjCpMC6SidJUcAyF7EQrKH4e94ayERIac5P\nqrWKwLODGwKBgQCnj1bi7jT8Z/XmpnpH5vAAV07eHlmZe8yWHWPa9nNioLZmsYKU\n96d0bvM7NczAf5msk1BrGFpjt8IOeYHAzWKJi/mjf9C8EWpdwdF6c28Cm2ADhbBK\nRbTZK7KRcFjMalGbxOK8Ljo5u4wP0xvuee52pDeYaZ3/7u5kc9UUMNzlOQKBgQCm\n+duDY1gWagUng0XAgVb35bkyqdLtEvBl2ose8PJuPlc22Eye5xA0aMORG/yJ9dpi\nt2EIu+QXEcEfKyrGHH9bl/5iKuCu5YrV2jbkJtTs57H/BE+OC/6bbrMlKYj3LGWY\nx+oTHO2AffMMbQBmDQfO36v5fb8/hrtEx6zapapgUQKBgQDCNUVN3nmD2YzvqzBB\n49OFWjA8LGa5hFCRHU0bBTAGGmd7kEq0iHQ1GoD9kA7YkxsyrOb3IHKikGWBYeeR\nc+BgEee7Ckn9rQuTOMHs5puNrkZnYr3QWFc6Z1Woo9h/iqSlZGWux+L+ExZjoytE\nMiWboHtbHyFCRSHNxdxU5zew3g==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-hreci@ecommerce-7dbe9.iam.gserviceaccount.com",
  "client_id": "100888240249558139533",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hreci%40ecommerce-7dbe9.iam.gserviceaccount.com"
}
}