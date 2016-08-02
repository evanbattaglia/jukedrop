import React from 'react';
import PlaylistItem from './PlaylistItem.jsx';
import PlaylistStore from '../stores/PlaylistStore';
import ControlActions from '../actions/ControlActions';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromStore();
    this.updateStateFromStore = this.updateStateFromStore.bind(this);
    this.handleClickEnqueueAll = this.handleClickEnqueueAll.bind(this);
  }

  handleClickEnqueueAll(e) {
    e.preventDefault();
    ControlActions.addToQueue(this.state.paths);
  }

  componentDidMount() {
    PlaylistStore.addChangeListener(this.updateStateFromStore);
    this.updateStateFromStore(); // Initial update, in case it changed before we were listening
  }

  getStateFromStore() {
    return {name: PlaylistStore.getPlaylistName(), paths: PlaylistStore.getItems()};
  }

  updateStateFromStore() {
    this.setState(this.getStateFromStore());
  }

  render() {
    return (
      <div className="playlist">
        <h2>Playlist: {this.state.name || '[No playlist selected]' }</h2>
        <a href="#" onClick={this.handleClickEnqueueAll}>(enqueue all)</a>
        {
          this.state.paths.map(path =>
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
