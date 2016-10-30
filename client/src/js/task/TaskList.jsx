import React from 'react';
import {binds, get} from '../common/util';
import Task from './Task';
import Alert from '../component/Alert';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    binds(this, 'handleDeleteRow');
    this.state = {
      tasks: [],
      status: '',
      message: ''
    }
  }

  componentDidMount() {
    get('/tasks')
      .then(res => {
        this.setState({tasks: res.data});
      })
      .catch(e => {
        console.log(e)
      })
  }

  handleDeleteRow(error, idx, notification) {
    if (error) {
      this.setState({status: 'warning', message: 'エラーが発生しました'});
    } else {
      let _notification = {status: '', message: ''}
      Object.assign(_notification, notification);
      this.setState((prevState, props) => {
        let newTasks = [];
        for (let i = 0; i < prevState.tasks.length; i++) {
          if (i === idx) {
            continue;
          }
          newTasks.push(prevState.tasks[i]);
        }
        return {tasks: newTasks, status: _notification.status, message: _notification.message};
      });
    }
  }

  render() {
    const tasks = this.state.tasks.map((task, index) => {
      return <Task key={task.id} {...task} index={index} handleDeleteRow={this.handleDeleteRow}/>
    });
    return (
      <div>
        <Alert type={this.state.status} message={this.state.message}/>
        <table className="table table-hover">
          <tbody>
          {tasks}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskList
