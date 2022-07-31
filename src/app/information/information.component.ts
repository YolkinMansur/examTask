import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

export interface starshipsInterFace {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  created: string;
}

export interface Responce1 {
  results: starshipsInterFace[];
}
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  starship: starshipsInterFace[] = [];
  http: any;

  constructor(private swapApi: HttpService) {}

  ngOnInit(): void {
    this.swapApi.getAllStarship().subscribe((res) => {
      this.starship = res.results;
      res.results;
    });
  }
}
