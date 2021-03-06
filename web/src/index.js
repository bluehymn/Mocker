import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import ReduxThunk from 'redux-thunk'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'
import './events'

let store = createStore(
  reducers, /* preloadedState, */
  // applyMiddleware(ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
