import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StateListResponse } from './State/state.model';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  viewState = 'http://api.eduquay.com/api/v1/State/Retrieve';
  private AdminSubject = new Subject<StateListResponse>();
    AdminSubject$ = this.AdminSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
  ) { }

populateStates(): Observable<any>{
  return this.httpClient.get<StateListResponse>(this.viewState);
}

}
