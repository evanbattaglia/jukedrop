import React from 'react';
import DropboxFolder from './DropboxFolder.jsx';
import DropboxFile from './DropboxFile.jsx';

import {dirname} from '../util';

// TODO: rename to just FileList
class DropboxFileList extends React.Component {
  constructor(props) {
    super(props);
    this.setState(FileListStore.getState());
  }

  componentDidMount() {
    FileListStore.listen(this.setState.bind(setState));
    this.setState(FileListStore.getState());
  }

  renderFile(file) {
    if (file.type === 'folder') {
      return <DropboxFolder onClick={this.handleClickFolder} name={file.name} key={file.name} />
    } else {
      return <DropboxFile name={file.name} key={file.name} path={this.state.currentDirectory + '/' + file.name} />
    }
  }

  render() {
    // TODO: add a status/loading
    return (
      <div className="dropboxFileList">
        <div className="dropboxFileListInner">
          <h2>{ this.state.currentDirectory }</h2>
          { this.state.files.map(this.renderFile.bind(this)) }
        </div>
      </div>
    );
  }
}

export default DropboxFileList;
