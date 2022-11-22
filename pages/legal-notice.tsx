import * as React from 'react'
import Image from 'next/image'

export default function Page() {
    return (
        <div className='privacy'>
            <a href="http://localhost:3000/">
                <Image src="/curations_logo.svg" alt="curations" width={128} height={100} />
            </a>
            <h1>Legal Notice</h1>
            <p>
            This Privacy Policy explains the policies of Anton Stallbörger, Florian Kiem, Nils Eller on the collection 
            and use of the information we collect when you access https://www.curations.tech/ (the “Service”). This Privacy Policy describes your 
            privacy rights and how you are protected under privacy laws.</p>
        </div>
    )
}
