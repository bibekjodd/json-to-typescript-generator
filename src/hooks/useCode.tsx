import { TypeGenerator } from "@/lib/type-generator";
import { toast } from "sonner";
import { create } from "zustand";

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
    const { resolvedTypes, isInvalidJSON } = new TypeGenerator(
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
        resolvedTypes,
        isInvalidJSON,
      });
      localStorage.setItem("old-json", input);
    }
  },
  // end
}));
export default useCode;
