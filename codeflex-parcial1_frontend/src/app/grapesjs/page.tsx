'use client';

import { type Editor } from 'grapesjs';
import { useState } from 'react';
import '@grapesjs/studio-sdk/style';
import StudioEditorComponent from '@/components/StudioEditorComponent';
import Link from 'next/link';
import ExportButton from './components/GrapesFooter';

export default function StudioEditorPage() {
  const [editor, setEditor] = useState<Editor>();

  return (
    <main className="flex h-screen flex-col p-5 gap-2">
      {/* Barra superior */}
      <div className="flex items-center gap-5">
        {/* Modal Exportar a Angular */}
        <ExportButton editor={editor} />
      </div>

      {/* Área del editor */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <StudioEditorComponent onReady={setEditor} />
      </div>
    </main>
  );
}