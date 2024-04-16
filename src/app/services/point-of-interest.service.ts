import { Injectable } from '@angular/core';
import { PointOfInterest } from '../models/point-of-interest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PointOfInterestService {

  token: string | null = null;
  newURL: string = '';

  constructor(private http:HttpClient, private authService:AuthService) { }

  url: string = "http://127.0.0.1:3000";

  createPoI(newPoI : PointOfInterest |undefined) {
    return this.http.post<PointOfInterest>(this.url+'/poi',newPoI);
  }

  getPoI(findPoI : string){
    return this.http.get<PointOfInterest>(this.url+'/poi/'+findPoI);
  }

  getPoIs(page: number = 1, pageSize: number = 20) {
    this.newURL = `${this.url}/poi?page=${page}&pageSize=${pageSize}`;

    return this.http.get<PointOfInterest[]>(this.newURL);
  }

  updatePoI(editPoI : PointOfInterest) {
    return this.http.put<PointOfInterest>(this.url+'/poi/'+ editPoI._id, editPoI);
  }
  
  deletePoI(deletePoIId : string) {
    return this.http.delete(this.url+'/poi/'+ deletePoIId);
  }
}
