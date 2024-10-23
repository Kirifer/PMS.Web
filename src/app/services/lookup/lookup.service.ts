import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ICompetency } from '../../models/entities/competency';
import { IEmployee } from '../../models/entities/employee';
import { ISupervisor } from '../../models/entities/supervisor';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient) { }

  getCompetency(): Observable<{ data: ICompetency[] }> {
    return this.http.get<{ data: ICompetency[] }>(environment.apiUrl + '/lookup/competencies');
  }

  getEmployee(): Observable<{ data: IEmployee[] }>  {
    return this.http.get<{ data: IEmployee[] }>(environment.apiUrl)
  }

  getSupervisor(): Observable<{ data: ISupervisor[] }>  {
    return this.http.get<{ data: ISupervisor[] }>(environment.apiUrl)
  }
}






