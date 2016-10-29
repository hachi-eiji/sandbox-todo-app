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
  handleLogin(e) {
    e.preventDefault();
    const {loginId, password} = this.state;
    if (!loginId || !password) {
      return;
    }
    postJSON('/login', {loginId: loginId, password: password})
      .then(res => {
        console.log('あるよ')
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
        <form onSubmit={this.handleLogin} className="form-horizontal">
          <div className="form-group">
            <label htmlFor="loginId" className="col-sm-2 control-label">ログインID</label>
            <div className="col-sm-10">
              <input type="text" name="loginId" value={this.state.loginId}
                     onChange={this.handleLoginId}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-2 control-label">パスワード</label>
            <div className="col-sm-10">
              <input type="password" name="password"
                     value={this.state.password}
                     onChange={this.handlePassword}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">ログイン</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById('container')
);
