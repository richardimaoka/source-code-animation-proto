"use client";

import { ReactNode, useLayoutEffect, useState } from "react";
import { highlight } from "./shared";

type Props = {
  initial: ReactNode;
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

export function CodeBlockClient(props: Props) {
  const [nodes, setNodes] = useState(props.initial);
  const diffLines = getDiff(props.initialSourceCode, props.finalSourceCode);

  useLayoutEffect(() => {
    void highlight(props.initialSourceCode, "ts").then(setNodes);
  }, []);

  return nodes ?? <p>Loading...</p>;
}
