import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicle/vehicle.service';
import { Veiculo } from '../models/veiculo.model';
import { VehicleData } from '../models/vehicleData.model';
import { Menu } from '../components/menu/menu';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule, Menu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });

  constructor(private vehiclesService: VehicleService) {}

  ngOnInit(): void {
    this.vehiclesService.getVehicles().subscribe((res) => {
      console.log(res.vehicles);
      this.vehicles = res.vehicles;
    });
    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      this.selectedVehicle = this.vehicles[Number(id) - 1];
    });
  }
}
