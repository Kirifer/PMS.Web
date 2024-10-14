import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ICompetency } from '../../models/competency';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private apiUrl = 'http://localhost:5105/lookup/competencies';

  constructor(private http: HttpClient) { }

  getData(): Observable<{ data: ICompetency[] }> {
    return this.http.get<{ data: ICompetency[] }>(this.apiUrl);
  }
}




  // ngOnInit(): void {
  //   this.lookupService.getData().subscribe(
  //     (response) => { this.competencies = response.data; },
  //     (error) => { console.error('Error fetching competencies:', error); }
  //   );
  // }

