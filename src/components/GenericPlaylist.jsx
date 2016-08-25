import React from 'react';
import PlaylistItem from './PlaylistItem.jsx';
import { preventDefaultWrap } from '../util';

const GenericPlaylist = props => (
  <div>
    <a href="#" onClick={preventDefaultWrap(props.onRemoveAll)}>{props.removeAllTitle}</a>
    {
      props.items.map(path =>
        <PlaylistItem
          key={path}
          path={path}
          onRemove={() => props.onRemoveItem(path)}
          onEnqueue={props.onEnqueueItem ? () => props.onEnqueueItem(path) : null}
          onAdd={props.onAddItem ? () => props.onAddItem(path) : null}
          onClick={() => props.onClickItem(path)}
        />
      )
    }
  </div>
);
GenericPlaylist.propTypes = {
  onRemoveAll: React.PropTypes.func.isRequired,
  onRemoveItem: React.PropTypes.func.isRequired,
  onClickItem: React.PropTypes.func.isRequired,
  onEnqueue: React.PropTypes.func,
  onAdd: React.PropTypes.func,

  items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default GenericPlaylist;
