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
