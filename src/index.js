import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import { SWRConfig } from 'swr'
import { ParallaxProvider } from 'react-scroll-parallax'

const fetcher = (...args) => axios.get(...args)

ReactDOM.render(
  <ParallaxProvider>
    <SWRConfig value={{revalidateOnFocus: true, fetcher}}>
      <App />
    </SWRConfig>
  </ParallaxProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
