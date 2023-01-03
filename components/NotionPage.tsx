import * as React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ExtendedRecordMap } from 'notion-types'
import { getPageTitle } from 'notion-utils'
import { NotionRenderer } from 'react-notion-x'
import TweetEmbed from 'react-tweet-embed'

import { Loading } from './Loading'
import { useEffect } from 'react'
import { useState } from 'react'

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-c.js'),
      import('prismjs/components/prism-cpp.js'),
      import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-java.js'),
      import('prismjs/components/prism-js-templates.js'),
      import('prismjs/components/prism-coffeescript.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-graphql.js'),
      import('prismjs/components/prism-handlebars.js'),
      import('prismjs/components/prism-less.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-objectivec.js'),
      import('prismjs/components/prism-ocaml.js'),
      import('prismjs/components/prism-python.js'),
      import('prismjs/components/prism-reason.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-sass.js'),
      import('prismjs/components/prism-scss.js'),
      import('prismjs/components/prism-solidity.js'),
      import('prismjs/components/prism-sql.js'),
      import('prismjs/components/prism-stylus.js'),
      import('prismjs/components/prism-swift.js'),
      import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js')
    ])
    return m.Code
  })
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection 
  )

)

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)

const Tweet = ({ id }: { id: string }) => {
  return <TweetEmbed tweetId={id} />
}

