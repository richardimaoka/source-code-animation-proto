import { CodeBlock } from "./CodeBlock";
import { highlight } from "./shared";

export default async function Page() {
  // `initial` is optional.
  return (
    <main>
      <CodeBlock
        initial={await highlight('console.log("Rendered on server")', "ts")}
      />
    </main>
  );
}
