import Link from 'next/link';
import { mangalFaqs } from '@/content/mangal-to-krutidev';
import { externalLinkRel } from '@/lib/seo/external-links';

const UNICODE_CH12 = 'https://www.unicode.org/versions/Unicode15.1.0/ch12.pdf';
const MS_MANGAL = 'https://learn.microsoft.com/en-us/typography/font-list/mangal';

type ExampleRow = {
  input: string;
  stored: string;
  tests: string;
  output: string;
};

const SIMPLE_ROWS: ExampleRow[] = [
  { input: 'भारत', stored: 'भ, ा, र, त', tests: 'Aa matra', output: 'Hkkjr' },
  {
    input: 'नमस्ते भारत',
    stored: 'न, म, स, ्, त, े, space, भ, ा, र, त',
    tests: 'Conjunct, e matra, space kept',
    output: 'ueLrs Hkkjr',
  },
  { input: 'किताब', stored: 'क, ि, त, ा, ब', tests: 'Short-i matra', output: 'fdrkc' },
];

const COMPLEX_ROWS: ExampleRow[] = [
  {
    input: 'क्लिक',
    stored: 'क, ्, ल, ि, क',
    tests: 'Short-i after a conjunct',
    output: 'fDyd',
  },
  {
    input: 'स्थिति',
    stored: 'स, ्, थ, ि, त, ि',
    tests: 'Two short-i signs',
    output: 'fLFkfr',
  },
  { input: 'धर्म', stored: 'ध, र, ्, म', tests: 'Reph', output: '/keZ' },
  {
    input: 'प्रकाश',
    stored: 'प, ्, र, क, ा, श',
    tests: 'Rakar form of र',
    output: 'çdk\'k',
  },
  {
    input: 'पक्का',
    stored: 'प, क, ्, क, ा',
    tests: 'Half form of क',
    output: 'iôk',
  },
  {
    input: 'ज्ञान',
    stored: 'ज, ्, ञ, ा, न',
    tests: 'The ज्ञ conjunct',
    output: 'Kku',
  },
  {
    input: 'ज़रूरत',
    stored: 'ज, ़, र, ू, र, त',
    tests: 'Nukta, long-u matra',
    output: 't+:jr',
  },
  {
    input: 'क्षत्रिय',
    stored: 'क, ्, ष, त, ्, र, ि, य',
    tests: 'Two conjuncts, short-i',
    output: '{kf=;',
  },
];

const MIXED_ROWS: [string, string][] = [
  ['12-10-2026', '12&10&2026'],
  ['https://example.com/a-b', 'https:@@example-com@a&b'],
  ['भारत, India! 12-10-2026', 'Hkkjr] India! 12&10&2026'],
];

function Hi({ children }: { children: string }) {
  return (
    <span lang="hi" dir="ltr">
      {children}
    </span>
  );
}

