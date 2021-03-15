import { Injectable } from '@angular/core';
import {Book} from '../models/Book.model';
import {Subject, from} from 'rxjs';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>()


  constructor() { }

  emitBooks(){
    this.booksSubject.next(this.books)
  }
  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }
  getBooks(){
    firebase.database().ref('/books')
    .on('value', (data)=>{
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    })
  }
  getSingleBook(id: number){
    return new Promise((resolve, reject)=>{
      firebase.database().ref('/books/'+id).once('value').then(
        (data)=>{
          resolve(data.val());
        }, (error)=>{reject(error);
        }
      )
    })
  }
  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        ()=>{console.log("photo supprimée")}
      ).catch((error)=>{console.error(error)})
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl)=>{
        if(bookEl === book){return true}
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
  uploadFile(file: File){
    return new Promise(
      (resolve,reject)=>{
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
        .child('image/' + almostUniqueFileName + file.name)
        .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{console.log('Chargement...')},
          (error)=>{console.error('Erreur de chargement: ' + error); reject()},
          ()=>{resolve(upload.snapshot.ref.getDownloadURL())}
          )
      }
    )
  }
}
