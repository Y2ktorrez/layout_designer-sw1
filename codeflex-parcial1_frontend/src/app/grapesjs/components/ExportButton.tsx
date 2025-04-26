import { useState } from 'react';
import type { Editor } from '@grapesjs/studio-sdk/dist/typeConfigs/gjsExtend.js';
import { ExportToAngular } from '../utils/angular_export';

export default function ExportButton({ editor }: { editor?: Editor }) {
  const [projectName, setProjectName] = useState('grapesjs-angular-app');
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExport = async () => {
    if (!editor) return;
    setIsProcessing(true);
    try {
      await ExportToAngular(editor, projectName);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      window.dispatchEvent(
        new CustomEvent('toast', {
          detail: {
            message: 'Error al generar el proyecto Angular, inténtelo de nuevo más tarde.',
            variant: 'error'
          }
        })
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* 1. Botón que abre el modal */}
      <button className="btn btn-soft" onClick={() => setIsOpen(true)}>
        Exportar a Angular
      </button>

      {/* 2. Modal condicional */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Nombre del proyecto</h3>

            <div className="space-y-4 mt-4">
              <label className="block font-medium">Proyecto:</label>
              <input
                type="text"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <button
                onClick={handleExport}
                className="btn btn-success"
                disabled={isProcessing}
              >
                {isProcessing
                  ? <span className="loading loading-spinner" />
                  : 'Generar Proyecto Angular'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="btn"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
