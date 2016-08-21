import alt from '../alt';
import PlaylistsActions from '../actions/PlaylistsActions';

const STORAGE_KEY =  'jukedrop-playlists-';

class PlaylistsListStore {
  // CONSTRUCTOR
  constructor() {
    this.bindActions(PlaylistsActions);

    // TODO move to a source, see PlaylistStore
    const loadedJson = localStorage.getItem(STORAGE_KEY) || '[]';
    this.items = JSON.parse(loadedJson).filter(x => x);
    this.save();
  }

  onAddPlaylist() {
    if (~this.items.indexOf(item)) return false;
    this.items.push(item);
    this.save();
  }
  onRemovePlaylist() {
    this.items = this.items.filter(i => i !== item);
    this.save();
  }
  onChoosePlaylist() {
    return false; // TODO: could highlight, etc. delete would have to check if chosen one is being deleted.
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }
}

export default alt.createStore(PlaylistsListStore, 'PlaylistsListStore');
