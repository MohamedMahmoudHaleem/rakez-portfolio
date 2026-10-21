import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import { TodoText } from "@/components/ui";

/** Paragraphs and list items that still contain [TODO] render as placeholders. */
function textOrTodo(Tag: "p" | "li") {
  return function TextBlock({ children }: { children?: ReactNode }) {
    if (typeof children === "string") return <TodoText as={Tag} value={children} />;
    return <Tag>{children}</Tag>;
  };
}

const COMPONENTS = {
  p: textOrTodo("p"),
  li: textOrTodo("li"),
};

/** Compiles a case study body. Styling comes from the .case-study-body rules in globals.css. */
export async function renderCaseStudyBody(source: string) {
  const { content } = await compileMDX({ source, components: COMPONENTS });
  return content;
}
