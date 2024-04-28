import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { GraphComponent } from './graph/graph.component';
import { GraphdataService } from './graphdata.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GraphComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SolarGraph';
  year: number = 1991;
  kw_total = 0;
  graphs2 = [];
  private subscription?: Subscription;

  constructor(private graphDataService: GraphdataService) {}

  ngOnInit(): void {
    this.fetchGraphs();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  eventWattTotal(event: string) {
    console.log('event: ', event);
    this.kw_total += Number(event);
  }

  getFullYear(): number {
    /*const d = new Date();
    this.year = d.getFullYear();*/
    return this.year;
  }

  fetchGraphs(): void {
    this.subscription = this.graphDataService
      .getGraphs()
      .subscribe((data: any) => {
        this.graphs2 = Array.from(data);
        this.year = this.graphs2[0]['year'];
      });
  }
}
