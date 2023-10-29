import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useCode from '@/hooks/useCode';
import { MdContentCopy } from 'react-icons/md';
import { toast } from 'sonner';
import AceEditor from 'react-ace';

export default function TransformedCode() {
  const rootTypeName = useCode((state) => state.rootTypeName);
  const rootTypeNameChanged = useCode((state) => state.rootTypeNameChanged);
  const resolvedTypes = useCode((state) => state.resolvedTypes);

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(resolvedTypes);
      toast.success('Copied to clipboard');
    } catch (err) {
      toast.error('User has denied clipboard permission');
    }
  };

  return (
    <div className="h-full w-full  text-black">
      <div className="flex items-center pt-10 md:px-4 md:pt-0">
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
      <section
        id="generated-types"
        className="mt-5 h-full w-full overflow-y-auto md:pl-10 lg:pl-0"
      >
        <AceEditor
          className="flex-1"
          value={resolvedTypes}
          mode="typescript"
          theme="one_dark"
          fontSize="16px"
          highlightActiveLine={true}
          readOnly
          width="100%"
          height="100%"
          wrapEnabled
          setOptions={{
            enableLiveAutocompletion: false,
            showLineNumbers: false,
            showFoldWidgets: false,
            showGutter: false,
            showInvisibles: false,
            showPrintMargin: false,
            tabSize: 2
          }}
        />
      </section>
    </div>
  );
}
