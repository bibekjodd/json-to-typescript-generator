import { capitalize, isArray, isObject } from "./utils";

type GeneratedType = {
  [key: string]: string[] | GeneratedType | undefined;
};

type Primitive = "string" | "null" | "boolean" | "number";
type IncludedTypeNames = {
  [key: string]: { count: number } | undefined;
};
type IncludedTypes = {
  name: string;
  type: { [key: string]: any };
  object: any;
}[];

export class TypeGenerator {
  #json = {} as Record<string, any>;
  includedTypes = [] as IncludedTypes;
  includedTypeNames = {} as IncludedTypeNames;

  constructor(json: Record<string, any>) {
    this.#json = json;
    this.#generateTypes();
  }

  #generateTypes() {
    this.#generateTypesForObject(this.#json);
  }

  #generateTypesForPrimitive(data: unknown): Primitive | undefined {
    if (data === null) return "null";
    if (typeof data === "number") return "number";
    if (typeof data === "boolean") return "boolean";
    if (typeof data === "string") return "string";
    return undefined;
  }

  #generateTypesForObject(object: { [key: string]: any }): GeneratedType {
    const types: GeneratedType = {};
    for (const key in object) {
      const value = object[key];

      const primitive = this.#generateTypesForPrimitive(value);
      if (primitive) {
        types[key] = [primitive];
      } else if (isArray(value)) {
        types[key] = this.#generateTypesForArray(value, key);
      } else if (isObject(value)) {
        types[key] = [this.#addNewType(key, value)];
      }
    }

    return types;
  }

  #generateTypesForArray(array: any[], keyName: string): string[] {
    const type = new Set<string>();

    return [];
  }

  #addNewType(typeName: string, object: any): string {
    typeName = capitalize(typeName);
    const typeExists = this.includedTypes.find(
      (type) => JSON.stringify(object) === type.object,
    );
    if (typeExists) return typeExists.name;

    const originalTypeName = typeName;
    let count = this.includedTypeNames[originalTypeName]?.count || 1;
    const isIncluded = this.includedTypeNames[originalTypeName] !== undefined;
    if (isIncluded) {
      count++;
      typeName = `${typeName}${count}`;
    }
    this.includedTypeNames[originalTypeName] = { count };
    this.includedTypes.unshift({
      name: typeName,
      object: JSON.stringify(object),
      type: this.#generateTypesForObject(object),
    });
    return typeName;
  }
}
//
//
