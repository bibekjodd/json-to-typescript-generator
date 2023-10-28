import { getValidJSON } from "@/lib/format-json";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useLayoutEffect } from "react";
import AceEditor from "react-ace";
import { TbClipboardText } from "react-icons/tb";
import { toast } from "sonner";
import useCode from "../hooks/useCode";
import { Button } from "./ui/button";
import { initialJSON } from "./constants";

export default function CodeEditor() {
  const input = useCode((state) => state.input);
  const inputChanged = useCode((state) => state.inputChanged);

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      inputChanged(text);
    } catch (error) {
      toast.error("User has denied clipboard permission");
    }
  };

  useLayoutEffect(() => {
    try {
      const oldJSON = localStorage.getItem("old-json");
      if (!oldJSON) {
        return inputChanged(initialJSON);
      }
      const data = getValidJSON(oldJSON);
      if (data) inputChanged(oldJSON);
    } catch (error) {}
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex items-center md:px-4">
        <h3 className="mr-auto text-lg font-bold">JSON</h3>

        <div className="flex space-x-3">
          <Button
            onClick={pasteFromClipboard}
            className="space-x-2 bg-white/70 hover:bg-white/60 active:bg-white/50"
          >
            <span>paste</span>
            <TbClipboardText className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => inputChanged("")}
            className="space-x-2 bg-white/70 hover:bg-white/60 active:bg-white/50"
          >
            <span>clear</span>
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="bg relative mt-5 flex h-full border-rose-900 md:border-r-2">
        <AceEditor
          className="h-full w-full "
          value={input}
          onChange={(input) => {
            inputChanged(input);
          }}
          focus
          mode="typescript"
          theme="one_dark"
          fontSize="16px"
          width="100%"
          height="100%"
          highlightActiveLine={true}
          wrapEnabled
          setOptions={{
            enableLiveAutocompletion: true,
            showLineNumbers: false,
            showFoldWidgets: false,
            showGutter: false,
            showInvisibles: false,
            showPrintMargin: false,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}
