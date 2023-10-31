import useCode from '@/hooks/useCode';
import AceEditor from 'react-ace';
import { MdContentCopy } from 'react-icons/md';
import { toast } from 'sonner';

export default function Result() {
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
    <div className="flex h-full w-full flex-col pt-5 lg:pl-5 lg:pt-0">
      <div className="flex flex-wrap items-center pb-3 sm:h-20 sm:pb-0">
        <h3 className="mr-auto py-2 text-2xl font-bold text-[#3178c6] sm:py-0 lg:text-3xl">
          Typescript
        </h3>
        <div className="flex flex-shrink items-center space-x-3">
          <input
            type="text"
            value={rootTypeName}
            onChange={(e) => rootTypeNameChanged(e.target.value)}
            placeholder="Root Type Name..."
            className="h-10 flex-shrink flex-grow rounded-sm bg-white/10 px-2 font-mono text-neutral-300 outline-none ring-2 ring-transparent placeholder:text-neutral-400 focus:ring-sky-800 lg:px-3"
          />

          <button
            onClick={copyToClipboard}
            className="inline-flex h-10 flex-shrink-0 items-center justify-center space-x-2  rounded-sm bg-neutral-600/50 px-3 py-2 font-medium text-neutral-300 transition-all active:scale-95"
          >
            <span>Copy</span>
            <MdContentCopy className="h-5 w-5" />
          </button>
        </div>
      </div>

      <section
        id="generated-types"
        className="flex flex-1 items-center bg-[#282c34] p-2"
      >
        <AceEditor
          className="min-h-[300px] flex-1"
          value={resolvedTypes}
          mode="typescript"
          theme="one_dark"
          fontSize="16px"
          highlightActiveLine={true}
          readOnly
          width="100%"
          height="100%"
          wrapEnabled
          style={{
            lineHeight: 1.5
          }}
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
