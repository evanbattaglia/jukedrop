import React from 'react';
import PlaylistItem from './PlaylistItem.jsx';

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

export default Playlist;
