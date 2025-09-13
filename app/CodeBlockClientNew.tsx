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

function CodeBlockClientNew(props: Props) {
  const [appendedLines, setAppendedLines] = useState(0);
  const diffLines = getDiff(props.initialSourceCode, props.finalSourceCode);
  const currentSourceCode = appendSourceCode(
    props.initialSourceCode,
    diffLines,
    appendedLines
  );

  if (appendedLines === 0) {
    return props.initialComponent;
  } else {
    return highlight(currentSourceCode, "ts");
  }
}
