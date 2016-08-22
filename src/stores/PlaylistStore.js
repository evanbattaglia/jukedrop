import alt from '../alt';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import PlaylistsActions from '../actions/PlaylistsActions';
import LocalStorage from '../sources/LocalStorage';

class PlaylistStore {
  constructor() {
    this.playlistName = null;
    this.items = [];
    this.bindListeners({
      remove: CurrentPlaylistActions.REMOVE_FROM_PLAYLIST,
      removeAll: CurrentPlaylistActions.REMOVE_ALL,
      add: CurrentPlaylistActions.ADD_TO_PLAYLIST,
      onDeletePlaylist: PlaylistsActions.DELETE_PLAYLIST,
      setPlaylist: PlaylistsActions.CHOOSE_PLAYLIST,
    });
  }

  // Action handlers

  add(items) {
    if (!this.playlistName) return false;
    let added = false;
    for (const item of items) {
      if (!~this.items.indexOf(item)) {
        added = true;
        this.items.push(item);
        this.save();
      }
    }
    return items;
  }

  remove(item) {
    if (!this.playlistName) return false;
    this.items = this.items.filter(i => i !== item);
    this.save();
  }

  removeAll() {
    this.items = [];
  }

  setPlaylist(name) {
    this.playlistName = name;
    // TODO: can get rid of this filter soon I think. was clearing out some bad data
    this.items = LocalStorage.get(this.storageKey(), []).filter(item => typeof(item) === "string");
  }

  onDeletePlaylist(name) {
    if (name === this.playlistName) {
      this.playlistName = null;
      this.items = [];
    } else {
      return false; // nothing changed
    }
  }

  // Helpers

  storageKey() {
    return 'jukedrop-playlist-' + this.playlistName; // TODO: sanitize?
  }

  save() {
    LocalStorage.set(this.storageKey(), this.items);
  }
}

export default alt.createStore(PlaylistStore, 'PlaylistStore');
