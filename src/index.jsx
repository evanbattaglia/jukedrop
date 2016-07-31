import React from 'react';
import {render} from 'react-dom';
import JukedropApp from './components/JukedropApp.jsx';

render(
  <JukedropApp config={JukedropConfig} />,
  document.getElementById('content')
);

