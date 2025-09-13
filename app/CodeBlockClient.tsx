"use client";

import { ReactNode, useLayoutEffect, useState } from "react";
import { highlight } from "./shared";

type Props = {
  initial: ReactNode;
  sourceCodeStr: string;
};

export function CodeBlockClient(props: Props) {
  const [nodes, setNodes] = useState(props.initial);

  useLayoutEffect(() => {
    void highlight(props.sourceCodeStr, "ts").then(setNodes);
  }, []);

  return nodes ?? <p>Loading...</p>;
}
