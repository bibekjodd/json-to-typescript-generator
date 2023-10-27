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
  input: `{
  fruits: ["apple", "mango", "banana", "orange"],
  colors: {
    orange: "#fa234c",
    lemon: "#22f3ce",
}
 `,
  rootTypeName: "",
  resolvedTypes: `type Root = {
  fruits: string[];
  colors: {
    orange: string;
    lemon: string;
  };
};
  `,
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
    const { result, isError } = converter(input, rootTypeName || "Root");
    if (!isError) set({ resolvedTypes: result });
  },
}));
export default useCode;
