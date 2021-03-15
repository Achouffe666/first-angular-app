import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
userName: string; 
isAuth: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user)=>{
        user ? this.isAuth = true : this.isAuth = false;
        this.userName = user.displayName
      }
    )
  }
onSignOut(){
  this.authService.signOutUser();
}

}
