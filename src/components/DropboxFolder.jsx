import React from 'react';

class DropboxFolder extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.name);
  }

  render() {
    return (
      <div className="dropboxFolder">
        <div className="iconFolder" />
        <a href="#" className="dropboxName" onClick={this.handleClick}>{this.props.name}</a>
      </div>
    );
  }
}

export default DropboxFolder;
