import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
// loading= true;
  constructor() { }

  ngOnInit(): void {
    // complete: ()=>{
    //   this.loading=false;
    // }
  }

}
