"use client";
import useCode from "@/hooks/useCode";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function MapCode() {
  return (
    <SyntaxHighlighter
      language="typescript"
      style={atomOneDark}
      customStyle={{
        flex: "1",
        background: "transparent",
        height: "100%",
        width: "100%",
      }}
      wrapLines
      wrapLongLines
    >
      {CodeString()}
    </SyntaxHighlighter>
  );
}

function CodeString(): string {
  const generatedTypes = useCode((state) => state.generatedTypes);
  const typesString: string[] = generatedTypes.map(({ name, type }) => {
    let writtenString = ``;
    if (type instanceof Array) {
      writtenString = writeArray(type);
    } else if (type instanceof Object) {
      writtenString = writeObject(type);
    }
    const string = `export type ${name} = ${writtenString}`;
    return string;
  });
  return typesString.join("\n\n");
}

function writeObject(object: Object): string {
  const entries = Object.entries(object);
  const arrayString: string[] = entries.map((entry) => {
    const key = entry[0] as string;
    const value = entry[1] as string[];
    const isOptional = value.includes("optional");
    return `  ${key}${isOptional ? "?" : ""}: ${writeArray(value)}`;
  });

  return `{\n${arrayString.join("\n")}\n}`;
}

function writeArray(array: string[]): string {
  const isArray = array.includes("array");
  array = array.filter((item) => item !== "array" && item !== "optional");
  return `${isArray ? "Array<" : ""}${array.join(" | ")}${
    isArray && array.length === 0 ? "any" : ""
  }${isArray ? ">" : ""}`;
}
