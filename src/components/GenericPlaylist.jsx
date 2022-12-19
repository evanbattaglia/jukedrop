import React from 'react';
import PropTypes from 'prop-types';
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
  onRemoveAll: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,
  onEnqueue: PropTypes.func,
  onAdd: PropTypes.func,

  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GenericPlaylist;
