import React from 'react';
import AltContainer from 'alt-container';

import SongQueueStore from '../stores/SongQueueStore';

import ControlActions from '../actions/ControlActions';
import SongQueueActions from '../actions/SongQueueActions';
import ControlMetaActions from '../actions/ControlMetaActions';

import { preventDefaultWrap } from '../util';

import GenericPlaylist from './GenericPlaylist.jsx';

export default class SongQueueContainer extends React.Component {
  actions() {
    return {
      onRemoveItem: SongQueueActions.removeFromQueue,
      onClickItem: ControlActions.loadSong,
    };
  }

  render() {
    return (
      <div>
        <h2>
          Song queue
          {' '}
          <a href="#" onClick={preventDefaultWrap(ControlMetaActions.next)}>&gt;&gt;</a>
        </h2>
        <AltContainer store={SongQueueStore} actions={this.actions}>
          <GenericPlaylist />
        </AltContainer>
      </div>
    );
  }
}
