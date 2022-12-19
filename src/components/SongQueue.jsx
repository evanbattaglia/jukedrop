import React from 'react';
import PropTypes from 'prop-types';

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
  onNext: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SongQueue;
