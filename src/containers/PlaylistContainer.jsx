import React from 'react';
import AltContainer from 'alt-container';
import Playlist from '../components/Playlist.jsx';

import PlaylistStore from '../stores/PlaylistStore';
import ControlActions from '../actions/ControlActions';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';

class PlaylistContainer extends React.Component {
  actions() {
    return {
      onEnqueueItems: ControlActions.addToQueue,
      onRemoveItem: CurrentPlaylistActions.removeItem,
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

export default PlaylistContainer;
