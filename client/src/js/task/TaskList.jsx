import React from 'react';
import {binds} from '../common/util';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    binds(this, 'handleClick');
    this.state = {
      counter: 0
    }
  }

  handleClick() {
    this.setState({counter: this.state.counter + 1});
  }

  render() {
    return (
      <div>
        click count {this.state.counter}<br/>
        <button type="button" onClick={this.handleClick}>test</button>
      </div>
    )
  }
}

export default TaskList
