import ApiService from './service/api'
import ProjectService from './service/project'

declare module 'egg' {
  export interface IService {
    api: ApiService,
    project: ProjectService
  }
}
