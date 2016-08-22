import React from 'react';
import AltContainer from 'alt-container';

import SongQueueStore from '../stores/SongQueueStore';

import ControlActions from '../actions/ControlActions';
import SongQueueActions from '../actions/SongQueueActions';
import ControlMetaActions from '../actions/ControlMetaActions';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';

import { preventDefaultWrap } from '../util';

import GenericPlaylist from './GenericPlaylist.jsx';

class SongQueueHeader extends React.Component {
  render() {
    return (
      <div>
        <h2>
          Song queue
          {' '}
          <a href="#" onClick={preventDefaultWrap(this.props.onNext)}>&gt;&gt;</a>
        </h2>
        <a href="#" onClick={preventDefaultWrap(() => this.props.onAddItem(this.props.items))}>Add all to playlist</a>
      </div>
    );
  }
}

export default class SongQueueContainer extends React.Component {
  actions() {
    return {
      onRemoveItem: SongQueueActions.removeFromQueue,
      onRemoveAll: SongQueueActions.removeAll,
      onClickItem: ControlActions.loadSong,
      onAddItem: CurrentPlaylistActions.addToPlaylist,
      onNext: ControlMetaActions.next,
    };
  }

  render() {
    return (
      <div>
        <AltContainer store={SongQueueStore} actions={this.actions}>
          <SongQueueHeader />
          <GenericPlaylist removeAllTitle="Clear" />
        </AltContainer>
      </div>
    );
  }
}
