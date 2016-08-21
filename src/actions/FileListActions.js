import alt from '../alt';

class FileListActions {
  constructor() {
    this.generateActions('folderChange', 'folderChangeDone', 'folderChangeError');
  }
}

export default alt.createActions(FileListActions);
