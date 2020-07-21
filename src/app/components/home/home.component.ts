import { Component, OnInit } from '@angular/core';
import { DataInfoServiceService } from './../../services/data-info-service.service';
import { GlobalDataInfo } from 'src/app/models/globaldata-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //below some variabels are created to store the total confirmed, deaths, recovered and active cases from data-info-services.ts fetching from 'cs'
  totalConfirmed = 0;
  totalActive = 0;
  totalRecovered = 0;
  totalDeaths = 0;
  datatable = [];
  loading = true;

  chart = {
    PieChart: {
      chartType: "PieChart",
      dynamicResize: "dynamicResize",
      options: { title: 'Countries wise Data', legend: { position: 'top' }, height: 600, is3D: true, animation: { duration: 1000, easing: 'out', }, },
    },
    ColumnChart: {
      chartType: "ColumnChart",
      dynamicResize: "dynamicResize",
      options: { title: 'Countries wise Data', legend: { position: 'top' }, height: 600, animation: { duration: 1000, easing: 'out', }, is3D: true, bar: {groupWidth: "100%"}, },
    },
    GeoChart: {
      chartType: "GeoChart",
      dynamicResize: "dynamicResize",
      data: "datatable",
      options: { height: 600, animation: { duration: 1000, easing: 'out', },
                  showTip: true,
                  colorAxis: {colors: ['#86cc45', '#827878', '#669900']},
                  backgroundColor: '#00ffff',
                  datalessRegionColor: '#f8bbd0',
                  defaultColor: '#f5f5f5',
                  role: 'annotation',
                },
    },
    LineChart: {
      chartType: "LineChart",
      dynamicResize: "dynamicResize",
      options: { height: 600, colors: ['#4dd2ff', '#ff8c1a', '#ff8c1a'], animation: { duration: 1000, easing: 'out', }, },
    }
  }

  //below code is for radio button functionallty on charts only
  initChart(caseType: string) {
    // this.datatable.push(["Country", "Cases"])
    this.datatable = [];
    this.globalData.forEach(cs => {
      let value: number;
      if (caseType == 'c') {
        if (cs.confirmed > 20000) {
          value = cs.confirmed
        }
      }
      if (caseType == 'a') {
        if (cs.active > 20000) {
          value = cs.active
        }
      } if (caseType == 'r') {
        if (cs.recovered > 20000) {
          value = cs.recovered
        }
      } if (caseType == 'd') {
        if (cs.deaths > 20000) {
          value = cs.deaths
        }
      }
      this.datatable.push([
        cs.country, value
      ])
    })
  }


  globalData: GlobalDataInfo[];

  //option of all chart is below paste later

  constructor(private dataService: DataInfoServiceService) { }

  ngOnInit(): void {

    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        // console.log(result);

        this.globalData = result;

        result.forEach(cs => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalConfirmed += cs.confirmed
            this.totalActive += cs.active
            this.totalRecovered += cs.recovered
            this.totalDeaths += cs.deaths
          }
        })
        this.initChart('c');
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  // below code is for radio button method function "getcasedata()"
  getcasedata(input: HTMLInputElement) {
    // console.log(input.value)
    this.initChart(input.value)
  }
}
//
