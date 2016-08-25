import React from 'react';
import AltContainer from 'alt-container';

import PlaylistStore from '../stores/PlaylistStore';

import SongQueueActions from '../actions/SongQueueActions';
import ControlActions from '../actions/ControlActions';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';

import GenericPlaylist from './GenericPlaylist.jsx';

import { callbackWithArg } from '../util';

const Playlist = props => (
  <div className="playlist">
    <h2>Playlist: {props.playlistName || '[No playlist selected]' }</h2>
    {
      (props.items && props.items.length) ? (
        <a href="#" onClick={callbackWithArg(props.onEnqueueItem, props.items)}>
          enqueue all
        </a>
      ) : ''
    }
    <GenericPlaylist {...props} removeAllTitle="Remove All" />
  </div>
);
Playlist.propTypes = {
  ...GenericPlaylist.propTypes,
  playlistName: React.PropTypes.string,
  onEnqueueItem: React.PropTypes.func.isRequired,
};

export default Playlist;
