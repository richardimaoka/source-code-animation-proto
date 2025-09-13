import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import type { JSX } from "react";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import type { BundledLanguage } from "shiki";
import { createHighlighter } from "shiki";

// `createHighlighter` is async, it initializes the internal and
// loads the themes and languages specified.
//   https://shiki.matsu.io/guide/install#highlighter-usage
const highlighter = await createHighlighter({
  themes: ["nord", "github-dark"],
  langs: ["javascript", "ts"],
});

export function highlight(code: string, lang: BundledLanguage) {
  const out = highlighter.codeToHast(code, {
    lang,
    theme: "github-dark",
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}
