import React from 'react';
import DropboxFileList from './DropboxFileList.jsx';
import DropboxAudio from './DropboxAudio.jsx';
import PlaylistContainer from '../containers/PlaylistContainer.jsx';
import PlaylistsList from './PlaylistsList.jsx';
import SongQueue from './SongQueue.jsx';

class JukedropApp extends React.Component {
  constructor(props) {
    super(props);
    this.dropbox = new Dropbox({ accessToken: this.props.config.accessToken }); // TOOD: should this.dropbox this be in state? or even props?
  }

  render() {
    return (
      <div className="jukedropApp">
        <div className="jukedropAppTop">
          <DropboxFileList homeDirectory={this.props.config.homeDirectory} dropbox={this.dropbox} />
          <div className="jukedropAppRight">
            <img src="static/logo.png" />
            <DropboxAudio ref="dropboxAudio" dropbox={this.dropbox} />
            <SongQueue />
            <PlaylistsList />
            <PlaylistContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default JukedropApp;
