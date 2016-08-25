import React from 'react';
import AltContainer from 'alt-container';

import { PlaylistStore } from '../stores';
import { ControlActions, CurrentPlaylistActions, SongQueueActions } from '../actions';

import Playlist from '../components/Playlist.jsx';

const PlaylistContainer = () => (
  <AltContainer
    component={Playlist}
    store={PlaylistStore}
    actions={() => ({
      onEnqueueItem: SongQueueActions.addToQueue,
      onRemoveItem: CurrentPlaylistActions.removeFromPlaylist,
      onRemoveAll: CurrentPlaylistActions.removeAll,
      onClickItem: ControlActions.loadSong,
    })}
  />
);

export default PlaylistContainer;
