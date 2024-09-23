import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components';
import { PieChart, LineChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  LineChart,
  CanvasRenderer,
  LabelLayout,
  TitleComponent,
  ToolboxComponent,
  GridComponent,
  UniversalTransition
]);

export interface UserData {
  name: string;
  reviewYear: number;
  startDate: string;
  endDate: string;
  employee: string;
  supervisor: string;
}

const ELEMENT_DATA: UserData[] = [
  { name: 'Development', reviewYear: 2021, startDate: '01/01/2021', endDate: '12/31/2021', employee: 'Jam Payumo', supervisor: 'Arrian Pascual' },
  { name: 'OJT', reviewYear: 2021, startDate: '01/01/2021', endDate: '12/31/2021', employee: 'Ashley San Pedro', supervisor: 'Jam Payumo' },
  { name: 'Development', reviewYear: 2021, startDate: '01/01/2021', endDate: '12/31/2021', employee: 'Arrian Pascual', supervisor: 'Kristine Pascual' },
  { name: 'Human Resource', reviewYear: 2021, startDate: '01/01/2021', endDate: '12/31/2021', employee: 'Sherley De Guzman', supervisor: 'Kristine Pascual' },
  { name: 'OJT', reviewYear: 2021, startDate: '01/01/2021', endDate: '12/31/2021', employee: 'Patrick Perez', supervisor: 'Jam Payumo' },
  // You can add more dummy data here for testing
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule]
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'reviewYear', 'startDate', 'endDate', 'employee', 'supervisor', 'actions'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.initPieChart();
    this.initLineChart();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initPieChart(): void {
    const chartDom = document.getElementById('echart-container')!;
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
      series: [{
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: 40, fontWeight: 'bold' } },
        labelLine: { show: false },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }]
    };
    myChart.setOption(option);
  }

  private initLineChart(): void {
    const chartDom = document.getElementById('linechart-container')!;
    const myChart = echarts.init(chartDom);
    const option = {
      title: { text: 'Stacked Line' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'] },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      toolbox: { feature: { saveAsImage: {} } },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      },
      yAxis: { type: 'value' },
      series: [
        { name: 'Email', type: 'line', stack: 'Total', data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Union Ads', type: 'line', stack: 'Total', data: [220, 182, 191, 234, 290, 330, 310] },
        { name: 'Video Ads', type: 'line', stack: 'Total', data: [150, 232, 201, 154, 190, 330, 410] },
        { name: 'Direct', type: 'line', stack: 'Total', data: [320, 332, 301, 334, 390, 330, 320] },
      ]
    };
    myChart.setOption(option);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
