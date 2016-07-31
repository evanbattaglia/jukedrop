import {EventEmitter} from 'events';
import Dispatcher from '../Dispatcher';
import ActionConstants from '../constants/ActionConstants';

const CHANGE_EVENT = 'change';

class ListStore extends EventEmitter {
  // PUBLIC METHODS
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  getItems() {
    return this._items;
  }

  // CONSTRUCTOR
  constructor(storageKey) {
    super();
    this.dispatcherIndex = Dispatcher.register(this._handleDispatch.bind(this));
    this._storageKey = storageKey;
    this._items = [];
    this._loadFromSource();
  }

  // PRIVATE METHODS
  _emitChange() {
    this.emit(CHANGE_EVENT);
  }

  _loadFromSource() {
    const loadedJson = localStorage.getItem(this._storageKey);
    if (loadedJson) {
      this._items = JSON.parse(loadedJson).filter(x => x);
      this._emitChange();
    }
  }

  _saveAndEmitChange() {
    localStorage.setItem(this._storageKey, JSON.stringify(this._items));
    this._emitChange();
  }

  _add(item) {
    if (~this._items.indexOf(item)) return;
    this._items.push(item);
    this._saveAndEmitChange();
  }

  _remove(item) {
    this._items = this._items.filter(i => i !== item);
    this.saveAndEmitChange();
  }
}

class PlaylistStore extends ListStore {
  constructor() {
    const LOCAL_STORAGE_KEY = 'jukedrop-playlist';
    super(LOCAL_STORAGE_KEY);
  }

  _handleDispatch(payload) {
    // TODO: I think this could be improved to remove all the if/else
    if (payload.actionType === ActionConstants.PLAYLIST_REMOVE_ITEM) {
      this._remove(payload.path);
    } else if (payload.actionType === ActionConstants.PLAYLIST_ADD_ITEM) {
      this._add(payload.path);
    }
  }
}


export default new PlaylistStore();
