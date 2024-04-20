import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import App from './components/app';

// function App() {
//   return <div className="test">All the REACT are belong to us!</div>;
// }

const root = createRoot(document.getElementById('main'));
root.render(<App />);
