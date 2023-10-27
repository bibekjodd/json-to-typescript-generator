import { TrashIcon } from "@heroicons/react/24/outline";
import { TbClipboardText } from "react-icons/tb";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner";
import useCode from "../hooks/useCode";
import { Button } from "./ui/button";

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

  return (
    <div className="h-full w-full">
      <div className="flex items-center px-4">
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

      <div className="relative flex h-full border-r-2 border-rose-900 bg-[#282a36]">
        <textarea
          className="absolute inset-0 resize-none bg-transparent p-2 font-mono text-transparent caret-white outline-none scrollbar-hide"
          value={input}
          onChange={(e) => inputChanged(e.target.value)}
        />
        <SyntaxHighlighter
          language="typescript"
          style={atomOneDark}
          customStyle={{
            flex: "1",
            background: "transparent",
            height: "100%",
            width: "100%",
          }}
          wrapLines
          wrapLongLines
        >
          {input}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
