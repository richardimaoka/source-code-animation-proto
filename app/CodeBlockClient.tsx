"use client";

import { ReactNode, useLayoutEffect, useState } from "react";
import { highlight } from "./shared";

type Props = {
  initial: ReactNode;
  initialSourceCode: string;
  finalSourceCode: string;
};

export function CodeBlockClient(props: Props) {
  const [nodes, setNodes] = useState(props.initial);

  useLayoutEffect(() => {
    void highlight(props.initialSourceCode, "ts").then(setNodes);
  }, []);

  return nodes ?? <p>Loading...</p>;
}
