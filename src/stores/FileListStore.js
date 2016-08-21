import alt from '../alt';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import FileListActions from '../actions/FileListActions';
import LocalStorage from '../sources/LocalStorage';
import DropboxSource from '../sources/DropboxSource';

const STORAGE_KEY = 'jukedrop-fileliststore';

class FileListStore {
  constructor() {
    this.currentDirectory = null;
    this.files = [];
    this.registerAsync(DropboxSource);
    this.bindActions(FileListActions);
    this.on('error', wtf => {
      console.log("wtferr", wtf);
    });
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
    console.log("folder change done!!!");
    console.log(state);
    this.currentDirectory = state.path;
    console.log("folder change done!!!iagain");
    LocalStorage.set(STORAGE_KEY, this.currentDirectory);
    console.log("wtf moment");
    this.files = state.files;
    return true;
  }



}

const store = alt.createStore(FileListStore, 'FileListStore');
store.loadFolder("/bitcasa");
//store.loadFolder(LocalStorage.get(STORAGE_KEY, '/'));
// TODO: not sure this is right, but seems like the best place to initialize data.
export default store;

