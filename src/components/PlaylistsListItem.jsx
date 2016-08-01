import React from 'react';
import PlaylistsActions from '../actions/PlaylistsActions';

class PlaylistsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    PlaylistsActions.choosePlaylist(this.props.name);
  }

  handleClickRemove(e) {
    PlaylistsActions.deletePlaylist(this.props.name);
  }

  render() {
    return (
      <div>
        <div className="iconRemove playlistItemRemove" onClick={this.handleClickRemove}></div>
        <a href="#" onClick={this.handleClick}>
          {this.props.name}
        </a>
      </div>
    );
  }
}

export default PlaylistsListItem;
