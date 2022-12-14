import * as React from 'react'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

import '../styles/globals.css'

import { useEffect } from 'react'

import { Analytics } from '@vercel/analytics/react';
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  id: "GTM-KDHCP8C",
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

  return (
  <div>
    <Component {...pageProps}/>
    <Analytics />
  </div>
)}

export default MyApp
