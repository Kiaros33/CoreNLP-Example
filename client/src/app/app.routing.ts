import { Routes, RouterModule } from '@angular/router';
import { FormDataComponent } from './form/formdata.component';

const APP_ROUTES: Routes = [{ path: '', component: FormDataComponent }];

export const routing = RouterModule.forRoot(APP_ROUTES);
