import { getValidJSON } from '@/lib/format-json';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useLayoutEffect } from 'react';
import AceEditor from 'react-ace';
import { TbClipboardText } from 'react-icons/tb';
import { toast } from 'sonner';
import useCode from '../hooks/useCode';
import { initialJSON } from '../lib/constants';

export default function Editor() {
  const input = useCode((state) => state.input);
  const inputChanged = useCode((state) => state.inputChanged);

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      inputChanged(text);
    } catch (error) {
      toast.error('User has denied clipboard permission');
    }
  };

  useLayoutEffect(() => {
    try {
      const oldJSON = localStorage.getItem('old-json');
      if (!oldJSON) {
        return inputChanged(initialJSON);
      }
      const data = getValidJSON(oldJSON);
      if (data) inputChanged(oldJSON);
    } catch (error) {}
  }, []);

  return (
    <div className="flex h-full w-full flex-col lg:pr-5">
      <div className="flex h-20 items-center">
        <h3 className="mr-auto bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-2xl font-bold text-transparent lg:text-3xl">
          JSON
        </h3>

        <div className="flex space-x-3 text-black">
          <button
            onClick={pasteFromClipboard}
            className="inline-flex h-10 flex-shrink-0 items-center justify-center space-x-2  rounded-sm bg-neutral-600/50 px-3 py-2 font-medium text-neutral-300 transition-all active:scale-95"
          >
            <span>Paste</span>
            <TbClipboardText className="h-5 w-5" />
          </button>
          <button
            onClick={() => inputChanged('')}
            className="inline-flex h-10 flex-shrink-0 items-center justify-center space-x-2  rounded-sm bg-neutral-600/50 px-3 py-2 font-medium text-neutral-300 transition-all active:scale-95"
          >
            <span>Clear</span>
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 flex-grow overflow-y-auto bg-[#282c34] p-2">
        <AceEditor
          className="min-h-[300px] flex-1 overflow-y-auto"
          value={input}
          onChange={(input) => {
            inputChanged(input);
          }}
          height="100%"
          width="100%"
          focus
          mode="typescript"
          theme="one_dark"
          fontSize="16px"
          highlightActiveLine={true}
          wrapEnabled
          style={{
            lineHeight: 1.5
          }}
          setOptions={{
            enableLiveAutocompletion: true,
            showLineNumbers: false,
            showFoldWidgets: false,
            showGutter: false,
            showInvisibles: false,
            showPrintMargin: false,
            tabSize: 2
          }}
        />
      </div>
    </div>
  );
}
