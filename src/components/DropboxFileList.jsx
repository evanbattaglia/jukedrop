import React from 'react';
import DropboxFolder from './DropboxFolder.jsx';
import DropboxFile from './DropboxFile.jsx';
import PlaylistActions from '../actions/PlaylistActions';
import AudioActions from '../actions/AudioActions';


// TODO: reqd props dropbox
// TODO: make a store for this probably
class DropboxFileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: []};
    this.handleClickFolder = this.handleClickFolder.bind(this);
    this.handleClickFile = this.handleClickFile.bind(this);
    this.handleClickAddFile = this.handleClickAddFile.bind(this);
    this.renderFile = this.renderFile.bind(this);
  }

  handleClickFolder(name) {
    if (name == '..') {
      this.loadDirectoryFromDropbox(this.state.currentDirectory.replace(/\/[^\/]*$/, ''));
    } else {
      this.loadDirectoryFromDropbox(this.state.currentDirectory + '/' + name);
    }
  }

  handleClickAddFile(filename) {
    const path = this.state.currentDirectory + '/' + filename;
    PlaylistActions.addToPlaylist(path);
  }

  handleClickFile(filename) {
    const path = this.state.currentDirectory + '/' + filename;
    AudioActions.play(path);
  }

  loadDirectoryFromDropbox(path) {
    if (path === '/') path == '';

    this.props.dropbox.filesListFolder({ path })
    .then(response => {
      const files = response.entries.map(entry => { return {
        name: entry.name,
        type: entry['.tag'],
      }});
      if (path) files.unshift({ name: '..', type: 'folder' });

      this.setState({ files, currentDirectory: path });
    })
    .catch(error => {
      console.error(error); // TODO
    });
  }

  componentDidMount() {
    this.loadDirectoryFromDropbox(this.props.homeDirectory || '');
  }

  renderFile(file) {
    if (file.type === 'folder') {
      return <DropboxFolder onClick={this.handleClickFolder} name={file.name} key={file.name} />
    } else {
      return <DropboxFile onClick={this.handleClickFile} onClickAdd={this.handleClickAddFile} name={file.name} key={file.name} />
    }
  }

  render() {
    // TODO: add a status
    return (
      <div className="dropboxFileList">
        <div className="dropboxFileListInner">
          <h2>{ this.state.currentDirectory }</h2>
          { this.state.files.map(this.renderFile) }
        </div>
      </div>
    );
  }
}

export default DropboxFileList;
