import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ICompetency } from '../../models/competency';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient) { }

  getData(): Observable<{ data: ICompetency[] }> {
    return this.http.get<{ data: ICompetency[] }>(environment.apiUrl + '/lookup/competencies');
  }
}






