import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { CommonModule } from '@angular/common';
import { LogInService } from '../services/log-in.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [IntroComponent, MatCardModule, RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  @ViewChild('mailField') mailField!: ElementRef;
  @ViewChild(' passwordMessage') passwordMessage!: ElementRef;

  mail: any;
  password: any;

  loginService = inject(LogInService)
  firestore = inject(FirestoreService)
  uploadService = inject(StorageService)


  logIn() {
    this.validateCheck()
    this.loginService.Login(this.mail, this.password) // erst nach dem check 
  }

  async logInWithGoogle(){
    //this.firestore.GoogleAuth();
   await this.loginService.loginWithGoogle()
  }

  validateCheck() {
    const mailfield = this.mailField.nativeElement;
    const passwordMessage = this.passwordMessage.nativeElement;

    if (!mailfield.validity.valid) {
      passwordMessage.style = 'opacity: 1'
    } else {
      passwordMessage.style = 'opacity: 0'
      console.log(this.mail, this.password)
    }
    // this.firestore.createUserWithEmailAndPassword(this.mail, this.password) dies war nur ein test zum anlegen der daten
  }

}
