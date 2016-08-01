import {EventEmitter} from 'events';
import ActionConstants from '../constants/ActionConstants';
import ListStore from './ListStore';

class PlaylistsListStore extends ListStore {
  _storageKey() {
    return 'jukedrop-playlists-';
  }

  // TODO: could dedup and put in ListStore
  // Protected Methods Used by ListStore:
  _loadJsonFromSource() {
    return localStorage.getItem(this._storageKey());
  }

  _saveJsonToSource(jsonStr) {
    localStorage.setItem(this._storageKey(), jsonStr);
  }

  _handleDispatch(payload) {
    // TODO: I think this could be improved to remove all the if/else
    if (payload.actionType === ActionConstants.PLAYLISTS_ADD) {
      this._add(payload.name);
    } else if (payload.actionType === ActionConstants.PLAYLISTS_DELETE) {
      this._remove(payload.name);
    } else if (payload.actionType === ActionConstants.PLAYLISTS_CHOOSE) {
      // TODO: could highlight, etc. delete would have to check if chosen one is being deleted.
    }
  }
}


export default new PlaylistsListStore();
