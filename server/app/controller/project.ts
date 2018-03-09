import {Controller} from 'egg'

/**
 * @param {String} name - projcet name
 * 
 **/
export default class ProjectController extends Controller {
  
  public async query () {
    const { ctx, service } = this
    let pid: string = ctx.params.pid
    try {
      const res: any[] = await service.project.query(pid)
      ctx.status = 200
      ctx.body = res
    } catch (error) {
      ctx.status = 404
      ctx.body = {
        msg: 'not found'
      }
    }
  }

  public async create () {
    const {ctx, service} = this
    const name: string = ctx.request.body['name']
    try {
      console.log('debug info')
      let ret = await service.project.add({name: name})
      ctx.status = 200
      ctx.body = {
        msg: 'success',
        data: ret
      }
    } catch (error) {
      if (error.code === 409) {
        ctx.status = 409
        ctx.body = {
          msg: `项目${name}已存在`
        }
      }
    }
  }

  public async delete_ () {
    const {ctx, service} = this
    const id: string = ctx.request.body['id']
    try {
      await service.project.delete_({id: id})
      ctx.status = 201
      ctx.body = {
        msg: 'success'
      }
    } catch (error) {
      ctx.status = 404
      ctx.body = {
        msg: 'not found'
      }
    }
  }

}