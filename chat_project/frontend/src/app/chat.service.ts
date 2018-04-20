import { Injectable } from '@angular/core';
import { ChatMessage } from './chat_message';
import { ChatUser } from './chat_user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { messageTypes } from './chat/enums';
import {ChatUserList} from './chat_user_list';

@Injectable()
export class ChatService {
  private url = 'http://localhost:8880';
  private socket;
  constructor(
    public http: HttpClient
  ) { }

  socketConnect() {
    this.socket = io(this.url);
    return this.socket;
  }

  sendMessage(messageType, message) {
    this.socket.emit(messageType, JSON.stringify(message));
  }

  tryToLogin(message: String): Observable<any> {
    return this.http.post('${this.url)/login', JSON.stringify(message));
}
  getMessages() {
    const observable = new Observable<ChatMessage>(observer => {
      this.socket.on(messageTypes.PUBLIC_MESSAGE, (data) => {
        observer.next(JSON.parse(data));
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getConnectedUsers() {
    const observable = new Observable<ChatUser[]>(observer => {
      this.socket.on(messageTypes.ALL_CONNECTED_USERS, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getConnectedUser() {
    const observable = new Observable<ChatUser>(observer => {
      this.socket.on(messageTypes.NEW_CONNECTED_USER, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getCurrentConnectedUser() {
    const observable = new Observable<ChatUser>(observer => {
      this.socket.on(messageTypes.CURRENT_CONNECTED_USER, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getDisconnectedUser() {
    const observable = new Observable<ChatUser>(observer => {
      this.socket.on(messageTypes.NEW_DISCONNECTED_USER, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getPrivateMessage() {
    const observable = new Observable<ChatMessage>(observer => {
      this.socket.on(messageTypes.PRIVATE_MESSAGE, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
