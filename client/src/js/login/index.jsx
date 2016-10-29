import React from 'react';
import ReactDOM from 'react-dom';
import {binds, postJSON} from '../common/util';
import Alert from '../component/Alert';

class Index extends React.Component {
  constructor() {
    super();
    binds(this, 'handleLogin', 'handleLoginId', 'handlePassword');
    this.state = {
      loginId: '',
      password: '',
      message: ''
    };
  }

  // ログイン処理をする
  handleLogin() {
    postJSON('/login', {loginId: this.state.loginId, password: this.state.password})
      .then(res => {
      })
      .catch(e => {
        this.setState({message: e.body.message});
      });
  }

  handleLoginId(e) {
    this.setState({loginId: e.target.value});
  }

  handlePassword(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return (
      <div>
        <Alert type="warning" message={this.state.message}/>
        <label htmlFor="loginId">loginId</label>
        <input type="text" name="loginId" value={this.state.loginId}
               onChange={this.handleLoginId}/>
        <br/>
        <label htmlFor="password">password</label>
        <input type="password" name="password"
               value={this.state.password}
               onChange={this.handlePassword}/>
        <br/>
        <button type="button" onClick={this.handleLogin} className="btn">login</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById('container')
);
