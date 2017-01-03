import React from 'react';
import ReactDOM from 'react-dom';
import {binds_starts_with, postJSON} from '../common/util';

class Task extends React.Component {
  constructor(props) {
    super(props);
    binds_starts_with(this, 'handle');
    this.state = {
      editTitle: false,
      title: this.props.title,
      titleUpdated: false,
      editDueDate: false,
      dueDate: this.props.due_date,
      dueDateUpdated: false
    };
  }

  handleDeleteTask(e) {
    e.preventDefault();
    postJSON('/tasks/' + this.props.id, {}, {method: 'DELETE'})
      .then(res => {
        this.props.handleDeleteRow(this.props.index);
        this.props.handleShowAlert({status: 'success', message: '削除しました'});
      })
      .catch(e => {
        this.props.handleShowAlert({status: 'warning', message: 'エラーが発生しました ' + e.message });
      });
  }

  // doneイベント
  handleDone(e) {
    postJSON('/tasks/' + this.props.id, {done: true}, {method: 'PUT'})
      .then(res => {
        this.props.handleDeleteRow(this.props.index);
        this.props.handleShowAlert({status: 'success', message: '完了しました'});
      })
      .catch(e => {
        this.props.handleShowAlert({status: 'warning', message: 'エラーが発生しました ' + e.message });
      })
  }

  handleStartEdit() {
    this.setState(() => {
      return {editTitle: true};
    }, () => {
      ReactDOM.findDOMNode(this.refs.editTitle).focus();
    });
  }

  handleEditTitle(e) {
    this.setState({title: e.target.value});
  }

  handleBlurTitle(e) {
    postJSON(`/tasks/${this.props.id}`, {title: e.target.value}, {method: 'PUT'})
      .then(res => {
        this.setState({editTitle: false, titleUpdated: true});
      })
      .catch(e => {
        this.props.handleShowAlert({status: 'warning', message: 'エラーが発生しました ' + e.message });
      });
  }

  handleStartEditDueDate() {
    this.setState(() => {
      return {editDueDate: true};
    }, () => {
      ReactDOM.findDOMNode(this.refs.editDueDate).focus();
    });
  }

  handleEditDueDate(e) {
    this.setState({dueDate: e.target.value});
  }

  handleBlurDueDate(e) {
    postJSON(`/tasks/${this.props.id}`, {due_date: e.target.value}, {method: 'PUT'})
      .then(res => {
        this.setState({editDueDate: false, dueDateUpdated: true});
      })
      .catch(e => {
        this.props.handleShowAlert({status: 'warning', message: 'エラーが発生しました ' + e.message });
      });
  }

  render() {
    return (
      <tr>
        <td>
          <label className="radio-inline">
            <input type="radio" name="done" onChange={this.handleDone}/>
          </label>
        </td>
        <td className="mdl-data-table__cell--non-numeric task-list__title">
          { this.state.editTitle ? (
            <input type="text" value={this.state.title}
                   onChange={this.handleEditTitle}
                   onBlur={this.handleBlurTitle}
                   ref="editTitle"
            />
          ) : (
            <span onClick={this.handleStartEdit}>
              {this.state.title}
              {this.state.titleUpdated && <i className="glyphicon glyphicon-ok"/>}
            </span>
          )}
        </td>
        <td className="task-list__due-date">
          {
            this.state.editDueDate ? (
              <input type="date" value={this.state.dueDate} onChange={this.handleEditDueDate}
                     onBlur={this.handleBlurDueDate} ref="editDueDate"/>
            ) : (
              <span onClick={this.handleStartEditDueDate}>
                {this.state.dueDate}
                {this.state.dueDateUpdated && <i className="glyphicon glyphicon-ok"/>}
              </span>
            )
          }
        </td>
        <td>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                  onClick={this.handleDeleteTask}>削除
          </button>
        </td>
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
  handleDeleteRow: React.PropTypes.func,
  handleShowAlert: React.PropTypes.func
};
export default Task
