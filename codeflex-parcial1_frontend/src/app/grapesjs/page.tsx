'use client';

import { type Editor } from 'grapesjs';
import { useState } from 'react';
import '@grapesjs/studio-sdk/style';
import StudioEditorComponent from '@/components/StudioEditorComponent';

export default function StudioEditorPage() {
  const [editor, setEditor] = useState<Editor>();

  return (
    <main className="flex h-screen flex-col p-5 gap-2">
      {/* Área del editor */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <StudioEditorComponent onReady={setEditor} />
      </div>
    </main>
  );
}