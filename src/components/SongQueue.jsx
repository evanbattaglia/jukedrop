import React from 'react';
import AltContainer from 'alt-container';

import SongQueueStore from '../stores/SongQueueStore';

import ControlActions from '../actions/ControlActions';
import SongQueueActions from '../actions/SongQueueActions';
import ControlMetaActions from '../actions/ControlMetaActions';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';

import { preventDefaultWrap } from '../util';

import GenericPlaylist from './GenericPlaylist.jsx';

const SongQueueHeader = ({ onNext, onAddItem, items }) => (
  <div>
    <h2>
      Song queue
      {' '}
      <a href="#" onClick={preventDefaultWrap(onNext)}>&gt;&gt;</a>
    </h2>
    <a href="#" onClick={preventDefaultWrap(() => onAddItem(items))}>Add all to playlist</a>
  </div>
);

const SongQueueContainer = () => (
  <div>
    <AltContainer store={SongQueueStore} actions={() => ({
      onRemoveItem: SongQueueActions.removeFromQueue,
      onRemoveAll: SongQueueActions.removeAll,
      onClickItem: ControlActions.loadSong,
      onAddItem: CurrentPlaylistActions.addToPlaylist,
      onNext: ControlMetaActions.next,
    })}>
      <SongQueueHeader />
      <GenericPlaylist removeAllTitle="Clear" />
    </AltContainer>
  </div>
);

export default SongQueueContainer;
