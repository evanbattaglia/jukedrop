import React from 'react';

import { preventDefaultWrap, callbackWithArg } from '../util';

import GenericPlaylist from './GenericPlaylist.jsx';

const SongQueue = props => (
  <div>
    <div>
      <h2>
        Song queue
        {' '}
        <a href="#" onClick={preventDefaultWrap(props.onNext)}>&gt;&gt;</a>
      </h2>
    </div>
      <a href="#" onClick={callbackWithArg(props.onAddItem, props.items)}>Add all to playlist</a>
    <GenericPlaylist {...props} removeAllTitle="Clear" />
  </div>
);

SongQueue.propTypes = {
  ...GenericPlaylist.propTypes,
  onNext: React.PropTypes.func.isRequired,
  onAddItem: React.PropTypes.func.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default SongQueue;
