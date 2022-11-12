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

  const title = getPageTitle(recordMap)
  console.log(title, recordMap)

  const subProductivity = [];
  const subDesign = [];
  const subLearning = [];
  const subDevelopment = [];


  recordMap.collection['c5681206-1c5f-42ed-9550-6084dbdcab26'].value.schema[":HNW"].options.map((item) => {
    console.log('Subcategory Productivity: '+item.value)
    subProductivity.push(item.value);
    console.log(subProductivity);
  })

  recordMap.collection['c5681206-1c5f-42ed-9550-6084dbdcab26'].value.schema["K[S^"].options.map((item) => {
    console.log('Subcategory Design: '+item.value);
    subDesign.push(item.value);
    console.log(subDesign);
  })

  recordMap.collection['c5681206-1c5f-42ed-9550-6084dbdcab26'].value.schema.Pbex.options.map((item) => {
    console.log('Subcategory Learning: '+item.value);
    subLearning.push(item.value);
    console.log(subLearning);
  })

  recordMap.collection['c5681206-1c5f-42ed-9550-6084dbdcab26'].value.schema.zQcd.options.map((item) => {
    console.log('Subcategory Development: '+item.value);
    subDevelopment.push(item.value);
    console.log(subDevelopment);
  })

  // Append the subcategory component after the notion class notion-collection-view-tabs-row
  const appendSubcategory = (category) => {
    const tabsRow = document.querySelector('.notion-collection-view-tabs-row');
    const subcategory = document.createElement('div');
    const width = 24;
    const height = 24;
    category.forEach(element => {
      if (element === 'All') {
        subcategory.innerHTML += '<div>' + `<svg width="${width}" height="${height}" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColorr"><path d="M3 9.5L12 4l9 5.5M19 13v6.4a.6.6 0 01-.6.6H5.6a.6.6 0 01-.6-.6V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p class="subActive"> ' + element + ' </p>' + '</div>';
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
        subcategory.innerHTML += '<div>' + `<svg width="${width}" stroke-width="1.5" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M4 19V5a2 2 0 012-2h13.4a.6.6 0 01.6.6v13.114" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M8 3v8l2.5-1.6L13 11V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 17h14M6 21h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 21a2 2 0 110-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` + '<p>' + element + ' </p>' + '</div>';
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
      } else {
        subcategory.innerHTML += '<div>' + '<p> ' + element + ' </p>' + '</div>';
      }
    });
    subcategory.classList.add('subcategory');

    // Add Arrow Div to Subcategory
    const arrow = document.createElement('span');
    const arrowIcon = '<div><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 12h12.5m0 0l-6-6m6 6l-6 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>'
    arrow.innerHTML = arrowIcon;
    arrow.classList.add('arrow');

    function appendArrow() {
      subcategory.appendChild(arrow);
    }

    // Log childrens of subcategory
    if (subcategory.children.length > 10 && window.innerWidth > 1400 && window.innerWidth < 1600) {
      appendArrow();
    }

    if (subcategory.children.length > 14 && window.innerWidth > 1800) {
      appendArrow();
    }
  

      arrow.addEventListener('click', () => {
        document.querySelector('.notion-page-content-inner').children[0].children[0].scrollLeft += document.querySelector('.subcategory').scrollWidth;
        console.log(document.querySelector('.subcategory').scrollWidth);
        console.log(document.querySelector('.notion-page-content-inner').children[0].children[0].scrollLeft);
        if (document.querySelector('.notion-page-content-inner').children[0].children[0].scrollLeft !== 0) {
          const arrowLeft = document.createElement('span');
          const arrowLeftIcon = '<div><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 12h12.5m0 0l-6-6m6 6l-6 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>'
          arrowLeft.innerHTML = arrowLeftIcon;
          arrowLeft.classList.add('arrow');
          arrowLeft.classList.add('left');
          arrow.remove();
          subcategory.appendChild(arrowLeft);
          arrowLeft.addEventListener('click', () => {
            document.querySelector('.notion-page-content-inner').children[0].children[0].scrollLeft -= document.querySelector('.subcategory').scrollWidth;
            if (document.querySelector('.notion-page-content-inner').children[0].children[0].scrollLeft === 0) {
              // Remove left arrow and add right arrow
              arrowLeft.remove();
              appendArrow()
            }
          });
        }
    });
    // After the tabs row, append the subcategory
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

  // list all cards with class name .notion-property-multi_select-item notion-item-default
  // const cards = document.querySelectorAll('.notion-collection-card-property:not(:first-child)');

  const socialDescription = 'React Notion X Demo'
  const socialImage =
    'https://react-notion-x-demo.transitivebullsh.it/social.jpg'

  useEffect(() => {
    setTimeout(() => {
      const urls = document.querySelectorAll('.notion-property-url') as NodeListOf<HTMLAnchorElement>;
      urls.forEach((url) => {
        const cardUrl = url.parentElement.parentElement.parentElement as HTMLLinkElement
        cardUrl.href = 'https://' + url.innerHTML + '/';
        cardUrl.setAttribute('target', '_blank');
        console.log('URL', url.parentElement.parentElement.parentElement);
      });
    }, 200);

    const mainNav = document.querySelector('.notion-collection-view-tabs-row');
    const subNav = document.querySelector('.subcategory');

    console.log(mainNav);
    if (mainNav) {
      mainNav.addEventListener('click', (e) => {
        // Typescript HTML Element button element
        const target = e.target as HTMLButtonElement;
        console.log(target.textContent);

        if (target.textContent == 'Productivity') {
          detachSubcategory();
          appendSubcategory(subProductivity);

              // Add Event Listener to each subcategory
              setTimeout(() => {
                const subcategorys = document.querySelectorAll('.subcategory div');
                subcategorys.forEach((subcategory) => {
                  subcategory.addEventListener('click', (e) => {
                    const target = e.target as HTMLButtonElement;
                    const subActives = document.querySelectorAll('.subActive');
                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    target.classList.add('subActive');
                    console.log(target.textContent);
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.innerHTML == target.innerText) {
                        console.log(card.parentElement.parentElement);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        console.log(card.innerHTML);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        console.log('All');
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

             // Add Event Listener to each subcategory
             setTimeout(() => {
              const subcategorys = document.querySelectorAll('.subcategory div');
              subcategorys.forEach((subcategory) => {
                subcategory.addEventListener('click', (e) => {
                  const target = e.target as HTMLButtonElement;
                  const subActives = document.querySelectorAll('.subActive');
                  subActives.forEach((subActive) => {
                    subActive.classList.remove('subActive');
                  });
                  target.classList.add('subActive');
                  console.log(target.textContent);
                  const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                  // Filter the cards
                  cards.forEach((card) => {
                    if (card.innerHTML == target.innerText) {
                      console.log(card.parentElement.parentElement);
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                      console.log(card.innerHTML);
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                    } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                      console.log('All');
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

            // Add Event Listener to each subcategory
            setTimeout(() => {
              const subcategorys = document.querySelectorAll('.subcategory div');
              subcategorys.forEach((subcategory) => {
                subcategory.addEventListener('click', (e) => {
                  const target = e.target as HTMLButtonElement;
                  const subActives = document.querySelectorAll('.subActive');
                  subActives.forEach((subActive) => {
                    subActive.classList.remove('subActive');
                  });
                  target.classList.add('subActive');
                  console.log(target.textContent);
                  const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                  // Filter the cards
                  cards.forEach((card) => {
                    if (card.innerHTML == target.innerText) {
                      console.log(card.parentElement.parentElement);
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                      console.log(card.innerHTML);
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                    } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                      console.log('All');
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

            // Add Event Listener to each subcategory
            setTimeout(() => {
              const subcategorys = document.querySelectorAll('.subcategory div');
              subcategorys.forEach((subcategory) => {
                subcategory.addEventListener('click', (e) => {
                  const target = e.target as HTMLButtonElement;
                  const subActives = document.querySelectorAll('.subActive');
                  subActives.forEach((subActive) => {
                    subActive.classList.remove('subActive');
                  });
                  target.classList.add('subActive');
                  console.log(target.textContent);
                  const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                  // Filter the cards
                  cards.forEach((card) => {
                    if (card.innerHTML == target.innerText) {
                      console.log(card.parentElement.parentElement);
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                      console.log(card.innerHTML);
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                    } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                      console.log('All');
                      card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                    }
                  })
                })
              })
            }, 200);
        }
        if (target.textContent == 'All') {
          detachSubcategory();  
        }

        setTimeout(() => {
          const urls = document.querySelectorAll('.notion-property-url') as NodeListOf<HTMLAnchorElement>;
              urls.forEach((url) => {
                const cardUrl = url.parentElement.parentElement.parentElement as HTMLLinkElement
                cardUrl.href = 'https://' + url.innerHTML + '/';
                cardUrl.setAttribute('target', '_blank');
                console.log('URL', url.parentElement.parentElement.parentElement);
          });
        }, 200);

      });
    }

  }, [])

  useEffect(() => {
    setTimeout(() => {
      const activeMain = document.querySelector('button.notion-collection-view-tabs-content-item-active');
      console.log(activeMain.children[0].textContent);

      if (activeMain.children[0].textContent == 'Productivity') {
        detachSubcategory();
        appendSubcategory(subProductivity);

        const subcategorys = document.querySelectorAll('.subcategory div');
                subcategorys.forEach((subcategory) => {
                  subcategory.addEventListener('click', (e) => {
                    const target = e.target as HTMLButtonElement;
                    const subActives = document.querySelectorAll('.subActive');
                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    target.classList.add('subActive');
                    console.log(target.textContent);
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.innerHTML == target.innerText) {
                        console.log(card.parentElement.parentElement);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        console.log(card.innerHTML);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        console.log('All');
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
                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    target.classList.add('subActive');
                    console.log(target.textContent);
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.innerHTML == target.innerText) {
                        console.log(card.parentElement.parentElement);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        console.log(card.innerHTML);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        console.log('All');
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
                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    target.classList.add('subActive');
                    console.log(target.textContent);
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.innerHTML == target.innerText) {
                        console.log(card.parentElement.parentElement);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        console.log(card.innerHTML);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        console.log('All');
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
                    subActives.forEach((subActive) => {
                      subActive.classList.remove('subActive');
                    });
                    target.classList.add('subActive');
                    console.log(target.textContent);
                    const cards = document.querySelectorAll('.notion-property-multi_select-item.notion-item-default');
                    // Filter the cards
                    cards.forEach((card) => {
                      if (card.innerHTML == target.innerText) {
                        console.log(card.parentElement.parentElement);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
                      } else if (card.innerHTML != target.innerText && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group') && target.innerText != 'All') {
                        console.log(card.innerHTML);
                        card.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                      } else if (target.innerText == 'All' && !card.parentElement.parentElement.parentElement.parentElement.classList.contains('notion-collection-group')) {
                        console.log('All');
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

  return (
    <>
      <Head>
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
      </div>
    </>
  )
}
