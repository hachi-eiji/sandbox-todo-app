import React from 'react';

class Alert extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.message) {
      const css = `alert__${this.props.type}`;
      return (
        <div className={css}>{this.props.message}</div>
      )
    }
    return (<div></div>);
  }
}

Alert.propTypes = {
  type: React.PropTypes.string,
  message: React.PropTypes.string
};

export default Alert;
