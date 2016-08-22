import React from 'react';
import {basename, preventDefaultWrap} from '../util'

class PlaylistItem extends React.Component {
  renderEnqueue() {
    if (this.props.onEnqueue) return (
      <a href="#" onClick={preventDefaultWrap(this.props.onEnqueue)}>
        (queue)
      </a>
    );
  }

  render() {
    return (
      <div>
        <div className="iconRemove playlistItemRemove" onClick={this.props.onRemove}></div>
        <a href="#" onClick={preventDefaultWrap(this.props.onClick)} title={this.props.path}>
          {basename(this.props.path)}
        </a>
        {this.renderEnqueue()}
      </div>
    );
  }
}

export default PlaylistItem;
