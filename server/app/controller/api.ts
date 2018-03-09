import {Controller} from 'egg'

export default class ApiController extends Controller {

  public async query() {
    const { ctx, service } = this
    try {
      const pid = ctx.params.pid
      const res = await service.api.query(pid)
      ctx.status = 200
      ctx.body = res
    } catch (error) {
      ctx.status = 404
      ctx.body = {
        msg: 'not found'
      }
    }
  }

  public async add() {
    const { ctx, service } = this
    const reqBody = ctx.request.body
    const pid = reqBody['pid']
    const name = reqBody['name']
    const url = reqBody['url']
    const body = reqBody['body']
    try {
      let result = await service.api.add({
        pid, name, url, body
      })
      ctx.status = 201
      ctx.body = {
        msg: 'success',
        data: result
      }
    } catch (error) {
      if (error.code === 409) {
        ctx.status = 409
        ctx.body = {
          msg: 'URL: ' + url + ' 已存在'
        }
      }
    }
  }

}