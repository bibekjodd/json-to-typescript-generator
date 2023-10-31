'use client';
import Editor from '@/components/editor';
import Result from '@/components/result';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-one_dark';
import 'ace-builds/src-noconflict/ext-language_tools';
import Footer from '@/components/footer';

export default function page() {
  return (
    <main className="flex min-h-screen flex-col px-3.5 sm:px-4 md:px-5 lg:h-screen  xl:px-20">
      <div className="grid flex-1 overflow-y-auto lg:grid-cols-2">
        <Editor />
        <Result />
      </div>
      <Footer />
    </main>
  );
}
