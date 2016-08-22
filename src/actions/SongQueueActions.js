import alt from '../alt';

class SongQueueActions {
  constructor() {
    this.generateActions('removeFromQueue', 'removeAll');
  }

  // Accepts one path or an array of paths
  addToQueue(paths) {
    return Array.isArray(paths) ? paths : [paths];
  }
}

export default alt.createActions(SongQueueActions);
