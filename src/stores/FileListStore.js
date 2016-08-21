import alt from '../alt';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import FileListActions from '../actions/FileListActions';
import LocalStorage from '../sources/LocalStorage';
import DropboxSource from '../sources/DropboxSource';
import {dirname, ROOT_DIRECTORY, joinPaths} from '../util';

const STORAGE_KEY = 'jukedrop-fileliststore';
const UP_DIRECTORY_ENTRY = '..';
const SEPARATOR = '/';

class FileListStore {
  constructor() {
    this.currentDirectory = null;
    this.files = [];
    this.registerAsync(DropboxSource);
    this.bindActions(FileListActions);
  }

  onInit() {
    //if (this.currentDirectory) return false; // already initialized
    const initialDir = LocalStorage.get(STORAGE_KEY, ROOT_DIRECTORY);
    this.getInstance().loadFolder(initialDir);
  }

  onChangeFolder(name) {
    if (!this.getInstance().isLoading()) {
      const path = name === UP_DIRECTORY_ENTRY ?
        dirname(this.currentDirectory)
      : joinPaths(this.currentDirectory, name);
      this.getInstance().loadFolder(path);
    }
    return false;
    // TODO: loading state. not sure if want to use "loading" or just set state loading=true here.
  }

  onFolderChangeDone(state) {
    this.currentDirectory = state.path;
    LocalStorage.set(STORAGE_KEY, this.currentDirectory);
    this.files = state.files;
    // Add special ".."
    if (state.path !== ROOT_DIRECTORY) {
      this.files = [{ name: UP_DIRECTORY_ENTRY, type: 'folder' }].concat(this.files);
    }
    return true;
  }
}

export default alt.createStore(FileListStore, 'FileListStore');

