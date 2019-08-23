import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as echarts from 'echarts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api';
  data;
  @ViewChild('echart1',{static:true}) main:ElementRef;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    // this.getAggregateData();
    this.getData();
  }

  async getData(){
    this.data = await (this.http.get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI").toPromise());
    console.table(this.data)
  }
  async getAggregateData(){
    this.data = await (this.http.get("http://localhost:7000/chat/group/messages").toPromise());
    console.log(this.data)
    // console.log(this.main)
    var myChart = echarts.init(this.main.nativeElement);
    // specify chart configuration item and data
    console.log(myChart)
    var option = {
        title: {
            text: 'ECharts entry example'
        },
        tooltip: {},
        legend: {
            data:['Messages_Count']
        },
        xAxis: {
            data: this.data.map(d=>d["_id"])
        },
        yAxis: {},
        series: [{
            name: 'Messages_Count',
            type: 'bar',
            data: this.data.map(d=>d["count"])
        }]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
    // console.log(myChart)
    Highcharts.chart("main",{
      chart: {
        type: 'column'
    },
    title: {
        text: 'Fruit Consumption'
    },
    xAxis: {
        categories: this.data.map(d=>d["_id"])
    },
    yAxis: {
        title: {
            text: 'Fruit eaten'
        }
    },
    series: [{
        name: 'Messages Count',
        data: this.data.map(d=>d["count"]),
        type:undefined
      }]
    })
  }
}
