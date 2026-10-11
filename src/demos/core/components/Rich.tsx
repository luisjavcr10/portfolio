import { Fragment } from "react";

/** Renders config copy where *text between asterisks* is emphasized. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
