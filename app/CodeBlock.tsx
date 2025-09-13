"use client";

import { JSX, useLayoutEffect, useState } from "react";
import { highlight } from "./shared";

export function CodeBlock({ initial }: { initial?: JSX.Element }) {
  const [nodes, setNodes] = useState(initial);

  const sourceCodeStr = `/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['./src/makeReadOnly.ts'],
  outDir: './dist',
  splitting: false,
  sourcemap: true,
  dts: false,
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2015',
  banner: {
    js: \`;
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @lightSyntaxTransform
   * @noflow
   * @nolint
   * @preventMunge
   * @preserve-invariant-messages
   */

  ("use no memo");\`,
  },
});`;

  useLayoutEffect(() => {
    void highlight(sourceCodeStr, "ts").then(setNodes);
  }, []);

  return nodes ?? <p>Loading...</p>;
}
