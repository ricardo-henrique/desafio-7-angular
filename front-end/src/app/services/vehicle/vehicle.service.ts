import { CarVin } from './../../utils/car-vin.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VeiculosAPI } from '../../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI>(`${this.baseUrl}/vehicles`);
  }
  searchVin(vinCode: string): Observable<CarVin> {
    const reqVin = this.http.post<CarVin>(`${this.baseUrl}/vehicleData`, {
      vin: vinCode,
    });
    return reqVin;
  }
}
