import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book.model';
import firebase from "firebase/app";
import { AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage';
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import { formatDate } from '@angular/common';




@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl : string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private bookService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author:['', Validators.required],
      description:[''],
      date: ['']
    })
  }
  onSaveBook(){
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const description = this.bookForm.get('description').value;
    const date = Date.now()
    const formatedDate = formatDate(date, 'dd MMMM yyyy','en-US')

    const newBook = new Book(title, author, description, formatedDate);
    if(this.fileUrl && this.fileUrl !== ""){
      newBook.photo = this.fileUrl;
    }

    this.bookService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }
  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string)=>{this.fileUrl = url; this.fileIsUploading = false; this.fileUploaded = true}
    )
  }

  detectFiles(event){
    this.onUploadFile(event.target.files[0])
  }
}
