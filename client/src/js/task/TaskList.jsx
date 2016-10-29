import React from 'react';
import {get} from '../common/util';
import Task from './Task';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
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

  render() {
    const tasks = this.state.tasks.map(task => {
      return <Task key={task.id} {...task}/>
    });
    return (
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
    );
  }
}

export default TaskList
