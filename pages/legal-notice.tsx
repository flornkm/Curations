import * as React from 'react'
import Image from 'next/image'

export default function Page() {
    return (
        <div className='privacy'>
            <a href="https://curations.tech/">
                <Image src="/curations_logo.svg" alt="curations" width={128} height={100} />
            </a>
            <h1>Legal Notice</h1>
            <p>Information obligation according to §5 E-Commerce law, §14 corporate code, §63 commercial code and disclosure requirements according to §25 media law</p>

            <p>Anton Stallboerger, Florian Kiem and Nils Eller</p>

            <p>E-Mail: team@curations.tech</p>

            <h4>Disclaimer</h4>
            <p>This disclaimer is to be regarded as being part of the website from which this page is referenced. Insofar as parts or specific wordings of this text do not, no longer or do not completely comply with the current legal situation, this shall not prejudice the remaining parts with regard to their content and validity.</p>
            
            <p>Liability for content of this website</p>
            <p>The content of our web pages have been created with great care.  However, we cannot assume liability for the correctness, completeness and validity of the content.  As a service provider, we are responsible for the content of our website according to general law.  We are however, not obliged to monitor transmitted information or information stored by third parties or to investigate circumstances that indicate illegal activity.  Obligations to remove or block the use of information according to general law remain unaffected.  Any liability in this respect is, however, only incurred from the moment that knowledge of the specific breach of law is obtained.  If we become aware of such legal violations, we shall immediately delete such content.</p>
            <h4>Liability for external links</h4>
            <p>Our offer contains links to external websites.  We have no influence on the contents of these external websites.  Therefore we cannot assume liability for the contents of these external websites.  The respective provider or operator of these websites is liable for their content.  The external websites were checked for possible violations at the time of linking.  No legal violations were found at the time of linking.  A permanent content control of the linked pages without concrete indications of a legal violation is not reasonable.  If we become aware of any legal violations we shall remove such links.</p>
            
            <h4>Copyright</h4>
            <p>The operators of this website always strive to respect the copyright of others and to use self-produced and licence-free works.  The content and works created by the operators of this website are subject to copyright.  Third party contributions are identified as such.  The copying, processing, distribution and any kind of exploitation beyond the limits of the copyright require the written consent of the respective author or creator.  Downloads and copies of this website are only permitted for private, not commercial, use.  Insofar as the content on this website was not created by the operator, the copyrights of third parties are respected.  In particular, third party content is identified as such.  Should you nevertheless become aware of a copyright infringement, please inform us accordingly.  If we become aware of any legal violations we shall remove such content.</p>
        </div>
    )
}
