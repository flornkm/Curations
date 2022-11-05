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
    category.forEach(element => {
      if (element === 'All') {
        subcategory.innerHTML += '<div>' + '<svg width="40" height="40" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 22V2M21.95 11c-6.47 2.667-12.254 2.667-19.9 0M18.572 4.462c-2.667 4.53-2.667 9.723 0 15.076M5.428 4.462c2.667 4.53 2.667 9.723 0 15.076" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>' + '<p class="subActive"> ' + element + ' </p>' + '</div>';
      } else {
        subcategory.innerHTML += '<div>' + '<p> ' + element + ' </p>' + '</div>';
      }
    });
    subcategory.classList.add('subcategory');
    
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
      });
    }

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
