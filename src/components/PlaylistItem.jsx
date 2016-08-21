import React from 'react';
import {basename, preventDefaultWrap} from '../util'

class PlaylistItem extends React.Component {
  render() {
    return (
      <div>
        <div className="iconRemove playlistItemRemove" onClick={this.props.onClickRemove}></div>
        <a href="#" onClick={preventDefaultWrap(this.props.onClick)} title={this.props.path}>
          {basename(this.props.path)}
        </a>
        <a href="#" onClick={preventDefaultWrap(this.props.onEnqueue)}>
          (queue)
        </a>
      </div>
    );
  }
}

export default PlaylistItem;
