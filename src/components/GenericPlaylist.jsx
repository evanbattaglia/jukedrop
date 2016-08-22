import React from 'react';
import PlaylistItem from './PlaylistItem.jsx';

class GenericPlaylist extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.items.map(path =>
            <PlaylistItem
              key={path}
              path={path}
              onRemove={() => this.props.onRemoveItem(path)}
              onEnqueue={this.props.onEnqueueItems ? () => this.props.onEnqueueItems([path]) : null}
              onClick={() => this.props.onClickItem(path)}
            />
          )
        }
      </div>
    );
  }
}

export default GenericPlaylist;
