import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';

import { routing } from './app.routing';
import APIInterceptor from './interceptors/api.interceptor';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat.service';
import { LoginComponent } from './login/Login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
   RegisterComponent,
  ],
  imports: [
    BrowserModule ,
    FormsModule,
    routing,
    HttpClientModule,
  ],
  providers: [ChatService, {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
