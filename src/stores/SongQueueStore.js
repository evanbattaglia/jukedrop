import alt from '../alt';
import ControlActions from '../actions/ControlActions';
import SongQueueActions from '../actions/SongQueueActions';
import LocalStorage from '../sources/LocalStorage';

const STORAGE_KEY =  'jukedrop-songqueue';

class SongQueueStore {
  constructor() {
    this.items = LocalStorage.get(STORAGE_KEY, []);
    this.bindListeners({
      addToQueue: SongQueueActions.ADD_TO_QUEUE,
      removeFromQueue: SongQueueActions.REMOVE_FROM_QUEUE,
      pop: ControlActions.NEXT_FROM_QUEUE,
    });
  }

  removeFromQueue(path) {
    this.items = this.items.filter(p => p !== path);
  }

  addToQueue(paths) {
    let added = false;
    for (const path of paths) {
      if (!~this.items.indexOf(path)) {
        this.items.push(path);
        added = true;
      }
    }
    this.save();
    return added;
  }

  pop() {
    this.justQueuedSong = this.items.shift();
    this.save();
  }

  // TODO: in future might be able to make this part of global snapshot...
  save() {
    LocalStorage.set(STORAGE_KEY, this.items);
  }

  // TODO yuck. can't find another way to do this --
  // if I make SongQueueStore part of CurrentSongStore,
  // but their change emitters need to be different...I
  // or, put them in the same file to avoid the circular dependency problem... double yuck
  static getJustQueuedSong() {
    return this.state.justQueuedSong;
  }

  static isEmpty() {
    return !this.state.items.length;
  }
}

export default alt.createStore(SongQueueStore, 'SongQueueStore');
