import React from 'react';
import AltContainer from 'alt-container';

import SongQueueStore from '../stores/SongQueueStore';

import ControlActions from '../actions/ControlActions';
import SongQueueActions from '../actions/CurrentPlaylistActions';

import Playlist from '../components/Playlist.jsx';

export default class SongQueueContainer extends React.Component {
  actions() {
    return {
      onRemoveItem: SongQueueActions.removeFromPlaylist,
      onClickItem: ControlActions.loadSong,
    };
  }

  render() {
    return (
      <AltContainer store={SongQueueStore} actions={this.actions}>
        <Playlist />
      </AltContainer>
    );
  }
}