function ExampleTable({ rows }: { rows: ExampleRow[] }) {
  return (
    <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
      <table className="data-table compare-table">
        <thead>
          <tr>
            <th scope="col">Mangal input</th>
            <th scope="col">Stored Unicode order</th>
            <th scope="col">What it tests</th>
            <th scope="col">KrutiDev 010 output</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.input}>
              <td>
                <Hi>{row.input}</Hi>
              </td>
              <td>
                <Hi>{row.stored}</Hi>
              </td>
              <td>{row.tests}</td>
              <td>
                <code>{row.output}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** SSR article body for /mangal-to-krutidev-converter (frozen v4 copy). */
export default function MangalToKrutidevPageBody() {
  return (
    <>
      <section className="content-block section-alt" id="how-to-convert">
        <div className="container">
          <h2 className="section-heading">
            How to Convert Mangal to{' '}
            <span className="highlight">KrutiDev Online</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Converting Mangal to Kruti Dev takes three steps: copy, paste and
              apply the font. The third step is where most people get stuck, so
              read it even if the first two look obvious.
            </p>

            <h3>Copy Hindi text from Mangal in MS Word</h3>
            <p>
              Select the Hindi text in your document and press Ctrl+C. The text
              can be in Mangal, Nirmala UI or Kokila, because the converter works
              on the characters themselves, not on the font name.
            </p>
            <p>
              Hindi that you typed on your phone and pasted into Word also works,
              as long as it is real text and not a screenshot or a scanned page.
            </p>

            <h3>Paste the text and convert it instantly</h3>
            <p>
              Click inside the input box of the converter and press Ctrl+V.
              Conversion happens as you paste, so you do not need to press a
              convert button.
            </p>
            <p>
              The result appears in the output panel. Do not worry if it looks
              like random English letters. For example, <Hi>भारत</Hi> becomes{' '}
              <code>Hkkjr</code>.
            </p>
            <p>
              Those characters are your Hindi in KrutiDev form. They show as Hindi
              only when Kruti Dev 010 is installed and applied in the program where
              you paste them.
            </p>

            <h3>Copy your result and apply KrutiDev 010</h3>
            <p>
              Copy the output and paste it where you need it, such as Word,
              PageMaker or CorelDRAW. Select only the pasted text and set its font
              to Kruti Dev 010.
            </p>
            <p>
              Hindi letters should appear. If they do not, the font may be missing
              on that computer.
            </p>
            <p>
              It may also not have been applied to the pasted text, or the program
              may have replaced it when you pasted. The Fix section below
              separates these cases.
            </p>
            <p>
              The converter can also give you the result as a Word, PDF or TXT
              download. Open any download on the computer where you will use it
              and check the text there.
            </p>
            <p>
              The PDF we tested was a picture of the converted text, not an
              editable text PDF, so do not expect to select or search the Hindi in
              it. Use the Word or TXT download when you need text you can edit.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="mangal-vs-krutidev">
        <div className="container">
          <h2 className="section-heading">
            Mangal vs KrutiDev —{' '}
            <span className="highlight">What Actually Changes?</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Both fonts put Hindi on your screen, but they work in different
              ways. The difference is in what is stored in your file, not only in
              how the letters look.
            </p>

            <h3>Unicode Hindi vs legacy KrutiDev text</h3>
            <p>
              Unicode stores Devanagari as characters, and the{' '}
              <a
                href={UNICODE_CH12}
                target="_blank"
                rel={externalLinkRel(UNICODE_CH12)}
              >
                Unicode Standard, Chapter 12
              </a>{' '}
              describes how Indic scripts such as Devanagari are encoded. Each
              letter and sign, such as <Hi>क</Hi>, <Hi>ि</Hi> and <Hi>्</Hi>, has
              its own standard code.
            </p>
            <p>
              Mangal is a Microsoft font, listed on{' '}
              <a
                href={MS_MANGAL}
                target="_blank"
                rel={externalLinkRel(MS_MANGAL)}
              >
                Microsoft Typography
              </a>
              , that displays that Unicode text, so changing the font leaves the
              characters unchanged.
            </p>
            <p>
              KrutiDev 010 is a legacy font. Its Hindi letter shapes, called
              glyphs, are attached to ordinary keyboard characters.
            </p>
            <p>
              Your file holds those characters, and the font draws them as Hindi.
              The same word therefore has two stored forms, one in Unicode and one
              in KrutiDev.
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="screen-reader-text">Comparison</span>
                  </th>
                  <th scope="col">Mangal (Unicode)</th>
                  <th scope="col">KrutiDev 010 (legacy)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>What the file stores</td>
                  <td>Devanagari characters</td>
                  <td>Keyboard-style characters mapped to Hindi glyphs</td>
                </tr>
                <tr>
                  <td>Without the font</td>
                  <td>Any Devanagari font can show it</td>
                  <td>
                    Text may appear as Latin letters or symbols without the
                    compatible legacy font
                  </td>
                </tr>
                <tr>
                  <td>Search, web forms, chat</td>
                  <td>Reads as Hindi</td>
                  <td>Usually reads as English letters</td>
                </tr>
                <tr>
                  <td>Typical use today</td>
                  <td>Documents, web, phones, email</td>
                  <td>Older layout files, typing practice, legacy templates</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-prose content-prose--left">
            <h3>Why changing fonts alone doesn&apos;t convert text</h3>
            <p>A font decides how stored characters look. It does not rewrite them.</p>
            <p>
              Select Mangal text and choose Kruti Dev 010, and the file still
              holds Unicode Devanagari, which is not the mapping KrutiDev 010
              expects. The converter rewrites the characters first, and then the
              font can draw them as Hindi.
            </p>
            <p>
              Keep three problems apart, because each has a different fix. A
              source problem means the Unicode itself is wrong.
            </p>
            <p>
              A conversion problem means the Unicode is right but the output is
              wrong. A display problem means the output is right but the program
              shows it wrongly.
            </p>
            <p>
              Check the source in Mangal first, then the converted text, then the
              destination program. Also, this changes the encoding, not the
              language, so it is not a translation.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="examples">
        <div className="container">
          <h2 className="section-heading">
            Mangal to KrutiDev{' '}
            <span className="highlight">Conversion Examples</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Each example shows what goes in, how it is stored in Unicode, and
              what it tests.
            </p>

            <h3>Simple Hindi words — original and converted output</h3>
            <p>
              Each output below came from running the converter&apos;s conversion
              code on the Mangal input. Try a line of your own too.
            </p>
          </div>
          <ExampleTable rows={SIMPLE_ROWS} />

          <div className="content-prose content-prose--left">
            <h3>Matras, half-letters and combined characters</h3>
            <p>
              In Unicode, a consonant carries a built-in &quot;a&quot; sound and a
              matra changes the vowel. The virama, also called halant, removes the
              vowel so a consonant can join the next one, which is how
              half-letters and conjuncts form.
            </p>
            <p>
              A nukta, the dot in <Hi>ज़</Hi> and <Hi>फ़</Hi>, is stored right
              after its consonant. KrutiDev is glyph-based, so it needs ready-made
              shapes for half-letters and joined characters, and a converter must
              choose the right one each time.
            </p>
          </div>
          <ExampleTable rows={COMPLEX_ROWS} />

          <div className="content-prose content-prose--left">
            <p>
              Copy KrutiDev output exactly, because a capital K and a small k are
              different letters.
            </p>

            <h4>
              How the <Hi>छोटी इ मात्रा</Hi> and reph are handled
            </h4>
            <p>
              In Unicode, the short-i matra (<Hi>ि</Hi>) is stored after its
              consonant, even though it appears on the left. KrutiDev writes it
              where it appears, before the letter.
            </p>
            <p>
              In <Hi>क्लिक</Hi>, Unicode stores the sign after the whole{' '}
              <Hi>क्ल</Hi> cluster, and in the output <code>fDyd</code> the{' '}
              <code>f</code> comes first, ahead of the cluster. In{' '}
              <Hi>स्थिति</Hi>, the first <Hi>ि</Hi> likewise moves ahead of{' '}
              <Hi>स्थ</Hi>, giving <code>fLFkfr</code>.
            </p>
            <p>
              Reph, the small hook above a letter, is stored in Unicode as{' '}
              <Hi>र</Hi> followed by a virama, before the letter it sits over.
              KrutiDev writes it after that letter, as the <code>Z</code> at the
              end of <code>/keZ</code> for <Hi>धर्म</Hi>.
            </p>
            <p>
              These tested examples show why matra and reph placement matters.
              Check unfamiliar character combinations using the appropriate
              KrutiDev font. Whether a program then draws the shapes well is a
              display question, separate from conversion.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="word-and-dtp">
        <div className="container">
          <h2 className="section-heading">
            Convert Mangal Text for{' '}
            <span className="highlight">MS Word and DTP Software</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Most problems appear when converted text reaches Word or a layout
              program, so this section follows that journey.
            </p>

            <h3>Using converted KrutiDev text in Microsoft Word</h3>
            <p>
              First decide what kind of text you have. Unicode Hindi reads
              correctly in Mangal and still reads as Hindi in another Hindi
              Unicode font, such as Nirmala UI if it is installed. It needs
              conversion.
            </p>
            <p>
              KrutiDev text looks like English letters in Mangal and displays
              correctly when a compatible KrutiDev font, such as Kruti Dev 010, is
              applied. It is already converted.
            </p>
            <p>
              A common situation: you type Hindi on your phone, paste it into Word
              on a PC, and set Kruti Dev 010, but the Hindi does not appear
              properly. Phone text is Unicode.
            </p>
            <p>
              Depending on your fonts and paste settings, Word may show it in
              Mangal or another Devanagari font. Kruti Dev 010 expects KrutiDev
              characters, so setting it on Unicode text changes the font setting
              but not the text.
            </p>
            <p>
              You may see unchanged Hindi, boxes or odd shapes, depending on how
              your software substitutes fonts. Either way, convert first.
            </p>
            <p>A dependable routine:</p>
            <ol>
              <li>Read the Hindi in Mangal first and fix any wrong letter or sign.</li>
              <li>Paste it into the converter and copy the output.</li>
              <li>Paste the output into Word, preferably in a new document.</li>
              <li>
                Select only the converted text and set Kruti Dev 010, so English
                words and other Unicode Hindi stay untouched.
              </li>
              <li>
                Check the font box. If Word changed the font after pasting, apply
                it again.
              </li>
              <li>
                If letters still look English, confirm the font is in your font
                list, then use the Fix section.
              </li>
            </ol>
            <p>
              If the font keeps changing back, check your paragraph style and
              paste options, which can override a direct font choice in some
              documents.
            </p>

            <h3>Preparing text for PageMaker and CorelDRAW workflows</h3>
            <p>
              KrutiDev became common partly because early desktop publishing tools
              such as PageMaker and CorelDRAW worked with legacy fonts. If a layout
              file still depends on them, convert the text before it goes into the
              layout.
            </p>
            <p>
              Paste it into the text frame, set Kruti Dev 010, then compare the
              frame with your Word copy line by line.
            </p>
            <p>
              How these programs treat pasted text depends on the version and its
              settings, so paste a short sample first and compare it before you set
              a whole page.
            </p>
            <p>
              Keep a Unicode master copy for editing, and convert again after edits
              instead of patching legacy text by hand.
            </p>

            <h3>Checking the output before printing or sharing</h3>
            <ul>
              <li>Read the whole converted text in Kruti Dev 010, not only the first line.</li>
              <li>
                Look closely at names and words with conjuncts, reph or nukta, and
                at every short-i matra.
              </li>
              <li>
                Check numbers, dates, punctuation, English words and web addresses
                one by one, as explained below.
              </li>
              <li>Print a test page if the file is going to press.</li>
              <li>Note which font and version the final file needs.</li>
            </ul>
            <p>
              Dates, web addresses and punctuation may change during KrutiDev
              conversion. Ordinary digits 0 to 9 stay as they are, but Devanagari
              digits such as <Hi>४</Hi> become KrutiDev characters.
            </p>
            <p>
              A comma becomes <code>]</code> and a hyphen becomes <code>&amp;</code>
              . These local test results show the effect:
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th scope="col">Mixed content</th>
                  <th scope="col">KrutiDev 010 output</th>
                </tr>
              </thead>
              <tbody>
                {MIXED_ROWS.map(([input, output]) => (
                  <tr key={input}>
                    <td>{/[ऀ-ॿ]/.test(input) ? <Hi>{input}</Hi> : input}</td>
                    <td>
                      <code>{output}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="content-prose content-prose--left">
            <p>
              Slashes and dots in the web address changed too, so a converted link
              will not work. Where practical, convert the Hindi portions
              separately, or restore the dates, links and English text from your
              original.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="supported-fonts">
        <div className="container">
          <h2 className="section-heading">
            Supported Hindi Fonts,{' '}
            <span className="highlight">Versions and Limitations</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Input and output are separate questions here. The input is Unicode
              Hindi. The output is KrutiDev 010 text.
            </p>

            <h3>Mangal, Nirmala UI and other Unicode input fonts</h3>
            <p>
              Mangal and Nirmala UI both work as input fonts. The converter reads
              the characters you paste, not the font name, so the same Unicode text
              gives the same KrutiDev output whichever of the two shows it.
            </p>
            <p>
              Other fonts that display Unicode Devanagari, such as Kokila, should
              behave the same way. Hindi typed with Google Input Tools or an
              InScript keyboard is also Unicode and converts the same way.
            </p>
            <p>
              If your source is a Nirmala UI document, the{' '}
              <Link href="/nirmala-ui-to-krutidev-converter/">
                Nirmala UI to KrutiDev converter
              </Link>{' '}
              covers that entry point.
            </p>

            <h3>KrutiDev 010 vs KrutiDev 10</h3>
            <p>
              The output of this converter is KrutiDev 010 text. You will also see
              the name written as Kruti Dev 10.
            </p>
            <p>
              On UnicodeKruti, the KrutiDev 010 and Kruti Dev 10 options use the
              same conversion mapping, so the same Unicode text gives the same
              output in both.
            </p>
            <p>
              That describes this converter only. Font files from other sources can
              differ, so if a template expects another KrutiDev font, ask whoever
              supplied it which one it uses before you convert.
            </p>

            <h3>Unsupported legacy fonts and scanned documents</h3>
            <p>
              Other legacy fonts, including KrutiDev 055, DevLys and Chanakya, are
              a different matter. These fonts are not supported by this converter
              and may require different character mappings.
            </p>
            <p>
              PDFs need a separate check. Selectable text in a PDF can sometimes be
              copied out, but the letters may arrive in a changed order.
            </p>
            <p>
              A scanned PDF is a picture of text, so OCR software must recognise
              the characters first, which is a different job from extracting text
              that is already there. Proofread OCR output before converting it.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="fix-problems">
        <div className="container">
          <h2 className="section-heading">
            Fix Common Mangal to KrutiDev{' '}
            <span className="highlight">Conversion Problems</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Most problems come from the source text, the conversion, or the
              program where you paste the result. The table shows which is likely
              and what to try first.
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th scope="col">Symptom</th>
                  <th scope="col">Problem type</th>
                  <th scope="col">Possible causes</th>
                  <th scope="col">What to try</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>English letters or symbols</td>
                  <td>Display</td>
                  <td>
                    Font not installed; not applied to the pasted text; program
                    replaced it on paste; file opened on a computer without the font
                  </td>
                  <td>Check the font list; reapply to the pasted text only</td>
                </tr>
                <tr>
                  <td>A sign, such as the short-i, on the wrong letter</td>
                  <td>Source or display</td>
                  <td>
                    Unicode source stores the sign after a different letter than
                    intended; text passed through a system or PDF that changed the
                    order; destination program displays it wrongly
                  </td>
                  <td>
                    View the word in Mangal. Fix the source if wrong. If right,
                    convert that word alone and compare
                  </td>
                </tr>
                <tr>
                  <td>Half-letters or conjuncts look wrong</td>
                  <td>Source, conversion or display</td>
                  <td>
                    Missing virama or stray joiner in the source; a conversion gap;
                    destination program does not shape the text
                  </td>
                  <td>
                    Retype the conjunct, convert that word alone, compare with the
                    examples
                  </td>
                </tr>
                <tr>
                  <td>Hindi changes when copied to another app</td>
                  <td>Display</td>
                  <td>App replaces fonts or strips formatting</td>
                  <td>Paste as plain text, apply the font again</td>
                </tr>
                <tr>
                  <td>Text copied from a PDF is jumbled</td>
                  <td>Source</td>
                  <td>Letter order scrambled in the PDF; scanned image</td>
                  <td>Copy a short sample; use the original document; OCR for scans</td>
                </tr>
                <tr>
                  <td>Right in Mangal, wrong in the destination program</td>
                  <td>Display</td>
                  <td>Program does not shape Indic text properly</td>
                  <td>Test the same text in Word; use a program with Indic support</td>
                </tr>
                <tr>
                  <td>Numbers, dates or punctuation look different</td>
                  <td>Conversion</td>
                  <td>
                    A comma becomes <code>]</code>, a hyphen becomes{' '}
                    <code>&amp;</code>, and Devanagari digits use KrutiDev
                    characters
                  </td>
                  <td>
                    Use ordinary digits 0 to 9 where numbers should stay as they
                    are, and convert Hindi portions separately and restore dates,
                    links and English text from the original
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-prose content-prose--left">
            <h3>Converted text shows English letters or symbols</h3>
            <p>
              English-looking letters are expected until the font is working in
              your program. If they stay after you apply Kruti Dev 010, check in
              order.
            </p>
            <p>
              Is the font installed on this computer? Is it applied to the pasted
              text itself? Did the program swap the font on paste? Did you paste
              already-converted text back into the converter?
            </p>
            <p>
              A file you email will show English letters on any computer that lacks
              the font.
            </p>

            <h3>Matras and joined characters look incorrect</h3>
            <p>
              Do not assume the converter is at fault. Open the source in Mangal
              and zoom in. If the error is already there, fix the source and
              convert again.
            </p>
            <p>
              If the source is right, convert one problem word alone and compare it
              with the examples. Encoding conversion cannot repair programs that do
              not shape Indic text properly, such as the half-letter problems some
              graphics and video software shows.
            </p>

            <h3>Text from PDF or Word loses its appearance</h3>
            <p>
              Treat the converter as a text tool. Bold, tables and layout are not
              guaranteed to carry across, so reapply them in the destination.
            </p>
            <p>
              Clipboard format, font replacement, or a chat or email program
              stripping fonts can also change text. Try plain-text paste first,
              then apply the font again. If it still looks wrong, return to the
              Unicode original and convert again.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="who-needs-it">
        <div className="container">
          <h2 className="section-heading">
            Who Needs Mangal to{' '}
            <span className="highlight">KrutiDev Conversion?</span>
          </h2>
          <div className="content-prose content-prose--left">
            <h3>Office typists and older document workflows</h3>
            <p>
              Some offices still keep forms, letterheads and data-entry templates
              built around KrutiDev. If a draft reaches you in Mangal from a
              colleague, a phone or a web form, you convert it to match the
              template.
            </p>
            <p>
              Typing practice is another case, since some learners and instructors
              still prepare passages in KrutiDev. Typical tasks include preparing a
              notice from a Unicode draft or filling a register template that
              expects KrutiDev.
            </p>
            <p>
              Rules differ between offices and tests, so follow the font and format
              your notice or supervisor specifies.
            </p>

            <h3>Hindi DTP operators, publishers and learners</h3>
            <p>
              Operators who set pages in older layout files often receive copy as
              Unicode from authors and editors. Converting just before layout lets
              editors keep working in Mangal while you place KrutiDev text in the
              file.
            </p>
            <p>
              Proofreaders benefit too, since a quick conversion lets them check a
              draft in the font the printer will use. Learners can use the examples
              above to see how the same Hindi word is stored differently in each
              system.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="faq">
        <div className="container">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div
            className="faq-accordion"
            style={{ maxWidth: 900, margin: '2rem auto 0' }}
          >
            {mangalFaqs.map((faq) => (
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

      <section className="content-block section-alt" id="related-resources">
        <div className="container">
          <h2 className="section-heading">
            Related Converters and{' '}
            <span className="highlight">Hindi Font Resources</span>
          </h2>
          <div className="content-prose content-prose--left">
            <ul>
              <li>
                Need the opposite direction? Try the{' '}
                <Link href="/krutidev-to-unicode-converter/">
                  KrutiDev to Unicode converter
                </Link>
                .
              </li>
              <li>
                For any Unicode Hindi text, the{' '}
                <Link href="/">Unicode to KrutiDev converter</Link> on the homepage
                covers every Unicode input font.
              </li>
              <li>
                The{' '}
                <Link href="/unicode-to-krutidev-10-converter/">
                  Unicode to KrutiDev 10 converter
                </Link>{' '}
                covers the 10 spelling.
              </li>
              <li>
                Text that starts in Nirmala UI fits the{' '}
                <Link href="/nirmala-ui-to-krutidev-converter/">
                  Nirmala UI to KrutiDev converter
                </Link>
                .
              </li>
              <li>
                For KrutiDev font downloads and installation guidance, see our{' '}
                <Link href="/font-download/">KrutiDev font page</Link>.
              </li>
            </ul>
            <p>
              Convert first and format second; that is the whole method. Use the
              Mangal to KrutiDev converter above, apply Kruti Dev 010 where you need
              it, and read the final result carefully before printing or sharing it
              with colleagues.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
