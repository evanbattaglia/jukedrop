import alt from '../alt';

class FileListActions {
  constructor() {
    this.generateActions('init', 'changeFolder', 'folderChangeDone', 'folderChangeError');
  }
}

export default alt.createActions(FileListActions);
