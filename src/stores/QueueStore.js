class QueueStore {
  constructor() {
    this.queue = [];
  }

  addToQueue(paths) {
    let added = false;
    for (const path of paths) {
      if (!~queue.indexOf(path)) {
        queue.push(path);
        added = true;
      }
    }
    return added;
  }

}
