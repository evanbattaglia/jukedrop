import React from 'react';
import PlaylistItem from './PlaylistItem.jsx';
import { preventDefaultWrap } from '../util';

class GenericPlaylist extends React.Component {
  render() {
    return (
      <div>
        <a href="#" onClick={preventDefaultWrap(this.props.onRemoveAll)}>{this.props.removeAllTitle}</a>
        {
          this.props.items.map(path =>
            <PlaylistItem
              key={path}
              path={path}
              onRemove={() => this.props.onRemoveItem(path)}
              onEnqueue={this.props.onEnqueueItem ? () => this.props.onEnqueueItem(path) : null}
              onAdd={this.props.onAddItem ? () => this.props.onAddItem(path) : null}
              onClick={() => this.props.onClickItem(path)}
            />
          )
        }
      </div>
    );
  }
}

export default GenericPlaylist;
