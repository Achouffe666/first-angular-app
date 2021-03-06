import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import {Book} from '../../models/Book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute,
              private bookService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.book = new Book('','','', '');
    const id = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book: Book)=>{
        this.book = book
      }
    )
  }
  onBack(){
    this.router.navigate(['/books']);
  }

}
