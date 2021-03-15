import { Component } from '@angular/core';
import {firebase} from '@firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyC4dasAotIr1nY-1_WFTiutKgn8rFUrdRw",
      authDomain: "bookshelves-216b6.firebaseapp.com",
      databaseURL: "https://bookshelves-216b6-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "bookshelves-216b6",
      storageBucket: "bookshelves-216b6.appspot.com",
      messagingSenderId: "973313228873",
      appId: "1:973313228873:web:1d5121ac44a5a1cc04bf98"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
