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
    this.on(CHANGE_EVENT, callback);
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
