"use client";
import CodeEditor from "@/components/code-editor";
import TransformedCode from "@/components/transformed-code/index";

export default function page() {
  return (
    <main className=" flex min-h-screen flex-col overflow-hidden overflow-y-auto bg-[#282a36] px-3.5 pt-2 text-white scrollbar-hide sm:px-4 md:px-5 lg:px-20">
      <div className="mx-auto h-full w-full flex-1 space-y-10 pt-2 md:grid md:grid-cols-2 md:space-y-0 lg:space-x-10">
        <CodeEditor />
        <TransformedCode />
      </div>
    </main>
  );
}
