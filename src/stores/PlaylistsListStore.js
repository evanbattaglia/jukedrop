import alt from '../alt';
import PlaylistsActions from '../actions/PlaylistsActions';
import LocalStorage from '../sources/LocalStorage';

const STORAGE_KEY =  'jukedrop-playlists-';

class PlaylistsListStore {
  // CONSTRUCTOR
  constructor() {
    this.bindActions(PlaylistsActions);
    this.items = LocalStorage.get(STORAGE_KEY, []);
  }

  onAddPlaylist(item) {
    if (~this.items.indexOf(item)) return false;
    this.items.push(item);
    this.save();
  }
  onDeletePlaylist(item) {
    this.items = this.items.filter(i => i !== item);
    this.save();
  }
  onChoosePlaylist() {
    return false; // TODO: could highlight, etc. delete would have to check if chosen one is being deleted.
  }

  save() {
    LocalStorage.set(STORAGE_KEY, this.items);
  }
}

export default alt.createStore(PlaylistsListStore, 'PlaylistsListStore');
