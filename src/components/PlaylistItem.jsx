import React from 'react';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import AudioActions from '../actions/AudioActions';

class PlaylistItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickPlay(e) {
    e.preventDefault();
    AudioActions.play(this.props.path);
  }

  handleClickRemove(e) {
    CurrentPlaylistActions.removeFromPlaylist(this.props.path);
  }

  render() {
    return (
      <div>
        <div className="iconRemove playlistItemRemove" onClick={this.handleClickRemove}></div>
        <a href="#" onClick={this.handleClickPlay} title={this.props.path}>
          {this.props.path.replace(/^.*\//, '')}
        </a>
      </div>
    );
  }
}

export default PlaylistItem;
