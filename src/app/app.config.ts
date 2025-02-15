import { ApplicationConfig, ENVIRONMENT_INITIALIZER, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimationsAsync('noop'),
     provideHttpClient(),
    //  {
    //   provide: ENVIRONMENT_INITIALIZER,
    //   multi: true,
    //   useValue: () => {
    //     const matRegistory = inject(MatIconRegistry);
    //     matRegistory.setDefaultFontSetClass('material-symbols-outlined');
    //   }
    //  }
    ]
};
