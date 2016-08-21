import React from 'react';
import PlaylistItem from './PlaylistItem.jsx';
import PlaylistStore from '../stores/PlaylistStore';
import ControlActions from '../actions/ControlActions';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlaylistStore.getState();
    // TODO: I think altContainer has better ways of doing this.
    this.updateStateFromStore = this.updateStateFromStore.bind(this);
    this.handleClickEnqueueAll = this.handleClickEnqueueAll.bind(this);
  }

  handleClickEnqueueAll(e) {
    e.preventDefault();
    ControlActions.addToQueue(this.state.items);
  }

  componentDidMount() {
    PlaylistStore.listen(this.updateStateFromStore); // TODO unlisten
    this.setState(PlaylistStore.getState());
    // Initial update, in case it changed before we were listening
    // TODO: is that really necessary? i don't see it in examples...
  }

  render() {
    return (
      <div className="playlist">
        <h2>Playlist: {this.state.playlistName || '[No playlist selected]' }</h2>
        <a href="#" onClick={this.handleClickEnqueueAll}>(enqueue all)</a>
        {
          this.state.items.map(path =>
            <PlaylistItem
              key={path}
              path={path}
            />
          )
        }
      </div>
    );
  }
}

export default Playlist;
