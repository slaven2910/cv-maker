import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CV } from '../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) {}

  getCV(cvId: string): Observable<CV> {
    return this.http.get<CV>(`${this.baseUrl}/cv/${cvId}`);
  }


  createCV(cvData: CV): Observable<CV> {
    return this.http.post<CV>(`${this.baseUrl}/cv/create`, cvData);
  }

  updateCV(cvId: string, cvData: CV): Observable<CV> {
    return this.http.put<CV>(`${this.baseUrl}/cv/update/${cvId}`, cvData);
  }
}
