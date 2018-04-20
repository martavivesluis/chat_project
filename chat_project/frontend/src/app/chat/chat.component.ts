import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../chat_message';
import { ChatUser } from '../chat_user';
import { ChatService } from '../chat.service';
import { messageTypes } from './enums';
import {ChatUserList} from '../chat_user_list';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private chatService: ChatService, private http: HttpClient) { }

  connection;
  connectedUser;
  userName;
  selectedUser;
  selectedUserConversation;

  chatMessageToSend: ChatMessage = {
    text: '',
    user: '',
    date: null,
    receiver: null,
  };

  newReceivedMessages: ChatMessage[] = [];

  chatMessages: ChatMessage[] = [];
  chatOldMessages: ChatMessage[] = [];
  connectedUsers: ChatUser[] = [];

  checkUserMessage(user) {
    return message => message.senderUser.id === user.id;
  }

  sendMessage(user): void {
    this.chatService.sendMessage(
      messageTypes.PRIVATE_MESSAGE,
      new ChatMessage(this.chatMessageToSend.text, this.userName, new Date(), user.id),
    );
    this.chatMessageToSend.text = '';
  }

  onUserClick(user) {
    this.http.get(`user/messages/${this.connectedUser.id}/${user.id}`).subscribe(data => {
      this.selectedUserConversation = data;
    });
    this.selectedUser = user;
  }
  hasMessagesFromUser(user) {
   return this.newReceivedMessages.find(this.checkUserMessage(user));
  }
  getMessagesByUser(user) {
    return this.newReceivedMessages.filter(this.checkUserMessage(user));
  }
  connect() {
    this.connection = this.chatService.socketConnect();
    this.chatService.getConnectedUsers().subscribe(users => {
      this.connectedUsers = users;
    });
    /*this.chatService.getLastMessages().subscribe(oldMessages =>
    //{this.chatOldMessages = oldMessages;}*/
    this.chatService.getConnectedUser().subscribe(user => {
      this.connectedUsers.push(user);
    });
    this.chatService.getCurrentConnectedUser().subscribe(user => {
      this.connectedUser = user;
    });
    this.chatService.getDisconnectedUser().subscribe(user => {
      this.connectedUsers.splice(this.connectedUsers.indexOf(user), 1);
    });
    this.chatService.sendMessage(
      messageTypes.NEW_USER,
      new ChatUser(this.userName),
    );
    this.chatService.getPrivateMessage().subscribe(privateMessage => {
      console.log(privateMessage);
      this.newReceivedMessages.push(privateMessage);
    });
  }
}
