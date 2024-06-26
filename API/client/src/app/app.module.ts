import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderDetailedComponent,
    AdminPanelComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule,
    AdminPanelModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

