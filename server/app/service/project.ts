const Service = require('egg').Service
import {ObjectID} from 'mongodb'
import {DB} from '../db'

export default class ProjectService extends Service {
  public async query () {
    const projects = DB.collection('project')
    return await projects.find().toArray()
  }
  
  public create (data) {
    return new Promise(async function (resolve, reject) {
      const projects = DB.collection('project')
      const existed = await projects.findOne({name: data.name})
      if (existed) {
        reject({
          code: 409
        })
      } else {
        projects.insertOne({
          name: data.name
        }).then(result => {
          resolve(result.ops[0])
        }, err => {
          reject(err)
        })
      }
    })
  }

  public delete_ (data) {
    return new Promise(function (resolve, reject) {
      const projects = DB.collection('project')
      projects.deleteOne({
        "_id": ObjectID(data.id)
      }).then(() => {
        resolve()
      }, err => {
        reject(err)
      })
    })
  }
}
