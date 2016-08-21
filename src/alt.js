import Alt from 'alt';

const alt = new Alt();

if (process.env.NODE_ENV !== 'production') {
  alt.dispatcher.register(console.log.bind(console));
  window.alt = alt;
}

export default alt;

