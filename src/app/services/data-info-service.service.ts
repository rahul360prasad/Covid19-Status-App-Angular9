// 1. import and inject http client to constructor. before that we have to use http module in main module
    // i.e. we import the http client module in app.module.ts
// 2. now in app.module.ts in import section httpclient is also mention

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators'
import { GlobalDataInfo } from './../models/globaldata-info';
import { DateWiseInfo } from '../models/dateWise-info';


@Injectable({
  providedIn: 'root'
})
export class DataInfoServiceService {

  //below api link provides data for "home component" data information i.e dashboard information in chart format
  // providing url from where data fetched

  private baseUrl= `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/`
  private globalDataUrl=``

  //now we make some changes and adding some variables so the date are changes daynamically day by day
  private extension= '.csv';
  date;
  month;
  year;

  //creating mehtod for assinging '0' before single digit date and month after that again concate to globaldataurl() in constuctor
    putZero(datemonth : number){
      if(datemonth < 10){
        return '0'+datemonth
      }
      return datemonth
    }

  // "Countries component" api link
  //below api link provides data for countries component data information in tabular format for each country aloge with date
  private dateWiseCountriesInfo= `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;


  constructor(private http: HttpClient) {
      //creating object one obeject whose name is "date" and we fetch the date, month, year and assigned into our declared variabels like "date, month, year" get function
      // we can create obeject using this syntax: [datatype] [object variable name] = new [function/mehtod name]
      let now = new Date()
      this.date = now.getDate();
      this.month = now.getMonth()+1;
      this.year = now.getFullYear();
      console.log(     //the console print the full date and now we can concatinate this date to our project for realtime data
        {date : this.date,
        month : this.month,
        year : this.year,}
      )
//for concating the date to our csv file then we have make another url i.e base url in which we concate date
          //syntax for another url [this.exixting url]=[this.exixting url]+
          this.globalDataUrl = `${this.baseUrl}${this.putZero(this.month)}-${this.putZero(this.date)}-${this.year}${this.extension}`;
          console.log(this.globalDataUrl);
  }

  //below method is for "home.components.ts api" whose api variable name is "globalDataUrl"
  //below we creating method which fetch the global data from api or csv file form above api variabele i.e globalDataUrl
  getGlobalData() {
    return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
      map(result=>{

        let dataInfo: GlobalDataInfo[]=[]
        let raw = { };  // the work of raw is only merging all cities into single country

        let rows = result.split('\n');
        rows.splice(0, 1);  // splice is used for removing particular row by passing index no. in parameter
        rows.forEach(row=>{
          let cols= row.split(/,(?=\S)/);

          let cs ={
              country: cols[3],
              confirmed: +cols[7],   //to convert string such as 7, 8, 9, 10 into integer or number the use +(plus)[] opretor like +[7]
              deaths: +cols[8],
              recovered: +cols[9],
              active: +cols[10]
            }

            let temp: GlobalDataInfo = raw[cs.country];
            if(temp){
              temp.confirmed= cs.confirmed + temp.confirmed,
              temp.active= cs.active + temp.active,
              temp.deaths= cs.deaths + temp.deaths,
              temp.recovered= cs.recovered + temp.recovered
              raw[cs.country] = temp;
            }else{
              raw[cs.country] = cs;
            }

    //below code showing console data information in detail format means single country show their all cities data
      //and thats why we write the above "country merge code "
            // dataInfo.push({
            //   country: cols[3],
            //   confirmed: +cols[7],   //to convert string such as 7, 8, 9, 10 into integer or number the use +(plus)[] opretor like +[7]
            //   deaths: +cols[8],
            //   recovered: +cols[9],
            //   active: +cols[10]
            // })

        })
        console.log(raw)
        return <GlobalDataInfo[]>Object.values(raw);
      }),
      //below code is for error handling if any date is not in .csv file list then they shows an error message in console
      catchError((error : HttpErrorResponse)=>{
        if(error.status == 404){
          this.date = this.date-1
          this.globalDataUrl= `${this.baseUrl}${this.putZero(this.month)}-${this.putZero(this.date)}-${this.year}${this.extension}`;
          console.log(this.globalDataUrl)
          return this.getGlobalData()
        }
      })
    )
  }

  //below method or function is for "countries.components.ts" api whose api variable name is "dateWiseCountriesInfo"
  //below we creating a method which fetch the global data from api variable "dateWiseCountriesInfo" or csv file form above api variabele i.e dateWiseCountriesInfo
  getDateWiseCountriesInfo(){
    return this.http.get(this.dateWiseCountriesInfo, {responseType: 'text'}).pipe(map(result =>{
      let rows = result.split('\n');
      // rows.splice(0, 3);
      // console.log(rows);
      let mainData={};
      // rows.forEach(row=>{
      let header=rows[0];
      let dateHeaders= header.split(/,(?=\S)/)
      dateHeaders.splice(0, 4);
      rows.splice(0, 1);
      rows.forEach(row=>{
        let cols= row.split(/,(?=\S)/)
        let con= cols[1];
        cols.splice(0, 4);
        // console.log(con, cols);
        mainData[con]= [];
        cols.forEach((value, index)=>{
          let dw: DateWiseInfo= {
            cases: +value,
            country: con,
            date: new Date(Date.parse(dateHeaders[index]))
          }
          mainData[con].push(dw)
        })
      })
      // console.log(mainData);

      return mainData;
      // })
    }));
  }




}
