import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/Login.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
