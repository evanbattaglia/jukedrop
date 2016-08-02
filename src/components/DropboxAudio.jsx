import React from 'react';
import Audio from './Audio.jsx';

import PlayerControllerStore from '../stores/PlayerControllerStore';

class DropboxAudio extends React.Component {
  constructor(props) {
    super(props);
    this.dropbox = props.dropbox;
    this.state = { status: 'initial', path: '' };
  }

  componentDidMount() {
    PlayerControllerStore.addSongChangeListener(() => {
      this.play(PlayerControllerStore.getCurrentSong());
    });
  }

  // TODO: this bit of status is anti-flux?
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

export default DropboxAudio;
