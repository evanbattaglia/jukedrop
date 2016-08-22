import alt from '../alt';

class CurrentSongActions {
  constructor() {
    this.generateActions('downloadSongSuccess', 'downloadSongError');
  }
}

export default alt.createActions(CurrentSongActions);
