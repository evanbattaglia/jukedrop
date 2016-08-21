import alt from '../alt';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import FileListActions from '../actions/FileListActions';
import LocalStorage from '../sources/LocalStorage';
import DropboxSource from '../sources/DropboxSource';
import {dirname} from '../util';

const STORAGE_KEY = 'jukedrop-fileliststore';

class FileListStore {
  constructor() {
    this.currentDirectory = null;
    this.files = [];
    this.registerAsync(DropboxSource);
    this.bindActions(FileListActions);
  }

  onInit() {
    //if (this.currentDirectory) return false; // already initialized
    const initialDir = LocalStorage.get(STORAGE_KEY, '/');
    this.getInstance().loadFolder(initialDir);
  }

  onChangeFolder(name) {
    if (!this.getInstance().isLoading()) {
      const path = name === '..' ? dirname(this.currentDirectory) : this.currentDirectory + '/' + name;
      this.getInstance().loadFolder(path);
    }
    return false;
    // TODO: loading state. not sure if want to use "loading" or just set state loading=true here.
  }

  onFolderChangeDone(state) {
    this.currentDirectory = state.path;
    LocalStorage.set(STORAGE_KEY, this.currentDirectory);
    this.files = state.files;
    return true;
  }



}

const store = alt.createStore(FileListStore, 'FileListStore');
//store.loadFolder(LocalStorage.get(STORAGE_KEY, '/'));
// TODO: not sure this is right, but seems like the best place to initialize data.
export default store;

