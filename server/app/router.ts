
/**
 * @param {Egg.Application} app - egg application
 */

import { Application } from 'egg'

export default (app: Application) => {
  const { router, controller } = app

  // 项目
  router.get('/project', controller.project.query)
  router.post('/project', controller.project.create)
  router.delete('/project', controller.project.delete_)
  
  // 接口
  router.get('/api/:pid', controller.api.query)
  router.post('/api', controller.api.add)
  
}
