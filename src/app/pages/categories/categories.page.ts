import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GetcategoriesService } from 'src/app/services/getcategories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  listings =  [];
  category: any;
  constructor(private getcategories:GetcategoriesService,private router:Router) { }

  ngOnInit() {
    this.category = this.getcategories.getAll()
    .subscribe(response => { 
      this.category = response;
      console.log(this.category);
  });
}
}
  // onGoToListingDetail(listing){
  //   this.getcategoriesService.currentlisting = listing;
  //   this.router.navigate(['/addetails']);
  // }

