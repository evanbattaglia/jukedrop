import Dispatcher from '../Dispatcher';
import keymirror from 'keymirror';
import ActionConstants from '../constants/ActionConstants';
import {EventEmitter} from 'events';

/**
 * Holds state about what is the current song that is (should be) playing
 * and what song is coming up next.
 * Possibly will also hold a play queue (song backlog)
 *
 * Actions responds to:
 *   CONTROL_LOAD_SONG (changes currently playing song)
 *   AUDIO_ENDED (chooses another currently playing song and changes to it)
 */

// constants
const Modes = keymirror({
  NORMAL: null,
  REPEAT_ONE: null,
});

const Events = keymirror({
  SONG_CHANGE_EVENT: null,
  MODE_CHANGE_EVENT: null,
  REPLAY_EVENT: null,
});

// event emitter
const eventEmitter = new EventEmitter();

// state
let mode = Modes.ONE_AND_STOP;
let currentSong = null;

function loadSong(path) {
  currentSong = path;
  eventEmitter.emit(Events.SONG_CHANGE_EVENT);
}

function emitReplay() {
  eventEmitter.emit(Events.REPLAY_EVENT);
}

// Dispatch handlers
function handleDispatch(payload) {
  if (payload.actionType === ActionConstants.CONTROL_LOAD_SONG) {
    // TODO: could add to queue if something is currently playing
    loadSong(payload.path);
  } else if (payload.actionType === ActionConstants.AUDIO_ENDED) {
    handleAudioEnded();
  }

}

function handleAudioEnded() {
  // if repeat_one: replay (eventually will also do this for hitting 'back'
  emitReplay();
  // else if one_off: stop (do nothing)
  // else if playlist:
  //   if forward_and_stop: play next in playlist, unless at end
  //     TODO: how to we tell it to play next in playlist?
  //   if repeat_all: play next in playlist, go back to beginning if at end
}

// Utility functions
// Generate addABCListener() and removeABCListener() functions for 'ABC' event
function makeAdder(event) {
  if (!Events[event]) throw new Error("Invalid event " + event);
  return cb => eventEmitter.on(Events[event], cb);
}

function makeRemover(event) {
  if (!Events[event]) throw new Error("Invalid event " + event);
  return cb => eventEmitter.removeListener(Events[event], cb);
}

export default {
  dispatcherIndex: Dispatcher.register(handleDispatch),
  Modes,

  getCurrentSong: () => currentSong,
  getMode: () => mode,

  addSongChangeListener: makeAdder('SONG_CHANGE_EVENT'),
  removeSongChangeListener: makeRemover('SONG_CHANGE_EVENT'),
  addModeChangeListener: makeAdder('MODE_CHANGE_EVENT'),
  removeModeChangeListener: makeRemover('MODE_CHANGE_EVENT'),

  // Tells audio to start over and replay
  addReplayListener: makeAdder('REPLAY_EVENT'),
  removeReplayListener: makeRemover('REPLAY_EVENT'),
};
