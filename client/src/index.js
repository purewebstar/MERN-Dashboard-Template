import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store/index';
import './assets/css/sitestyle.css';
import {BrowserRouter as Router} from 'react-router-dom';

const InitialApp = () =>{
  return(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  )
}

ReactDOM.render(
  <InitialApp />,
  document.getElementById('root')
);

