import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class APIService {
  constructor(private http: HttpClient) {}

  hello() {
    return this.http.get<any[]>(`/api/hello`);
  }
}
