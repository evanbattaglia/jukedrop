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
      onRemoveItem: (event) => {
        if (prompt(`Do you really wish to delete this item from the playlist? Type y to confirm`) == 'y') {
          CurrentPlaylistActions.removeFromPlaylist(event);
        }
      },
      onRemoveAll: () => {
        if (prompt(`Do you really wish to delete ALL items from the playlist? Type y to confirm`) == 'y') {
          CurrentPlaylistActions.removeAll(event);
        }
      },
      onClickItem: ControlActions.loadSong,
    })}
  />
);

export default PlaylistContainer;
