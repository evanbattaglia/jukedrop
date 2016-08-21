import alt from '../alt';
import ControlActions from '../actions/ControlActions';
import AudioActions from '../actions/AudioActions';
import SongQueueStore from '../stores/SongQueueStore';

// TODO: reenable queue stuff. put in different store. might need to use waitFor.
//

/**
 * Holds state about what is the current song that is (should be) playing
 * and what song is coming up next.
 * Possibly will also hold a play queue (song backlog)
 */

class CurrentSongStore {
  constructor() {
    this.currentSong = null;

    this.bindListeners({
      loadSong: ControlActions.LOAD_SONG,
      nextFromQueue: ControlActions.NEXT_FROM_QUEUE,
      restartSong: ControlActions.RESTART_SONG,
    });
  }

  loadSong(path) {
    this.currentSong = path;
  }

  restartSong() {
    // Just emit a change state event
  }

  nextFromQueue() {
    this.waitFor(SongQueueStore);
    this.currentSong = SongQueueStore.getJustQueuedSong();
  }
}

export default alt.createStore(CurrentSongStore, 'CurrentSongStore');
