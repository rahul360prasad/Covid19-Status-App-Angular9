import { Component, OnInit, Input } from '@angular/core';
import {DateWiseInfo} from './../../models/dateWise-info';


@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent implements OnInit {

  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalActive')
  totalActive;
  @Input('totalRecovered')
  totalRecovered;
  @Input('totalDeaths')
  totalDeaths;
  globalDataUrl;
  // DateWiseInfo;
  // dates: DateWiseInfo[];
  // date;
  // month;
  // year;
  now = new Date();

  // putZero(datemonth : number){
  //   if(datemonth < 10){
  //     return '0'+datemonth
  //   }
  //   return datemonth
  // }

  constructor() {
    // let now = new Date()
      // this.date
      // this.month
      // this.year
      // console.log(     //the console print the full date and now we can concatinate this date to our project for realtime data
      //   {date : this.date,
      //   month : this.month,
      //   year : this.year,}
      // )
   }

  ngOnInit(): void {
    // this.dates = this.DateWiseInfo[date]
  }

}
