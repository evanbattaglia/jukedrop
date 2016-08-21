import React from 'react';
import Folder from './Folder.jsx';
import File from './File.jsx';
import FileListActions from '../actions/FileListActions';

import {joinPaths} from '../util';

class FileList extends React.Component {
  renderFile(file) {
    if (file.type === 'folder') {
      return <Folder onClick={this.props.onChangeFolder} name={file.name} key={file.name} />
    } else {
      const path = joinPaths(this.props.currentDirectory, file.name);
      return (
        <File name={file.name}
          key={file.name}
          onClick={() => this.props.onClickFile(path)}
          onClickEnqueue={() => this.props.onEnqueueFile(path)}
          onEnqueue={() => this.props.onEnqueueFile(path)}
          />
      );
    }
  }

  render() {
    // TODO: add a status/loading
    return (
      <div className="dropboxFileList">
        <div className="dropboxFileListInner">
          <h2>{ this.props.currentDirectory }</h2>
          { this.props.files.map(this.renderFile.bind(this)) }
        </div>
      </div>
    );
  }
}

export default FileList;
