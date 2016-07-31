import React from 'react';
import DropboxFileList from './DropboxFileList.jsx';
import DropboxAudio from './DropboxAudio.jsx';
import Playlist from './Playlist.jsx';

class JukedropApp extends React.Component {
  constructor(props) {
    super(props);
    this.dropbox = new Dropbox({ accessToken: this.props.config.accessToken }); // TOOD: should this.dropbox this be in state? or even props?
    this.handleChooseFile = this.handleChooseFile.bind(this);
    this.handleAddFile = this.handleAddFile.bind(this);
  }

  handleChooseFile(path) {
    this.refs.dropboxAudio.play(path);
  }

  // handle add file to playlist
  handleAddFile(path) {
  // TODO need to first check if in list. maybe further down in playlist, i think that should probably be responsible...
    this.refs.playlist.addPath(path);
  }

  render() {
    return (
      <div className="jukedropApp">
        <div className="jukedropAppTop">
          <DropboxFileList onChooseFile={this.handleChooseFile} onAddFile={this.handleAddFile} homeDirectory={this.props.config.homeDirectory} dropbox={this.dropbox} />
          <div className="jukedropAppRight">
            <DropboxAudio ref="dropboxAudio" dropbox={this.dropbox} />
            <Playlist ref="playlist" onChooseFile={this.handleChooseFile} />
          </div>
        </div>
      </div>
    );
  }
}

export default JukedropApp;
