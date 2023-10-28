export type GeneratedTypes = {
  name: string;
  type: string[] | { [key: string]: string[] | undefined };
}[];

export function typeResolver(generatedTypes: GeneratedTypes): string {
  const typesString: string[] = generatedTypes.map(({ name, type }) => {
    let writtenString = ``;
    if (type instanceof Array) {
      writtenString = resolveArray(type);
    } else if (type instanceof Object) {
      writtenString = resolveObject(type);
    }
    const string = `export type ${name} = ${writtenString}`;
    return string;
  });
  return typesString.join("\n\n");
}

function resolveObject(object: Object): string {
  const entries = Object.entries(object);
  const arrayString: string[] = entries.map((entry) => {
    const key = entry[0] as string;
    const value = entry[1] as string[];
    const isOptional = value.includes("optional");
    return `  ${key}${isOptional ? "?" : ""}: ${resolveArray(value)}`;
  });

  return `{\n${arrayString.join("\n")}\n}`;
}

function resolveArray(array: string[]): string {
  const isArray = array.includes("array");
  array = array.filter((item) => item !== "array" && item !== "optional");
  return `${isArray ? "Array<" : ""}${array.join(" | ")}${
    isArray && array.length === 0 ? "any" : ""
  }${isArray ? ">" : ""}`;
}
