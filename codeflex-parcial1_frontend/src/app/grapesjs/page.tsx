'use client';

import { type Editor } from 'grapesjs';
import { useState } from 'react';
import '@grapesjs/studio-sdk/style';
import StudioEditorComponent from '@/components/StudioEditorComponent';
import ExportButton from './components/GrapesFooter';
import { ChatDrawer } from '@/components/ChatDrawer';

export default function StudioEditorPage() {
  const [editor, setEditor] = useState<Editor>();

  return (
    <main className="flex h-screen flex-col p-5 gap-2 relative">
      {/* Barra superior */}
      <div className="flex items-center gap-5">
        {/* Modal Exportar a Angular */}
        <ExportButton editor={editor} />
      </div>

      {/* Área del editor */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <StudioEditorComponent onReady={setEditor} />
      </div>
      
      <ChatDrawer />
    </main>
  );
}
