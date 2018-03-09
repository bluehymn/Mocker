import React from 'react'
import axios from 'axios'
import {bindActionCreators} from 'redux'
import * as projectActions from '../../actions/project'
import {connect} from 'react-redux'
import {getCsrfToken} from '../../utilities/common'
import Project from '../../components/Project'
import Confirm from '../../components/Modals/confirm'
import {myEmitter} from '../../events'
import { Menu } from 'antd'

class ProjectList extends React.Component {

  constructor (props) {
    super(props)
    this.getProjects()
    this.state = {
      defaultSelectedKeys: null
    }
  }
  
  componentWillUnmount () {
    
  }

  selectProject (id) {
    this.props.actions.switchProject(id)
    myEmitter.emit('switchProject', id)
  }

  getProjects () {
    axios.get('/project')
      .then(response => {
        let list = response.data
        this.setState({
          defaultSelectedKeys: list[0]._id
        })
        this.props.actions.refreshProjects(list)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  deleteProject (id, e) {
    e.stopPropagation()
    myEmitter.emit('openConfirm', {
      text: '删除' + id,
      okCallback: () => {
        return new Promise((resolve, reject) => {
          axios({
            method: 'delete',
            url: '/project',
            headers: {
              'x-csrf-token': getCsrfToken()
            },
            data: {
              id: id
            }
          })
            .then(response => { 
              this.props.actions.deleteProject(id)
              resolve()
            })
            .catch(function (error) {
              console.log(error)
            })
        })
      },
      cancelCallback: () => {console.log('cancel')}
    })
  }

  render() {
    return (
      <div>
        <Menu
          defaultSelectedKeys={[this.state.defaultSelectedKeys]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >  
          {
            this.props.projects.map(item => {
              return (
                <Menu.Item key={item._id}>
                  <div onClick={() => this.selectProject(item._id)}>
                    <Project data={item} deleteProject={this.deleteProject.bind(this, item._id)}/>
                  </div>
                </Menu.Item>
              )
            })
          }
        </Menu>
        <Confirm />
      </div>
    )
  }
}

export default connect(
  state => ({
    projectId: state.project.projectId,
    projects: state.project.projects
  }),
  dispatch => ({
    actions: bindActionCreators(projectActions, dispatch)
  })
)(ProjectList)
