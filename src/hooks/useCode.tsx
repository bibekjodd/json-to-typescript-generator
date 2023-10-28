import { TypeGenerator } from "@/lib/type-generator";
import { toast } from "sonner";
import { create } from "zustand";
export type GeneratedTypes = {
  name: string;
  type: string[] | { [key: string]: string[] | undefined };
}[];

type UseCode = {
  input: string;
  rootTypeName: string;
  generatedTypes: GeneratedTypes;
  isInvalidJSON: boolean;
  useInterface: boolean;

  setUseInterface: (arg: boolean) => void;
  setIsInvalidJSON: (state: boolean) => void;
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
  useInterface: false,
  rootTypeName: "",
  generatedTypes: [
    { name: "Root", type: { fruits: ["array", "string"], colors: ["Colors"] } },
    { name: "Colors", type: { orange: ["string"], lemon: ["string"] } },
  ],
  isInvalidJSON: false,
  setUseInterface(arg) {
    set({ useInterface: arg });
  },
  inputChanged(input) {
    set({ input });
    get().convert();
  },
  rootTypeNameChanged(rootTypeName) {
    set({ rootTypeName });
    get().convert();
  },
  setIsInvalidJSON(state) {
    set({ isInvalidJSON: state });
  },
  convert() {
    const { input, rootTypeName } = get();
    const { generatedTypes, isInvalidJSON } = new TypeGenerator(
      input,
      rootTypeName || "root",
    );
    toast.dismiss();
    if (isInvalidJSON) {
      set({ isInvalidJSON });
      if (input !== "") {
        toast.error("Invalid JSON", { position: "bottom-left" });
      }
    } else {
      set({ generatedTypes, isInvalidJSON: false });
    }
  },
}));
export default useCode;
