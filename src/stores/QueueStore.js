class QueueStore {
  constructor() {
    this.queue = [];
  }

  addToQueue(paths) {
    for (const path of paths) {
      if (!~queue.indexOf(path)) {
        queue.push(path);
        eventEmitter.emit(Events.QUEUE_CHANGE_EVENT);
      }
    }
  }

}
