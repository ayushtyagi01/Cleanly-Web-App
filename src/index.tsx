import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import reduxStore from './redux/reduxStore';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';

Amplify.configure(awsExports);


// Sentry.init({
//   dsn: "https://a294e5fb87a24229bc25912ed0ea7f0a@o4504796898787328.ingest.sentry.io/4504796905603072",
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
