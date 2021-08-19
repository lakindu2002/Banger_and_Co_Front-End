import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { ScrapeReturn } from 'src/app/models/scraper.model';
import { ScraperService } from 'src/app/services/scraper.service';

@Component({
  selector: 'app-scraped-prices',
  templateUrl: './scraped-prices.component.html',
  styleUrls: ['./scraped-prices.component.css']
})
export class ScrapedPricesComponent implements OnInit {

  scrapedData: ScrapeReturn[] = [];
  showAllTypes: boolean = true;
  detailedScrape: ScrapeReturn;

  constructor(
    private scraper: ScraperService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.scrapeDataOfWeb();
  }

  scrapeDataOfWeb() {
    this.showAllTypes = true;
    this.spinner.show('scraper');
    //scrape data from malkey self drive rates
    this.scraper.scrapePrices().subscribe((data) => {
      this.scrapedData = data;
      this.spinner.hide('scraper');
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed to Scrape Prices");
      this.spinner.hide('scraper');
    })
  }

  loadVehicleForType(eachScrape: ScrapeReturn) {
    this.detailedScrape = eachScrape;
    this.showAllTypes = false;
  }

  backClicked() {
    this.showAllTypes = true;
    this.detailedScrape = undefined;
  }

}
