import React from 'react';
import AltContainer from 'alt-container';

import PlaylistStore from '../stores/PlaylistStore';

import SongQueueActions from '../actions/SongQueueActions';
import ControlActions from '../actions/ControlActions';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';

import GenericPlaylist from './GenericPlaylist.jsx';

import { preventDefaultWrap } from '../util';

const PlaylistHeader = ({ playlistName, items, onEnqueueItem }) => (
  <div>
    <h2>Playlist: {playlistName || '[No playlist selected]' }</h2>
    <a href="#" onClick={preventDefaultWrap(() => onEnqueueItem(items))}>
      enqueue all
    </a>
  </div>
);

const Playlist = () => (
  <div className="playlist">
    <AltContainer store={PlaylistStore} actions={() => ({
      onEnqueueItem: SongQueueActions.addToQueue,
      onRemoveItem: CurrentPlaylistActions.removeFromPlaylist,
      onRemoveAll: CurrentPlaylistActions.removeAll,
      onClickItem: ControlActions.loadSong,
    })}>
      <PlaylistHeader />
      <GenericPlaylist removeAllTitle="Remove All" />
    </AltContainer>
  </div>
)

export default Playlist;
