import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VehicleService } from '../services/vehicle/vehicle.service';
import { Veiculo } from '../models/veiculo.model';
import { VehicleData } from '../models/vehicleData.model';
import { Menu } from '../components/menu/menu';
import { CarVin } from '../utils/car-vin.interface';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule, Menu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData;

  carVin!: CarVin;
  reqVin!: Subscription;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });

  vinForm = new FormGroup({
    vin: new FormControl(''),
  });

  onChange() {
    this.vinForm.controls.vin.valueChanges.subscribe((value) => {
      this.reqVin = this.vehiclesService
        .searchVin(value as string)
        .subscribe((res) => {
          this.carVin = res;
        });
    });
  }

  constructor(private vehiclesService: VehicleService) {}

  ngOnInit(): void {
    this.vehiclesService.getVehicles().subscribe((res) => {
      console.log(res.vehicles);
      this.vehicles = res.vehicles;
    });
    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      this.selectedVehicle = this.vehicles[Number(id) - 1];
    });
    this.onChange();
  }

  ngOnDestroy(): void {
    this.reqVin.unsubscribe();
  }
}
