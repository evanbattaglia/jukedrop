import Dropbox from 'dropbox';
import FileListActions from '../actions/FileListActions';
import { tryNTimes } from '../util';

const dropbox = new Dropbox({ accessToken: JukedropConfig.accessToken });


// to use something other than dropbox, just swap this outQ!
export default {
  /**
   *
   * @return { path, files }
   *   path is the path that was inputted
   *   files is an array of { type: 'folder', name: 'foo'} or { type: 'file', name: 'foo' }
   */
  loadFolder: {
    remote(state, path) {
      // Dropbox client requires '' for '/'
      const dropboxPath = path === '/' ? '' : path;

      // For some reason, getting the root folder seems to fail every other time for me.
      // So retry it if it fails.
      const listThisFolder = () => dropbox.filesListFolder({ path });
      return tryNTimes(listThisFolder, 'Dropbox list folder', 3).then(response => {
        const files = response.entries.map(entry => ({
          name: entry.name,
          type: entry['.tag'],
        }));
        return {path, files};
      });
    },
    success: FileListActions.folderChangeDone,
    error: FileListActions.folderChangeError,
  },

  // TODO alt-ize. probably have to move to different source because its connected
  // with different store.
  filesDownload: {
    remote(state) {
      return dropbox.filesDownload({path: state.currentSong}).then(response => {
        this.setStatus('converting');
        const type = path.match(/\.ogg$/i) ? 'audio/ogg' : 'audio/mpeg'; // TOFIX when dropbox API improves
        const blob = new Blob([response], {type}) // force content-type
        const reader = new window.FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => reader.onloadend = () => resolve(reader.result, type));
      });
    }
  }



};