export const NotionPage = ({
  recordMap,
  previewImagesEnabled,
  rootPageId,
  rootDomain
}: {
  recordMap: ExtendedRecordMap
  previewImagesEnabled?: boolean
  rootPageId?: string
  rootDomain?: string
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loading />
  }

  if (!recordMap) {
    return null
  }

  const dev = false;

  const title = getPageTitle(recordMap)

  const subProductivity = [];
  const subDesign = [];
  const subLearning = [];
  const subDevelopment = [];

  const designRef = React.useRef(null);
  const productivityRef = React.useRef(null);
  const learningRef = React.useRef(null);
  const developmentRef = React.useRef(null);

  const asPath = router.asPath;
  const currPage = router.query.pageId;


    // list all cards with class name .notion-property-multi_select-item notion-item-default
  // const cards = document.querySelectorAll('.notion-collection-card-property:not(:first-child)');

  const socialDescription = 'Giving you the best resources to learn and grow as a developer, designer, entrepreneur or whoever you are. We are a community of people who are passionate about learning and sharing knowledge.';
  const socialImage =
    'https://curations.tech/curations_social_image.jpg'

  if (!dev) {
  recordMap.collection['c5681206-1c5f-42ed-9550-6084dbdcab26'].value.schema[":HNW"].options.map((item) => {
    subProductivity.push(item.value);
  })

  recordMap.collection['c5681206-1c5f-42ed-9550-6084dbdcab26'].value.schema["K[S^"].options.map((item) => {
    subDesign.push(item.value);
  })

  recordMap.collection['c5681206-1c5f-42ed-9550-6084dbdcab26'].value.schema.Pbex.options.map((item) => {
    subLearning.push(item.value);
  })

  recordMap.collection['c5681206-1c5f-42ed-9550-6084dbdcab26'].value.schema.zQcd.options.map((item) => {
    subDevelopment.push(item.value);
  })

  // Append the subcategory component after the notion class notion-collection-view-tabs-row
  const appendSubcategory = (category) => {
    const tabsRow = document.querySelector('.notion-collection-view-tabs-row');
    const subcategory = document.createElement('div');
    const width = 24;
    const height = 24;
    category.forEach(element => {
      if (element === 'All') {
        subcategory.innerHTML += '<div>' + `<svg class="svgActive" width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13 2.05S16 6 16 12c0 6-3 9.95-3 9.95M11 21.95S8 18 8 12c0-6 3-9.95 3-9.95M2.63 15.5h18.74M2.63 8.5h18.74" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p class="subActive"> ' + element + ' </p>' + '</div>';
      } else if (element === '3D Assets') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21 7.353v9.294a.6.6 0 01-.309.525l-8.4 4.666a.6.6 0 01-.582 0l-8.4-4.666A.6.6 0 013 16.647V7.353a.6.6 0 01.309-.524l8.4-4.667a.6.6 0 01.582 0l8.4 4.667a.6.6 0 01.309.524z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.528 7.294l8.18 4.544a.6.6 0 00.583 0l8.209-4.56M12 21v-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Design Inspiration') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21 2l-1 1M3 2l1 1M21 16l-1-1M3 16l1-1M9 18h6M10 21h4M12 3C8 3 5.952 4.95 6 8c.023 1.487.5 2.5 1.5 3.5S9 13 9 15h6c0-2 .5-2.5 1.5-3.5h0c1-1 1.477-2.013 1.5-3.5.048-3.05-2-5-6-5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Icons') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 16a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Illustrations') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><g clip-path="url(#design-nib_svg__clip0_2585_14438)" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.674 11.408l-1.905 5.715a.6.6 0 01-.398.386L3.693 20.98a.6.6 0 01-.74-.765L6.745 8.841a.6.6 0 01.34-.365l5.387-2.218a.6.6 0 01.653.13l4.404 4.405a.6.6 0 01.145.615zM3.296 20.602l6.364-6.364"></path><path d="M17.792 11.056l2.828-2.829a2 2 0 000-2.828L18.5 3.277a2 2 0 00-2.829 0l-2.828 2.829M11.781 12.116a1.5 1.5 0 10-2.121 2.122 1.5 1.5 0 002.121-2.122z"></path></g><defs><clipPath id="design-nib_svg__clip0_2585_14438"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Mockups') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M2 15.5V2.6a.6.6 0 01.6-.6h18.8a.6.6 0 01.6.6v12.9m-20 0v1.9a.6.6 0 00.6.6h18.8a.6.6 0 00.6-.6v-1.9m-20 0h20M9 22h1.5m0 0v-4m0 4h3m0 0H15m-1.5 0v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Figma Community') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13 2.05S16 6 16 12c0 6-3 9.95-3 9.95M11 21.95S8 18 8 12c0-6 3-9.95 3-9.95M2.63 15.5h18.74M2.63 8.5h18.74" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Figma') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6 6a3 3 0 013-3h3v6H9a3 3 0 01-3-3zM12 3h3a3 3 0 010 6h-3V3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12a3 3 0 116 0 3 3 0 01-6 0v0zM6 18a3 3 0 013-3h3v3a3 3 0 01-6 0zM6 12a3 3 0 013-3h3v6H9a3 3 0 01-3-3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Tools') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M10.05 10.607l-7.07 7.07a2 2 0 000 2.83v0a2 2 0 002.828 0l7.07-7.072M17.193 13.8l3.878 3.878a2 2 0 010 2.828v0a2 2 0 01-2.828 0l-6.209-6.208M6.733 5.904L4.61 6.61 2.49 3.075l1.414-1.414L7.44 3.782l-.707 2.122zm0 0l2.83 2.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.05 10.607c-.844-2.153-.679-4.978 1.061-6.718 1.74-1.74 4.95-2.121 6.717-1.06l-3.04 3.04-.283 3.111 3.111-.282 3.04-3.041c1.062 1.768.68 4.978-1.06 6.717-1.74 1.74-4.564 1.905-6.717 1.061" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Inspiration') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21 2l-1 1M3 2l1 1M21 16l-1-1M3 16l1-1M9 18h6M10 21h4M12 3C8 3 5.952 4.95 6 8c.023 1.487.5 2.5 1.5 3.5S9 13 9 15h6c0-2 .5-2.5 1.5-3.5h0c1-1 1.477-2.013 1.5-3.5.048-3.05-2-5-6-5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Colors') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 14.5a6 6 0 100-12 6 6 0 000 12z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 21.5a6 6 0 100-12 6 6 0 000 12z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 21.5a6 6 0 100-12 6 6 0 000 12z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Product Pages') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M2 19V5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2z" stroke="currentColor" stroke-width="1.5"></path><path d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Design Systems') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M4.998 2H2v2.998h2.998V2zM4.998 3.501h14M3.499 4.998V19M20.497 5v14.002M4.998 20.501h14M4.998 19H2v2.998h2.998V19zM21.996 2.002h-2.998V5h2.998V2.002zM21.996 19.002h-2.998V22h2.998v-2.998z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Design Studios') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M1 20v-1a7 7 0 017-7v0a7 7 0 017 7v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M13 14v0a5 5 0 015-5v0a5 5 0 015 5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M8 12a4 4 0 100-8 4 4 0 000 8zM18 9a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Moodboards') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M14 20.4v-5.8a.6.6 0 01.6-.6h5.8a.6.6 0 01.6.6v5.8a.6.6 0 01-.6.6h-5.8a.6.6 0 01-.6-.6zM3 20.4v-5.8a.6.6 0 01.6-.6h5.8a.6.6 0 01.6.6v5.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6zM14 9.4V3.6a.6.6 0 01.6-.6h5.8a.6.6 0 01.6.6v5.8a.6.6 0 01-.6.6h-5.8a.6.6 0 01-.6-.6zM3 9.4V3.6a.6.6 0 01.6-.6h5.8a.6.6 0 01.6.6v5.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6z" stroke="currentColor" stroke-width="1.5"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Fonts') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M19 7V5H5v2M12 5v14m0 0h-2m2 0h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Images') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21 7.6v12.8a.6.6 0 01-.6.6H7.6a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6h12.8a.6.6 0 01.6.6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 4H4.6a.6.6 0 00-.6.6V18M7 16.8l5.444-1.8L21 18M16.5 13a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Portfolios') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Products') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M19.26 9.696l1.385 9A2 2 0 0118.67 21H5.33a2 2 0 01-1.977-2.304l1.385-9A2 2 0 016.716 8h10.568a2 2 0 011.977 1.696zM14 5a2 2 0 10-4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Wallpapers') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21 3.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16l7-3 11 5M16 10a2 2 0 110-4 2 2 0 010 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Coding Info') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 11.5v5M12 7.51l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'IDE') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M2 19V5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2z" stroke="currentColor" stroke-width="1.5"></path><path d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'CSS') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M4 3l1.778 17.09L12 22l6.222-1.91L20 3H4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7h9.5l-1 10-3.5 1-3.5-1-.25-2.5M16 11.5H7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Arduino') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M7 19.4V4.6a.6.6 0 01.6-.6h8.8a.6.6 0 01.6.6v14.8a.6.6 0 01-.6.6H7.6a.6.6 0 01-.6-.6zM14 20v2.5M10 20v2.5M14 4V1.5M10 4V1.5M7 12H4.5M19.5 12H17M7 6.5H4.5M19.5 6.5H17M7 17.5H4.5M19.5 17.5H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Repositories') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M4 19V5a2 2 0 012-2h13.4a.6.6 0 01.6.6v13.114" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M15 17v5l2.5-1.6L20 22v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 17h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 17a2 2 0 100 4h5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'VS Code Extensions') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M13.992 17h3m3 0h-3m0 0v-3m0 3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 9.4V4.6a.6.6 0 01.6-.6h4.8a.6.6 0 01.6.6v4.8a.6.6 0 01-.6.6H4.6a.6.6 0 01-.6-.6zM4 19.4v-4.8a.6.6 0 01.6-.6h4.8a.6.6 0 01.6.6v4.8a.6.6 0 01-.6.6H4.6a.6.6 0 01-.6-.6zM14 9.4V4.6a.6.6 0 01.6-.6h4.8a.6.6 0 01.6.6v4.8a.6.6 0 01-.6.6h-4.8a.6.6 0 01-.6-.6z" stroke="currentColor" stroke-width="1.5"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Frameworks') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><rect width="7" height="5" rx="0.6" transform="matrix(1 0 0 -1 3 22)" stroke="currentColor" stroke-width="1.5"></rect><rect width="7" height="5" rx="0.6" transform="matrix(1 0 0 -1 8.5 7)" stroke="currentColor" stroke-width="1.5"></rect><rect width="7" height="5" rx="0.6" transform="matrix(1 0 0 -1 14 22)" stroke="currentColor" stroke-width="1.5"></rect><path d="M6.5 17v-3.5a2 2 0 012-2h7a2 2 0 012 2V17M12 11.5V7" stroke="currentColor" stroke-width="1.5"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Surveys') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M20 12V5.749a.6.6 0 00-.176-.425l-3.148-3.148A.6.6 0 0016.252 2H4.6a.6.6 0 00-.6.6v18.8a.6.6 0 00.6.6H11M8 10h8M8 6h4m-4 8h3M17.954 16.94l1-1a1.121 1.121 0 011.586 0v0a1.121 1.121 0 010 1.585l-1 1m-1.586-1.586l-2.991 2.991a1 1 0 00-.28.553l-.244 1.557 1.557-.243a1 1 0 00.553-.28l2.99-2.992m-1.585-1.586l1.586 1.586" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 2v3.4a.6.6 0 00.6.6H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Browser Extensions') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M2 19V5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2z" stroke="currentColor" stroke-width="1.5"></path><path d="M2 7h20M9 14h3m3 0h-3m0 0v-3m0 3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Typing') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zM5 8.5h1.5m1.5 0H6.5m0 0v7m0 0H5m1.5 0H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Coding Music') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M20 14V3L9 5v11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 19h1a2 2 0 002-2v-3h-3a2 2 0 00-2 2v1a2 2 0 002 2zM6 21h1a2 2 0 002-2v-3H6a2 2 0 00-2 2v1a2 2 0 002 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Mac Apps') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M16 2H8a6 6 0 00-6 6v8a6 6 0 006 6h8a6 6 0 006-6V8a6 6 0 00-6-6z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 2"></path><path d="M16 5H8a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3V8a3 3 0 00-3-3z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Project Management') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.4 6H6.6a.6.6 0 00-.6.6v10.8a.6.6 0 00.6.6h3.8a.6.6 0 00.6-.6V6.6a.6.6 0 00-.6-.6zM17.4 6h-3.8a.6.6 0 00-.6.6v6.8a.6.6 0 00.6.6h3.8a.6.6 0 00.6-.6V6.6a.6.6 0 00-.6-.6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Audiovisual') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M2 14v-4a1 1 0 011-1h2.697a1 1 0 00.555-.168l4.193-2.796A1 1 0 0112 6.87V17.13a1 1 0 01-1.555.832l-4.193-2.795A1 1 0 005.697 15H3a1 1 0 01-1-1z" stroke="currentColor" stroke-width="1.5"></path><path d="M16.5 7.5S18 9 18 11.5s-1.5 4-1.5 4M19.5 4.5S22 7 22 11.5s-2.5 7-2.5 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Notion Templates') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6 6h12M6 10h12M13 14h5M13 18h5M2 21.4V2.6a.6.6 0 01.6-.6h18.8a.6.6 0 01.6.6v18.8a.6.6 0 01-.6.6H2.6a.6.6 0 01-.6-.6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 18v-4h3v4H6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'File Sharing') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M20 13V5.749a.6.6 0 00-.176-.425l-3.148-3.148A.6.6 0 0016.252 2H4.6a.6.6 0 00-.6.6v18.8a.6.6 0 00.6.6H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 2v3.4a.6.6 0 00.6.6H20M16 19h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Analytics') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M20 20H4V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 16.5L12 9l3 3 4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Job Boards') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M8 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-4M8 7V3.6a.6.6 0 01.6-.6h6.8a.6.6 0 01.6.6V7M8 7h8" stroke="currentColor" stroke-width="1.5"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Presentations') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M7 21h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 16.4V3.6a.6.6 0 01.6-.6h18.8a.6.6 0 01.6.6v12.8a.6.6 0 01-.6.6H2.6a.6.6 0 01-.6-.6z" stroke="currentColor" stroke-width="1.5"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Books') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" stroke-width="1.5" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#currentColor"><path d="M4 19V5a2 2 0 012-2h13.4a.6.6 0 01.6.6v13.114M6 17h14M6 21h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 21a2 2 0 110-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 7h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Quotes') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M3 20.29V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H7.961a2 2 0 00-1.561.75l-2.331 2.914A.6.6 0 013 20.29z" stroke="currentColor" stroke-width="1.5"></path><path d="M10.5 10h-2a1 1 0 01-1-1V8a1 1 0 011-1h1a1 1 0 011 1v2zm0 0c0 1-1 2-2 3M16.5 10h-2a1 1 0 01-1-1V8a1 1 0 011-1h1a1 1 0 011 1v2zm0 0c0 1-1 2-2 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Digital Magazines') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 21V7a2 2 0 012-2h7.4a.6.6 0 01.6.6v13.114M12 21V7a2 2 0 00-2-2H2.6a.6.6 0 00-.6.6v13.114M14 19h8M10 19H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M12 21a2 2 0 012-2M12 21a2 2 0 00-2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Documentations') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21 7.6v12.8a.6.6 0 01-.6.6H7.6a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6h12.8a.6.6 0 01.6.6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 4H4.6a.6.6 0 00-.6.6V18M12.909 11.545a.6.6 0 00-.909.515v3.88a.6.6 0 00.909.515l3.233-1.94a.6.6 0 000-1.03l-3.233-1.94z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Instagram Pages') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 16a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16V8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5z" stroke="currentColor" stroke-width="1.5"></path><path d="M17.5 6.51l.01-.011" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Material') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21 2l-1 1M3 2l1 1M21 16l-1-1M3 16l1-1M9 18h6M10 21h4M12 3C8 3 5.952 4.95 6 8c.023 1.487.5 2.5 1.5 3.5S9 13 9 15h6c0-2 .5-2.5 1.5-3.5h0c1-1 1.477-2.013 1.5-3.5.048-3.05-2-5-6-5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Resource Pages') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M14 20.4v-5.8a.6.6 0 01.6-.6h5.8a.6.6 0 01.6.6v5.8a.6.6 0 01-.6.6h-5.8a.6.6 0 01-.6-.6zM3 20.4v-5.8a.6.6 0 01.6-.6h5.8a.6.6 0 01.6.6v5.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6zM14 9.4V3.6a.6.6 0 01.6-.6h5.8a.6.6 0 01.6.6v5.8a.6.6 0 01-.6.6h-5.8a.6.6 0 01-.6-.6zM3 9.4V3.6a.6.6 0 01.6-.6h5.8a.6.6 0 01.6.6v5.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6z" stroke="currentColor" stroke-width="1.5"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'YT Videos') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M14 12l-3.5 2v-4l3.5 2z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 12.707v-1.415c0-2.895 0-4.343.905-5.274.906-.932 2.332-.972 5.183-1.053C9.438 4.927 10.818 4.9 12 4.9c1.181 0 2.561.027 3.912.065 2.851.081 4.277.121 5.182 1.053.906.931.906 2.38.906 5.274v1.415c0 2.896 0 4.343-.905 5.275-.906.931-2.331.972-5.183 1.052-1.35.039-2.73.066-3.912.066-1.181 0-2.561-.027-3.912-.066-2.851-.08-4.277-.12-5.183-1.052C2 17.05 2 15.602 2 12.708z" stroke="currentColor" stroke-width="1.5"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Startups') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M16.061 10.404L14 17h-4l-2.061-6.596a6 6 0 01.998-5.484l2.59-3.315a.6.6 0 01.946 0l2.59 3.315a6 6 0 01.998 5.484zM10 20c0 2 2 3 2 3s2-1 2-3M8.5 12.5C5 15 7 19 7 19l3-2M15.931 12.5c3.5 2.5 1.5 6.5 1.5 6.5l-3-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 11a2 2 0 110-4 2 2 0 010 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Blogs') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M20 12V5.749a.6.6 0 00-.176-.425l-3.148-3.148A.6.6 0 0016.252 2H4.6a.6.6 0 00-.6.6v18.8a.6.6 0 00.6.6H11M8 10h8M8 6h4m-4 8h3M17.954 16.94l1-1a1.121 1.121 0 011.586 0v0a1.121 1.121 0 010 1.585l-1 1m-1.586-1.586l-2.991 2.991a1 1 0 00-.28.553l-.244 1.557 1.557-.243a1 1 0 00.553-.28l2.99-2.992m-1.585-1.586l1.586 1.586" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 2v3.4a.6.6 0 00.6.6H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else if (element === 'Featured') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M8.587 8.236l2.598-5.232a.911.911 0 011.63 0l2.598 5.232 5.808.844a.902.902 0 01.503 1.542l-4.202 4.07.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75-4.202-4.07a.902.902 0 01.503-1.54l5.808-.845z" stroke="currentColor" stroke-width="1.48" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
      } else {
        subcategory.innerHTML += '<div>' + '<p> ' + element + ' </p>' + '</div>';
      }
    });
    subcategory.classList.add('subcategory');

    tabsRow.after(subcategory);
  }

  // Detach all subcategorys inserted after the notion class notion-collection-view-tabs-row
  const detachSubcategory = () => {
    const subcategorys = document.querySelectorAll('.subcategory');
    subcategorys.forEach((subcategory) => {
      subcategory.remove();
    })
  }

  // useful for debugging from the dev console
  if (typeof window !== 'undefined') {
    const keys = Object.keys(recordMap?.block || {})
    const block = recordMap?.block?.[keys[0]]?.value
    const g = window as any
    g.recordMap = recordMap
    g.block = block
  } 

  // If the router.query is not empty click a tab
  useEffect(() => {
    const mainCategories = document.querySelectorAll('.notion-collection-view-tabs-content-item') as NodeListOf<HTMLElement>;

    if (router.query.category) {
      mainCategories.forEach((mainCategory) => {
        if (mainCategory.innerText.toLowerCase() === router.query.category) {
          mainCategory.click();
          console.log('clicking main category: ' + mainCategory.innerText.toLowerCase());
        }
      })
    }
    
  }, [router.query])

  useEffect(() => {
    // Animate Contact Wrapper
    const contactWrapper = document.querySelector('.contact-wrapper') as HTMLElement;
    const closeField = document.querySelector('.close') as HTMLElement;
    const notionTitle = document.querySelector('.notion-title') as HTMLElement;
    const overlappingNav = document.querySelector('.notion-collection-view-tabs-row') as HTMLElement;
    contactWrapper.style.transition = 'all 0.3s ease-in-out';
    contactWrapper.style.right = '-100%';
    contactWrapper.style.opacity = '0';
    contactWrapper.style.pointerEvents = 'none';
    document.body.style.overflow = 'initial';
    // insert contactIcon in the notion title
    const check= document.querySelector('.contact-icon');
    if (check === null) {
      const contactIcon = '<div class="contact-icon"><svg width="32px" height="32px" stroke-width="1.3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>';
      notionTitle.innerHTML += contactIcon;
    }
    const contact = document.querySelector('.contact-icon') as HTMLElement;
    contact.style.transition = 'all 0.2s ease-in-out';
    let clickCounter = 0;
    contact.addEventListener('click', () => {
      if (clickCounter === 0) {
      contact.style.rotate = '45deg';
      contactWrapper.style.right = '0%';
      contactWrapper.style.opacity = '1';
      contactWrapper.style.pointerEvents = 'all';
      // disable scroll
      document.body.style.overflow = 'hidden';
      if (window.innerWidth < 971) {
        overlappingNav.style.display = 'none';
      }
      clickCounter++;
      } else {
        contact.style.rotate = '0deg';
        contactWrapper.style.right = '-100%';
        contactWrapper.style.opacity = '0';
        contactWrapper.style.pointerEvents = 'none';
        clickCounter--;
        document.body.style.overflow = 'initial';
        if (window.innerWidth < 971) {
          overlappingNav.style.display = 'flex';
        }
      }
    })
    closeField.addEventListener('click', () => {
      contact.style.rotate = '0deg';
      contactWrapper.style.right = '-100%';
      contactWrapper.style.opacity = '0';
      contactWrapper.style.pointerEvents = 'none';
      clickCounter--;
      document.body.style.overflow = 'initial';
    });

    const buttonContent = document.querySelector('.buttonContent') as HTMLElement;
 
    // Log Mouse over buttonContent
    buttonContent.addEventListener('mousemove', (e) => {
      var x = e.clientX;
      var y = e.clientY;
       
      // log the mouse position in the console on top of the element buttonContent with left top corner as 0,0
      // make the x and y position relative to the buttonContent element
      x = x - buttonContent.getBoundingClientRect().left;
      y = y - buttonContent.getBoundingClientRect().top;
      // convert into percentage
      x = x / buttonContent.offsetWidth * 100;
      y = y / buttonContent.offsetHeight * 100;

      const buttonGradient = document.querySelector('.buttonGradient') as HTMLElement;
      buttonGradient.style.background = `radial-gradient(circle at ${Math.round(x)}% ${Math.round(y)}%, #8b8b8b 0%, #00000000 70%)`;
    });

    const submitButton = document.querySelector('.submitButton') as HTMLElement;
    const inputLink = document.querySelector('.inputLink') as HTMLInputElement;

    function isValidHttpUrl(string) {
      let url;
      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    }

    submitButton.addEventListener('click', () => {
      const link = inputLink.value;
      const contributeForm = document.querySelector('.contribute-form') as HTMLElement;
      const thanksWrapper = document.querySelector('.thanks-wrapper') as HTMLElement;
      if (isValidHttpUrl(link)) {
      // if link is not empty, send it to the server
      fetch(process.env.DISCORD_HOOK, {
        body: JSON.stringify({
          content: `${link}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      .then((response) => {
      if (response.status === 204) {
        setTimeout(() => {
          contributeForm.style.display = 'none';
          thanksWrapper.style.display = 'flex';
        }, 1000);
        setTimeout(() => {
          thanksWrapper.style.display = 'none';
          contributeForm.style.display = 'flex';
          inputLink.value = '';
        }, 1500);
      }
      })
      .catch ((error) => {
        console.log(error);
      })
      } else if (link === '') {
        setState('Please enter a link');
      } else {
        setState('Please enter a valid link');
      }
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {

      // Navigation Rectangle Navigation 
      const navLinks = document.querySelectorAll('.notion-collection-view-tabs-content-item') as NodeListOf<HTMLElement>;
      const activeLink = document.querySelector('.notion-collection-view-tabs-content-item-active') as HTMLElement;
      
      // Create a div rectangle in .notion-collection-view-tabs-row 
      const navRectangle = document.createElement('div');
      navRectangle.classList.add('nav-rectangle');
      document.querySelector('.notion-collection-view-tabs-row').appendChild(navRectangle);

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navRectangle.style.width = `${link.offsetWidth}px`;
          navRectangle.style.left = `${link.offsetLeft}px`;
        })
      })
      navRectangle.style.width = `${activeLink.offsetWidth}px`;
      navRectangle.style.left = `${activeLink.offsetLeft}px`;

      // Navigation scroll
      const slider = document.querySelector('.notion-page-content-inner').children[0].children[0] as HTMLElement;
      // slideChilds as array of HTMLElement
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('grab');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('grab');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('grab');
      });
      slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1;
        slider.scrollLeft = scrollLeft - walk;
      });

      const urls = document.querySelectorAll('.notion-property-text') as NodeListOf<HTMLAnchorElement>;
      urls.forEach((url) => {
        const cardUrl = url.parentElement.parentElement.parentElement as HTMLLinkElement
        cardUrl.href = url.innerHTML + '?ref=curations.tech';
        cardUrl.setAttribute('target', '_blank');
      });
    }, 200);

    const mainNav = document.querySelector('.notion-collection-view-tabs-row');
    const subNav = document.querySelector('.subcategory');

    if (mainNav) {
      mainNav.addEventListener('click', (e) => {
        // Typescript HTML Element button element
        const target = e.target as HTMLButtonElement;

        document.querySelector('.notion-page-content-inner').children[0].children[0].scrollLeft = 0;
        window.scrollTo(0, 0);

        if (target.textContent == 'Productivity') {
          detachSubcategory();
          appendSubcategory(subProductivity);

          router.push({
            pathname: '/',
            query: {
               category: "productivity"  // update the query param
            }
         }, undefined, { shallow: true})

              // Add Event Listener to each subcategory
              setTimeout(() => {
                const subcategorys = document.querySelectorAll('.subcategory div');
                subcategorys.forEach((subcategory) => {
                  subcategory.addEventListener('click', (e) => {
                    const target = e.target as HTMLButtonElement;
                    const subActives = document.querySelectorAll('.subActive');
                    const svgActives = document.querySelectorAll('.svgActive');

                    router.push({
                      pathname: '/',
                      query: {
                         category: "productivity",  // update the query param
                         subcategory: target.innerText
                      }
                   }, undefined, { shallow: true})

                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    svgActives.forEach((svgActive) => {
                      svgActive.classList.remove('svgActive');
                    });
                    target.classList.add('subActive');
                    target.previousElementSibling.classList.add('svgActive');
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.parentElement.innerText.includes(target.innerText)) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      }
                    })
                  })
                })
              }, 200);
        }
        if (target.textContent == 'Design') {
          detachSubcategory();
          appendSubcategory(subDesign);

          router.push({
            pathname: '/',
            query: {
               category: "design"  // update the query param
            }
         }, undefined, { shallow: true})

             // Add Event Listener to each subcategory
             setTimeout(() => {
              const subcategorys = document.querySelectorAll('.subcategory div');
              subcategorys.forEach((subcategory) => {
                subcategory.addEventListener('click', (e) => {
                  const target = e.target as HTMLButtonElement;
                  const subActives = document.querySelectorAll('.subActive');
                    const svgActives = document.querySelectorAll('.svgActive');

                    router.push({
                      pathname: '/',
                      query: {
                         category: "design",  // update the query param
                         subcategory: target.innerText
                      }
                   }, undefined, { shallow: true})

                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    svgActives.forEach((svgActive) => {
                      svgActive.classList.remove('svgActive');
                    });
                    target.classList.add('subActive');
                    target.previousElementSibling.classList.add('svgActive');
                  const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                  // Filter the cards
                  cards.forEach((card) => {
                    if (card.parentElement.innerText.includes(target.innerText)) {
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                    } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    }
                  })
                })
              })
            }, 200);
        }
        if (target.textContent == 'Learning') {
          detachSubcategory();
          appendSubcategory(subLearning);

          router.push({
            pathname: '/',
            query: {
               category: "learning"  // update the query param
            }
         }, undefined, { shallow: true})

            // Add Event Listener to each subcategory
            setTimeout(() => {
              const subcategorys = document.querySelectorAll('.subcategory div');
              subcategorys.forEach((subcategory) => {
                subcategory.addEventListener('click', (e) => {
                  const target = e.target as HTMLButtonElement;
                  const subActives = document.querySelectorAll('.subActive');
                    const svgActives = document.querySelectorAll('.svgActive');

                    router.push({
                      pathname: '/',
                      query: {
                         category: "learning",  // update the query param
                         subcategory: target.innerText
                      }
                   }, undefined, { shallow: true})

                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    svgActives.forEach((svgActive) => {
                      svgActive.classList.remove('svgActive');
                    });
                    target.classList.add('subActive');
                    target.previousElementSibling.classList.add('svgActive');
                  const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                  // Filter the cards
                  cards.forEach((card) => {
                    if (card.parentElement.innerText.includes(target.innerText)) {
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                    } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    }
                  })
                })
              })
            }, 200);
        }
        if (target.textContent == 'Development') {
          detachSubcategory();
          appendSubcategory(subDevelopment);

          router.push({
            pathname: '/',
            query: {
               category: "development"  // update the query param
            }
         }, undefined, { shallow: true})

            // Add Event Listener to each subcategory
            setTimeout(() => {
              const subcategorys = document.querySelectorAll('.subcategory div');
              subcategorys.forEach((subcategory) => {
                subcategory.addEventListener('click', (e) => {
                  const target = e.target as HTMLButtonElement;
                  const subActives = document.querySelectorAll('.subActive');
                    const svgActives = document.querySelectorAll('.svgActive');

                    router.push({
                      pathname: '/',
                      query: {
                         category: "development",  // update the query param
                         subcategory: target.innerText
                      }
                   }, undefined, { shallow: true})

                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    svgActives.forEach((svgActive) => {
                      svgActive.classList.remove('svgActive');
                    });
                    target.classList.add('subActive');
                    target.previousElementSibling.classList.add('svgActive');
                  const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                  // Filter the cards
                  cards.forEach((card) => {
                    if (card.parentElement.innerText.includes(target.innerText)) {
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                    } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    }

                    // if (card.parentElement.innerText.includes(target.innerText)) {
                    //   console.log('yes!!!!');
                    //   card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    // } 
                  })
                })
              })
            }, 200);
        }
        if (target.textContent == 'All') {
          detachSubcategory(); 

          router.push({
            pathname: '/',
         }, undefined, { shallow: true})
        }

        setTimeout(() => {
          const urls = document.querySelectorAll('.notion-property-text') as NodeListOf<HTMLAnchorElement>;
              urls.forEach((url) => {
                const cardUrl = url.parentElement.parentElement.parentElement as HTMLLinkElement
                cardUrl.href = url.innerHTML + '?ref=curations.tech';
                cardUrl.setAttribute('target', '_blank');
          });
        }, 200);

      });
    }

  }, [])

  useEffect(() => {
    setTimeout(() => {
      const nav = document.querySelector('.notion-collection-view-tabs-row') as HTMLDivElement;
      nav.style.transition = 'top 0.1s cubic-bezier(0.61, 0, 0, 1.74) 0s';
      if (window.innerWidth < 971) {
        window.addEventListener('scroll', () => {  
          if (window.scrollY > 64) {
            nav.style.top = '32px';
          } else {
            nav.style.top = '80px';
          }
        })
    }
    }, 200);
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const activeMain = document.querySelector('button.notion-collection-view-tabs-content-item-active');

      if (activeMain.children[0].textContent == 'Productivity') {
        detachSubcategory();
        appendSubcategory(subProductivity);

        const subcategorys = document.querySelectorAll('.subcategory div');
                subcategorys.forEach((subcategory) => {
                  subcategory.addEventListener('click', (e) => {
                    const target = e.target as HTMLButtonElement;
                    const subActives = document.querySelectorAll('.subActive');
                    const svgActives = document.querySelectorAll('.svgActive');

                    router.push({
                      pathname: '/',
                      query: {
                         category: "productivity",  // update the query param
                         subcategory: target.innerText
                      }
                   }, undefined, { shallow: true})

                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    svgActives.forEach((svgActive) => {
                      svgActive.classList.remove('svgActive');
                    });
                    target.classList.add('subActive');
                    target.previousElementSibling.classList.add('svgActive');
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.innerHTML == target.innerText) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      }
                    })
                  })
                })
      } else if (activeMain.children[0].textContent == 'Design') {
        detachSubcategory();
        appendSubcategory(subDesign);

        const subcategorys = document.querySelectorAll('.subcategory div');
                subcategorys.forEach((subcategory) => {
                  subcategory.addEventListener('click', (e) => {
                    const target = e.target as HTMLButtonElement;
                    const subActives = document.querySelectorAll('.subActive');
                    const svgActives = document.querySelectorAll('.svgActive');

                    router.push({
                      pathname: '/',
                      query: {
                         category: "design",  // update the query param
                         subcategory: target.innerText
                      }
                   }, undefined, { shallow: true})

                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    svgActives.forEach((svgActive) => {
                      svgActive.classList.remove('svgActive');
                    });
                    target.classList.add('subActive');
                    target.previousElementSibling.classList.add('svgActive');
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.innerHTML == target.innerText) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      }
                    })
                  })
                })
      } else if (activeMain.children[0].textContent == 'Learning') {
        detachSubcategory();
        appendSubcategory(subLearning);

        const subcategorys = document.querySelectorAll('.subcategory div');
                subcategorys.forEach((subcategory) => {
                  subcategory.addEventListener('click', (e) => {
                    const target = e.target as HTMLButtonElement;
                    const subActives = document.querySelectorAll('.subActive');
                    const svgActives = document.querySelectorAll('.svgActive');

                    router.push({
                      pathname: '/',
                      query: {
                         category: "learning",  // update the query param
                         subcategory: target.innerText
                      }
                   }, undefined, { shallow: true})

                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    svgActives.forEach((svgActive) => {
                      svgActive.classList.remove('svgActive');
                    });
                    target.classList.add('subActive');
                    target.previousElementSibling.classList.add('svgActive');
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.innerHTML == target.innerText) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      }
                    })
                  })
                })
      } else if (activeMain.children[0].textContent == 'Development') {
        detachSubcategory();
        appendSubcategory(subDevelopment);

        const subcategorys = document.querySelectorAll('.subcategory div');
                subcategorys.forEach((subcategory) => {
                  subcategory.addEventListener('click', (e) => {
                    const target = e.target as HTMLButtonElement;
                    const subActives = document.querySelectorAll('.subActive');
                    const svgActives = document.querySelectorAll('.svgActive');

                    router.push({
                      pathname: '/',
                      query: {
                         category: "development",  // update the query param
                         subcategory: target.innerText
                      }
                   }, undefined, { shallow: true})

                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    svgActives.forEach((svgActive) => {
                      svgActive.classList.remove('svgActive');
                    });
                    target.classList.add('subActive');
                    target.previousElementSibling.classList.add('svgActive');
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.innerHTML == target.innerText) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      }
                    })
                  })
                })
      } else if (activeMain.children[0].textContent == 'All') {
        detachSubcategory();
      }

      
    }, 200);
  }, [])
}

  const [myState, setState] = useState('');

  return (
    <>
      <Head>
        <>
        {socialDescription && (
          <>
            <meta name='description' content={socialDescription} />
            <meta property='og:description' content={socialDescription} />
            <meta name='twitter:description' content={socialDescription} />
          </>
        )}

        {socialImage ? (
          <>
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:image' content={socialImage} />
            <meta property='og:image' content={socialImage} />
          </>
        ) : (
          <meta name='twitter:card' content='summary' />
        )}
        </>

        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:creator' content='@transitive_bs' />
        
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootDomain={rootDomain}
        rootPageId={rootPageId}
        previewImages={previewImagesEnabled}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
          Equation,
          Pdf,  
          Modal,
          Tweet
        }}
        

        // NOTE: custom images will only take effect if previewImages is true and
        // if the image has a valid preview image defined in recordMap.preview_images[src]
      />
        <div className='contact-wrapper'>
          <div className='close'>
          </div>
          <div className='contact'>
            <div>
              <h3 className = 'about-title'> About </h3>
              <p className ='about-paragraph'> Curations was founded with one purpose in mind:<br/> Enable Designers and Developers to elevate their work by providing the best resources possible. </p>
              <p className ='about-paragraph' >This is a free open source project and we would love you to be part of this. If you know any helpful resources, just submit them below.</p>
              <br/><br/>
              <div className='contribute-form'>
                <div className='icontitle'>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="8.48535" width="12" height="12" rx="2" transform="rotate(-45 0 8.48535)" fill="#FC4733"/>
                  </svg>
                  <h4> Submit resource  </h4>
                </div>
                  <p className='submit-subheader'>Each link will be reviewed by us before implementation</p>
                  <div className='contribute-form-send'>
                    <input className='inputLink' placeholder='Enter link'></input>
                    <div className='buttonContent'>
                      <div className='buttonGradient'>
                      </div>
                      <button className='submitButton'>Submit</button>
                    </div>
                </div>
                <p className='status'>{myState}</p>
              </div>
              <div className='thanks-wrapper'>
                  <h4>Thank you!</h4>
              </div>
            </div>
            <div className='footer'>
            <a href="https://www.producthunt.com/posts/curations?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-curations" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=368614&theme=neutral" alt="Curations - Stunning&#0032;tools&#0044;&#0032;served&#0032;daily | Product Hunt" width="250" height="54" /></a>
              <p>You can also contribute with: </p>
              <div className='social'>
                <a href='https://discord.gg/EKHkxHHU' target='_blank'><svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.49" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M5.5 16c5 2.5 8 2.5 13 0M15.5 17.5l1 2s4.171-1.328 5.5-3.5c0-1 .53-8.147-3-10.5-1.5-1-4-1.5-4-1.5l-1 2h-2" stroke="currentColor" stroke-width="1.49" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.528 17.5l-1 2s-4.171-1.328-5.5-3.5c0-1-.53-8.147 3-10.5 1.5-1 4-1.5 4-1.5l1 2h2" stroke="currentColor" stroke-width="1.49" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2zM15.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2z" stroke="currentColor" stroke-width="1.49" stroke-linecap="round" stroke-linejoin="round"></path></svg>Discord</a>
                <a href='https://twitter.com/curationshq' target='_blank'><svg width="24px" height="24px" stroke-width="1.49" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="currentColor" stroke-width="1.49" stroke-linecap="round" stroke-linejoin="round"></path></svg>Twitter</a>
                <a href='https://github.com/floriandwt/Curations' target='_blank'><svg width="24px" height="24px" stroke-width="1.49" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 00-1.5-3.75 5.07 5.07 0 00-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 00-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 005 5.797a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87M9 20.027c-3 .973-5.5 0-7-3" stroke="currentColor" stroke-width="1.49" stroke-linecap="round" stroke-linejoin="round"></path></svg>GitHub</a>
              </div>
              <p>Built by <a href='https://www.antonstallboerger.com/'>Anton</a>, <a href='https://designwithtech.com/'>Florian</a> and <a href='https://www.nilseller.com/'>Nils</a></p>
            </div>
          </div>
        </div>
      </div>
      <div className='notion-full-width privacy-link'>
        <a href='./new'>What's new?</a>
        <a href='./legal-notice'>Legal Notice</a>
        <a href='./privacy-policy'>Privacy Policy</a>
      </div>
    </>
  )
}
