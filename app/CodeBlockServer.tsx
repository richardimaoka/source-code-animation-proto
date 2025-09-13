import { readFile } from "fs/promises";
import { codeToHast } from "shiki";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { CodeBlockClientNew } from "./CodeBlockClientNew";

async function toJsx(initialSourceCode: string) {
  const hast = await codeToHast(initialSourceCode, {
    lang: "ts",
    theme: "github-dark",
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    components: {
      // your custom `pre` element
      pre: (props) => <pre data-custom-codeblock {...props} />,
    },
  });
}

export async function CodeBlockServer() {
  const finalSourceCode = await readFile(
    process.cwd() + "/app/makeReadOnly.ts",
    "utf8"
  );

  // take the first nLines
  const nLines = 8;
  const initialSourceCode = finalSourceCode
    .split("\n")
    .slice(0, nLines)
    .join("\n");

  const initialJsx = await toJsx(initialSourceCode);

  // `initial` is optional.
  return (
    <CodeBlockClientNew
      initialComponent={initialJsx}
      initialSourceCode={initialSourceCode}
      finalSourceCode={finalSourceCode}
    />
  );
}
