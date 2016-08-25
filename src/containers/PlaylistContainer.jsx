import React from 'react';
import AltContainer from 'alt-container';

import { PlaylistStore } from '../stores';
import { ControlActions, CurrentPlaylistActions, SongQueueActions } from '../actions';

import Playlist from '../components/Playlist.jsx';

const PlaylistContainer = () => (
  <AltContainer store={PlaylistStore} actions={() => ({
    onEnqueueItem: SongQueueActions.addToQueue,
    onRemoveItem: CurrentPlaylistActions.removeFromPlaylist,
    onRemoveAll: CurrentPlaylistActions.removeAll,
    onClickItem: ControlActions.loadSong,
  })}>
    <Playlist />
  </AltContainer>
);

export default PlaylistContainer;
