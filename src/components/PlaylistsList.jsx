import React from 'react';
import PlaylistsListItem from './PlaylistsListItem.jsx';
import PlaylistsListStore from '../stores/PlaylistsListStore';
import PlaylistsActions from '../actions/PlaylistsActions';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlaylistsListStore.getState();
    this.handleAddClick = this.handleAddClick.bind(this);
    this.updateStateFromStore = this.updateStateFromStore.bind(this);
  }

  componentDidMount() {
    PlaylistsListStore.listen(this.updateStateFromStore); // TODO unlisten
    this.updateStateFromStore(); // Initial update, in case it changed before we were listening
  }

  updateStateFromStore() {
    this.setState(PlaylistsListStore.getState());
  }

  handleAddClick(e) {
    e.preventDefault();
    PlaylistsActions.addPlaylist(prompt("Name of new playlist?"));
  }

  // TODO: above is mostly boilerplate...

  render() {
    return (
      <div className="playlistsList">
        <h2>All Playlists</h2>
        <div>
          <a href="#" onClick={this.handleAddClick}>Add</a>
        </div>
        {
          this.state.items.map(name =>
            <PlaylistsListItem
              key={name}
              name={name}
            />
          )
        }
      </div>
    );
  }
}

export default Playlist;
