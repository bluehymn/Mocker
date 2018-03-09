import React, { Component } from 'react'
import Projects from '../ProjectList'
import ApiList from '../ApiList'
import CreateProject from '../../components/CreateProject'
import {myEmitter} from '../../events'

import './index.css'
import { Layout, Button } from 'antd'
const { Header, Sider, Content } = Layout

class App extends Component {

  openCreateProjectModal() {
    myEmitter.emit('openCreateProjectModal')
  }

  render() {
    
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="header">
            <Button type="primary" size="large" className="add-project" onClick={this.openCreateProjectModal}>New Project</Button>
          </Header>
          <Layout style={{ marginLeft: 200 }}>
            <Sider style={{ height: '100vh', overflow: 'auto', position: 'fixed', left: 0 }}>
              
              <Projects />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content><ApiList /></Content>
            </Layout>
          </Layout>
        </Layout>
        <CreateProject/>
      </div>
    )
  }
}

export default App
