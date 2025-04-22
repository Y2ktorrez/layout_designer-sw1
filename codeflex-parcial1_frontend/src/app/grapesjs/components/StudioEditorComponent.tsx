'use client';

import { useEffect } from 'react';
import createStudioEditor from '@grapesjs/studio-sdk';
import {
  flexComponent,
  rteProseMirror,
  tableComponent,
  swiperComponent,
  accordionComponent,
  listPagesComponent,
  fsLightboxComponent,
  lightGalleryComponent,
} from '@grapesjs/studio-sdk-plugins';
import '@grapesjs/studio-sdk/style';

const StudioEditorComponent = () => {
  useEffect(() => {
    createStudioEditor({
      root: '#studio-editor',
      licenseKey: '9c946b9c9cd04013a9ee0bb712eed0b5e5fe1545d5234a4da8436a92df27987a',
      theme: 'light',
      customTheme: {
        default: {
          colors: {
            global: {
              text: "rgba(85, 75, 105, 1)",
              focus: "rgba(200, 150, 250, 0.8)",
              border: "rgba(180, 170, 200, 1)",
              background1: "rgba(245, 240, 250, 1)",
              background2: "rgba(235, 225, 245, 1)",
              background3: "rgba(225, 215, 240, 1)",
              placeholder: "rgba(150, 140, 180, 1)",
              backgroundHover: "rgba(215, 205, 235, 1)"
            },
            symbol: {
              text: "rgba(255, 255, 255, 1)",
              background1: "rgba(180, 130, 250, 1)",
              background2: "rgba(160, 110, 240, 1)",
              background3: "rgba(140, 90, 220, 1)"
            },
            primary: {
              text: "rgba(255, 255, 255, 1)",
              background1: "rgba(180, 130, 250, 1)",
              background3: "rgba(235, 225, 245, 1)",
              backgroundHover: "rgba(160, 110, 240, 1)"
            },
            selector: {
              text: "rgba(85, 75, 105, 1)",
              background1: "rgba(220, 150, 220, 1)",
              background2: "rgba(250, 220, 250, 1)"
            },
            component: {
              text: "rgba(255, 255, 255, 1)",
              background1: "rgba(190, 120, 230, 1)",
              background2: "rgba(160, 90, 200, 1)",
              background3: "rgba(140, 70, 180, 1)"
            }
          }
        }
      },
      project: {
        type: 'web',
        id: 'UNIQUE_PROJECT_ID',
      },
      identity: {
        id: 'UNIQUE_END_USER_ID',
      },
      assets: {
        storageType: 'cloud',
      },
      storage: {
        type: 'cloud',
        autosaveChanges: 100,
        autosaveIntervalMs: 10000,
      },
      plugins: [
        flexComponent.init({}),
        rteProseMirror.init({}),
        tableComponent.init({}),
        swiperComponent.init({}),
        accordionComponent.init({}),
        listPagesComponent.init({}),
        fsLightboxComponent.init({}),
        lightGalleryComponent.init({}),
      ],
    });
  }, []);

  return <div id="studio-editor" style={{ width: '100%', height: '100vh' }} />
  
  ;
};

export default StudioEditorComponent;
