import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCode from "@/hooks/useCode";
import { MdContentCopy } from "react-icons/md";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner";

export default function TransformedCode() {
  const generatedTypes = useCode((state) => state.generatedTypes);
  const rootTypeName = useCode((state) => state.rootTypeName);
  const rootTypeNameChanged = useCode((state) => state.rootTypeNameChanged);

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(JSON.stringify(generatedTypes));
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("User has denied clipboard permission");
    }
  };

  return (
    <div className="h-full w-full text-black">
      <div className="flex items-center md:px-4">
        <h3 className="mr-auto text-lg font-bold text-white">Typescript</h3>
        <div className="flex flex-shrink items-center space-x-3">
          <Input
            className="w-full bg-white/70 text-black placeholder:text-black/70"
            value={rootTypeName}
            onChange={(e) => rootTypeNameChanged(e.target.value)}
            placeholder="Root Type Name..."
          />

          <Button
            onClick={copyToClipboard}
            className="space-x-2 bg-white/70 hover:bg-white/60 active:bg-white/50"
          >
            <span>copy</span>
            <MdContentCopy className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <section className="mt-5 bg-[#282a36]">
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
          {JSON.stringify(generatedTypes)}
        </SyntaxHighlighter>
      </section>
    </div>
  );
}
