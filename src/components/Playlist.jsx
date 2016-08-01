import React from 'react';
import PlaylistItem from './PlaylistItem.jsx';
import PlaylistStore from '../stores/PlaylistStore';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromStore();
    this.updateStateFromStore = this.updateStateFromStore.bind(this);
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
