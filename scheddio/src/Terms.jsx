const CSS = `
  .sch-terms {
    font-family: 'Sora', sans-serif;
    background: #fff;
    min-height: 100vh;
    width: 100%;
    color: #1a1a2e;
    -webkit-font-smoothing: antialiased;
  }
  .sch-terms *, .sch-terms *::before, .sch-terms *::after { box-sizing: border-box; }
  .sch-terms-nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(255,255,255,.92);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    padding: 15px 56px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 1px 0 rgba(0,0,0,.06);
  }
  .sch-terms-nav-logo { cursor: pointer; display: flex; align-items: center; }
  .sch-terms-nav-logo img { height: 32px; width: auto; display: block; }
  .sch-terms-nav-back {
    font-family: inherit; font-size: 13px; font-weight: 600;
    color: rgb(93,50,239); background: rgba(93,50,239,.07);
    border: 1px solid rgba(93,50,239,.15); border-radius: 8px;
    padding: 8px 18px; cursor: pointer; text-decoration: none;
    transition: all .25s;
  }
  .sch-terms-nav-back:hover {
    background: rgb(93,50,239); color: #fff;
  }
  .sch-terms-body {
    max-width: 900px; margin: 0 auto; padding: 60px 48px 100px; width: 100%;
  }
  .sch-terms-body h1 {
    font-size: 36px; font-weight: 800; color: #0f0f1a;
    letter-spacing: -1.2px; margin-bottom: 6px;
  }
  .sch-terms-body .sch-terms-company {
    font-size: 14px; color: #6b6b7d; font-weight: 500; margin-bottom: 40px;
  }
  .sch-terms-body h2 {
    font-size: 20px; font-weight: 700; color: #0f0f1a;
    margin-top: 40px; margin-bottom: 12px;
  }
  .sch-terms-body h3 {
    font-size: 16px; font-weight: 600; color: #1a1a2e;
    margin-top: 24px; margin-bottom: 8px;
  }
  .sch-terms-body p {
    font-size: 14px; color: #444; line-height: 1.75;
    margin-bottom: 14px;
  }
  .sch-terms-body ul {
    padding-left: 24px; margin-bottom: 14px;
  }
  .sch-terms-body li {
    font-size: 14px; color: #444; line-height: 1.75;
    margin-bottom: 4px;
  }
  .sch-terms-body .sch-terms-caps {
    text-transform: uppercase; font-weight: 700; font-size: 13px;
    color: #1a1a2e; letter-spacing: .3px;
  }
  .sch-terms-body .sch-terms-intro {
    font-size: 14px; color: #444; line-height: 1.75;
    margin-bottom: 24px; padding-bottom: 24px;
    border-bottom: 1px solid #f0f0f3;
  }
  .sch-terms-footer {
    background: #0f0f1a; padding: 40px 0; width: 100%;
    text-align: center; font-size: 12px; color: #484860;
    font-family: 'Sora', sans-serif;
  }
  @media (max-width: 720px) {
    .sch-terms-nav { padding: 12px 20px; }
    .sch-terms-body { padding: 40px 20px 80px; }
    .sch-terms-body h1 { font-size: 28px; }
  }
`;

