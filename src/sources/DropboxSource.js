import FileListActions from '../actions/FileListActions';

// TODO: where is Dropbox coming from? should be imported.
const dropbox = new Dropbox({ accessToken: JukedropConfig.accessToken });

// to use something other than dropbox, just swap this outQ!
export default {
  loadFolder: {
    remote(state, path) {
      if (path === '/') path = ''; // Dropbox client requires '' for '/' (I think?)

      return dropbox.filesListFolder({ path }).then(response => {
        const files = response.entries.map(entry => { return {
          name: entry.name,
          type: entry['.tag'],
        }});
        // TODO consider moving this up to store? probably not. but think about it.
        if (path) files.unshift({ name: '..', type: 'folder' });

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
