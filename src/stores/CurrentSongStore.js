import alt from '../alt';
import ControlActions from '../actions/ControlActions';
import AudioActions from '../actions/AudioActions';
import CurrentSongActions from '../actions/CurrentSongActions';

import SongQueueStore from '../stores/SongQueueStore';
import DropboxSource from '../sources/DropboxSource';

// TODO: reenable queue stuff. put in different store. might need to use waitFor.
//

/**
 * Holds state about what is the current song that is (should be) playing
 * and what song is coming up next.
 * Possibly will also hold a play queue (song backlog)
 */

class CurrentSongStore {
  constructor() {
    this.path = null;
    this.status = 'initial';

    this.bindListeners({
      loadSong: ControlActions.LOAD_SONG,
      nextFromQueue: ControlActions.NEXT_FROM_QUEUE,
      restartSong: ControlActions.RESTART_SONG,
    });

    this.bindActions(CurrentSongActions);

    this.registerAsync(DropboxSource);
  }

  downloadSongSuccess(state) {
    this.path = state.path;
    this.data = state.data;
    this.type = state.type;
    this.status = 'loaded';
    this.loadingSong = null;
    this.shouldReloadSong = true;
  }

  downloadSongError() {
    this.status = this.oldStatus;
    this.loadingSong = null;
    this.shouldReloadSong = false;
  }

  loadSong(path) {
    if (path === this.path) {
      this.shouldReloadSong = true;
      // just reload song.
    } else {
      this.oldStatus = this.status;
      this.status = 'loading';
      this.loadingSong = path;
      this.getInstance().downloadSong(path);
      this.shouldReloadSong = false;
    }
  }

  restartSong() {
    // Just reload song.
    this.shouldReloadSong = true;
  }

  nextFromQueue() {
    this.waitFor(SongQueueStore);
    this.loadSong(SongQueueStore.getJustQueuedSong());
  }
}

export default alt.createStore(CurrentSongStore, 'CurrentSongStore');
