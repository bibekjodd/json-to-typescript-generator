import { TypeGenerator } from "@/lib/type-generator";
import { create } from "zustand";
export type GenereatedTypes = {
  name: string;
  type: string[] | { [key: string]: string[] | undefined };
}[];

type UseCode = {
  input: string;
  rootTypeName: string;
  generatedTypes: GenereatedTypes;

  inputChanged: (input: string) => void;
  convert: () => void;
  rootTypeNameChanged: (rootTypeName: string) => void;
};

const useCode = create<UseCode>((set, get) => ({
  input: `{
  "fruits": ["apple", "mango", "banana", "orange"],
  "colors": {
    "orange": "#fa234c",
    "lemon": "#22f3ce"
  }
}
`,
  rootTypeName: "",
  generatedTypes: [
    { name: "Root", type: { fruits: ["array", "string"], colors: ["Colors"] } },
    { name: "Colors", type: { orange: ["string"], lemon: ["string"] } },
  ],
  inputChanged(input) {
    set({ input });
    get().convert();
  },
  rootTypeNameChanged(rootTypeName) {
    set({ rootTypeName });
    get().convert();
  },
  convert() {
    const { input, rootTypeName } = get();
    const { generatedTypes } = new TypeGenerator(input, rootTypeName || "root");
    if (generatedTypes.length) {
      set({ generatedTypes });
    }
  },
}));
export default useCode;
