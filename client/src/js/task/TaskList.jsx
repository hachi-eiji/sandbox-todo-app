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
      delete: {
        status: '',
        message: ''
      }
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

  handleDeleteRow(error, idx) {
    if (error) {
      this.setState({delete: {status: 'warning', message: '削除に失敗しました'}});
    } else {
      this.setState((prevState, props) => {
        let newTasks = [];
        for (let i = 0; i < prevState.tasks.length; i++) {
          if (i === idx) {
            continue;
          }
          newTasks.push(prevState.tasks[i]);
        }
        return {tasks: newTasks, delete: {status: '', message: ''}};
      });
    }
  }

  render() {
    const tasks = this.state.tasks.map((task, index) => {
      return <Task key={task.id} {...task} index={index} handelDeleteTask={this.handleDeleteRow}/>
    });
    return (
      <div>
        <Alert type={this.state.delete.status} message={this.state.delete.message}/>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>id</th>
            <th>タイトル</th>
            <th>説明</th>
            <th>期日</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {tasks}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskList
