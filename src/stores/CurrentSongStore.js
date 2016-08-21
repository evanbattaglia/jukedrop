import Dispatcher from '../Dispatcher';
import ControlActions from '../constants/ControlActions';
import AudioActions from '../constants/AudioActions';

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


// event emitter
const eventEmitter = new EventEmitter();

class CurrentSongStore {
  constructor() {
    this.addListeners({
      loadSong: ControlActions.LOAD_SONG,
      //addToQueue: ControlActions.ADD_TO_QUEUE, //TODO
      handleAudioEnded: [ControlActions.NEXT, AudioActions.ENDED],
    });

    this.currentSong = null;
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

export default new alt.createStore(CurrentSongStore, 'CurrentSongStore');
