import React from 'react';
import AltContainer from 'alt-container';

import FileListStore from '../stores/FileListStore';

import FileListActions from '../actions/FileListActions';
import ControlActions from '../actions/ControlActions';
import SongQueueActions from '../actions/SongQueueActions';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';

import FileList from '../components/FileList.jsx';

export default class FileListContainer extends React.Component {
  componentDidMount() {
    FileListActions.init();
  }

  actions() {
    return {
      onChangeFolder: FileListActions.changeFolder,
      onEnqueueFile: SongQueueActions.addToQueue,
      onClickFile: ControlActions.loadSong,
      onAddFile: CurrentPlaylistActions.addToPlaylist,
    };
  }

  render() {
    return (
      <AltContainer store={FileListStore} actions={this.actions} >
        <FileList />
      </AltContainer>
    );
  }
}
