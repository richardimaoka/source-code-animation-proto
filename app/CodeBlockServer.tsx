import { CodeBlockClient } from "./CodeBlockClient";
import { readFile } from "fs/promises";
import { codeToHast } from "shiki";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

export async function CodeBlockServer() {
  const sourceCodeStr = await readFile(
    process.cwd() + "/app/makeReadOnly.ts",
    "utf8"
  );

  const htmlStr = await codeToHast(sourceCodeStr, {
    lang: "ts",
    theme: "github-dark",
  });

  const initial = toJsxRuntime(htmlStr, {
    Fragment,
    jsx,
    jsxs,
    components: {
      // your custom `pre` element
      pre: (props) => <pre data-custom-codeblock {...props} />,
    },
  });

  // `initial` is optional.
  return <CodeBlockClient initial={initial} sourceCodeStr={sourceCodeStr} />;
}
