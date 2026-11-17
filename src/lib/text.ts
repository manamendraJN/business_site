/** A piece of text: plain or *emphasised* (shown in the italic accent font). */
export type Part = { text: string; em: boolean };

/** Splits "Hello *big* world" into parts, keeping the emphasis markers. */
export function parseEmphasis(input: string): Part[] {
  return input
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith("*") && chunk.endsWith("*")
        ? { text: chunk.slice(1, -1), em: true }
        : { text: chunk, em: false },
    );
}

/** Splits text into words, each remembering whether it is emphasised. */
export function splitWords(input: string): Part[] {
  return parseEmphasis(input).flatMap((part) =>
    part.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ text: word, em: part.em })),
  );
}

/** Removes the *emphasis* markers (for alt text, aria labels, meta). */
export function plain(input: string): string {
  return input.replace(/\*/g, "");
}
