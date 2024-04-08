import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchName: new FormControl(''),
    });
  }

  onSearchProducts() {
    const searchName = this.searchForm?.get('searchName')?.value;
    if (searchName) {
      this.router.navigate(['search', searchName]);
    } else this.router.navigate(['products']);
  }
}
