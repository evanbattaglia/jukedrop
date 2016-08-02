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
const Events = keymirror({
  SONG_CHANGE_EVENT: null,
  QUEUE_CHANGE_EVENT: null,
  REPLAY_EVENT: null,
});

// event emitter
const eventEmitter = new EventEmitter();

// state

let currentSong = null;
let queue = [];

function loadSong(path) {
  currentSong = path;
  eventEmitter.emit(Events.SONG_CHANGE_EVENT);
}

function addSongToQueue(path) {
  if (!~queue.indexOf(path)) {
    queue.push(path);
    eventEmitter.emit(Events.QUEUE_CHANGE_EVENT);
  }
}

function replay() {
  playing = true;
  eventEmitter.emit(Events.REPLAY_EVENT);
}

// Dispatch handlers
function handleDispatch(payload) {
  if (payload.actionType === ActionConstants.CONTROL_LOAD_SONG) {
    loadSong(payload.path);
  } else if (payload.actionType === ActionConstants.CONTROL_ADD_SONG_TO_QUEUE) {
    addSongToQueue(payload.path);
  } else if (payload.actionType === ActionConstants.AUDIO_ENDED) {
    handleAudioEnded();
  }
}

function handleAudioEnded() {
  let song = queue.shift();
  if (song) {
    loadSong(song);
    eventEmitter.emit(Events.QUEUE_CHANGE_EVENT);
  } else {
    emitReplay();
  }
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
  getCurrentSong: () => currentSong,
  getQueue: () => queue,

  addSongChangeListener: makeAdder('SONG_CHANGE_EVENT'),
  removeSongChangeListener: makeRemover('SONG_CHANGE_EVENT'),
  addQueueChangeListener: makeAdder('QUEUE_CHANGE_EVENT'),
  removeQueueChangeListener: makeRemover('QUEUE_CHANGE_EVENT'),

  // Tells audio to start over and replay
  addReplayListener: makeAdder('REPLAY_EVENT'),
  removeReplayListener: makeRemover('REPLAY_EVENT'),
};
