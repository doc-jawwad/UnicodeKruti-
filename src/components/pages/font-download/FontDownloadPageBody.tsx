import type { ReactNode } from 'react';
import Link from 'next/link';
import { fontDownloadFaqs, fontDownloadFaqsHindi } from '@/content/font-download-faqs';
import { externalLinkRel } from '@/lib/seo/external-links';

const EXT = {
  officeCustomFonts:
    'https://support.microsoft.com/en-us/office/download-and-install-custom-fonts-to-use-with-office-0ee09e74-edc1-480c-81c2-5cf9537c70ce',
  officeEmbed:
    'https://support.microsoft.com/en-us/topic/2ba26947-5d18-4eb3-b5a9-67a58629e1b8',
  windowsFonts:
    'https://support.microsoft.com/help/314960/how-to-install-or-remove-a-font-in-windows',
  wordPdf:
    'https://support.microsoft.com/en-us/office/collab-files/save-or-convert-to-pdf-or-xps-in-office-desktop-apps',
  appleFontBook:
    'https://support.apple.com/guide/font-book/install-and-validate-fonts-fntbk1000/mac',
  wpsAndroid:
    'https://academy.wps.com/academy/how-to-install-times-new-roman-font-for-wps-office-for-android-quick-tutorials-1877542',
  mangal:
    'https://learn.microsoft.com/en-us/typography/font-list/mangal',
  nirmalaUi:
    'https://learn.microsoft.com/en-us/typography/font-list/nirmala-ui',
} as const;

function ExtLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel={externalLinkRel(href)}>
      {children}
    </a>
  );
}

