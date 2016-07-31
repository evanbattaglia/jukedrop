import React from 'react';

class DropboxBaseFile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.name);
  }
}

export default DropboxBaseFile;
