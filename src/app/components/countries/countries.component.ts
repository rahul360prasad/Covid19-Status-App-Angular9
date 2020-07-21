import {Component,OnInit,Input} from '@angular/core';
import {DataInfoServiceService} from './../../services/data-info-service.service';
import {GlobalDataInfo} from './../../models/globaldata-info';
import {DateWiseInfo} from './../../models/dateWise-info';
import {merge} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  //below some variabels are created to store the total confirmed, deaths, recovered and active cases from data-info-services.ts fetching from 'cs'
  // totalConfirmed = 0;
  // totalActive = 0;
  // totalRecovered = 0;
  // totalDeaths = 0;
  // @Input('totalConfirmed')
  totalConfirmed = 0;
  // @Input('totalActive')
  totalActive = 0;
  // @Input('totalRecovered')
  totalRecovered = 0;
  // @Input('totalDeaths')
  totalDeaths = 0;
  dataTables = [];


  // loading= true;

  selectedCountryInfo: DateWiseInfo[];

  //below "DateWiseInfo" variabel is interface name comes form model and pass it on getDataWiseCountriesInfo() method
  DateWiseInfo;
  GlobalDataInfo;

  countries: string[] = [];

// chart:any;

  //below we declare chart type and its variable

  chart = {
    LineChart: {
      title: 'Selected Country Data',
      type: 'LineChart',
      dynamicResize: "dynamicResize",
      options: {
        colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        is3D: true,
        animation: {
          duration: 1000,
          easing: 'out'
        },
      },
      width: 600,
      height: 900,
    },
    ColumnChart: {
      title: 'Selected Country Data',
      type: 'ColumnChart',
      dynamicResize: "dynamicResize",
      options: {
        colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        is3D: true,
        animation: {
          duration: 1000,
          easing: 'out'
        }
      },
      width: 600,
      height: 900,
    },
    HistogramChart: {
      title: 'Selected Country Data',
      type: 'ScatterChart',
      dynamicResize: "dynamicResize",
      options: {
        colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        is3D: true,
        animation: {
          duration: 1000,
          easing: 'out'
        }
      },
      width: 600,
      height: 900,
    },
  }

  constructor(private service: DataInfoServiceService) { }

  ngOnInit(): void {
    //merged both subscription and the final code is after merging by using "merge" operrator
    merge(
      this.service.getDateWiseCountriesInfo().pipe(map(result => {
        this.DateWiseInfo = result;
      })
      ),
      this.service.getGlobalData().pipe(map(result => {
          this.GlobalDataInfo = result;
          // console.log(result)
          this.GlobalDataInfo.forEach(cs => {
          this.countries.push(cs.country)
        })
      }))
    ).subscribe({
      complete: () => {
        this.updateValues('US');
        // this.loading= false;
      }
    })

    //below method is the home component method use to fetch cases information only
    // this.service.getGlobalData().subscribe(result=>{
    //   this.data=result;
    //   this.data.forEach(cs=>{
    //     this.countries.push(cs.country)
    //   })
    // })

    //writing method for date wise data info in countries page
    // this.service.getDateWiseCountriesInfo().subscribe(result=>{
    //   // console.log(result);
    //   this.DateWiseInfo = result;
    //   this.updateChart();
    // })
    //note: finally we want by default country name in select box india so that we have two subsciptions above i.e 1st is getGlobalData() and 2nd is getDateWiseCountriesInfo()
    // now we can merge this two subscription into one using "merge" operator
  }

  //below mehtod is for selecting country from select box and all cases is genrated
  updateValues(country: string) {
    // console.log(country);
    this.GlobalDataInfo.forEach(cs => {
      if (cs.country == country) {
        this.totalConfirmed = cs.confirmed
        this.totalActive = cs.active
        this.totalRecovered = cs.recovered
        this.totalDeaths = cs.deaths
      }
    })
    //below code is show all cases information when the user select the particular country
    this.selectedCountryInfo = this.DateWiseInfo[country]
    this.updateChart();
    // console.log(this.selectedCountryInfo)
  }

  //below now we create method for line chart to update data graphically
  updateChart() {
    this.dataTables.push(['Date', 'Cases'])
    this.dataTables = [];
    this.selectedCountryInfo.forEach(cs => {
      this.dataTables.push([cs.date, cs.cases]);
    })
  }
}
