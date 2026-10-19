import Link from 'next/link';
import {
  CONJUNCT_TABLE_ROWS,
  NORMAL_TABLE_ROWS,
  PUNCTUATION_TABLE_ROWS,
  SHIFT_TABLE_ROWS,
  TYPING_EXAMPLES,
  type KeyLayer,
} from '@/lib/keyboard-map';

/**
 * Server-rendered key tables. Every cell reads from `@/lib/keyboard-map`,
 * so the tables, the interactive keyboard and the PDF cannot drift apart.
 */

function Hi({ children }: { children: React.ReactNode }) {
  return (
    <span lang="hi" dir="ltr">
      {children}
    </span>
  );
}

function KeyList({ keys }: { keys: KeyLayer[] }) {
  return (
    <>
      {keys.map((layer, i) => (
        <span key={layer.stored} className="kbd-cell">
          {i > 0 ? ' · ' : null}
          <kbd>{layer.stored}</kbd> <Hi>{layer.label}</Hi>
          {layer.tableNote ? ` (${layer.tableNote})` : null}
        </span>
      ))}
    </>
  );
}

function TableShell({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="table-wrapper glass-card glass-card--lg kbd-table-wrap">
      <table className="data-table compare-table kbd-table">
        <caption className="kbd-caption">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export function NormalKeysTable() {
  return (
    <TableShell caption="Kruti Dev 010 keys without Shift, by keyboard row">
      <thead>
        <tr>
          <th scope="col">Row</th>
          <th scope="col">Keys without Shift (key → output)</th>
        </tr>
      </thead>
      <tbody>
        {NORMAL_TABLE_ROWS.map((row) => (
          <tr key={row.row}>
            <th scope="row">{row.row}</th>
            <td>
              <KeyList keys={row.keys} />
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

export function ShiftKeysTable() {
  return (
    <TableShell caption="Kruti Dev 010 Shift keys, grouped by type">
      <thead>
        <tr>
          <th scope="col">Group</th>
          <th scope="col">Shift keys (key → output)</th>
        </tr>
      </thead>
      <tbody>
        {SHIFT_TABLE_ROWS.map((row) => (
          <tr key={row.group}>
            <th scope="row">{row.group}</th>
            <td>
              <KeyList keys={row.keys} />
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

export function ConjunctTable() {
  return (
    <TableShell caption="Matras, conjuncts and reph keys and how they behave">
      <thead>
        <tr>
          <th scope="col">Key</th>
          <th scope="col">Output</th>
          <th scope="col">How it behaves</th>
        </tr>
      </thead>
      <tbody>
        {CONJUNCT_TABLE_ROWS.map((row) => (
          <tr key={row.keysText}>
            <td>
              <kbd>{row.keysText}</kbd>
            </td>
            <td>
              <Hi>
                {row.outputText ?? row.keys.map((k) => k.label).join(' · ')}
              </Hi>
            </td>
            <td>{row.how}</td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

const PUNCTUATION_NOTES: Record<string, string> = {
  '-': ' (full stop)',
  ']': ' (comma)',
};

export function PunctuationTable() {
  return (
    <TableShell caption="Number-row and punctuation keys">
      <thead>
        <tr>
          <th scope="col">Key you press</th>
          <th scope="col">What Kruti Dev gives</th>
        </tr>
      </thead>
      <tbody>
        {PUNCTUATION_TABLE_ROWS.map((row) => (
          <tr key={row.keyText}>
            <td>
              <kbd>{row.keyText}</kbd>
            </td>
            <td>
              {row.layer.label}
              {PUNCTUATION_NOTES[row.keyText] ?? ''}
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

export function TypingExamplesTable() {
  return (
    <TableShell caption="Hindi words and their Kruti Dev stored sequences">
      <thead>
        <tr>
          <th scope="col">Hindi word</th>
          <th scope="col">Stored sequence</th>
          <th scope="col">Why it is tricky</th>
        </tr>
      </thead>
      <tbody>
        {TYPING_EXAMPLES.map((ex) => (
          <tr key={ex.word}>
            <td>
              <Hi>{ex.word}</Hi>
            </td>
            <td>
              <kbd>{ex.stored}</kbd>
            </td>
            <td>{ex.why}</td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

export function LayoutComparisonTable() {
  return (
    <TableShell caption="Kruti Dev 010, Remington (Gail), InScript and Mangal compared">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">What it is</th>
          <th scope="col">Key point</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Kruti Dev 010</td>
          <td>Legacy font and text format</td>
          <td>Needs the font to look like Hindi</td>
        </tr>
        <tr>
          <td>Remington (Gail)</td>
          <td>Unicode keyboard layout, as CPCT names it</td>
          <td>Types real Devanagari</td>
        </tr>
        <tr>
          <td>InScript</td>
          <td>Unicode keyboard layout</td>
          <td>Different key arrangement</td>
        </tr>
        <tr>
          <td>Mangal</td>
          <td>Unicode font</td>
          <td>A font only, not a keyboard</td>
        </tr>
      </tbody>
    </TableShell>
  );
}

export function ToolChoiceTable() {
  return (
    <TableShell caption="Which converter to use for which text">
      <thead>
        <tr>
          <th scope="col">What you have</th>
          <th scope="col">What you want</th>
          <th scope="col">Where to go</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Kruti Dev text that looks like English letters</td>
          <td>Readable web text</td>
          <td>
            <Link href="/krutidev-to-unicode-converter/">Kruti Dev to Unicode converter</Link>
          </td>
        </tr>
        <tr>
          <td>Unicode or Mangal text</td>
          <td>Kruti Dev text</td>
          <td>
            <Link href="/mangal-to-krutidev-converter/">Mangal to Kruti Dev converter</Link>
          </td>
        </tr>
      </tbody>
    </TableShell>
  );
}
