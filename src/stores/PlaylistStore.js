import {EventEmitter} from 'events';
import ActionConstants from '../constants/ActionConstants';
import ListStore from './ListStore';

class PlaylistStore extends ListStore {
  // constructor not needed: starts out with
  // undefined playlistName and empty items.
  getPlaylistName() {
    return this._playlistName;
  }

  // Protected Methods:
  _setPlaylistName(name) {
    this._playlistName = name;
    this._loadFromSource(); // this also emits change
  }

  _storageKey() {
    return 'jukedrop-playlist-' + this._playlistName; // TODO: sanitize?
  }

  // Protected Methods Used by ListStore:
  _loadJsonFromSource() {
    if (this._playlistName) {
      return localStorage.getItem(this._storageKey());
    } else {
      return null;
    }
  }

  _saveJsonToSource(jsonStr) {
    if (this._playlistName) {
      localStorage.setItem(this._storageKey(), jsonStr);
    }
  }

  _handleDispatch(payload) {
    // TODO: I think this could be improved to remove all the if/else
    if (payload.actionType === ActionConstants.CURRENT_PLAYLIST_REMOVE_ITEM) {
      this._remove(payload.path);
    } else if (payload.actionType === ActionConstants.CURRENT_PLAYLIST_ADD_ITEM) {
      this._add(payload.path);
    } else if (payload.actionType === ActionConstants.PLAYLISTS_DELETE) {
      if (payload.name === this._playlistName) this._setPlaylistName(null);
    } else if (payload.actionType === ActionConstants.PLAYLISTS_CHOOSE) {
      this._setPlaylistName(payload.name);
    }
  }
}


export default new PlaylistStore();
