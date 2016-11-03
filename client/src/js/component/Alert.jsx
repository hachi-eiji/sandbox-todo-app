import React from 'react';

class Alert extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.children) {
      const css = `alert alert__${this.props.type}`;
      return (
        <div className={css}>{this.props.children}</div>
      )
    }
    return (<div></div>);
  }
}

Alert.propTypes = {
  type: React.PropTypes.string
};

export default Alert;
