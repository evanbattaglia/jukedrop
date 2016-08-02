import React from 'react';
import PlayerControllerStore from '../stores/PlaylistStore';

class SongQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queue: [] }
  }

  componentDidMount() {
    PlayerControllerStore.addChangeListener(() => {
      setState({ queue: PlayerController.getQueue() });
    });
  }

  render() {
    return (
      <div className="songQueue">
        <h2>Song Queue:</h2>
        {
          this.state.queue.map(path =>
            <div>{path}</div>
          )
        }
      </div>
    );
  }
}

export default SongQueue;
