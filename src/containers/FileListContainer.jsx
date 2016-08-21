import React from 'react';
import AltContainer from 'alt-container';

import FileListStore from '../stores/FileListStore';

import FileListActions from '../actions/FileListActions';
import ControlActions from '../actions/FileListActions';
import CurrentPlaylistActions from '../actions/FileListActions';

import FileList from '../components/FileList.jsx';

export default class FileListContainer extends React.Component {
  componentDidMount() {
    FileListActions.init();
  }

  actions() {
    return {
      onChangeFolder: FileListActions.changeFolder,
      onEnqueueFile: ControlActions.addToQueue,
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
