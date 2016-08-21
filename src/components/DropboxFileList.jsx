import React from 'react';
import DropboxFolder from './DropboxFolder.jsx';
import DropboxFile from './DropboxFile.jsx';
import FileListStore from '../stores/FileListStore'
//import FileListActions from '../actions/FileListActions'

import {dirname} from '../util';

// TODO: rename to just FileList
class DropboxFileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = FileListStore.getState();
  }

  componentDidMount() {
    console.log("did mount. setting state", FileListStore.getState());
    FileListStore.listen(this.stateChanged.bind(this));
                         //this.setState.bind(this));
    this.setState(FileListStore.getState());
  }

  stateChanged(state) {
    console.log('setting the state woot');
    console.log("state is", state);

    this.setState(state);
    console.log("state is", state);
  }

  renderFile(file) {
    if (file.type === 'folder') {
      return <DropboxFolder onClick={FileListActions.changeFolder} name={file.name} key={file.name} />
    } else {
      return <DropboxFile name={file.name} key={file.name} path={this.state.currentDirectory + '/' + file.name} />
    }
  }

  render() {
    throw new Error();

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