/** SSR body for /font-download — frozen Gate 3 approved article (post-grid sections). */
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
              <a href="#download-collection" className="toc-link-item">
                Download Kruti Dev Fonts – Free Hindi TTF Collection
              </a>
              <a href="#krutidev-010" className="toc-link-item">
                Kruti Dev 010 Font Download
              </a>
              <a href="#all-versions" className="toc-link-item">
                Kruti Dev All Font Download – Available Versions
              </a>
              <a href="#marathi" className="toc-link-item">
                Kruti Dev Marathi Font Download
              </a>
              <a href="#install" className="toc-link-item">
                How to Install Kruti Dev Fonts on Windows 10 and 11, Mac &amp; MS Word
              </a>
              <a href="#android" className="toc-link-item">
                Kruti Dev 010 on Android: Download, Viewing &amp; Limitations
              </a>
              <a href="#troubleshooting" className="toc-link-item">
                Fix Common Kruti Dev Font Download and Installation Problems
              </a>
              <a href="#fonts-vs-unicode" className="toc-link-item">
                Kruti Dev Font Files vs Unicode Fonts and Keyboard PDFs
              </a>
              <a href="#faq" className="toc-link-item">
                Frequently Asked Questions About Kruti Dev Font Downloads
              </a>
              <a href="#related-resources" className="toc-link-item">
                Related Hindi Typing and Converter Resources
              </a>
            </div>
          </details>
        </div>
      </section>

      <section className="content-block section-alt" id="preview-and-files">
        <div className="container">
          <h3 className="section-subheading" id="preview-fonts">
            Preview Fonts Before Downloading
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              Every card shows a short sample phrase set in that font, so you can compare letter
              shapes with your document before you download anything. In our check of all 15 font
              files, each one displayed the sample as नमस्ते भारत. Previews load as each card scrolls
              into view, so on a slow connection give a card a moment before deciding that a font
              looks wrong.
            </p>
          </div>

          <h3 className="section-subheading" id="download-individual">
            Download Individual Kruti Dev TTF Files
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              Each button saves a single .ttf (TrueType) file, so there is nothing to unzip. The file
              name and the font name are not always the same. For example, the file K24.ttf declares
              the font name Kruti Dev 024. Apps usually list a font by its font name, which is why
              the version table below shows both.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="krutidev-010">
        <div className="container">
          <h2 className="section-heading">Kruti Dev 010 Font Download</h2>
          <div className="content-prose content-prose--left">
            <p>
              For a Kruti Dev 010 font download, use the first card in the grid. The file is
              KRDEV010.ttf, and the font name it declares is Kruti Dev 010, Regular. If no particular
              version has been specified, 010 is a useful starting point. If a document, teacher or
              official instruction names a different number, download that number instead, because
              each version is a separate font file.
            </p>
            <p>
              <a href="#download-krutidev-010" className="btn-primary font-dl-secondary-010">
                Go to Kruti Dev 010 download
              </a>
            </p>
            <p>
              Already have text typed in 010 that you need to read or paste online? The{' '}
              <Link href="/krutidev-010-to-unicode-converter/">
                Kruti Dev 010 to Unicode converter
              </Link>{' '}
              turns it into Unicode Hindi.
            </p>
          </div>

          <h3 className="section-subheading" id="krutidev-010-pc-word">
            Kruti Dev 010 Hindi Font for PC and MS Word
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              To use the Kruti Dev 010 Hindi font on your PC, install it in Windows first. After
              that, it should appear in Word&apos;s font list. Microsoft explains that{' '}
              <ExtLink href={EXT.officeCustomFonts}>
                custom fonts display as intended only on computers where they are installed
              </ExtLink>
              , and that other computers may show the text in a default font instead. So when you
              send a Word file typed in Kruti Dev 010, the receiving computer generally needs the
              same font to show the intended Hindi. Before you share widely, test a PDF of the
              document on another device, or send a Unicode copy. The installation steps are in the{' '}
              <a href="#install">Windows, Mac and Word</a> section below.
            </p>
          </div>

          <h3 className="section-subheading" id="krutidev-10-vs-010">
            Kruti Dev 10 vs 010: Names and Compatibility
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              Many people search for &ldquo;Kruti Dev 10&rdquo; when looking for the font named Kruti
              Dev 010, and similar short labels are used for 11, 16 and 55. This page hosts one file
              per version. Most file names here include the zero, such as KRDEV010.ttf, but some do
              not, such as K24.ttf. The font name embedded in every file uses the three-digit form,
              such as Kruti Dev 010 or Kruti Dev 024. Files labelled &ldquo;Kruti Dev 10&rdquo; on
              other websites have not been checked against ours, so match the exact font name your
              document already uses in Word.
            </p>
            <p>These are search labels, not a claim that separately sourced files are identical.</p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <caption className="screen-reader-text">
                Search labels mapped to file names and embedded font names
              </caption>
              <thead>
                <tr>
                  <th scope="col">You searched for</th>
                  <th scope="col">File on this page</th>
                  <th scope="col">Font name in the file</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kruti Dev 10</td>
                  <td>KRDEV010.ttf</td>
                  <td>Kruti Dev 010</td>
                </tr>
                <tr>
                  <td>Kruti Dev 11</td>
                  <td>KRDEV011.ttf</td>
                  <td>Kruti Dev 011</td>
                </tr>
                <tr>
                  <td>Kruti Dev 16</td>
                  <td>KRDEV016.ttf</td>
                  <td>Kruti Dev 016</td>
                </tr>
                <tr>
                  <td>Kruti Dev 55</td>
                  <td>KRDEV055.ttf</td>
                  <td>Kruti Dev 055</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-prose content-prose--left">
            <p>
              For text labelled Kruti Dev 10, use the{' '}
              <Link href="/krutidev-10-to-unicode-converter/">
                Kruti Dev 10 to Unicode converter
              </Link>{' '}
              or the{' '}
              <Link href="/unicode-to-krutidev-10-converter/">
                Unicode to Kruti Dev 10 converter
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="all-versions">
        <div className="container">
          <h2 className="section-heading">Kruti Dev All Font Download – Available Versions</h2>
          <div className="content-prose content-prose--left">
            <p>
              These are all the Kruti Dev fonts you can download here: 15 files in total. The table
              shows each file name next to the font name the file declares, which is the name to look
              for in Word or Font Book.
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <caption className="screen-reader-text">
                Available Kruti Dev TTF files and declared font names
              </caption>
              <thead>
                <tr>
                  <th scope="col">File</th>
                  <th scope="col">Font name in the file</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>KRDEV010.ttf</td>
                  <td>Kruti Dev 010</td>
                </tr>
                <tr>
                  <td>KRDEV011.ttf</td>
                  <td>Kruti Dev 011</td>
                </tr>
                <tr>
                  <td>Kruti-Dev-012.ttf</td>
                  <td>Kruti Dev 012</td>
                </tr>
                <tr>
                  <td>Kruti-Dev-013.ttf</td>
                  <td>Kruti Dev 013</td>
                </tr>
                <tr>
                  <td>Kruti-Dev-014.ttf</td>
                  <td>Kruti Dev 014</td>
                </tr>
                <tr>
                  <td>KRDEV016.ttf</td>
                  <td>Kruti Dev 016</td>
                </tr>
                <tr>
                  <td>KRDEV020.ttf</td>
                  <td>Kruti Dev 020</td>
                </tr>
                <tr>
                  <td>Kruti-Dev-021.ttf</td>
                  <td>Kruti Dev 021</td>
                </tr>
                <tr>
                  <td>Kruti-Dev-022.ttf</td>
                  <td>Kruti Dev 022</td>
                </tr>
                <tr>
                  <td>K24.ttf</td>
                  <td>Kruti Dev 024</td>
                </tr>
                <tr>
                  <td>K25.ttf</td>
                  <td>Kruti Dev 025</td>
                </tr>
                <tr>
                  <td>K26.ttf</td>
                  <td>Kruti Dev 026</td>
                </tr>
                <tr>
                  <td>KRDEV030.ttf</td>
                  <td>Kruti Dev 030</td>
                </tr>
                <tr>
                  <td>KRDEV030-BOLD.ttf</td>
                  <td>Kruti Dev 030 (Bold)</td>
                </tr>
                <tr>
                  <td>KRDEV055.ttf</td>
                  <td>Kruti Dev 055</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-prose content-prose--left">
            <p>Versions such as 040, 050, 100 or 714 are not available on this page.</p>
          </div>

          <h3 className="section-subheading" id="krutidev-011">
            Kruti Dev 011 Font Download
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              For a Kruti Dev 011 font download (often searched as &ldquo;Kruti Dev 11&rdquo;), use
              the KRDEV011.ttf card. It is a separate file with its own font name, not a renamed copy
              of 010. Its internal data records a bold weight value even though its style label says
              Regular, so compare the preview with your document. One practical difference: 011
              declares restricted embedding, and Microsoft explains that{' '}
              <ExtLink href={EXT.officeEmbed}>
                Office cannot embed a font when its creator does not permit it
              </ExtLink>
              .
            </p>
          </div>

          <h3 className="section-subheading" id="krutidev-016">
            Kruti Dev 016 Font Download
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              The Kruti Dev 016 font download is the KRDEV016.ttf card. The style label stored in the
              file is Thin, and its internal name describes it as a thin form of 010. Use the preview
              to compare its strokes with your document before you install it. If you searched for
              &ldquo;Kruti Dev 16&rdquo;, this is the file on this page with that number.
            </p>
          </div>

          <h3 className="section-subheading" id="more-fonts">
            More Kruti Dev Fonts: 012–014, 020–022, 024–026 &amp; 030
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              The remaining files fall into three groups, going by the names and labels stored in
              each file:
            </p>
            <ul className="content-bullet-list">
              <li>
                <strong>010-based:</strong> 012 (Italic), 013 (Bold Italic), 014 (Condensed)
              </li>
              <li>
                <strong>020 group:</strong> 020 (Bold), 021 (Bold), 022 (Italic), 024 (Condensed),
                025 (Wide), 026 (Thin)
              </li>
              <li>
                <strong>030 group:</strong> 030 (Regular) and 030 Bold
              </li>
            </ul>
            <p>
              These labels come from the files&apos; internal data, so check the preview to see how
              each one actually looks. If you want a Kruti Dev bold font, the files whose data says
              Bold or records a bold weight are 011, 013, 020, 021 and 030 Bold. There is no separate
              file named Kruti Dev 010 Bold on this page.
            </p>
          </div>

          <h3 className="section-subheading" id="zip-download">
            Can You Download All Kruti Dev Fonts in a ZIP?
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              No. This page doesn&apos;t offer a ZIP of all fonts. Every version downloads as its own
              TTF file of roughly 57 to 67 KB, so you can simply download the few you need.
            </p>
            <p>
              If you get a ZIP pack from another website, Microsoft advises{' '}
              <ExtLink href={EXT.windowsFonts}>extracting the files before installing</ExtLink>.
              Only approve an installation prompt for files that come from a source you trust.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="marathi">
        <div className="container">
          <h2 className="section-heading">Kruti Dev Marathi Font Download</h2>
          <div className="content-prose content-prose--left">
            <p>
              Kruti Dev is a Devanagari font, and Marathi is written in Devanagari, so Marathi
              documents typed in Kruti Dev use the same kind of font file. Kruti Dev 055 is available
              here and is often searched for alongside Marathi. Before you download, check which
              Kruti Dev name your Marathi document already shows in Word&apos;s Font box.
            </p>
          </div>

          <h3 className="section-subheading" id="krutidev-055-marathi">
            Kruti Dev 055 Marathi Font Download
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              For the Kruti Dev 055 Marathi font download, use the KRDEV055.ttf card. The font name
              it declares is Kruti Dev 055, which some people search for as &ldquo;Kruti Dev 55
              Marathi&rdquo;. Inside the file, its technical PostScript name mentions &ldquo;050
              Wide&rdquo;. That detail may explain why 050 and 055 get mixed up, but it does not show
              that a separate Kruti Dev 050 file would look or behave the same.
            </p>
          </div>

          <h3 className="section-subheading" id="choosing-marathi">
            Choosing Between Marathi Font Versions
          </h3>
          <div className="content-prose content-prose--left">
            <p>Work through these in order:</p>
            <ol className="content-numbered-list">
              <li>
                <strong>Your document or instruction names a version.</strong> Install exactly that
                version.
              </li>
              <li>
                <strong>You only need to read a Marathi document typed in Kruti Dev.</strong> Open
                it in Word, check the font name it uses, and install that version.
              </li>
              <li>
                <strong>You were asked for Kruti Dev 050.</strong> It is not hosted here. Renaming
                another file will not turn it into 050, because the name stored inside the file stays
                the same.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="install">
        <div className="container">
          <h2 className="section-heading">
            How to Install Kruti Dev Fonts on Windows 10 and 11, Mac &amp; MS Word
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              To install a Kruti Dev font on Windows 10 or 11, right-click the downloaded .ttf file
              and choose Install. The steps below cover Windows first, then Microsoft Word, then Mac.
            </p>
          </div>

          <h3 className="section-subheading" id="install-pc">
            Install Kruti Dev TTF Files on Your PC
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              These steps follow{' '}
              <ExtLink href={EXT.windowsFonts}>
                Microsoft&apos;s guidance for installing fonts in Windows
              </ExtLink>
              .
            </p>
            <ol className="content-numbered-list">
              <li>
                Download the version you need from the grid above. Your browser normally saves the
                .ttf file in your Downloads folder.
              </li>
              <li>
                Right-click the file and choose <strong>Install</strong>. If everyone who uses the
                computer needs the font, choose <strong>Install for all users</strong> instead.
              </li>
              <li>
                If Windows asks for permission to make changes, approve it only if you trust where
                the file came from. Microsoft warns that installing an untrusted file can put your
                computer at risk.
              </li>
              <li>
                Open <strong>Settings &gt; Personalization &gt; Fonts</strong> and search for
                &ldquo;Kruti Dev&rdquo; to confirm the font is listed.
              </li>
            </ol>
            <p>
              Repeat these steps for each version you download. To remove a version later, see the{' '}
              <a href="#faq">FAQ</a> below.
            </p>
          </div>

          <h3 className="section-subheading" id="install-word">
            Use Kruti Dev Font in Microsoft Word
          </h3>
          <div className="content-prose content-prose--left">
            <p>Once Windows lists the font, it should be available in Word.</p>
            <ol className="content-numbered-list">
              <li>
                If Word was open while you installed the font, close it completely and open it again.
              </li>
              <li>Select your text, or place the cursor where you want to type.</li>
              <li>
                On the <strong>Home</strong> tab, click the Font box and type the font name, for
                example Kruti Dev 010. Use the font name from the version table, not the file name
                such as KRDEV010.
              </li>
              <li>
                Start typing. Kruti Dev uses its own key positions, so the keys you press will not
                match a Unicode Hindi keyboard.
              </li>
            </ol>
            <p>
              When you share the document, the other computer generally needs the same font to
              reproduce your Hindi. Embedding is not reliable with these files: 011 declares
              restricted embedding, and the other files carry non-standard embedding data. For fonts
              that cannot be embedded, Word&apos;s PDF options include{' '}
              <ExtLink href={EXT.wordPdf}>
                Bitmap text when fonts may not be embedded
              </ExtLink>
              . Check any PDF on another device before relying on it.
            </p>
          </div>

          <h3 className="section-subheading" id="install-mac">
            Install Kruti Dev Fonts on Mac
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              On a Mac, you install fonts with Font Book, following{' '}
              <ExtLink href={EXT.appleFontBook}>Apple&apos;s instructions</ExtLink>.
            </p>
            <ol className="content-numbered-list">
              <li>
                Double-click the downloaded .ttf file in Finder, then click{' '}
                <strong>Install</strong>. You can also open Font Book and choose{' '}
                <strong>File &gt; Add Fonts to Current User</strong>.
              </li>
              <li>
                Font Book checks the font when you install it. A green result means it passed, yellow
                means a possible issue, and red means it failed.
              </li>
              <li>
                If Word, Pages or another app was already open, quit it and open it again, then
                choose the font by name.
              </li>
            </ol>
            <p>
              If Font Book reports a problem with a file, remove that copy and get a trusted copy of
              the same version your document uses. Choosing a different version to avoid the warning
              may change how your document looks.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="android">
        <div className="container">
          <h2 className="section-heading">
            Kruti Dev 010 on Android: Download, Viewing &amp; Limitations
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              If you searched for a Kruti Dev 010 font download for Android mobile, you can download
              the TTF file on your phone, but downloading it does not by itself make the font
              available in your apps. Font support on Android varies with the phone maker and with
              each app. When your goal is simply to read a Kruti Dev document on your phone,
              converting the text to Unicode is usually the more dependable route.
            </p>
          </div>

          <h3 className="section-subheading" id="install-android">
            Can You Install Kruti Dev Fonts on Android?
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              That depends on your phone and the app you want to use. Some phone makers include their
              own font settings, and some apps can load font files that you add yourself. For
              example,{' '}
              <ExtLink href={EXT.wpsAndroid}>WPS Office&apos;s help (2023)</ExtLink> describes
              copying font files into a &ldquo;Fonts&rdquo; folder in the phone&apos;s internal
              storage for use in WPS. We have not tested these Kruti Dev files with that method, so
              treat it as something to try, and check the current help pages for your app and phone.
            </p>
            <p>
              Even when one app shows Kruti Dev correctly, the people you send that text to will see
              it as intended only if their device has a matching font.
            </p>
          </div>

          <h3 className="section-subheading" id="view-mobile">
            How to View Kruti Dev Documents on Mobile
          </h3>
          <div className="content-prose content-prose--left">
            <p>You have two practical options:</p>
            <ul className="content-bullet-list">
              <li>
                <strong>Ask for a PDF.</strong> Open it on your phone and check that the Hindi looks
                right, because fonts are not always embedded in PDFs.
              </li>
              <li>
                <strong>Convert the text.</strong> Paste the Kruti Dev text into the{' '}
                <Link href="/krutidev-to-unicode-converter/">Kruti Dev to Unicode converter</Link>{' '}
                and use the Unicode result. Unicode stores real Devanagari characters, so it displays
                as Hindi in far more phone apps and websites than Kruti Dev text does.
              </li>
            </ul>
            <p>
              If you need to send Hindi from your phone, in a form or a chat message, use Unicode
              text from the start.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="troubleshooting">
        <div className="container">
          <h2 className="section-heading">
            Fix Common Kruti Dev Font Download and Installation Problems
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Most Kruti Dev problems come from one of three causes: searching for the wrong name,
              the font not being applied to the text, or opening the file on a device that does not
              have the font.
            </p>
          </div>

          <h3 className="section-subheading" id="not-showing-word">
            Kruti Dev Font Not Showing in MS Word
          </h3>
          <div className="content-prose content-prose--left">
            <p>Work through this checklist:</p>
            <ul className="content-bullet-list">
              <li>Close Word completely and open it again.</li>
              <li>
                Search for the font name (Kruti Dev 010), not the file name (KRDEV010).
              </li>
              <li>
                Confirm the font appears under Settings &gt; Personalization &gt; Fonts. If it
                doesn&apos;t, install it again.
              </li>
              <li>
                If several people use the computer, try <strong>Install for all users</strong>.
              </li>
              <li>
                Make sure you downloaded a .ttf file. A keyboard chart PDF or a saved web page cannot
                be installed as a font.
              </li>
              <li>Still missing? Restart the computer and check again.</li>
            </ul>
          </div>

          <h3 className="section-subheading" id="english-letters">
            Hindi Text Appears as English Letters
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              This happens when Kruti Dev text is opened without the matching font. Kruti Dev fonts
              draw Hindi shapes over ordinary Latin keyboard characters, and none of the 15 files
              here contains any character from the Unicode Devanagari block. So your document
              actually stores Latin letters: the word भारत, for example, is stored as{' '}
              <code>Hkkjr</code>. Fix it one of two ways:
            </p>
            <ul className="content-bullet-list">
              <li>
                <strong>Apply the font.</strong> In Word, select the text and choose the matching
                Kruti Dev font.
              </li>
              <li>
                <strong>Convert the text.</strong> If it must work on phones, websites or online
                forms, use the{' '}
                <Link href="/krutidev-to-unicode-converter/">Kruti Dev to Unicode converter</Link>.
                For the opposite job, turning Unicode Hindi into Kruti Dev, use the{' '}
                <Link href="/">Unicode to Kruti Dev converter</Link>.
              </li>
            </ul>
          </div>

          <h3 className="section-subheading" id="wrong-version">
            Wrong Font Version or Installation Errors
          </h3>
          <div className="content-prose content-prose--left">
            <ul className="content-bullet-list">
              <li>
                <strong>The text looks slightly different from the original.</strong> The document
                may use another Kruti Dev version. Check the name in Word&apos;s Font box and install
                that version.
              </li>
              <li>
                <strong>Windows reports a problem with the file.</strong> The download may be
                incomplete, for example after an interrupted connection. Download the file again from
                this page and retry.
              </li>
              <li>
                <strong>Windows indicates the font is already installed.</strong> First check which
                version is installed and whether your document already displays correctly. If it
                does, you don&apos;t need to do anything. Replace the installed copy only if it is a
                different or faulty version.
              </li>
              <li>
                <strong>Font Book reports a problem.</strong> Don&apos;t use that copy. Get a trusted
                copy of the same version your document uses.
              </li>
              <li>
                <strong>A security prompt appears.</strong> Continue only if you trust the source.
                Never turn off Windows security features to install a font.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="fonts-vs-unicode">
        <div className="container">
          <h2 className="section-heading">
            Kruti Dev Font Files vs Unicode Fonts and Keyboard PDFs
          </h2>
          <div className="content-prose content-prose--left">
            <p>These three are easy to confuse, but each solves a different problem.</p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <caption className="screen-reader-text">
                Comparison of Kruti Dev TTF fonts, Unicode Hindi fonts, and keyboard charts
              </caption>
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">What it is</th>
                  <th scope="col">When you need it</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kruti Dev TTF font</td>
                  <td>A legacy font that draws Hindi shapes over Latin characters</td>
                  <td>
                    To open or type Kruti Dev documents; the text shows as intended where a matching
                    font is available, or through a checked PDF
                  </td>
                </tr>
                <tr>
                  <td>Unicode Hindi font, such as Mangal or Nirmala UI</td>
                  <td>
                    A font for Unicode Devanagari text; Microsoft lists both as included with Windows
                    10 and 11
                  </td>
                  <td>For Hindi that works across apps, phones and websites</td>
                </tr>
                <tr>
                  <td>Kruti Dev keyboard chart (often a PDF)</td>
                  <td>A picture showing which key types which letter</td>
                  <td>For learning to type; it is not a font and cannot be installed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-prose content-prose--left">
            <p>
              So a search for a &ldquo;Kruti Dev 010 font download PDF&rdquo; is usually a search for
              the keyboard chart, not the font file. If you have Mangal or Nirmala UI text and need
              it in Kruti Dev, the{' '}
              <Link href="/mangal-to-krutidev-converter/">Mangal to Kruti Dev converter</Link> and
              the{' '}
              <Link href="/nirmala-ui-to-krutidev-converter/">
                Nirmala UI to Kruti Dev converter
              </Link>{' '}
              handle that.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="faq">
        <div className="container">
          <h2 className="section-heading">
            Frequently Asked Questions About Kruti Dev Font Downloads
          </h2>
          <div className="faq-accordion" style={{ maxWidth: 900, margin: '2rem auto 0' }}>
            {fontDownloadFaqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <div className="faq-content faq-content--padded">
                  {faq.question === 'Does Windows already include a Hindi font?' ? (
                    <p>
                      Yes. Microsoft lists{' '}
                      <ExtLink href={EXT.mangal}>Mangal</ExtLink> and{' '}
                      <ExtLink href={EXT.nirmalaUi}>Nirmala UI</ExtLink>, both Unicode Devanagari
                      fonts, as included with Windows 10 and 11. They cannot display Kruti Dev text
                      as Hindi, so you still need a Kruti Dev font or a Unicode conversion.
                    </p>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              </details>
            ))}
          </div>

          <div
            className="faq-accordion"
            lang="hi"
            dir="ltr"
            aria-label="हिंदी में प्रश्न"
            style={{ maxWidth: 900, margin: '1.5rem auto 0' }}
          >
            {fontDownloadFaqsHindi.map((faq) => (
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

      <section className="content-block section-dark" id="related-resources">
        <div className="container">
          <h2 className="section-heading">Related Hindi Typing and Converter Resources</h2>
          <div className="content-prose content-prose--left">
            <p>
              Choose your version in the grid above to start your Kruti Dev font download, and come
              back to the troubleshooting section if Word doesn&apos;t show it. For converting text
              rather than installing fonts, these tools help:
            </p>
            <ul className="content-bullet-list">
              <li>
                <Link href="/">Unicode to Kruti Dev converter</Link>: turn Unicode Hindi into Kruti
                Dev text
              </li>
              <li>
                <Link href="/krutidev-to-unicode-converter/">
                  Kruti Dev to Unicode converter
                </Link>
                : make Kruti Dev text readable more widely
              </li>
              <li>
                <Link href="/krutidev-010-to-unicode-converter/">
                  Kruti Dev 010 to Unicode converter
                </Link>
                : for text typed in 010
              </li>
              <li>
                <Link href="/mangal-to-krutidev-converter/">Mangal to Kruti Dev converter</Link>:
                convert Mangal Hindi text
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
