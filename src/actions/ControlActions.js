import alt from '../alt';

class ControlActions {
  constructor() {
    this.generateActions('loadSong', 'restartSong');

    this.generateActions('nextFromQueue'); // "private" -- should be only invoked internally
  }
}

export default alt.createActions(ControlActions);
