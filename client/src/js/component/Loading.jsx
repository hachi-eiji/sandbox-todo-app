import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <span className="mdl-spinner mdl-js-spinner is-active"></span>
        <span className="loading__text">loading...</span>
      </div>
    );
  }
}

export default Loading;
