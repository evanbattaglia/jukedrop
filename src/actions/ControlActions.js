import alt from '../alt';

class ControlActions {
  constructor() {
    this.generateActions('loadSong', 'restartSong');

    this.generateActions('nextFromQueue'); // "private" -- should be only invoked internally
  }

  // Accepts one path or an array of paths
  addToQueue(paths) {
    return Array.isArray(paths) ? paths : [paths];
  }
}

export default alt.createActions(ControlActions);
