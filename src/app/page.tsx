"use client";
import CodeEditor from "@/components/code-editor";
import TransformedCode from "@/components/transformed-code";

export default function page() {
  return (
    <main className=" flex min-h-screen flex-col overflow-hidden bg-[#282a36] px-3.5 text-white sm:px-4 md:px-5 lg:px-20">
      <div className="mx-auto grid w-full flex-1 grid-cols-2 space-x-10 pt-4">
        <CodeEditor />
        <TransformedCode />
      </div>
    </main>
  );
}