export default function Terms() {
  return (
    <div className="sch-terms">
      <style>{CSS}</style>

      <nav className="sch-terms-nav">
        <a href="#" className="sch-terms-nav-logo">
          <img src="/logo/LOGOS/Logo Color No Background (1122 x 1122).png" alt="Scheddio" />
        </a>
        <a href="#" className="sch-terms-nav-back">Back to Home</a>
      </nav>

      <div className="sch-terms-body">
        <p className="sch-terms-company">Scheddio, LLC</p>
        <h1>Terms of Service</h1>

        <p className="sch-terms-intro">
          These Terms of Service ("Terms") form a legally binding agreement between you and Scheddio, LLC ("Scheddio," the "Company," "we," "us," or "our") regarding your access to and use of our websites, applications, and related services that enable: (a) photographers, videographers, and marketing providers ("Creators") to receive, manage, and fulfill media orders by uploading images, video, and related deliverables; and (b) real estate agents, brokers, and other users ("Hosts") to build and publish listing websites and similar presentation pages (each, a "Property Site"). Users who purchase, license, or otherwise acquire media or services through the Platform are referred to as "Purchasers." The foregoing services, including any associated websites and applications, are collectively referred to as the "Platform."
        </p>

        <p>By accessing or using the Platform, you confirm that you have read and understand these Terms, and you agree to be bound by them. These Terms include an agreement to arbitrate certain disputes and a waiver of participation in class actions. If you do not agree to these Terms, do not use the Platform and do not create an account.</p>

        <p className="sch-terms-caps">THE COMPANY MAY UPDATE OR CHANGE THESE TERMS AT ANY TIME.</p>

        <h2>1. Eligibility and Age Requirement</h2>
        <p>The Platform is intended for adults. You may not use the Platform if you are under eighteen (18) years old. By using the Platform, you represent that you are at least 18 years of age and capable of entering into a binding contract.</p>

        <h2>2. Platform Purpose and Acceptable Content</h2>
        <p>The Platform exists to facilitate the upload, delivery, sharing, and display of real estate media and related property information.</p>
        <p>You may not upload, post, transmit, or otherwise make available any content that is unlawful, defamatory, pornographic, obscene, harassing, hateful, or otherwise inappropriate. If Scheddio, LLC determines (in its discretion) that content violates these Terms, Scheddio, LLC may remove the content and/or restrict or terminate the associated account immediately.</p>
        <p>Users are encouraged to notify Scheddio, LLC of content that appears to violate these Terms.</p>

        <h2>3. Privacy and Data Practices</h2>
        <p>Scheddio, LLC's privacy practices are described in our privacy policy, which may be revised from time to time and is incorporated into these Terms by reference.</p>

        <h3>3.1 Information You Provide</h3>
        <p>When you register or use the Platform, you may provide information such as your name, email address, phone number, billing details, and other account-related data. You may update or correct certain account details through your profile settings.</p>
        <p>Scheddio, LLC does not sell your personal information and does not share it for sale without your explicit written consent.</p>

        <h3>3.2 Automatically Collected Information</h3>
        <p>We may automatically collect usage data and technical information (such as device, browser, log data, and activity on the Platform) to operate the Platform, improve performance, and enhance user experience.</p>

        <h3>3.3 Payment Information</h3>
        <p>If you subscribe to paid services or complete purchases, payment processing is handled through a third-party payment processor chosen by Scheddio, LLC. Scheddio, LLC generally does not store full payment card details.</p>

        <h3>3.4 Sharing and Disclosure</h3>
        <p>Scheddio, LLC may disclose information when we reasonably believe disclosure is required to comply with law, enforce our Terms, prevent fraud, or protect the rights, safety, and property of Scheddio, LLC, users, or others.</p>
        <p>The Platform may integrate with third-party tools and services (including, for example, Google Calendar, Dropbox, Slack, Stripe, and Vimeo). If you connect third-party services, those providers may access data as necessary to provide their functionality.</p>

        <h3>3.5 Security</h3>
        <p>We use reasonable administrative, technical, and physical measures intended to protect user information. However, no system can be guaranteed 100% secure.</p>

        <h3>3.6 Children</h3>
        <p>Scheddio, LLC does not knowingly collect information from minors and the Platform is not directed to individuals under 18.</p>

        <h3>3.7 Business Changes</h3>
        <p>If Scheddio, LLC undergoes a merger, acquisition, reorganization, or sale of assets, user information may be transferred as part of that transaction, subject to applicable law and notice where required.</p>

        <h2>4. Intellectual Property and Platform Rights</h2>
        <p>Except where expressly stated otherwise, the Platform and its underlying technology (including software, interfaces, designs, databases, and functionality) are owned by Scheddio, LLC or licensed to Scheddio, LLC, and are protected by intellectual property laws.</p>
        <p>Scheddio, LLC grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for its intended purposes. You agree not to copy, modify, reverse engineer, decompile, disassemble, attempt to extract source code, or otherwise misuse the Platform.</p>

        <h2>5. Fair Housing Compliance</h2>
        <p>Any real estate advertising or listing-related content made available through the Platform must comply with the U.S. Federal Fair Housing Act and any applicable state, local, and international laws. Discriminatory statements, preferences, or limitations are not permitted.</p>
        <p>You are responsible for ensuring your listing content and marketing materials comply with all applicable requirements.</p>

        <h2>6. Payments, Billing, and Subscription Terms</h2>
        <p>Scheddio, LLC may offer paid plans, usage-based services, or transaction-based fees. By selecting a paid service, you agree to pay all applicable charges as presented at checkout or in your plan terms.</p>
        <p>You agree to provide accurate billing information and to keep it current.</p>

        <h3>6.1 Recurring Charges</h3>
        <p>If your plan includes recurring fees, you authorize Scheddio, LLC (and its payment processor) to charge your payment method on a recurring basis until you cancel. Charges may include taxes where applicable.</p>

        <h3>6.2 Pricing Changes</h3>
        <p>Scheddio, LLC may adjust pricing or fees. If pricing changes apply to your recurring plan, we will provide notice in advance where required by law (including notice via email or within the Platform). If you do not agree to updated fees, you may cancel before the new fees take effect.</p>

        <h3>6.3 Non-Refundable Payments</h3>
        <p>Unless explicitly stated otherwise in writing, payments are non-refundable, including for partially used billing periods.</p>

        <h3>6.4 Failed Payments</h3>
        <p>If we cannot successfully charge your payment method, your access to paid features may be suspended or limited until payment is resolved.</p>

        <h2>7. Account Cancellation</h2>
        <p>You may cancel by deleting your account through the Platform (if available) or by contacting Scheddio, LLC using the contact information provided on our website. Cancellation stops future recurring charges but does not retroactively refund prior payments unless required by law.</p>

        <h2>8. User Responsibilities and No Vetting</h2>
        <p>You are responsible for evaluating and deciding whether to engage with other users, including Hosts, Creators, and Purchasers.</p>
        <p>Scheddio, LLC does not verify user identities, credentials, licensing, or quality of services, and does not guarantee:</p>
        <ul>
          <li>the outcome of any service transaction,</li>
          <li>that work will meet your expectations,</li>
          <li>that users will complete obligations, or</li>
          <li>that a Purchaser will pay amounts owed.</li>
        </ul>
        <p>Scheddio, LLC does not provide legal, tax, or professional advice.</p>

        <h2>9. User Promises and Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>break any law or violate third-party rights,</li>
          <li>provide false or misleading account information,</li>
          <li>attempt to access another user's account,</li>
          <li>use the Platform if you have been suspended or banned,</li>
          <li>defraud Scheddio, LLC or other users,</li>
          <li>use automated means (bots/scrapers) to access or extract data,</li>
          <li>interfere with Platform security or operations, or</li>
          <li>use the Platform in a way that could harm Scheddio, LLC or users.</li>
        </ul>
        <p>Scheddio, LLC may investigate suspected violations and take action including suspension, termination, or reporting unlawful conduct to authorities.</p>

        <h2>10. Media Uploads and Property Information</h2>
        <p>The Platform may enable you to upload or provide:</p>
        <ul>
          <li>photos, videos, audio, and other creative assets ("Media"), and</li>
          <li>listing descriptions, property details, contact information, and similar data ("Property Data").</li>
        </ul>
        <p>Media and Property Data are collectively "Uploaded Content."</p>
        <p>You acknowledge that Uploaded Content may be stored and served through Scheddio, LLC systems and may be accessible to others depending on your settings and the Platform's functionality. Availability of the Platform and your content may be interrupted due to maintenance, technical issues, or third-party dependencies.</p>

        <h3>10.1 Ownership and License for Media</h3>
        <p>You keep ownership of the Media you upload. However, you grant Scheddio, LLC a worldwide, non-exclusive, royalty-free, fully paid license to host, store, reproduce, display, transmit, and create technical derivative works of your Media as needed to operate and provide the Platform.</p>
        <p>Scheddio, LLC will not use your Media in external advertising without your permission, except for displaying Media within Scheddio, LLC-owned or controlled web properties as part of the Platform experience.</p>
        <p>You also grant other users a limited license to view your Media as permitted through the Platform.</p>

        <h3>10.2 License for Property Data</h3>
        <p>You grant Scheddio, LLC a worldwide, royalty-free license to use, host, reproduce, display, distribute, and adapt Property Data to provide and support Property Sites and other Platform features.</p>

        <h3>10.3 Content Restrictions</h3>
        <p>You may not upload content that:</p>
        <ul>
          <li>infringes intellectual property, privacy, or publicity rights,</li>
          <li>is illegal, abusive, or threatening, or</li>
          <li>is used primarily for unsolicited advertising, spam, or commercial solicitation unrelated to legitimate listing activity.</li>
        </ul>
        <p>Scheddio, LLC may remove content believed to violate these Terms.</p>
        <p>If you believe content infringes your copyright, you may submit a DMCA notice to Scheddio, LLC's designated agent as described in our DMCA policy (to be provided by the Company).</p>

        <h2>11. User Contributions (Forums, Comments, Messages)</h2>
        <p>If the Platform allows messaging, posting, commenting, or similar features, anything you submit ("Contributions") may be visible to other users. Contributions are treated as non-confidential.</p>
        <p>By submitting Contributions, you represent that:</p>
        <ul>
          <li>you own or have rights to share them,</li>
          <li>they do not violate third-party rights or laws, and</li>
          <li>they are not misleading, unlawful, or abusive.</li>
        </ul>

        <h3>11.1 Contribution License</h3>
        <p>You grant Scheddio, LLC an unrestricted, worldwide, non-exclusive, royalty-free, fully paid, transferable, sublicensable license to use, store, reproduce, publish, display, distribute, and otherwise exploit Contributions for Platform operation, development, moderation, marketing, or other legitimate business purposes.</p>
        <p>You keep ownership of your Contributions, but you are solely responsible for them.</p>

        <h2>12. Termination and Enforcement</h2>
        <p>Scheddio, LLC may suspend or terminate your access to the Platform at any time, with or without notice, if we believe you violated these Terms, created risk, or engaged in unlawful conduct. We may also remove content and restrict access from certain IP addresses.</p>
        <p>If your account is terminated, you may not attempt to create a new account to bypass restrictions.</p>

        <h2>13. Anti-Spam, Anti-Phishing, and Anti-Impersonation Rules</h2>
        <p>You may not use the Platform, Scheddio, LLC systems, or any related messaging or email capabilities to send or facilitate spam, phishing, deceptive communications, or impersonation.</p>
        <p>Prohibited conduct includes:</p>
        <ul>
          <li>bulk unsolicited marketing messages,</li>
          <li>messages intended to mislead recipients about the sender,</li>
          <li>attempts to obtain sensitive information through deception, and</li>
          <li>pretending to represent Scheddio, LLC or another entity without authorization.</li>
        </ul>
        <p>You must comply with applicable laws such as CAN-SPAM and any relevant privacy/cybersecurity requirements. Scheddio, LLC may investigate suspected violations and immediately suspend accounts or report activity to authorities.</p>

        <h2>14. Disclaimers</h2>
        <p className="sch-terms-caps">THE PLATFORM AND ALL CONTENT AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE."</p>
        <p className="sch-terms-caps">TO THE MAXIMUM EXTENT PERMITTED BY LAW, SCHEDDIO, LLC DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        <p>Scheddio, LLC does not warrant that the Platform will be uninterrupted, error-free, secure, or free of harmful components.</p>
        <p>Some jurisdictions do not allow certain warranty limitations, so some of the above may not apply to you.</p>

        <h2>15. Limitation of Liability</h2>
        <p className="sch-terms-caps">TO THE MAXIMUM EXTENT PERMITTED BY LAW, SCHEDDIO, LLC (INCLUDING ITS OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, PARTNERS, AND SERVICE PROVIDERS) WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES.</p>
        <p className="sch-terms-caps">IN ALL CASES, THE TOTAL LIABILITY OF SCHEDDIO, LLC FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE PLATFORM WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (USD $100).</p>

        <h2>16. Indemnification</h2>
        <p>You agree to defend, indemnify, and hold harmless Scheddio, LLC and its affiliates from claims, damages, liabilities, losses, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Platform, your content, your transactions, or your violation of these Terms, except to the extent caused by Scheddio, LLC's gross negligence or willful misconduct.</p>

        <h2>17. Governing Law and Venue</h2>
        <p>These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law principles.</p>
        <p>To the extent any dispute is not subject to arbitration, you agree it must be filed exclusively in state or federal courts located in Florida, and you consent to personal jurisdiction there.</p>

        <h2>18. Arbitration Agreement and Class Action Waiver</h2>
        <p>Any dispute, claim, or controversy arising from or related to these Terms or the Platform will be resolved by binding arbitration administered by the American Arbitration Association ("AAA") under its rules, as modified by this section. The Federal Arbitration Act governs this arbitration provision.</p>
        <p><strong>Class Action Waiver:</strong> You and Scheddio, LLC agree that claims may be brought only on an individual basis. The arbitrator may not preside over any class, consolidated, representative, or collective proceeding, and may award relief only to the individual party seeking relief.</p>
        <p>Information about AAA procedures is available at adr.org.</p>

        <h3>Severability of Arbitration Terms</h3>
        <p>If any portion of this arbitration section is found unenforceable, the remainder will remain in effect, and the unenforceable portion will be replaced with an enforceable provision that most closely matches the original intent.</p>

        <h2>19. Miscellaneous</h2>
        <ul>
          <li><strong>Changes:</strong> Scheddio, LLC may update these Terms. Updated Terms become effective after notice is provided (including via email or within the Platform) or when you accept them.</li>
          <li><strong>Electronic Communications:</strong> You consent to receive notices and communications electronically.</li>
          <li><strong>Assignment:</strong> You may not assign your rights under these Terms without Scheddio, LLC's consent. Scheddio, LLC may assign these Terms without restriction.</li>
          <li><strong>Entire Agreement:</strong> These Terms (and any policies incorporated by reference) represent the complete agreement between you and Scheddio, LLC relating to the Platform.</li>
          <li><strong>Severability:</strong> If any provision is unenforceable, the remaining provisions remain valid.</li>
          <li><strong>No Waiver:</strong> Failure to enforce a provision is not a waiver of the right to enforce it later.</li>
        </ul>
      </div>

      <footer className="sch-terms-footer">
        &copy; 2026 Scheddio. All rights reserved.
      </footer>
    </div>
  );
}
