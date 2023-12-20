import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './scss/styles.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
