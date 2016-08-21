// Stores used -- read-only
import ControlActions from './ControlActions';
import SongQueueStore from '../stores/SongQueueStore';

export default {
  // looks at queue state to figure out what it should do.
  // in the future will look at a mode.
  // does not actually dispatch an action itself.
  next() {
    if (SongQueueStore.isEmpty()) {
      ControlActions.restartSong();
    } else {
      ControlActions.nextFromQueue();
    }
  },

  // This mostly does the same thing as next(), depending on mode
  songEnded() {
    this.next();
  },
};
