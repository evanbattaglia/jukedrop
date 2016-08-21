import alt from '../alt';
import ControlActions from '../actions/ControlActions';
import LocalStorage from '../sources/LocalStorage';

const STORAGE_KEY =  'jukedrop-songqueue';

class SongQueueStore {
  constructor() {
    this.queue = LocalStorage.get(STORAGE_KEY, []);
    this.bindListeners({
      addToQueue: ControlActions.ADD_TO_QUEUE,
      pop: ControlActions.NEXT_FROM_QUEUE,
    });
  }

  addToQueue(paths) {
    let added = false;
    for (const path of paths) {
      if (!~this.queue.indexOf(path)) {
        this.queue.push(path);
        added = true;
      }
    }
    this.save();
    return added;
  }

  pop() {
    this.justQueuedSong = this.queue.shift();
    this.save();
  }

  // TODO: in future might be able to make this part of global snapshot...
  save() {
    LocalStorage.set(STORAGE_KEY, this.queue);
  }

  // TODO yuck. can't find another way to do this --
  // if I make SongQueueStore part of CurrentSongStore,
  // but their change emitters need to be different...I
  // or, put them in the same file to avoid the circular dependency problem... double yuck
  static getJustQueuedSong() {
    return this.state.justQueuedSong;
  }

  static isEmpty() {
    return !this.state.queue.length;
  }
}

export default alt.createStore(SongQueueStore, 'SongQueueStore');
