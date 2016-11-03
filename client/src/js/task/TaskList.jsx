import React from 'react';
import {binds, get} from '../common/util';
import Task from './Task';
import Alert from '../component/Alert';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    binds(this, 'handleDeleteRow', 'handleShowAlert');
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

  handleDeleteRow(idx) {
    this.setState((prevState, props) => {
      let newTasks = [];
      for (let i = 0; i < prevState.tasks.length; i++) {
        if (i === idx) {
          continue;
        }
        newTasks.push(prevState.tasks[i]);
      }
      return {tasks: newTasks};
    });
  }

  handleShowAlert(status, message) {
    this.setState({status: status, message: message});
  }

  render() {
    const tasks = this.state.tasks.map((task, index) => {
      return <Task key={task.id} {...task} index={index}
                   handleDeleteRow={this.handleDeleteRow}
                   handleShowAlert={this.handleShowAlert}
      />
    });
    return (
      <div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--1-col"></div>
          <div className="mdl-cell mdl-cell--7-col"><Alert type={this.state.status} message={this.state.message}/></div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--1-col"></div>
          <div className="mdl-cell mdl-cell--7-col">
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2d task-list">
              <tbody>
              {tasks}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList
