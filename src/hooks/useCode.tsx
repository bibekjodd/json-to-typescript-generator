import { converter } from "@/lib/converter";
import { create } from "zustand";

type UseCode = {
  input: string;
  resolvedTypes: string;
  rootTypeName: string;

  inputChanged: (input: string) => void;
  convert: () => void;
  rootTypeNameChanged: (rootTypeName: string) => void;
};

const useCode = create<UseCode>((set, get) => ({
  input: `
  {
    fruits: ["apple", "mango", "banana", "orange"],
    colors: {
      orange: "#fa234c",
      lemon: "#22f3ce",
  }
 `,
  rootTypeName: "",
  resolvedTypes: `
  type Root = {
    fruits: string[];
    colors: {
      orange: string;
      lemon: string;
    };
  };
  `,
  inputChanged(input) {
    const resolvedTypes = converter(input);
    set({ input, resolvedTypes });
    navigator.clipboard.writeText(input);
  },
  rootTypeNameChanged(rootTypeName) {
    set({ rootTypeName });
  },
  convert() {
    const resolvedTypes = converter(get().input);
    set({ resolvedTypes });
  },
}));
export default useCode;
