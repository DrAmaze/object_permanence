import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import Modal from 'react-modal';


document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();

  Modal.setAppElement(document.body);
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Welcome to object_permanence</h1>, root);
});
