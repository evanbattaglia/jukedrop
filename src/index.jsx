import React from 'react';
import {render} from 'react-dom';

class DropboxBaseFile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.name);
  }
}

class DropboxFile extends DropboxBaseFile {
  constructor(props) {
    super(props);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }
  handleClickAdd(e) {
    e.preventDefault();
    this.props.onClickAdd(this.props.name);
  }
  render() {
    return (
      <div className="dropboxFile">
        <div className={ this.props.name.match(/\.mp3$/) ? 'iconMusic' : 'iconFile' } />
        <a href="#" onClick={this.handleClick}>{this.props.name}</a>
        <a href="#" onClick={this.handleClickAdd}>(add)</a>
      </div>
    );
  }
}

class DropboxFolder extends DropboxBaseFile {
  render() {
    return (
      <div className="dropboxFolder">
        <div className="iconFolder" />
        <a href="" onClick={this.handleClick}>{this.props.name}</a>
      </div>
    );
  }
}

// TODO: reqd props onChooseFile, dropbox
class DropboxFileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: []};
    this.handleClickFolder = this.handleClickFolder.bind(this);
    this.handleClickFile = this.handleClickFile.bind(this);
    this.handleClickAddFile = this.handleClickAddFile.bind(this);
    this.renderFile = this.renderFile.bind(this);
  }
  handleClickFolder(name) {
    if (name == '..') {
      this.loadDirectoryFromDropbox(this.state.currentDirectory.replace(/\/[^\/]*$/, ''));
    } else {
      this.loadDirectoryFromDropbox(this.state.currentDirectory + '/' + name);
    }
  }
  handleClickAddFile(filename) {
    const path = this.state.currentDirectory + '/' + filename;
    this.props.onAddFile(path);
  }
  handleClickFile(filename) {
    const path = this.state.currentDirectory + '/' + filename;
    this.props.onChooseFile(path);
  }
  loadDirectoryFromDropbox(path) {
    if (path === '/') path == '';

    this.props.dropbox.filesListFolder({ path })
    .then(response => {
      const files = response.entries.map(entry => { return {
        name: entry.name,
        type: entry['.tag'],
      }});
      if (path) files.unshift({ name: '..', type: 'folder' });

      this.setState({ files, currentDirectory: path });
    })
    .catch(error => {
      console.error(error); // TODO
    });
  }
  componentDidMount() {
    this.loadDirectoryFromDropbox(this.props.homeDirectory || '');
  }
  renderFile(file) {
    if (file.type === 'folder') {
      return <DropboxFolder onClick={this.handleClickFolder} name={file.name} key={file.name} />
    } else {
      return <DropboxFile onClick={this.handleClickFile} onClickAdd={this.handleClickAddFile} name={file.name} key={file.name} />
    }
  }
  render() {
    // TODO: add a status
    return (
      <div className="dropboxFileList">
        <div className="dropboxFileListInner">
          <h2>{ this.state.currentDirectory }</h2>
          { this.state.files.map(this.renderFile) }
        </div>
      </div>
    );
  }
}

class Audio extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.refs.audio.load();
      this.refs.audio.play();
    }
  }
  render() {
    return (
      <audio preload="none" ref="audio" controls>
        <source src={this.props.data} type={this.props.type} />
      </audio>
    );
  }
}

// TODO: namespacing???
class DropboxAudioStatus extends React.Component {
  render() {
    return (
      <div>Status: {this.props.status}</div>
    );
  }
}

class DropboxAudio extends React.Component {
  setStatus(status) {
    this.setState({ status });
  }
  play(path) { // TODO: better way to do this with props?
    this.setStatus('downloading');
    this.props.dropbox.filesDownload({path})
    .then(response => {
      this.setStatus('converting');
      const type = 'audio/mpeg'; // TOFIX when dropbox API improves
      const blob = new Blob([response], {type}) // force content-type
      const reader = new window.FileReader();
      reader.readAsDataURL(blob);
      return new Promise(resolve => reader.onloadend = () => resolve(reader.result, type));
    }).then((data, type) => {
      this.setState({status: 'loaded', data, type, path});
    })
    .catch(function(error) {
      this.setStatus('errored');
      console.log(error);
    });
  }
  constructor(props) {
    super(props);
    this.dropbox = props.dropbox;
    this.state = { status: 'initial', path: '' };
  }
  render() {
    return (
      <div className="dropboxAudio">
        <Audio data={this.state.data} />
        <div>Status: {this.state.status}</div>
        <div>{this.state.path}</div>
      </div>
    );
  }
}

class PlaylistItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickPlay(e) {
    e.preventDefault();
    this.props.onPlay(this.props.path);
  }

  handleClickRemove(e) {
    this.props.onRemove(this.props.path);
  }

  render() {
    return (
      <div>
        <div className="iconRemove playlistItemRemove" onClick={this.handleClickRemove}></div>
        <a href="#" onClick={this.handleClickPlay} title={this.props.path}>
          {this.props.path.replace(/^.*\//, '')}
        </a>
      </div>
    );
  }
}

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paths: [] };
    this.removePath = this.removePath.bind(this);
  }
  setState(props) {
    if (props.paths) {
      // TODO: move storage to own class, eventually (will be responsible for holding many playlist).
      // at the very least set this string to a constant. TODO: figure out how to do class constants (and/or split up into files)
      localStorage.setItem('jukedrop-playlist', JSON.stringify(props.paths));
    }
    super.setState(props);
  }
  componentDidMount() {
    const loadedPlaylist = localStorage.getItem('jukedrop-playlist');
    if (loadedPlaylist) {
      this.setState({ paths: JSON.parse(loadedPlaylist) });
    }
  }
  addPath(path) {
    // Don't add same path twice
    if (~this.state.paths.indexOf(path)) return;
    this.state.paths.push(path);
    this.setState(this.state); // TODO: seems to work but not sure it's OK
  }
  removePath(path) {
    this.setState({ paths: this.state.paths.filter(p => p !== path) });
  }
  render() {
    return (
      <div className="playlist">
        <h2>Playlist</h2>
        {
          this.state.paths.map(path =>
            <PlaylistItem
              key={path}
              path={path}
              onPlay={this.props.onChooseFile}
              onRemove={this.removePath}
            />
          )
        }
      </div>
    );
  }
}

class JukedropApp extends React.Component {
  constructor(props) {
    super(props);
    this.dropbox = new Dropbox({ accessToken: this.props.config.accessToken }); // TOOD: should this.dropbox this be in state? or even props?
    this.handleChooseFile = this.handleChooseFile.bind(this);
    this.handleAddFile = this.handleAddFile.bind(this);
  }

  handleChooseFile(path) {
    this.refs.dropboxAudio.play(path);
  }

  // handle add file to playlist
  handleAddFile(path) {
  // TODO need to first check if in list. maybe further down in playlist, i think that should probably be responsible...
    this.refs.playlist.addPath(path);
  }

  render() {
    return (
      <div className="jukedropApp">
        <div className="jukedropAppTop">
          <DropboxFileList onChooseFile={this.handleChooseFile} onAddFile={this.handleAddFile} homeDirectory={this.props.config.homeDirectory} dropbox={this.dropbox} />
          <div className="jukedropAppRight">
            <DropboxAudio ref="dropboxAudio" dropbox={this.dropbox} />
            <Playlist ref="playlist" onChooseFile={this.handleChooseFile} />
          </div>
        </div>
      </div>
    );
  }
}

render(
  <JukedropApp config={JukedropConfig} />,
  document.getElementById('content')
);
