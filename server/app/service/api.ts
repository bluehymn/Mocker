const Service = require('egg').Service
import {DB} from '../db'

/**
 * @param {String} pid - project id
 * @param {String} name - api name
 * @param {String} url - api url
 * @param {String} body - response body
 */

export interface ApiItem {
  pid: string
  url: string
  name: string
  body: string
}

export default class ApiService extends Service {
  public query (pid: string) {
    return new Promise (function (resolve, reject) {
      const apis = DB.collection('api')
      apis.find({
        pid: pid
      }).toArray(function (err, result) {
        if (err != null) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

  /**
   * @param {ApiItem} ApiItem - an api-item
   */
  
  public create (ApiItem: ApiItem) {
    return new Promise(async function (resolve, reject) {
      const apis = DB.collection('api')
      const {pid, url} = ApiItem
      const existed = await apis.findOne({
        pid: pid,
        url: url
      })
      if (existed) {
        reject({
          code: 409
        })
      } else {
        apis.insertOne(ApiItem).then(result => {
          resolve(result)
        }, err => {
          reject({
            code: 500,
            err: err
          })
        })
      }

    })
  }
  
}
