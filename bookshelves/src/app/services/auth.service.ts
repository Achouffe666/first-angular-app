import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(username:string, email:string, password: string){
    return new Promise<void>(
      (resolve, reject)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          ()=>{
            let user = firebase.auth().currentUser
            user.updateProfile({displayName: username}).then(()=>{console.log('username added')}) 
            resolve();
          },
          (error)=>{
            reject(error)
          }
       );
      }
      )
  }
  signInUser(email: string, password: string){
    return new Promise<void>(
      (resolve, reject)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          ()=>{resolve()},
          (error)=>{reject(error)})
      }
    )
  }
  signOutUser(){
      firebase.auth().signOut();
  }
}
