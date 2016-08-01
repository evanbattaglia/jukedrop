import React from 'react';
import DropboxBaseFile from './DropboxBaseFile.jsx';

class DropboxFile extends DropboxBaseFile {
  constructor(props) {
    super(props);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }
  handleClickAdd(e) {
    e.preventDefault();
    this.props.onClickAdd(this.props.name);
  }
  render() {
    return (
      <div className="dropboxFile">
        <div className={ this.props.name.match(/\.mp3$/) ? 'iconMusic' : 'iconFile' } />
        <a href="#" className="dropboxName" onClick={this.handleClick}>{this.props.name}</a>
        <a href="#" className="dropboxFileAdd" onClick={this.handleClickAdd}>(add)</a>
      </div>
    );
  }
}

export default DropboxFile;
