import React from 'react';
import {binds, postJSON} from '../common/util';

class Task extends React.Component {
  constructor(props) {
    super(props);
    binds(this, 'handleDeleteTask', 'handleDone');
  }

  handleDeleteTask(e) {
    e.preventDefault();
    postJSON('/tasks/' + this.props.id, {}, {method: 'DELETE'})
      .then(res => {
        this.props.handleDeleteRow(null, this.props.index, {status: 'success', message: '削除しました'});
      })
      .catch(e => {
        this.props.handleDeleteRow(e);
      });
  }

  // doneイベント
  handleDone(e) {
    e.preventDefault();
    postJSON('/tasks/' + this.props.id, {done: true}, {method: 'PUT'})
      .then(res => {
        this.props.handleDeleteRow(null, this.props.index, {status: 'success', message: '完了にしました'});
      })
      .catch(e => {
        this.props.handleDeleteRow(e);
      })
  }

  render() {
    return (
      <tr>
        <td>
          <label className="radio-inline">
            <input type="radio" name="done" onChange={this.handleDone}/>
          </label>
        </td>
        <td>{this.props.title}</td>
        <td>{this.props.due_date}</td>
        <th>
          <button className="btn btn-danger" onClick={this.handleDeleteTask}>削除</button>
        </th>
      </tr>
    );
  }
}
Task.propTypes = {
  id: React.PropTypes.number.isRequired,
  index: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  due_date: React.PropTypes.string,
  handleDeleteRow: React.PropTypes.func
};
export default Task
