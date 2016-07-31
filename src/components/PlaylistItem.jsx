import React from 'react';

class PlaylistItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickPlay(e) {
    e.preventDefault();
    this.props.onPlay(this.props.path);
  }

  handleClickRemove(e) {
    this.props.onRemove(this.props.path);
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
