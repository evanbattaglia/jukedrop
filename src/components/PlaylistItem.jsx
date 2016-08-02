import React from 'react';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import ControlActions from '../actions/ControlActions';

class PlaylistItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickItem(e) {
    e.preventDefault();
    ControlActions.loadSong(this.props.path);
  }

  handleClickRemove(e) {
    CurrentPlaylistActions.removeFromPlaylist(this.props.path);
  }

  render() {
    return (
      <div>
        <div className="iconRemove playlistItemRemove" onClick={this.handleClickRemove}></div>
        <a href="#" onClick={this.handleClickItem} title={this.props.path}>
          {this.props.path.replace(/^.*\//, '')}
        </a>
      </div>
    );
  }
}

export default PlaylistItem;
