import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../chat_message';
import { ChatService } from '../chat.service';
import {Userlogin} from '../user_login';

 @Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  myuser: Userlogin = {
    email: 'predefinit@gmail.com',
    password: '******',
 };
  constructor(private chatService: ChatService) { }
  ngOnInit(): void {
  }


   loginIn() {
    //console.log('myeemailis:' + this.myuser.email + 'micontraseña:' + this.myuser.password);
    this.chatService.tryToLogin(this.myuser.toString());
   }
 }

