import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  name: string;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages: Message[] = [];
  newMessage: Message = { name: '', text: '' };
  apiUrl = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMessages();
  }

  fetchMessages() {
    this.http.get<Message[]>(this.apiUrl).subscribe(data => {
      this.messages = data;
    });
  }

  sendMessage() {
    if (this.newMessage.name && this.newMessage.text) {
      this.http.post<Message>(this.apiUrl, this.newMessage).subscribe(() => {
        this.fetchMessages();
        this.newMessage = { name: '', text: '' }; // Clear input fields
      });
    }
  }
}
