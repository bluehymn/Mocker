import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCsrfToken} from '../../utilities/common'
import {myEmitter} from '../../events'
import ApiItem from '../../components/ApiItem'
import { List } from 'antd';

class ApiList extends Component {
  id = null
  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    myEmitter.on('switchProject', id => {
      if (this.id === id) return
      this.id = id
      this.getApis(id)
    })
  }

  getApis (id) {
    axios.get('/api/' + id)
      .then(response => {
        let list = response.data
        this.setState({
          list: list
        })
      })
  }

  delApi () {
    axios({
      url: '/api',
      method: 'get',
      headers: {
        'x-csrf-token': getCsrfToken()
      }
    })
  }

  render() {
    return (
      <List
        size="small"
        bordered
        dataSource={this.state.list}
        renderItem={item => (<List.Item><ApiItem data={item}/></List.Item>)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projectId: state.project.projectId
  }
}

export default connect(
  mapStateToProps
)(ApiList)