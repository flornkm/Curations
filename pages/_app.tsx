import * as React from 'react'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
      TagManager.initialize({ gtmId: 'GTM-KDHCP8C' });
  }, []);
  return (
  <div>
    <Component {...pageProps}/>
  </div>
)}

export default MyApp
