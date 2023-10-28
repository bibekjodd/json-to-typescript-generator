import { GenereatedTypes } from "@/hooks/useCode";
import { jsonFormatter } from "./format-json";
import { capitalize, getKeysFromObjectArray, isArray, isObject } from "./utils";

type GeneratedTypeForObjects = {
  [key: string]: string[] | GeneratedTypeForObjects | undefined;
};
type Primitive = "string" | "null" | "boolean" | "number";
type IncludedTypeNames = {
  [key: string]: { count: number } | undefined;
};
type IncludedTypes = {
  name: string;
  type: { [key: string]: any } | string[];
  object: string;
}[];

export class TypeGenerator {
  #json = {} as Object;
  #rootName = "root";
  #includedTypes = [] as IncludedTypes;
  #includedTypeNames = {} as IncludedTypeNames;
  generatedTypes = [] as GenereatedTypes;

  constructor(json: string, rootName: string) {
    this.#rootName = capitalize(rootName);
    const data = jsonFormatter(json);
    if (data) {
      this.#json = {
        [this.#rootName]: data,
      };
      this.#generateTypes();
    }
  }

  #generateTypes() {
    const rootType = this.#generateTypesForObject(this.#json);
    this.#includedTypeNames[this.#rootName] = { count: 1 };
    if (this.#includedTypes[0]?.name !== this.#rootName) {
      this.#includedTypes.unshift({
        name: capitalize(this.#rootName),
        object: JSON.stringify([]),
        type: rootType[this.#rootName] || {},
      });
    }

    this.generatedTypes = this.#includedTypes.map((type) => {
      return {
        name: type.name,
        type: type.type,
      };
    });
  }

  #generateTypesForPrimitive(data: unknown): Primitive | undefined {
    if (data === null) return "null";
    if (typeof data === "number") return "number";
    if (typeof data === "boolean") return "boolean";
    if (typeof data === "string") return "string";
    return undefined;
  }

  #generateTypesForObject(object: {
    [key: string]: any;
  }): GeneratedTypeForObjects {
    const types: GeneratedTypeForObjects = {};
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
    const type = ["array"];

    // resolve for primitives
    const primitivesList = array.filter(
      (item) => !!this.#generateTypesForPrimitive(item),
    );
    for (const item of primitivesList) {
      const primitive = this.#generateTypesForPrimitive(item);
      this.#addUniqueToList(type, primitive);
    }

    // resolve for arrays
    const arraysList = array.filter((item) => isArray(item));
    for (const item of arraysList) {
      const typeName = this.#addNewType(keyName + "Item", item);
      this.#addUniqueToList(type, typeName);
    }

    // resolve for objects
    const objectsList = array.filter((item) => item !== null && isObject(item));
    const properties: { [key: string]: string[] } = {};
    const allKeys = getKeysFromObjectArray(objectsList);
    if (!allKeys.length) return type;

    for (const item of objectsList) {
      for (const key of allKeys) {
        properties[key] = properties[key] || [];
        if (!(key in item)) {
          this.#addUniqueToList(properties[key], "optional");
        } else {
          const primitive = this.#generateTypesForPrimitive(item[key]);
          if (primitive) {
            this.#addUniqueToList(properties[key], primitive);
          } else if (isArray(item[key])) {
            const typeName = this.#addNewType(keyName + "Item", item[key]);
            this.#addUniqueToList(properties[key], typeName);
          } else if (isObject(item[key])) {
            const typeName = this.#addNewType(keyName + "Item", item[key]);
            this.#addUniqueToList(properties[key], typeName);
          }
        }
      }
    }

    const typeNameExists = this.#includedTypes.find(
      (type) => JSON.stringify(properties) === type.object,
    );
    if (typeNameExists) {
      this.#addUniqueToList(type, typeNameExists.name);
      return type;
    }

    let typeName = capitalize(keyName + "Item");
    let count = this.#includedTypeNames[typeName]?.count || 1;
    if (this.#includedTypeNames[typeName]) {
      count++;
      this.#includedTypeNames[typeName] = { count };
      typeName = `${typeName}${count}`;
    }
    this.#includedTypes.unshift({
      name: typeName,
      object: JSON.stringify(properties),
      type: properties,
    });

    this.#addUniqueToList(type, typeName);

    return type;
  }

  #addNewType(typeName: string, object: any): string {
    typeName = capitalize(typeName);
    const typeExists = this.#includedTypes.find(
      (type) => JSON.stringify(object) === type.object,
    );
    if (typeExists) return typeExists.name;

    const originalTypeName = typeName;
    let count = this.#includedTypeNames[originalTypeName]?.count || 1;
    const isIncluded = this.#includedTypeNames[originalTypeName] !== undefined;
    if (isIncluded) {
      count++;
      typeName = `${typeName}${count}`;
    }
    this.#includedTypeNames[originalTypeName] = { count };

    const type =
      object instanceof Array
        ? this.#generateTypesForArray(object, typeName)
        : this.#generateTypesForObject(object);

    this.#includedTypes.unshift({
      name: typeName,
      object: JSON.stringify(object),
      type,
    });
    return typeName;
  }

  #addUniqueToList(list: string[], data: string | undefined) {
    if (!data) return;

    if (data && !list.includes(data)) {
      list.push(data);
    }
  }
}
