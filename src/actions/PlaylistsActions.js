import alt from '../alt';

class PlaylistsActions {
  constructor() {
    this.generateActions('addPlaylist', 'deletePlaylist', 'choosePlaylist');
  }
}

export default alt.createActions(PlaylistsActions);
