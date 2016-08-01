import keymirror from 'keymirror'
// TODO: can I use this without keymirror module?
// importing 'react/lib/keyMirror' didn't work

// Constants for all actions

export default keymirror({
  CURRENT_PLAYLIST_ADD_ITEM: null,
  CURRENT_PLAYLIST_REMOVE_ITEM: null,

  PLAYLISTS_ADD: null,
  PLAYLISTS_DELETE: null,
  PLAYLISTS_CHOOSE: null,

  AUDIO_PLAY: null,
  AUDIO_ENDED: null,
});
