import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { BmsService } from '@app/shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-bms-add-book',
  templateUrl: './bms-add-book.component.html',
  styleUrls: ['./bms-add-book.component.css']
})
export class BmsAddBookComponent implements OnInit {

  bookForm;
  bookAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private formBuilder: FormBuilder, private bmsService: BmsService, private router: Router) {
    this.bookForm = this.formBuilder.group({
      title: "",
      author: "",
      isbn: 0,
      bookImage: ""
    })
  }

  ngOnInit() {
  }

  onSubmit(book) {
    console.warn("Book Data:",book);
    this.bmsService.addBook(book);
    this.bookAdded.next(true);
    this.bookForm.reset();
  }

  onFileSelected(event){
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      me.bookForm.patchValue({
        bookImage: reader.result
      })
    };
    reader.onerror = (err) => {console.error(err);
    }
  }

  goBack() {
    this.router.navigate(["/apps/bms"])
  }

}
