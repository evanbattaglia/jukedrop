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
    PlayerControllerStore.listen(state => this.play(currentSong));
  }

  // TODO: this bit of status is anti-flux?
  // TODO: yes, need to move status into a store
  setStatus(status) {
    this.setState({ status });
  }

  play(path) { // TODO: better way to do this with props?
    if (path === currentSong) {
      // don't redownload
      // TODO: there must be a better way
      this.refs.audio.replay();
      return;
    }

    this.setStatus('downloading');
    this.props.dropbox.filesDownload({path})
    .then(response => {
      this.setStatus('converting');
      const type = path.match(/\.ogg$/i) ? 'audio/ogg' : 'audio/mpeg'; // TOFIX when dropbox API improves
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
        <Audio ref="audio" data={this.state.data} />
        <div>Status: {this.state.status}</div>
        <div>{this.state.path}</div>
      </div>
    );
  }
}

export default DropboxAudio;
