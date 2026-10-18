import Image from 'next/image';
import Link from 'next/link';
import { keyboardLayoutFaqs, KEYBOARD_PDF_PATH, KEYBOARD_REFERENCES } from '@/content/keyboard-layout';
import { externalLinkRel } from '@/lib/seo/external-links';
import KeyboardWidget from './KeyboardWidget';
import KeySearch from './KeySearch';
import {
  ConjunctTable,
  LayoutComparisonTable,
  NormalKeysTable,
  PunctuationTable,
  ShiftKeysTable,
  ToolChoiceTable,
  TypingExamplesTable,
} from './KeyTables';

function Hi({ children }: { children: React.ReactNode }) {
  return (
    <span lang="hi" dir="ltr">
      {children}
    </span>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel={externalLinkRel(href)}>
      {children}
    </a>
  );
}

/** SSR body for /krutidev-keyboard-layout — wording follows founder-approved Article v3. */
export default function KeyboardLayoutPageBody() {
  return (
    <>
      <section className="content-block section-alt" id="keyboard-layout">
        <div className="container">
          <h2 className="section-heading">Kruti Dev 010 Keyboard Layout — Normal and Shift Keys</h2>

          <h3 className="section-subheading">Interactive Remington QWERTY keyboard chart</h3>
          <div id="keyboard-chart" className="kbd-anchor">
            <KeyboardWidget />
          </div>

          <div className="content-prose kbd-prose">
            <p>
              Kruti Dev 010 is a font, not a keyboard. You type on a normal QWERTY keyboard, and the
              font gives the stored characters Hindi shapes, following the arrangement of a
              Remington typewriter. The key rows on this page come from the character table our
              converter uses to read Kruti Dev text.
            </p>
            <p>
              That table tells us what each stored character means; it is not the result of typing
              tests in Word, which are still pending. With that caveat, the home row keys a, s, d,
              f, g, h, j, k, l and ; correspond to <Hi>ं े क ि ह ी र ा स य</Hi>. The Shift layer
              adds half letters such as D for <Hi>क्</Hi> and extra letters such as N for{' '}
              <Hi>छ</Hi>.
            </p>
            <p>
              Two stored characters depend on their neighbours. In the converter&apos;s rules, f is
              the chhoti i matra (<Hi>छोटी इ की मात्रा</Hi>), and it comes before the consonant it
              belongs to in the stored text. Z is the reph mark (<Hi>रेफ</Hi>), and it comes after
              the character it sits above.
            </p>
            <p>
              Click or tap any key above to see what it types. Use the Shift button to switch
              layers, or press Shift on your own keyboard.
            </p>
          </div>

          <figure className="kbd-shot">
            <Image
              src="/images/keyboard-layout/kruti-dev-keyboard-shift-layer.png"
              width={1470}
              height={864}
              sizes="(max-width: 1000px) 100vw, 980px"
              alt="Screenshot of the interactive Kruti Dev 010 keyboard on this page with Shift on. The D key is selected and shows the half letter क् with its stored character D and code points U+0915 U+094D. Shift+4 and Shift+5 are marked unresolved."
            />
          </figure>

          <h3 className="section-subheading">How to read normal keys, Shift keys and Hindi labels</h3>
          <div className="content-prose kbd-prose">
            <p>
              Every key on this page can be described in four ways, and mixing them up causes
              confusion. The physical key is the one you press, such as D. The stored legacy
              character is what the file contains. Without the Kruti Dev font, it may appear as a
              Latin letter or symbol.
            </p>
            <p>
              With the font applied, it appears as a Hindi-looking glyph. The Unicode converter
              output is genuine Devanagari text, which you get only after conversion. Matras are
              shown on a dotted circle, like <Hi>◌ा</Hi>, so you can see where they sit.
            </p>
            <p>
              In the tables below, a key and its stored character are assumed to be the same; the
              physical keyboard test is what will confirm that. Alt-code numbers are not keys, so
              they are kept apart in the Alt-code section.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="pdf">
        <div className="container">
          <h2 className="section-heading">Download the Kruti Dev Keyboard Chart PDF</h2>

          <h3 className="section-subheading">Print the full A4 Hindi keyboard chart</h3>
          <div className="content-prose kbd-prose">
            <p>
              Download the PDF, open it and print it on A4. Keep the printed sheet next to your
              keyboard while you work, and use it as a quick reference.
            </p>
            <p>
              <a className="btn-primary" href={KEYBOARD_PDF_PATH} download>
                Download PDF (A4)
              </a>
            </p>
          </div>

          <h3 className="section-subheading">What the downloadable chart includes</h3>
          <div className="content-prose kbd-prose">
            <p>
              The chart shows the Normal layer and the Shift layer, with a legend, the mapping
              status and generation date, this page&apos;s address, and Unicode Devanagari labels set in Noto
              Sans Devanagari. Use the PDF as a quick reference, and come back to the tables below
              when you need the exact entry for one character.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="key-chart">
        <div className="container">
          <h2 className="section-heading">Complete Kruti Dev Hindi Typing Key Chart</h2>
          <div className="content-prose kbd-prose">
            <p>
              The tables below are decoder-derived: they show how the Kruti Dev character table in
              our Kruti Dev to Unicode converter reads each stored character. They are not the
              result of typing on a physical keyboard, and each carries a status line.
            </p>
            <p>
              We have also left out Shift+4 and Shift+5 for now, because our table and an external
              reference table (LTRC) do not agree on them yet.
            </p>
          </div>

          <div id="key-search" className="kbd-anchor">
            <KeySearch />
          </div>

          <h3 className="section-subheading">Consonants, vowels and half-letter keys</h3>
          <div className="content-prose kbd-prose">
            <p>
              Kruti Dev has full letters and half letters. A full letter such as <Hi>क</Hi> is a
              single key, d. Its half form <Hi>क्</Hi>, which can join the next letter, is Shift+D.
              A few letters work differently: the key H gives the half form <Hi>भ्</Hi>, and you
              follow it with k to get the full <Hi>भ</Hi>, as in Hkkjr for <Hi>भारत</Hi>.
            </p>
            <p>
              Vowels such as <Hi>आ</Hi>, <Hi>ओ</Hi> and <Hi>औ</Hi> are built from key combinations,
              and we list only single-key outputs here until those combinations are tested.
            </p>
          </div>
          <NormalKeysTable />
          <ShiftKeysTable />
          <p className="kbd-status">
            <em>
              Status of both tables: decoder-derived, from the converter&apos;s Kruti Dev table. Not
              a physical keyboard test.
            </em>
          </p>

          <h3 className="section-subheading">Matras, conjuncts and reph</h3>
          <div className="content-prose kbd-prose">
            <p>
              Some keys do not simply add a letter, because their result depends on the keys around
              them. The chhoti i matra (<Hi>छोटी इ की मात्रा</Hi>) is typed before the consonant it
              belongs to, the reph is typed after the letter it sits above, and the rakar is added
              after a consonant.
            </p>
            <p>
              Conjuncts such as <Hi>ज्ञ</Hi>, <Hi>श्र</Hi> and <Hi>त्र</Hi> have their own keys. Be
              careful with <Hi>त्र</Hi> and <Hi>ट्र</Hi>: the first is the = key, but we have not
              verified a typing sequence for <Hi>ट्र</Hi> or <Hi>ड्र</Hi>, so we do not list one.
            </p>
          </div>
          <ConjunctTable />
          <p className="kbd-status">
            <em>
              Status: decoder-derived; not a physical keyboard test. Shift+5 is omitted pending the
              table difference noted above. Whole-word examples are in the typing section.
            </em>
          </p>

          <h3 className="section-subheading">Numbers, punctuation and special symbols</h3>
          <div className="content-prose kbd-prose">
            <p>
              In this font the number keys give the usual digits 0 to 9, not Devanagari digits (
              <Hi>०१२३</Hi>), so do not expect the top row to type Hindi numerals. A few
              punctuation marks sit on keys with different printed symbols, which is why a full
              stop or a comma can seem to &quot;be on the wrong key&quot;. Remember too that
              Unicode digits and Alt codes are separate things from these keys.
            </p>
          </div>
          <PunctuationTable />
          <p className="kbd-status">
            <em>
              Status: decoder-derived; not a physical keyboard test. Shift+4 is omitted pending the
              table difference noted above.
            </em>
          </p>
        </div>
      </section>

      <section className="content-block section-dark" id="how-to-type">
        <div className="container">
          <h2 className="section-heading">How to Type Hindi Using the Kruti Dev Keyboard</h2>

          <h3 className="section-subheading">Set up Kruti Dev 010 in Microsoft Word</h3>
          <div className="content-prose kbd-prose">
            <p>
              First install the font from our{' '}
              <Link href="/font-download/">Kruti Dev font download page</Link>, then open Word and
              choose Kruti Dev 010 from the font list. Before you type a full document, press a few
              letters. If they appear as Hindi shapes, the font is active.
            </p>
            <p>
              If they stay English letters, Word is still using another font, so fix that first.
              This page is only the key reference, not a full Word tutorial.
            </p>
          </div>

          <h3 className="section-subheading">Start with the home row and common keys</h3>
          <div className="content-prose kbd-prose">
            <p>
              Rest your fingers on the home row (<Hi>होम रो</Hi>): a s d f g h j k l ;. Then try
              this order. The outputs come from the converter table, so confirm them on your own
              setup:
            </p>
          </div>
          <ol className="content-numbered-list kbd-list">
            <li>
              Try d, k, j, g and l, which should give <Hi>क ा र ह स</Hi>.
            </li>
            <li>
              Add the matra keys: s for <Hi>◌े</Hi>, h for <Hi>◌ी</Hi> and a for <Hi>◌ं</Hi>.
            </li>
            <li>
              Try f and then d. By the converter&apos;s rules the <Hi>ि</Hi> is stored before{' '}
              <Hi>क</Hi>, which gives <Hi>कि</Hi>.
            </li>
          </ol>
          <div className="content-prose kbd-prose">
            <p>
              Do not rush to the Shift layer. Once the home row feels natural, the Shift keys are
              just the same hand positions with one extra finger.
            </p>
          </div>

          <h3 className="section-subheading">Type difficult letters and character combinations</h3>
          <div className="content-prose kbd-prose">
            <p>
              The strings below are converter-backed stored sequences. Each pair of Hindi word and
              string appears in the test script of our Mangal to Kruti Dev converter, so they show
              what the stored text contains. They are not typing instructions that we have verified
              on a physical keyboard.
            </p>
          </div>
          <TypingExamplesTable />

          <h4 className="section-subsubheading">
            How to type <Hi>छोटी इ की मात्रा (ि)</Hi>
          </h4>
          <div className="content-prose kbd-prose">
            <p>
              In Hindi you say <Hi>क</Hi> first and <Hi>ि</Hi> after it, but in the stored Kruti
              Dev text the f comes first. The stored sequence for <Hi>किताब</Hi> is f, d, r, k, c.
              In <Hi>क्षत्रिय</Hi> the <Hi>ि</Hi> belongs to <Hi>त्र</Hi>, so f sits just before the
              = character and not after it.
            </p>
          </div>

          <h4 className="section-subsubheading">How to type reph, rakar and half letters</h4>
          <div className="content-prose kbd-prose">
            <p>
              For reph, the stored text puts Z after the letter it sits above: in <Hi>धर्म</Hi> the
              sequence is /k for <Hi>ध</Hi>, e for <Hi>म</Hi>, and Z at the end, which places the
              reph over <Hi>म</Hi>. The rakar is the z character, added after a consonant.
            </p>
            <p>
              For half letters, <Hi>क्ष</Hi> shows the idea: {'{'} alone gives the half form, and{' '}
              {'{'} followed by k gives the full <Hi>क्ष</Hi>. Note that Shift plus a base key does
              not produce every glyph. If you already have Unicode text, you can{' '}
              <Link href="/mangal-to-krutidev-converter/">convert Mangal text you already have</Link>{' '}
              rather than retype it.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="alt-codes">
        <div className="container">
          <h2 className="section-heading">Kruti Dev Alt Codes and Shortcut Keys</h2>

          <h3 className="section-subheading">
            Kruti Dev Special Characters: Keyboard Shortcuts and Alt-Code Limitations
          </h3>
          <div className="content-prose kbd-prose">
            <p>
              Many special signs in the converter table sit on Shift keys, such as # for{' '}
              <Hi>रु</Hi> or _ for <Hi>ऋ</Hi>, and the chart above lists the ones we have so far.
            </p>
            <p>
              An Alt code is different: according to{' '}
              <Ext href={KEYBOARD_REFERENCES.microsoft}>Microsoft</Ext>, you hold Alt and type the
              number on the numeric keypad, with Num Lock on, and the number row at the top does not
              work.
            </p>
            <p>
              An Alt code only enters a character by its number. In Kruti Dev text that character
              is just a stored letter, and the font decides how it looks.
            </p>
            <p>
              We have not tested Alt codes on Windows with Kruti Dev 010, and the Alt-code lists we
              compared disagree with each other and, in at least one case, with the character table
              our converter uses. For that reason this page does not publish an Alt-code table.
              Please treat any such list with caution until it has been checked on your own setup.
            </p>
          </div>

          <h3 className="section-subheading">What to do if your laptop has no numeric keypad</h3>
          <div className="content-prose kbd-prose">
            <p>
              The Alt method needs a numeric keypad, so it is the wrong tool on many laptops. You do
              not need it for normal typing, because the Shift keys listed in the chart cover many
              of the special signs.
            </p>
            <p>
              Some laptops build a keypad into the letter keys and switch it on in a way that varies
              by model, so check your manual; we have not tested any model.
            </p>
            <p>
              If you need a single special character, search for it in the chart and copy it from
              there.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="vs-remington">
        <div className="container">
          <h2 className="section-heading">Kruti Dev vs Remington, InScript and Mangal</h2>

          <h3 className="section-subheading">Font, encoding and keyboard layout explained</h3>
          <div className="content-prose kbd-prose">
            <p>
              Three different things are often mixed up here: a font (how letters look), an
              encoding (how text is stored) and a keyboard layout (which key types what). Kruti Dev
              010 is a legacy font whose text is stored as English-looking characters, typed on
              QWERTY in a Remington-style arrangement.
            </p>
            <p>
              In Unicode, Hindi is stored as real Devanagari characters; <Hi>ि</Hi>, for example, is
              a separate vowel sign that is drawn to the left of the syllable (
              <Ext href={KEYBOARD_REFERENCES.unicodeCh12}>Unicode 15.1, chapter 12</Ext>).
            </p>
            <p>
              A similar finger position does not prove that every sign sits on the same key, so we
              do not claim Kruti Dev and Remington (Gail) are identical.
            </p>
          </div>
          <LayoutComparisonTable />

          <h3 className="section-subheading">Which keyboard layout should you practise for your exam?</h3>
          <div className="content-prose kbd-prose">
            <p>
              Follow your own exam notice and admit card, because requirements change by board and
              by year. As an example of why this matters, the{' '}
              <Ext href={KEYBOARD_REFERENCES.cpctFaq}>CPCT FAQ</Ext> we read on 18 October 2026
              lists Remington (Gail) and InScript in Unicode as the available layouts, and does not
              mention Kruti Dev.
            </p>
            <p>
              So do not assume that Kruti Dev practice matches that exam. We do not state
              requirements for any other exam here. Compare the official layout chart on your exam
              portal with the table above before you spend weeks on one layout.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="fix-problems">
        <div className="container">
          <h2 className="section-heading">Fix Common Kruti Dev Keyboard Problems</h2>

          <h3 className="section-subheading">English letters or boxes appear instead of Hindi</h3>
          <div className="content-prose kbd-prose">
            <p>
              If you see letters like Hkkjr instead of <Hi>भारत</Hi>, your text is probably Kruti
              Dev text shown in a font that is not Kruti Dev. This can happen when the font is not
              applied, is not installed on that computer, or when you paste the text into a
              website, form or chat that cannot use the font.
            </p>
            <p>
              In Word, select the text and look at the font name box; other apps differ. If it does
              not say Kruti Dev 010, set it. If the font is missing from the list, install it from
              the <Link href="/font-download/">font download page</Link>. Boxes can appear when the
              font in use has no glyph for a character.
            </p>
          </div>

          <h3 className="section-subheading">Wrong matras, Shift keys or joined letters</h3>
          <div className="content-prose kbd-prose">
            <p>
              Wrong results often come from the order of the stored characters. If <Hi>ि</Hi> lands
              on the wrong letter, the f may be after the consonant instead of before it. The reph
              is placed over what comes before Z, which can be a consonant together with its matra,
              so check what you typed just before Z.
            </p>
            <p>
              If half letters or extra letters appear when you did not mean to use Shift, check the
              Shift and Caps Lock state. Caps Lock affects letter keys but not number or
              punctuation keys, and we have not tested how it behaves with Kruti Dev in Word.
            </p>
            <p>
              If symbols seem to be on different keys than the chart shows, your keyboard layout
              setting may not be US English, and settings differ by system. For <Hi>ट्र</Hi> and{' '}
              <Hi>ड्र</Hi>, no verified sequence is listed yet.
            </p>
          </div>

          <h3 className="section-subheading">Why typing and conversion give different-looking text</h3>
          <div className="content-prose kbd-prose">
            <p>
              Typing gives you Kruti Dev text, which stays readable only with the font. A converter
              gives you either Unicode or Kruti Dev, depending on the direction. The output can
              also contain special characters that are not meant to be read as keystrokes: the
              converter stores <Hi>प्रकाश</Hi> as çdk&apos;k, for example. So copy converter output
              instead of retyping it, and check conjuncts afterwards.
            </p>
          </div>
          <ToolChoiceTable />
        </div>
      </section>

      <section className="content-block section-dark" id="faq">
        <div className="container">
          <h2 className="section-heading">Kruti Dev Keyboard Layout — Frequently Asked Questions</h2>
          <div className="faq-accordion" style={{ maxWidth: 900, margin: '2rem auto 0' }}>
            {keyboardLayoutFaqs.map((faq) => (
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

      <section className="content-block section-alt" id="related-tools">
        <div className="container">
          <h2 className="section-heading">Related Hindi Typing and Converter Tools</h2>
          <div className="content-prose kbd-prose">
            <p>
              Typing from scratch is only one route. If you have Unicode Hindi and need Kruti Dev,
              use the <Link href="/mangal-to-krutidev-converter/">Mangal to Kruti Dev converter</Link>,
              or <Link href="/">convert Unicode Hindi to Kruti Dev</Link> from the home page.
            </p>
            <p>
              For the reverse direction, try the{' '}
              <Link href="/krutidev-to-unicode-converter/">Kruti Dev to Unicode converter</Link>, and
              get the <Link href="/font-download/">Kruti Dev font</Link> if you need it. Keep this
              Kruti Dev keyboard guide open whenever a matra or half letter refuses to appear.
            </p>
            <p className="kbd-sources">
              <strong>Sources checked:</strong>{' '}
              <Ext href={KEYBOARD_REFERENCES.microsoft}>Microsoft Support: insert ASCII or Unicode symbols</Ext>
              {' · '}
              <Ext href={KEYBOARD_REFERENCES.unicodeCh12}>Unicode 15.1, chapter 12</Ext>
              {' · '}
              <Ext href={KEYBOARD_REFERENCES.cpctFaq}>CPCT FAQ</Ext>
              {' · '}
              <Ext href={KEYBOARD_REFERENCES.notoDevanagari}>Noto Sans Devanagari, SIL OFL 1.1</Ext>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
