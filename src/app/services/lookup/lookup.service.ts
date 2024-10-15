import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ICompetency } from '../../models/competency';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private apiUrl = environment.lookupUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<{ data: ICompetency[] }> {
    return this.http.get<{ data: ICompetency[] }>(this.apiUrl);
  }
}






