import React from 'react';
import DropboxBaseFile from './DropboxBaseFile.jsx';

class DropboxFolder extends DropboxBaseFile {
  render() {
    return (
      <div className="dropboxFolder">
        <div className="iconFolder" />
        <a href="" className="dropboxName" onClick={this.handleClick}>{this.props.name}</a>
      </div>
    );
  }
}

export default DropboxFolder;
