import React from 'react';
import AltContainer from 'alt-container';

import PlaylistStore from '../stores/PlaylistStore';

import SongQueueActions from '../actions/SongQueueActions';
import ControlActions from '../actions/ControlActions';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';

import GenericPlaylist from './GenericPlaylist.jsx';

import { preventDefaultWrap } from '../util';

class PlaylistHeader extends React.Component {
  render() {
    return (
      <div>
        <h2>Playlist: {this.props.playlistName || '[No playlist selected]' }</h2>
        <a href="#" onClick={preventDefaultWrap(() => this.props.onEnqueueItem(this.props.items))}>
          enqueue all
        </a>
      </div>
   );
  }
}

class Playlist extends React.Component {
  actions() {
    return {
      onEnqueueItem: SongQueueActions.addToQueue,
      onRemoveItem: CurrentPlaylistActions.removeFromPlaylist,
      onRemoveAll: CurrentPlaylistActions.removeAll,
      onClickItem: ControlActions.loadSong,
    };
  }

  render() {
    return (
      <div className="playlist">
        <AltContainer store={PlaylistStore} actions={this.actions}>
          <PlaylistHeader />
          <GenericPlaylist removeAllTitle="Remove All" />
        </AltContainer>
      </div>
    );
  }
}

export default Playlist;
