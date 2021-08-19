import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { ScrapeReturn } from "../models/scraper.model";

@Injectable({
  providedIn: 'root'
})
export class ScraperService {
  baseUrl: string = `${environment.apiBaseUrl}/api/scrape`;

  constructor(private http: HttpClient) { }

  scrapePrices(): Observable<ScrapeReturn[]> {
    return this.http.get<ScrapeReturn[]>(`${this.baseUrl}/prices`);
  }
}
