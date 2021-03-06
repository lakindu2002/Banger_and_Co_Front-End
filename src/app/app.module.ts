import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared/shared.module';
import { GuestModule } from './components/guest/guest.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor.service';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    SharedModule,
    GuestModule,
    HttpClientModule,
    ToastrModule.forRoot({
      autoDismiss: false,
      closeButton: true,
      easeTime: 750,
      newestOnTop: true,
      positionClass: "toast-top-right",
      progressBar: true,
      tapToDismiss: true,
      timeOut: 10000,
      progressAnimation: "increasing"
    }), // ToastrModule added
  ],
  providers: [
    //attach the interceptor via a dependency injection
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true //allow multiple interceptors
    }
  ],
  bootstrap: [AppComponent] //entry component for application inserted to index.html
  //entry component not necessary due to Angular V9 or higher using Ivy Compiler (Rendering Engine)
})
export class AppModule { }
