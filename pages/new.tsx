import * as React from 'react'
import Image from 'next/image'

export default function Page() {
    return (
        <div className='content'>
            <a href="https://curations.tech/">
                <Image src="/curations_logo.svg" alt="curations" width={128} height={100} />
            </a>
            <div className='heading-col'>
                <div className='icon-wrapper'>
                    <div className='rect'></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M208.9,144a15.8,15.8,0,0,1-10.5,15l-52.2,19.2L127,230.4a16,16,0,0,1-30,0L77.8,178.2,25.6,159a16,16,0,0,1,0-30l52.2-19.2L97,57.6a16,16,0,0,1,30,0l19.2,52.2L198.4,129A15.8,15.8,0,0,1,208.9,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"></path></svg>
                </div>
                <h1>What's new?</h1>
            </div>
            <p>A quick view on which features we have implemented in the past.</p>
            <div className='update-block'>
                <h2>2022-11-12</h2>
                <p>This update brings a lot of new features for the usability of our site.</p>
                <ul>
                    <li>Main Navigation is now a fluid rectangle that morphs based on users input.</li>
                    <li>Sub Categories are now scrollable even without a trackpad or touch device, simply through holding and panning it with a mouse.</li>
                    <li>We have implemented this page which features newest updates.</li>
                    <li>Tools can now be in more than one subcategories.</li>
                </ul>
            </div>
            <div className='update-block'>
                <h2>2022-08-12</h2>
                <p>This update implemented some bugfixes and changed the duration of the "Thank you"-message in the submit form.</p>
            </div>
        </div>
    )
}
