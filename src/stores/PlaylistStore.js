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
import {EventEmitter} from 'events';
import Dispatcher from '../Dispatcher';

/**
 * Base class for a store that is a list of items (for now, strings).
 * List can not have duplicates.
 * Each item is identified by its string (for removing and checking of duplicates)
 *
 * Subclasses should implement:
 *   _handleDispatch(payload)
 *   _loadJsonFromSource() (returns string)
 *   _saveJsonToSource(jsonStr)
 *
 * Calls change listeners with no parameters when change occurs.
 *
 * Public Methods:
 *   addChangeListener(callback)
 *   removeChangeListener(callback)
 *   getItems()
 */

const CHANGE_EVENT = 'change';

class ListStore extends EventEmitter {
  // PUBLIC METHODS
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getItems() {
    return this._items;
  }

  // CONSTRUCTOR
  constructor(storageKey) {
    super();
    this.dispatcherIndex = Dispatcher.register(this._handleDispatch.bind(this));
    this._items = [];
    this._loadFromSource();
  }

  // PRIVATE METHODS
  _emitChange() {
    this.emit(CHANGE_EVENT);
  }

  _loadFromSource() {
    const loadedJson = this._loadJsonFromSource();
    if (loadedJson) {
      this._items = JSON.parse(loadedJson).filter(x => x);
      this._emitChange();
    } else {
      this._items = [];
      this._saveAndEmitChange();
    }
  }

  _saveAndEmitChange() {
    this._saveJsonToSource(JSON.stringify(this._items));
    this._emitChange();
  }

  _add(item) {
    if (~this._items.indexOf(item)) return;
    this._items.push(item);
    this._saveAndEmitChange();
  }

  _remove(item) {
    this._items = this._items.filter(i => i !== item);
    this._saveAndEmitChange();
  }
}

export default ListStore;
