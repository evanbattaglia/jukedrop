import alt from '../alt';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import PlaylistsActions from '../actions/PlaylistsActions';

class PlaylistStore {
  constructor() {
    this.playlistName = null;
    this.items = [];
    this.bindListeners({
      remove: CurrentPlaylistActions.REMOVE_ITEM,
      add: CurrentPlaylistActions.ADD_ITEM,
      onDeletePlaylist: PlaylistsActions.DELETE,
      setPlaylist: PlaylistsActions.CHOOSE,
    });
  }

  // Action handlers

  add(item) {
    if (!this._playlistName) return false;
    if (~this.items.indexOf(item)) return false;
    this.items.push(item);
    this.save();
  }

  remove(item) {
    if (!this._playlistName) return false;
    this.items = this.items.filter(i => i !== item);
    this.save();
  }

  setPlaylist(name) {
    this.playlistName = name;

    // TODO: move to a source: LocalStorage.get(this.storageKey(), []); // [] is default
    // LocalStorage.save(this.storageKey(), this.items);
    const loadedJson = localStorage.getItem(this.storageKey());
    if (loadedJson) {
      this.items = JSON.parse(loadedJson).filter(x => x);
    } else {
      this.items = [];
      this.save();
    }
  }

  onDeletePlaylist(name) {
    if (name === this._playlistName) {
      this.playlistName = null;
      this.items = [];
    } else {
      return false; // nothing changed
    }
  }

  // Helpers

  storageKey() {
    return 'jukedrop-playlist-' + this._playlistName; // TODO: sanitize?
  }

  save() {
    localStorage.setItem(this.storageKey(), JSON.stringify(this._items));
  }
}

export default alt.createStore(PlaylistStore, 'PlaylistStore');
