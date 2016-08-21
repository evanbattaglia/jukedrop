import React from 'react';
import AltContainer from 'alt-container';

import PlaylistStore from '../stores/PlaylistStore';

import ControlActions from '../actions/ControlActions';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import SongQueueActions from '../actions/SongQueueActions';

import Playlist from '../components/Playlist.jsx';

export default class PlaylistContainer extends React.Component {
  actions() {
    return {
      onEnqueueItems: SongQueueActions.addToQueue,
      onRemoveItem: CurrentPlaylistActions.removeFromPlaylist,
      onClickItem: ControlActions.loadSong,
    };
  }

  render() {
    return (
      <AltContainer store={PlaylistStore} actions={this.actions}>
        <Playlist />
      </AltContainer>
    );
  }
}
