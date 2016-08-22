import React from 'react';
import AltContainer from 'alt-container';

import PlaylistStore from '../stores/PlaylistStore';

import SongQueueActions from '../actions/SongQueueActions';
import ControlActions from '../actions/ControlActions';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';

import GenericPlaylist from './GenericPlaylist.jsx';

class PlaylistTitle extends React.Component {
  render() {
    return <h2>Playlist: {this.props.playlistName || '[No playlist selected]' }</h2>;
  }
}

class Playlist extends React.Component {
  actions() {
    return {
      onEnqueueItems: SongQueueActions.addToQueue,
      onRemoveItem: CurrentPlaylistActions.removeFromPlaylist,
      onClickItem: ControlActions.loadSong,
    };
  }

  render() {
    return (
      <div className="playlist">
        <AltContainer store={PlaylistStore} actions={this.actions}>
          <PlaylistTitle />
          <GenericPlaylist />
        </AltContainer>
      </div>
    );
  }
}

export default Playlist;
