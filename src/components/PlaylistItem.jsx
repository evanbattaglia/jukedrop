import React from 'react';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import ControlActions from '../actions/ControlActions';
import {basename} from '../util'

class PlaylistItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
    this.handleClickQueue = this.handleClickQueue.bind(this);
  }

  handleClickItem(e) {
    e.preventDefault();
    ControlActions.loadSong(this.props.path);
  }

  handleClickQueue(e) {
    e.preventDefault();
    ControlActions.addSongToQueue(this.props.path);
  }

  handleClickRemove(e) {
    CurrentPlaylistActions.removeFromPlaylist(this.props.path);
  }

  render() {
    return (
      <div>
        <div className="iconRemove playlistItemRemove" onClick={this.handleClickRemove}></div>
        <a href="#" onClick={this.handleClickItem} title={this.props.path}>
          {basename(this.props.path)}
        </a>
        <a href="#" onClick={this.handleClickQueue}>(queue)</a>
      </div>
    );
  }
}

export default PlaylistItem;
