import { bootstrapApplication } from '@angular/platform-browser';
bootstrapApplication(AppComponent).catch(e => console.error(e));

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
