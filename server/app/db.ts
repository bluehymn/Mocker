import {MongoClient} from 'mongodb'

export let DB

export function connectDB (config) {
  return new Promise((resolve, reject) => {
    const url = `mongodb://${config.user}:${encodeURIComponent(config.pwd)}@${config.host}:${config.port}/${config.db}`;
    MongoClient.connect(url, function (err, client) {
      if (err !== null) {
        reject(err)
        return
      } else {
        console.log('Connected correctly to DB')
        DB = client.db(config.db)
        resolve(DB)
      }
    })
  })
}
