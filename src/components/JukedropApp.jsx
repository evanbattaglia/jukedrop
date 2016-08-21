import React from 'react';

import FileListContainer from '../containers/FileListContainer.jsx';
import PlaylistContainer from '../containers/PlaylistContainer.jsx';

import PlaylistsList from './PlaylistsList.jsx';
import DropboxAudio from './DropboxAudio.jsx';
import SongQueue from './SongQueue.jsx';

class JukedropApp extends React.Component {
  render() {
    return (
      <div className="jukedropApp">
        <div className="jukedropAppTop">
          <FileListContainer />
          <div className="jukedropAppRight">
            <img src="static/logo.png" />
            <DropboxAudio ref="dropboxAudio" />
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
