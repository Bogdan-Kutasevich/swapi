import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import ContextObject from "./Context/objectContext";
import ContextPagination from "./Context/PaginationContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <Provider store={store}>
          <BrowserRouter>
              <ContextPagination>
                  <ContextObject>
                      <App />
                  </ContextObject>
              </ContextPagination>
          </BrowserRouter>
      </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
