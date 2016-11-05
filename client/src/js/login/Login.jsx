import React from 'react';
import {binds, postJSON} from '../common/util';
import Alert from '../component/Alert';
import {browserHistory} from 'react-router';

class Login extends React.Component {
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
  handleLogin(e) {
    e.preventDefault();
    const {loginId, password} = this.state;
    if (!loginId || !password) {
      return;
    }
    postJSON('/login', {loginId: loginId, password: password})
      .then(res => {
        browserHistory.push('/tasks');
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
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col"></div>
          <div className="mdl-cell mdl-cell--4-col"><Alert type="error">{this.state.message}</Alert></div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col"></div>
          <div className="mdl-cell mdl-cell--4-col">
            <form onSubmit={this.handleLogin} className="form-horizontal">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <div className="col-sm-10">
                  <input type="text" name="loginId" value={this.state.loginId} className="mdl-textfield__input"
                         onChange={this.handleLoginId}/>
                  <label htmlFor="loginId" className="mdl-textfield__label">ログインID</label>
                </div>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input type="password" name="password" className="mdl-textfield__input"
                       value={this.state.password}
                       onChange={this.handlePassword}/>
                <label htmlFor="password" className="mdl-textfield__label">パスワード</label>
              </div>
              <div>
                <button type="submit" className="mdl-button mdl-js-button mdl-button--raised">ログイン</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
