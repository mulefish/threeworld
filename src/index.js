import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App.js';
import store from './redux/index.js';

ReactDOM.render(
    // <StrictMode>
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    // </StrictMode>,
    document.getElementById('root')
);