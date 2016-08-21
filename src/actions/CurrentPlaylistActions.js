import alt from '../alt';

class CurrentPlaylistActions {
  constructor() {
    this.generateActions('addToPlaylist', 'removeFromPlaylist');
  }
}

export default alt.createActions(CurrentPlaylistActions);
