import React from 'react';
import {basename, preventDefaultWrap} from '../util'

class PlaylistItem extends React.Component {
  renderAdd() {
    if (this.props.onAdd) return (
      <a href="#" onClick={preventDefaultWrap(this.props.onAdd)}>
        (add)
      </a>
    );
  }

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
        {this.renderAdd()}
        {this.renderEnqueue()}
      </div>
    );
  }
}

export default PlaylistItem;
