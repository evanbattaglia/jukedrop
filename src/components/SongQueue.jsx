import React from 'react';
import PlayerControllerStore from '../stores/PlayerControllerStore';
import {basename} from '../util'

class SongQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queue: [] }
  }

  componentDidMount() {
    PlayerControllerStore.addQueueChangeListener(() => {
      this.setState({ queue: PlayerControllerStore.getQueue() });
    });
  }

  render() {
    return (
      <div className="songQueue">
        <h2>Song Queue:</h2>
        {
          this.state.queue.map(path =>
            <div key={path}>{basename(path)}</div>
          )
        }
      </div>
    );
  }
}

export default SongQueue;
