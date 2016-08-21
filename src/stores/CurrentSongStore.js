import alt from '../alt';
import ControlActions from '../actions/ControlActions';
import AudioActions from '../actions/AudioActions';

// TODO: reenable queue stuff. put in different store. might need to use waitFor.
//

/**
 * Holds state about what is the current song that is (should be) playing
 * and what song is coming up next.
 * Possibly will also hold a play queue (song backlog)
 *
 * Actions responds to:
 *   CONTROL_LOAD_SONG (changes currently playing song)
 *   AUDIO_ENDED (chooses another currently playing song and changes to it)
 */

class CurrentSongStore {
  constructor() {
    this.currentSong = null;

    this.bindListeners({
      loadSong: ControlActions.LOAD_SONG,
      //addToQueue: ControlActions.ADD_TO_QUEUE, //TODO
      handleAudioEnded: [ControlActions.NEXT, AudioActions.ENDED],
    });
  }

  loadSong(path) {
    this.currentSong = path;
  }

  handleAudioEnded() {
    /*
    let song = queue.shift();
    if (song) {
      loadSong(song);
      eventEmitter.emit(Events.QUEUE_CHANGE_EVENT);
    } else if (currentSong) {
      replay();
    }
    */
    // for now, just emit change of state
    // TODO: for replay -- have to handle in view
  }
}

export default alt.createStore(CurrentSongStore, 'CurrentSongStore');
