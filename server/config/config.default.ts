import { EggAppConfig } from 'egg'

export default (appInfo: EggAppConfig) => {
  const config: any = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1518405921862_5478'

  // add your config here
  // config.middleware = ['normalize']

  // config.normalize = null

  config.DB = {
    db: 'mocker',
    host: '192.168.10.254',
    port: '27017',
    user: 'user',
    pwd: '123456'
  }

  config.DB1 = {
    db: 'mocker',
    host: '192.168.0.104',
    port: '27017',
    user: 'user',
    pwd: '123456'
  }

  /****
   * 
    db.createUser(
      {
        user: "user",
        pwd: "123456",
        roles: [
          { role: "readWrite", db: "mocker" }
        ]
      }
    )
   */

  return config
}
