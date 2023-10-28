import { TypeGenerator } from "@/lib/type-generator";
import { typeResolver } from "@/lib/type-resolver";
import { toast } from "sonner";
import { create } from "zustand";
export type GeneratedTypes = {
  name: string;
  type: string[] | { [key: string]: string[] | undefined };
}[];

type UseCode = {
  input: string;
  rootTypeName: string;
  isInvalidJSON: boolean;
  useInterface: boolean;

  resolvedTypes: string;
  setUseInterface: (arg: boolean) => void;
  setIsInvalidJSON: (state: boolean) => void;
  inputChanged: (input: string) => void;
  convert: () => void;
  rootTypeNameChanged: (rootTypeName: string) => void;
};

const useCode = create<UseCode>((set, get) => ({
  input: "",
  useInterface: false,
  rootTypeName: "",
  isInvalidJSON: false,
  resolvedTypes: "",
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
      set({
        resolvedTypes: typeResolver(generatedTypes),
        isInvalidJSON: false,
      });
    }
  },
}));
export default useCode;
