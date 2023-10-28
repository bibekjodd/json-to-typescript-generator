"use client";
import CodeEditor from "@/components/code-editor";
import TransformedCode from "@/components/transformed-code/index";

export default function page() {
  return (
    <main className=" flex flex-col overflow-hidden bg-[#282a36] px-3.5 pt-2 text-white sm:px-4 md:min-h-screen md:px-5 lg:px-20">
      <div className="mx-auto w-full flex-1 space-y-10 pt-2 md:grid md:grid-cols-2 md:space-x-10 md:space-y-0">
        <CodeEditor />
        <TransformedCode />
      </div>
    </main>
  );
}
