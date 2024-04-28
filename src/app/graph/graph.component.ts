import {
  AfterViewInit,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { BaseChartDirective } from 'ng2-charts';
import { Graphdata } from '../graphdata.interface';
import { GraphdataService } from '../graphdata.service';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css',
})
export class GraphComponent implements AfterViewInit {
  @Input() graphdata: Graphdata = { id: '0', year: '0', month: '0' };
  @Output() wattTotalEvent = new EventEmitter<string>();
  private subscription?: Subscription;

  vals = [
    {
      months: [
        {
          days: [{ day: '01', val: 1.0 }],
          month: '01',
          watt_per_month: 1.0,
        },
      ],
      year: '2024',
    },
  ];

  val_year = this.vals[0].year;
  val_months = this.vals[0].months;
  val_month = this.vals[0].months[0].month;
  watt_per_month = this.vals[0].months[0].watt_per_month / 1000;
  val_watt_per_month = this.watt_per_month.toFixed(3);
  val_days = this.val_months[0].days;

  barChartOptions = {
    scales: {
      x: {
        grid: {
          offset: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  barChartData = {
    labels: this.val_days.map((row: { day: any }) => row.day),
    datasets: [
      {
        label: 'Watt per day',
        barPercentage: 0.5,
        barThickness: 8,
        maxBarThickness: 10,
        minBarLength: 2,
        data: this.val_days.map((row: { val: any }) => row.val),
      },
    ],
  };

  constructor(private graphDataService: GraphdataService) {}

  ngAfterViewInit() {
    this.fetchGraphData();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.graphdata = { id: '0', year: '0', month: '0' };
  }

  fetchGraphData(): void {
    this.graphDataService.setUrlData();
    this.subscription = this.graphDataService
      .getGraphData(this.graphdata.year, this.graphdata.month)
      .subscribe((data: any) => {
        this.vals = Array.from(data);
        this.val_year = this.vals[0].year;
        this.val_months = this.vals[0].months;
        this.val_month = this.vals[0].months[0].month;
        this.watt_per_month = this.vals[0].months[0].watt_per_month / 1000;
        this.val_watt_per_month = this.watt_per_month.toFixed(3);
        this.val_days = this.val_months[0].days;

        this.wattTotalEvent.emit(this.val_watt_per_month);

        this.barChartData = {
          labels: this.val_days.map((row: { day: any }) => row.day),
          datasets: [
            {
              label: 'Watt per day',
              barPercentage: 0.5,
              barThickness: 8,
              maxBarThickness: 10,
              minBarLength: 2,
              data: this.val_days.map((row: { val: any }) => row.val),
            },
          ],
        };
      });
  }
}
