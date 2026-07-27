import Link from 'next/link';
import { FONT_FILES } from '@/lib/site';
import { fontDownloadFaqs, fontDownloadFaqsHindi } from '@/content/font-download-faqs';
import ExpertQuote from '@/components/seo/ExpertQuote';

/** SSR body for /font-download — content verbatim from brief. */
export default function FontDownloadPageBody() {
  return (
    <>
      <section className="toc-section section-dark" id="table-of-contents">
        <div className="container">
          <details className="toc-wrapper-collapsible">
            <summary className="toc-summary-bar">
              <span>Table of Contents</span>
              <span className="toc-toggle-icon"></span>
            </summary>
            <div className="toc-content-list">
              <a href="#which-version" className="toc-link-item">
                Which KrutiDev Version Do You Need?
              </a>
              <a href="#install-windows" className="toc-link-item">
                How to Install KrutiDev Font on Windows 10 and Windows 11
              </a>
              <a href="#install-mac" className="toc-link-item">
                How to Install KrutiDev Font on Mac
              </a>
              <a href="#install-android-wps" className="toc-link-item">
                How to Add KrutiDev Font to WPS Office on Android
              </a>
              <a href="#random-letters" className="toc-link-item">
                Why Does My Hindi Show as Random English Letters?
              </a>
              <a href="#after-install" className="toc-link-item">
                What to Do After Installing KrutiDev Font
              </a>
              <a href="#key-takeaways" className="toc-link-item">
                Key Takeaways
              </a>
              <a href="#faq" className="toc-link-item">
                Frequently Asked Questions
              </a>
              <a href="#faq-hindi" className="toc-link-item">
                हिंदी में प्रश्न
              </a>
              <a href="#related-resources" className="toc-link-item">
                Related Tools and Internal Links
              </a>
              <a href="#references" className="toc-link-item">
                References
              </a>
            </div>
          </details>
        </div>
      </section>

      <section className="content-block section-alt" id="which-version">
        <div className="container">
          <h2 className="section-heading">
            Which KrutiDev Version <span className="highlight">Do You Need?</span>
          </h2>
          <p className="section-desc">
            Download KrutiDev 010 for Hindi government exams; use 055 only for Marathi in Maharashtra.
            Check your notification before installing any other variant.
          </p>

          <h3 className="section-subheading">
            KrutiDev 010 (Standard Hindi — Use This for Most Cases)
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              KrutiDev 010 is the government standard for Hindi typing across North and Central
              India. It is required for CPCT (Madhya Pradesh), UPSSSC (Uttar Pradesh), Rajasthan
              Patwari, and BPSC (Bihar). If your exam notification says KrutiDev without specifying
              a number, it means 010. This is the file on this page:{' '}
              <a href={FONT_FILES['010']} download="KRDEV010.TTF">
                KRDEV010.TTF
              </a>
              .
            </p>
          </div>

          <h3 className="section-subheading">KrutiDev 011 (Bold Weight)</h3>
          <div className="content-prose content-prose--left">
            <p>
              KrutiDev 011 is the bold version of KrutiDev 010. Same keyboard layout. Same character
              mapping. The visual output is heavier and thicker. Used in newspaper headlines and DTP
              work, not in typing exams. Download:{' '}
              <a href={FONT_FILES['011']} download="KRDEV011.TTF">
                KRDEV011.TTF
              </a>
              .
            </p>
          </div>

          <h3 className="section-subheading">KrutiDev 016 (Wide Spacing)</h3>
          <div className="content-prose content-prose--left">
            <p>
              KrutiDev 016 uses a wider character spacing. Used in formal letterheads and printed
              certificates. Not required for any government typing exam. Download:{' '}
              <a href={FONT_FILES['016']} download="KRDEV016.TTF">
                KRDEV016.TTF
              </a>
              .
            </p>
          </div>

          <h3 className="section-subheading">KrutiDev 055 (Marathi Standard)</h3>
          <div className="content-prose content-prose--left">
            <p>
              KrutiDev 055 is the version used in Maharashtra government offices and Marathi DTP
              work. It includes Marathi-specific characters that differ from standard Hindi.
              Required for Maharashtra state exam candidates. If your exam is Marathi-language,
              download 055, not 010:{' '}
              <a href={FONT_FILES['055']} download="KRDEV055.TTF">
                KRDEV055.TTF
              </a>
              .
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Language</th>
                  <th>Use Case</th>
                  <th>Exam Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>KrutiDev 010</td>
                  <td>Hindi</td>
                  <td>Government exams, courts, DTP</td>
                  <td>CPCT, UPSSSC, Patwari, BPSC</td>
                </tr>
                <tr>
                  <td>KrutiDev 011</td>
                  <td>Hindi</td>
                  <td>Bold print, headlines</td>
                  <td>Not required for exams</td>
                </tr>
                <tr>
                  <td>KrutiDev 016</td>
                  <td>Hindi</td>
                  <td>Letterheads, certificates</td>
                  <td>Not required for exams</td>
                </tr>
                <tr>
                  <td>KrutiDev 055</td>
                  <td>Marathi</td>
                  <td>Maharashtra govt, MPSC workflow</td>
                  <td>Maharashtra state exams</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ExpertQuote quote="For every exam I have seen in our CPCT paper dataset, 40 papers across MP districts, the font specified is KrutiDev 010. Download 010 unless your official notification says otherwise." />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
            <strong>40 of 40 CPCT practice papers</strong> in the reviewed Madhya Pradesh set specify
            KrutiDev 010 (Akshay Verma verification dataset, 2026).
          </p>
        </div>
      </section>

      <section
        className="howto-section section-dark"
        id="install-windows"
        itemScope
        itemType="https://schema.org/HowTo"
      >
        <div className="container">
          <h2 className="section-heading" itemProp="name">
            How to Install KrutiDev Font on{' '}
            <span className="highlight">Windows 10 and Windows 11</span>
          </h2>
          <p className="section-desc" itemProp="description">
            Download KRDEV010.TTF, right-click Install (or Install for all users), then verify the
            font name in MS Word. The process is the same on Windows 10 and Windows 11.
          </p>
          <meta itemProp="totalTime" content="PT3M" />

          <div className="howto-steps-container">
            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 1</div>
                <h3 itemProp="name">Download the file</h3>
                <p itemProp="text">
                  Click the{' '}
                  <a href="#download-krutidev-010">Download KrutiDev 010</a> button above. The file
                  KRDEV010.TTF saves to your Downloads folder. The download takes a few seconds on
                  any connection.
                </p>
              </div>
            </div>

            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 2</div>
                <h3 itemProp="name">Open your Downloads folder</h3>
                <p itemProp="text">
                  Press the Windows key and E together. This opens File Explorer. Click Downloads in
                  the left panel. Find KRDEV010.TTF.
                </p>
              </div>
            </div>

            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 3</div>
                <h3 itemProp="name">Install the font</h3>
                <p itemProp="text">
                  Right-click on KRDEV010.TTF. Two options appear: Install and Install for all
                  users.
                </p>
                <ul className="content-bullet-list">
                  <li>
                    Choose <strong>Install</strong> if this is your personal computer and you are
                    the only user.
                  </li>
                  <li>
                    Choose <strong>Install for all users</strong> if you are on a shared computer,
                    an exam-prep lab machine, or if you want the font to appear in all applications,
                    including those run as administrator.
                  </li>
                </ul>
                <p>
                  The font installs in under 3 seconds. No progress dialog appears. That is normal.
                </p>
              </div>
            </div>

            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 4</div>
                <h3 itemProp="name">Handle the SmartScreen warning (Windows 11 only)</h3>
                <p itemProp="text">
                  Windows 11 sometimes shows a blue dialog that says &ldquo;Windows protected your
                  PC.&rdquo; This happens because the font installer file is not a Microsoft-signed
                  application, not because the file is harmful.
                </p>
                <p>Here is what to do:</p>
                <ul className="content-bullet-list">
                  <li>
                    Click &ldquo;More info&rdquo; inside the blue dialog box. This is a text link,
                    not a button.
                  </li>
                  <li>
                    Check that the file name shown in the dialog says KRDEV010.TTF. This confirms
                    you are installing the correct file.
                  </li>
                  <li>Click &ldquo;Run anyway.&rdquo;</li>
                </ul>
                <p>The font installs immediately after this step.</p>
              </div>
            </div>

            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 5</div>
                <h3 itemProp="name">Verify the installation</h3>
                <p itemProp="text">
                  Open MS Word or Notepad. Click the font name box at the top. Type &ldquo;Kruti Dev
                  010&rdquo; without quotes. If the name appears in the dropdown list, the
                  installation worked. You are ready to type in Hindi.
                </p>
                <p>
                  If the font does not appear, close MS Word completely and reopen it. Restarting
                  the application refreshes the font list.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card glass-card--lg glass-card--mt">
            <h3 className="section-card-title">Key Takeaways</h3>
            <ul className="quick-answer-list quick-answer-list--stacked">
              <li>Use &ldquo;Install for all users&rdquo; on shared or lab computers</li>
              <li>
                The SmartScreen warning on Windows 11 is normal; verify the file name, then click
                &ldquo;Run anyway&rdquo;
              </li>
              <li>
                If the font does not appear in Word, close and reopen Word completely
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className="howto-section section-alt"
        id="install-mac"
        itemScope
        itemType="https://schema.org/HowTo"
      >
        <div className="container">
          <h2 className="section-heading" itemProp="name">
            How to Install KrutiDev Font on <span className="highlight">Mac</span>
          </h2>
          <p className="section-desc" itemProp="description">
            Install KrutiDev 010 on macOS with Font Book in under two minutes.
          </p>
          <meta itemProp="totalTime" content="PT2M" />

          <div className="howto-steps-container">
            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 1</div>
                <h3 itemProp="name">Download the TTF file</h3>
                <p itemProp="text">
                  Click the Download KrutiDev 010 button above. Save KRDEV010.TTF to your Downloads
                  folder.
                </p>
              </div>
            </div>
            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 2</div>
                <h3 itemProp="name">Open Font Book</h3>
                <p itemProp="text">
                  Press Command and Space together. Type &ldquo;Font Book&rdquo; and press Enter.
                  Font Book opens.
                </p>
              </div>
            </div>
            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 3</div>
                <h3 itemProp="name">Add the font</h3>
                <p itemProp="text">
                  In Font Book, click File in the top menu bar. Select &ldquo;Add Fonts.&rdquo; Go
                  to your Downloads folder. Select KRDEV010.TTF. Click Open. The font installs
                  immediately and appears in Font Book under the name Kruti Dev 010.
                </p>
              </div>
            </div>
            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 4</div>
                <h3 itemProp="name">Verify in the application</h3>
                <p itemProp="text">
                  Open Pages, Microsoft Word for Mac, or any text editor. Click the font selector.
                  Type &ldquo;Kruti Dev 010.&rdquo; Select it. You are now ready to type using the
                  KrutiDev keyboard layout on your Mac.
                </p>
              </div>
            </div>
          </div>

          <div className="content-prose content-prose--left glass-card glass-card--lg glass-card--mt">
            <p>
              <strong>Note:</strong> The KrutiDev keyboard layout on Mac follows the same Remington
              key positions as on Windows. No separate keyboard driver is needed for standard
              document typing.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="install-android-wps">
        <div className="container">
          <h2 className="section-heading">
            How to Add KrutiDev Font to{' '}
            <span className="highlight">WPS Office on Android</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Android does not allow system-level custom font installation. Standard apps cannot use
              fonts you download from the web. WPS Office is the one exception because it has its
              own internal font folder.
            </p>
            <p>Here is how to do it:</p>
          </div>

          <ol className="content-numbered-list">
            <li>
              <strong>Step 1:</strong> Download KRDEV010.TTF on your Android device. Use Chrome and
              tap the download button on this page. The file saves to your Downloads folder in
              internal storage.
            </li>
            <li>
              <strong>Step 2:</strong> Open your file manager app. Go to Internal Storage. Find the
              folder named &ldquo;fonts&rdquo; or create one if it does not exist. The path is
              usually: Internal Storage/fonts/
            </li>
            <li>
              <strong>Step 3:</strong> Move or copy KRDEV010.TTF into that fonts folder.
            </li>
            <li>
              <strong>Step 4:</strong> Open WPS Office. Create a new document. Tap the font
              selector. Scroll down or search for &ldquo;Kruti Dev 010.&rdquo; Select it.
            </li>
          </ol>

          <div className="content-prose content-prose--left">
            <p>You can now type using KrutiDev in WPS Office on Android.</p>
            <p>
              <strong>Important:</strong> This method works only in WPS Office. Other Android apps
              like Google Docs, Canva, or Samsung Notes do not support manual font installation this
              way. For those apps, convert your KrutiDev text to Unicode using the{' '}
              <Link href="/krutidev-to-unicode">KrutiDev to Unicode Converter</Link>. Unicode works
              on every Android app by default.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="random-letters">
        <div className="container">
          <h2 className="section-heading">
            Why Does My Hindi Show as{' '}
            <span className="highlight">Random English Letters?</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              This is the most common thing that happens after downloading and installing KrutiDev.
              You open a document and see text like &ldquo;Hkkjr&rdquo; or &ldquo;ueLrs&rdquo;
              instead of Hindi.
            </p>
            <p>This is not a broken file. This is how KrutiDev works.</p>
            <p>
              KrutiDev stores each Hindi letter as a regular English keyboard character. The letter
              क is stored as k. The word भारत is stored as Hkkjr. Without the KrutiDev font active
              on your screen, you see the stored English characters instead of Hindi.
            </p>
            <p>There are two situations where this happens:</p>
          </div>

          <h3 className="section-subheading">
            Situation 1: You opened a KrutiDev document, but the font is not yet installed
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              <strong>Solution:</strong> Install KrutiDev 010 using the guide above. Open the
              document again. Select all the text. Change the font to Kruti Dev 010. The Hindi
              displays correctly.
            </p>
          </div>

          <h3 className="section-subheading">
            Situation 2: You have the font installed, but it is not applied to the text
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              <strong>Solution:</strong> Select the text that shows random letters. Go to the font
              selector in your app. Choose Kruti Dev 010. The Hindi appears immediately.
            </p>
          </div>

          <h3 className="section-subheading">
            Situation 3: You received the document on a phone or shared it via WhatsApp
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              This one cannot be fixed with a font install. Android and iOS do not support KrutiDev
              font installation at the system level. The only solution is to convert the KrutiDev
              text to Unicode before sharing. Use the{' '}
              <Link href="/krutidev-to-unicode">KrutiDev to Unicode Converter</Link>. Unicode
              displays as correct Hindi on every phone without any font.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="after-install">
        <div className="container">
          <h2 className="section-heading">
            What to Do After <span className="highlight">Installing KrutiDev Font</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>Once KrutiDev 010 is installed, three common tasks follow.</p>
          </div>

          <ol className="content-numbered-list">
            <li>
              <strong>Convert an existing KrutiDev document to Unicode</strong>
              <p>
                If you received a KrutiDev file and need to use the text in Gmail, WhatsApp, or a
                government web portal, you need to convert it to Unicode. KrutiDev text breaks in
                all web applications. Use the{' '}
                <Link href="/krutidev-to-unicode">KrutiDev to Unicode Converter</Link>. Paste the
                text, copy the Unicode output, and paste it wherever you need.
              </p>
            </li>
            <li>
              <strong>Convert Unicode text into KrutiDev for exam practice or printing</strong>
              <p>
                If you typed in Mangal or Google Input Tools and need KrutiDev output for legacy
                software or exam practice, use the{' '}
                <Link href="/">Unicode to KrutiDev Converter</Link> on the homepage.
              </p>
            </li>
            <li>
              <strong>Learn the keyboard layout</strong>
              <p>
                KrutiDev uses the Remington typewriter layout. The keys do not match standard
                QWERTY. Before practicing for an exam, review the keyboard chart on the{' '}
                <Link href="/krutidev-to-unicode#what-is-krutidev">
                  KrutiDev to Unicode Converter
                </Link>{' '}
                page (Remington layout section). Print it and keep it next to your keyboard while
                learning.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="content-block section-alt" id="key-takeaways">
        <div className="container">
          <aside aria-label="Key takeaways" className="glass-card glass-card--lg">
            <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
              Key Takeaways
            </h2>
            <ul className="quick-answer-list quick-answer-list--stacked">
              <li>
                KrutiDev 010 (KRDEV010.TTF) is the standard Hindi font for CPCT, UPSSSC, Rajasthan
                Patwari, and BPSC typing exams; download this version for most uses
              </li>
              <li>
                Installation on Windows takes under 3 minutes: right-click the TTF file, click
                &ldquo;Install for all users,&rdquo; then verify in MS Word
              </li>
              <li>
                On Windows 11, a SmartScreen warning is normal; click &ldquo;More info,&rdquo;
                confirm the file name, then click &ldquo;Run anyway&rdquo;
              </li>
              <li>
                KrutiDev font does not work on Android or iPhone, for mobile use, convert KrutiDev
                text to Unicode using the{' '}
                <Link href="/krutidev-to-unicode">KrutiDev to Unicode Converter</Link>
              </li>
              <li>
                After install, text showing random English letters means the font is not yet applied
                to that text, select the text in Word and change the font to Kruti Dev 010
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="content-block section-alt" id="faq">
        <div className="container">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="faq-accordion" style={{ maxWidth: 900, margin: '2rem auto 0' }}>
            {fontDownloadFaqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <div className="faq-content faq-content--padded">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="content-block section-dark"
        id="faq-hindi"
        lang="hi"
        dir="ltr"
        aria-label="Section in Hindi"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="container">
          <h2 className="section-heading">
            हिंदी में प्रश्न — <span className="highlight">KrutiDev Font Download</span>
          </h2>
          <div className="faq-accordion" style={{ maxWidth: 900, margin: '2rem auto 0' }}>
            <details
              className="faq-item"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary itemProp="name">
                <span lang="hi" dir="ltr">
                  कृतिदेव फॉन्ट कैसे डाउनलोड करें?
                </span>
              </summary>
              <div
                className="faq-content faq-content--padded"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">
                  <span lang="hi" dir="ltr">
                    इस पेज पर ऊपर दिए गए &ldquo;Download KrutiDev 010&rdquo; बटन पर क्लिक करें।
                    KRDEV010.TTF फ़ाइल आपके Downloads फ़ोल्डर में सेव हो जाएगी। इसके बाद फाइल पर
                    राइट-क्लिक करके Install पर क्लिक करें। MS Word खोलें और फॉन्ट लिस्ट में
                    &ldquo;Kruti Dev 010&rdquo; सर्च करें।
                  </span>
                </p>
              </div>
            </details>
            <details
              className="faq-item"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary itemProp="name">
                <span lang="hi" dir="ltr">
                  कृतिदेव फॉन्ट लगाने के बाद हिंदी की जगह अंग्रेजी के अक्षर क्यों दिखते हैं?
                </span>
              </summary>
              <div
                className="faq-content faq-content--padded"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">
                  <span lang="hi" dir="ltr">
                    कृतिदेव फॉन्ट हिंदी अक्षरों को अंग्रेजी ASCII कोड में स्टोर करता है। बिना
                    कृतिदेव फॉन्ट के, टेक्स्ट अंग्रेजी अक्षरों जैसा दिखता है। MS Word में उस टेक्स्ट
                    को सेलेक्ट करें और फॉन्ट बदलकर &ldquo;Kruti Dev 010&rdquo; करें। हिंदी सही तरह
                    दिखने लगेगी।
                  </span>
                </p>
              </div>
            </details>
            <details
              className="faq-item"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary itemProp="name">
                <span lang="hi" dir="ltr">
                  क्या कृतिदेव फॉन्ट मोबाइल पर काम करता है?
                </span>
              </summary>
              <div
                className="faq-content faq-content--padded"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">
                  <span lang="hi" dir="ltr">
                    नहीं। Android और iPhone में कृतिदेव फॉन्ट इंस्टॉल नहीं होता। मोबाइल पर टेक्स्ट
                    रैंडम अंग्रेजी अक्षरों में दिखता है। इसका समाधान है: कृतिदेव टेक्स्ट को यूनिकोड
                    में बदलें। यूनिकोड हर मोबाइल पर बिना किसी फॉन्ट के सही हिंदी दिखाता है। इसके
                    लिए{' '}
                  </span>
                  <Link href="/krutidev-to-unicode">KrutiDev to Unicode Converter</Link>
                  <span lang="hi" dir="ltr">
                    {' '}
                    का उपयोग करें।
                  </span>
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      

      <section className="content-block section-dark" id="related-resources">
        <div className="container">
          <h2 className="section-heading">
            Related Tools <span className="highlight">and Internal Links</span>
          </h2>
          <div className="related-tools-grid">
            <Link href="/krutidev-to-unicode" className="glass-card related-tool-card">
              <div>
                <h3 className="related-tool-card__title">KrutiDev to Unicode Converter</h3>
                <p className="related-tool-card__desc">
                  Convert KrutiDev text to Unicode for Gmail, WhatsApp, NIC portals, and every
                  mobile device. Free, browser-only.
                </p>
              </div>
              <span className="related-tool-card__link">Open converter →</span>
            </Link>
            <Link href="/" className="glass-card related-tool-card">
              <div>
                <h3 className="related-tool-card__title">Unicode to KrutiDev Converter</h3>
                <p className="related-tool-card__desc">
                  Convert Mangal or Google Input Tools output to KrutiDev format for exam software
                  and legacy printing.
                </p>
              </div>
              <span className="related-tool-card__link">Open converter →</span>
            </Link>
            <Link
              href="/unicode-to-krutidev-10-converter"
              className="glass-card related-tool-card"
            >
              <div>
                <h3 className="related-tool-card__title">Unicode to KrutiDev 10 Converter</h3>
                <p className="related-tool-card__desc">
                  Unicode → KrutiDev 10 for exam practice software that uses the 10 naming.
                </p>
              </div>
              <span className="related-tool-card__link">Open KrutiDev 10 tool →</span>
            </Link>
            <Link
              href="/krutidev-010-to-unicode-converter"
              className="glass-card related-tool-card"
            >
              <div>
                <h3 className="related-tool-card__title">KrutiDev 010 to Unicode Converter</h3>
                <p className="related-tool-card__desc">
                  Government-standard KrutiDev 010 → Unicode for CPCT and state typing exams.
                </p>
              </div>
              <span className="related-tool-card__link">Open KrutiDev 010 tool →</span>
            </Link>
            <Link
              href="/krutidev-10-to-unicode-converter"
              className="glass-card related-tool-card"
            >
              <div>
                <h3 className="related-tool-card__title">KrutiDev 10 to Unicode Converter</h3>
                <p className="related-tool-card__desc">
                  Dedicated converter for KrutiDev 10 / Kurtidev10 encoded documents.
                </p>
              </div>
              <span className="related-tool-card__link">Open KrutiDev 10 tool →</span>
            </Link>
            <Link
              href="/krutidev-to-unicode#what-is-krutidev"
              className="glass-card related-tool-card"
            >
              <div>
                <h3 className="related-tool-card__title">What Is KrutiDev Font?</h3>
                <p className="related-tool-card__desc">
                  History, versions, and why KrutiDev is still used in Indian government offices in
                  2026.
                </p>
              </div>
              <span className="related-tool-card__link">Read overview →</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="content-block section-alt"
        id="references"
        aria-label="References"
      >
        <div className="container">
          <h2 className="section-heading">References</h2>
          <ol className="content-numbered-list">
            <li>
              Unicode Consortium. Unicode Standard, Version 15.1. Devanagari Block U+0900–U+097F.{' '}
              <a
                href="https://www.unicode.org/charts/PDF/U0900.pdf"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                unicode.org/charts/PDF/U0900.pdf
              </a>
            </li>
            <li>
              CPCT Guidelines. Madhya Pradesh Professional Examination Board.{' '}
              <a
                href="https://peb.mp.gov.in"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                peb.mp.gov.in
              </a>
            </li>
            <li>
              Department of Official Language. Ministry of Home Affairs, Government of India.{' '}
              <a
                href="https://rajbhasha.gov.in"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                rajbhasha.gov.in
              </a>
            </li>
            <li>
              Bureau of Indian Standards. IS 13194:1991 — Keyboard Layout for Indian Languages.{' '}
              <a
                href="https://www.bis.gov.in"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                bis.gov.in
              </a>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
