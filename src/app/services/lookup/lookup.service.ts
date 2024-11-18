import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ICompetency } from '../../models/entities/competency';
import { IEmployee } from '../../models/entities/employee';
import { ISupervisor } from '../../models/entities/supervisor';
import { ResponseModel } from '../../models/entities/response';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient) { }

  getCompetency(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(environment.API_URL + '/lookup/competencies');
  }

  // getEmployee(): Observable<{ data: ResponseModel[] }>  {
  //   return this.http.get<{ data: ResponseModel[] }>(environment.API_URL)
  // }

  // getSupervisor(): Observable<{ data: ResponseModel[] }>  {
  //   return this.http.get<{ data: ResponseModel[] }>(environment.API_URL)
  // }
}






