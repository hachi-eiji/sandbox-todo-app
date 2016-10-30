import React from 'react';
import {binds, postJSON} from '../common/util';

class Task extends React.Component {
  constructor(props) {
    super(props);
    binds(this, 'handleDeleteTask');
  }

  handleDeleteTask(e) {
    e.preventDefault();
    postJSON('/tasks/' + this.props.id, {}, {method: 'DELETE'})
      .then(res => {
        this.props.handelDeleteTask(null, this.props.index);
      })
      .catch(e => {
        this.props.handelDeleteTask(e);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.description}</td>
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
  handelDeleteTask: React.PropTypes.func
};
export default Task
