import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
export interface DialogData {
  starwar: 'panda' | 'unicorn' | 'lion';
}
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
  starship: starshipsInterFace[] = [
    {
      name: 'CR90 corvette',
      model: 'CR90 corvette',
      manufacturer: 'Corellian Engineering Corporation',
      cost_in_credits: '3500000',
      length: '150',
      max_atmosphering_speed: '950',
      crew: '30-165',
      passengers: '600',
      cargo_capacity: '3000000',
      consumables: '1 year',
      hyperdrive_rating: '2.0',
      MGLT: '60',
      starship_class: 'corvette',
      created: '2014-12-10T14:20:33.369000Z',
    },
    {
      name: 'Star Destroyer',
      model: 'Imperial I-class Star Destroyer',
      manufacturer: 'Kuat Drive Yards',
      cost_in_credits: '150000000',
      length: '1,600',
      max_atmosphering_speed: '975',
      crew: '47,060',
      passengers: 'n/a',
      cargo_capacity: '36000000',
      consumables: '2 years',
      hyperdrive_rating: '2.0',
      MGLT: '60',
      starship_class: 'Star Destroyer',
      created: '2014-12-10T15:08:19.848000Z',
    },
    {
      name: 'Sentinel-class landing craft',
      model: 'Sentinel-class landing craft',
      manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
      cost_in_credits: '240000',
      length: '38',
      max_atmosphering_speed: '1000',
      crew: '5',
      passengers: '75',
      cargo_capacity: '180000',
      consumables: '1 month',
      hyperdrive_rating: '1.0',
      MGLT: '70',
      starship_class: 'landing craft',
      created: '2014-12-10T15:48:00.586000Z',
    },
    {
      name: 'Death Star',
      model: 'DS-1 Orbital Battle Station',
      manufacturer:
        'Imperial Department of Military Research, Sienar Fleet Systems',
      cost_in_credits: '1000000000000',
      length: '120000',
      max_atmosphering_speed: 'n/a',
      crew: '342,953',
      passengers: '843,342',
      cargo_capacity: '1000000000000',
      consumables: '3 years',
      hyperdrive_rating: '4.0',
      MGLT: '10',
      starship_class: 'Deep Space Mobile Battlestation',
      created: '2014-12-10T16:36:50.509000Z',
    },
    {
      name: 'Millennium Falcon',
      model: 'YT-1300 light freighter',
      manufacturer: 'Corellian Engineering Corporation',
      cost_in_credits: '100000',
      length: '34.37',
      max_atmosphering_speed: '1050',
      crew: '4',
      passengers: '6',
      cargo_capacity: '100000',
      consumables: '2 months',
      hyperdrive_rating: '0.5',
      MGLT: '75',
      starship_class: 'Light freighter',
      created: '2014-12-10T16:59:45.094000Z',
    },
    {
      name: 'Y-wing',
      model: 'BTL Y-wing',
      manufacturer: 'Koensayr Manufacturing',
      cost_in_credits: '134999',
      length: '14',
      max_atmosphering_speed: '1000km',
      crew: '2',
      passengers: '0',
      cargo_capacity: '110',
      consumables: '1 week',
      hyperdrive_rating: '1.0',
      MGLT: '80',
      starship_class: 'assault starfighter',
      created: '2014-12-12T11:00:39.817000Z',
    },
    {
      name: 'X-wing',
      model: 'T-65 X-wing',
      manufacturer: 'Incom Corporation',
      cost_in_credits: '149999',
      length: '12.5',
      max_atmosphering_speed: '1050',
      crew: '1',
      passengers: '0',
      cargo_capacity: '110',
      consumables: '1 week',
      hyperdrive_rating: '1.0',
      MGLT: '100',
      starship_class: 'Starfighter',
      created: '2014-12-12T11:19:05.340000Z',
    },
    {
      name: 'TIE Advanced x1',
      model: 'Twin Ion Engine Advanced x1',
      manufacturer: 'Sienar Fleet Systems',
      cost_in_credits: 'unknown',
      length: '9.2',
      max_atmosphering_speed: '1200',
      crew: '1',
      passengers: '0',
      cargo_capacity: '150',
      consumables: '5 days',
      hyperdrive_rating: '1.0',
      MGLT: '105',
      starship_class: 'Starfighter',
      created: '2014-12-12T11:21:32.991000Z',
    },
    {
      name: 'Executor',
      model: 'Executor-class star dreadnought',
      manufacturer: 'Kuat Drive Yards, Fondor Shipyards',
      cost_in_credits: '1143350000',
      length: '19000',
      max_atmosphering_speed: 'n/a',
      crew: '279,144',
      passengers: '38000',
      cargo_capacity: '250000000',
      consumables: '6 years',
      hyperdrive_rating: '2.0',
      MGLT: '40',
      starship_class: 'Star dreadnought',
      created: '2014-12-15T12:31:42.547000Z',
    },
    {
      name: 'Rebel transport',
      model: 'GR-75 medium transport',
      manufacturer: 'Gallofree Yards, Inc.',
      cost_in_credits: 'unknown',
      length: '90',
      max_atmosphering_speed: '650',
      crew: '6',
      passengers: '90',
      cargo_capacity: '19000000',
      consumables: '6 months',
      hyperdrive_rating: '4.0',
      MGLT: '20',
      starship_class: 'Medium transport',
      created: '2014-12-15T12:34:52.264000Z',
    },
  ];
  dialog: any;
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda',
      },
    });
  }
  constructor(private swapApi: HttpService) {
    this.swapApi.getAllStarship().subscribe((res) => {
      this.starship = res.results;
      res.results;
    });
  }

  ngOnInit(): void {}
}
function DialogDataExampleDialog(
  _DialogDataExampleDialog: any,
  _arg1: { data: { animal: string } }
) {
  throw new Error('Function not implemented.');
}
