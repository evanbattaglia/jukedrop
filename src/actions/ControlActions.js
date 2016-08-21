import alt from '../alt';

class ControlActions {
  constructor() {
    this.generateActions('loadSong', 'next');
  }

  // Accepts one path or an array of paths
  addToQueue(paths) {
    return Array.isArray(paths) ? paths : [paths];
  }
}

export default alt.createActions(ControlActions);
