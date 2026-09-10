import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

const ALT =
  'Akshay Verma, Software Developer and Hindi Typing Expert, verifier of UnicodeKruti.com';
const SRC = '/images/akshay-verma.jpg';

export default function AuthorPhoto() {
  const filePath = path.join(process.cwd(), 'public', 'images', 'akshay-verma.jpg');
  const hasPhoto = fs.existsSync(filePath);

  if (!hasPhoto) {
    return (
      <div
        className="about-author__avatar about-author__avatar--fallback"
        role="img"
        aria-label={ALT}
      >
        AV
      </div>
    );
  }

  return (
    <Image
      src={SRC}
      alt={ALT}
      width={200}
      height={200}
      className="about-author__avatar"
      sizes="200px"
      loading="lazy"
      decoding="async"
    />
  );
}
