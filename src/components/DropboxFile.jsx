import React from 'react';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import ControlActions from '../actions/ControlActions';

class DropboxFile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickQueue = this.handleClickQueue.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    ControlActions.loadSong(this.props.path);
  }

  handleClickAdd(e) {
    e.preventDefault();
    CurrentPlaylistActions.addToPlaylist(this.props.path);
  }

  handleClickQueue(e) {
    e.preventDefault();
    ControlActions.addSongToQueue(this.props.path);
  }

  render() {
    return (
      <div className="dropboxFile">
        <div className={ this.props.name.match(/\.mp3$/) ? 'iconMusic' : 'iconFile' } />
        <a href="#" className="dropboxName" onClick={this.handleClick}>{this.props.name}</a>
        <a href="#" className="dropboxFileAdd" onClick={this.handleClickAdd}>(add)</a>
        <a href="#" className="dropboxFileQueue" onClick={this.handleClickQueue}>(queue)</a>
      </div>
    );
  }
}

export default DropboxFile;
