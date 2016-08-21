import React from 'react';
import PlaylistItem from './PlaylistItem.jsx';

class Playlist extends React.Component {
  render() {
    return (
      <div className="playlist">
        <h2>Playlist: {this.props.playlistName || '[No playlist selected]' }</h2>
        <a href="#" onClick={() => this.props.onEnqueueItems(this.props.items)}>(enqueue all)</a>
        {
          this.props.items.map(path =>
            <PlaylistItem
              key={path}
              path={path}
              onRemove={() => this.props.onRemoveItem(path)}
              onEnqueue={() => this.props.onEnqueueItems([path])}
              onClick={() => this.props.onClickItem(path)}
            />
          )
        }
      </div>
    );
  }
}

export default Playlist;
