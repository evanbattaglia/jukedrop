import React from 'react';
import AltContainer from 'alt-container';
import { SongQueueStore } from '../stores';
import { ControlActions, SongQueueActions, ControlMetaActions, CurrentPlaylistActions }
         from '../actions';

import SongQueue from '../components/SongQueue.jsx'

const SongQueueContainer = () => (
  <AltContainer store={SongQueueStore} actions={() => ({
    onRemoveItem: SongQueueActions.removeFromQueue,
    onRemoveAll: SongQueueActions.removeAll,
    onClickItem: ControlActions.loadSong,
    onAddItem: CurrentPlaylistActions.addToPlaylist,
    onNext: ControlMetaActions.next,
  })}>
    <SongQueue />
  </AltContainer>
);

export default SongQueueContainer;

