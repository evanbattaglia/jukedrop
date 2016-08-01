
const ListStates = keymirror({
  ONE_OFF: null, // one off file
  PLAYLIST: null,
  // DIRECTORY: null, // To implement later: play a whole directory
});

const Modes = keymirror({
  ONE_AND_STOP: null,
  FORWARD_AND_STOP: null
  REPEAT_ONE: null.
  REPEAT_ALL: null
});

let listState = ListStates.ONE_OFF;
let mode = Modes.ONE_AND_STOP;
let currentPlaylist = null;

const diapatcherIndex = Dispatcher.register(function() {

});

function handleEnded() {
  // if repeat_one: replay
  // else if one_off: stop
  // else if playlist:
  //   if forward_and_stop: play next in playlist, unless at end
  //     TODO: how to we tell it to play next in playlist?
  //   if repeat_all: play next in playlist, go back to beginning if at end
}

export default {
  dispatcherIndex,
  List
};
