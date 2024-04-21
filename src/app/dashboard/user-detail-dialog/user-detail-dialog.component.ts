import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FirestoreService } from '../../services/firestore.service';
import { User } from '../../../models/user.class';
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-user-detail-dialog',
  standalone: true,
  imports: [MatCard, CommonModule],
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.scss'
})
export class UserDetailDialogComponent {
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data:any, private sharedService: SharedServiceService) {}
  firestoreService = inject(FirestoreService)

  userId = this.data.user.id;
  actualUser: any = new User;
  usersInChannel: User[] = [new User]
  @ViewChild('profilePicture1') profilePicture1!: ElementRef;

  async ngOnInit() {
    this.userId = this.data.user.id;
    this.usersInChannel = this.data.userInChannel.usersInChannel;
    this.usersInChannel.forEach(user => {
      if(user.id === this.userId){
        this.actualUser = user;
      }
    });
  }
  
  /**
   * closed the dialog
   */
  close(){
    this.dialog.closeAll();
  }

  /**
   * open the direct chat with the choosen userId
   */
  sendMessage(){
    console.log("Nachricht Button wurde gedrückt.");
    this.sharedService.setSelectedUserId(this.userId);
    this.close();
  }
}
