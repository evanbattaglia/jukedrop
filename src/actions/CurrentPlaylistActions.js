import alt from '../alt';

class CurrentPlaylistActions {
  constructor() {
    this.generateActions('removeFromPlaylist', 'removeAll');
  }
  addToPlaylist(items) {
    return Array.isArray(items) ? items : [items];
  }
}

export default alt.createActions(CurrentPlaylistActions);
