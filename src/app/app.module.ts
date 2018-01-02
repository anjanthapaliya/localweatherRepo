import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonpModule, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather-widget/component/weather.component';
import { TempUnitPipe } from './weather-widget/pipe/temp-unit.pipe';
import { SpeedUnitPipe } from './weather-widget/pipe/speed-unit.pipe';
 

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SpeedUnitPipe,
    TempUnitPipe
  ],
  imports: [
    BrowserModule,
    JsonpModule, 
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
