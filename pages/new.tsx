import * as React from 'react'
import Image from 'next/image'

export default function Page() {
    return (
        <div className='content'>
            <a href="https://curations.tech/">
                <Image src="/curations_logo.svg" alt="curations" width={128} height={100} />
            </a>
            <div className='heading-col'>
                <svg width="32px" height="32px" stroke-width="1.47" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 2v4M12 18v4M22 12h-4M6 12H2M4.929 4.929l2.828 2.828M16.243 16.243l2.828 2.828M19.071 4.929l-2.828 2.828M7.757 16.243L4.93 19.07" stroke="currentColor" stroke-width="1.47" stroke-linecap="round" stroke-linejoin="round"></path></svg><h1>What's new?</h1>
            </div>
            <p>A quick view on which features we have implemented in the past.</p>
            <div className='update-block'>
                <h2>2022-11-12</h2>
                <p>This update brings a lot of new features for the usability of our site.</p>
                <ul>
                    <li>Main Navigation is now a fluid rectangle that morphs based on users input.</li>
                    <li>Sub Categories are now scrollable even without a trackpad or touch device, simply through holding and panning it with a mouse.</li>
                    <li>We have implemented this page which features newest updates.</li>
                </ul>
            </div>
        </div>
    )
}
