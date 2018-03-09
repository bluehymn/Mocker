import ApiController from './controller/api'
import ProjectController from './controller/project'

declare module 'egg' {
  export interface IController {
    api: ApiController,
    project: ProjectController
  }
}