"use client";

import { ReactNode, useEffect, useState } from "react";
import { highlight } from "./shared";

type Props = {
  initialComponent: ReactNode;
  initialSourceCode: string;
  finalSourceCode: string;
};

function getDiff(initialSourceCode: string, finalSourceCode: string): string[] {
  const initialLines = initialSourceCode.split("\n");
  const finalLines = finalSourceCode.split("\n");
  const diffLines: string[] = [];

  console.log("initialLines.length", initialLines.length);
  console.log("finalLines.length", finalLines.length);
  for (let i = initialLines.length; i < finalLines.length; i++) {
    diffLines.push(finalLines[i]);
  }

  return diffLines;
}

function appendSourceCode(
  initialSourceCode: string,
  diffLines: string[],
  nLinesToAppend: number
): string {
  return (
    initialSourceCode + "\n" + diffLines.slice(0, nLinesToAppend).join("\n")
  );
}

export function CodeBlockClient(props: Props) {
  const [appendedLines, setAppendedLines] = useState(0);
  const diffLines = getDiff(props.initialSourceCode, props.finalSourceCode);
  const currentSourceCode = appendSourceCode(
    props.initialSourceCode,
    diffLines,
    appendedLines
  );

  useEffect(() => {
    console.log(
      `useEffect appendedLines=${appendedLines} diffLines.length=${diffLines.length}`
    );
    if (appendedLines < diffLines.length) {
      const timer = setTimeout(() => {
        setAppendedLines((prev) => prev + 1);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [appendedLines, diffLines.length]);

  if (appendedLines === 0) {
    return props.initialComponent;
  } else {
    return highlight(currentSourceCode, "ts");
  }
}
