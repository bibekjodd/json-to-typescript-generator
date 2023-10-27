import { TypeGenerator } from "./type-generator";
import { isArray, isObject } from "./utils";

export const converter = (
  json: any,
  rootTypeName: string,
): { result: string; isError: boolean } => {
  try {
    const data = JSON.parse(json);
    if (isObject(data) || isArray(data)) {
      const result = new TypeGenerator(formatObject({ [rootTypeName]: data }));

      return {
        result: JSON.stringify(result),
        isError: false,
      };
    }
    throw new Error("");
  } catch (err) {
    return {
      result: "",
      isError: true,
    };
  }
};

function formatObject(obj: any): typeof obj {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") obj[key] = "";
    else if (typeof value === "number") obj[key] = 0;
    else if (typeof value === "boolean") obj[key] = false;
    else if (value instanceof Array) {
      obj[key] = value.map((item) => {
        if (typeof item === "string") return "";
        if (typeof item === "number") return 0;
        if (typeof item === "boolean") return false;
        return formatObject(item);
      });
    } else {
      formatObject(value);
    }
  }
  return obj;
}
