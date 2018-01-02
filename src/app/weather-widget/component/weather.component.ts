import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../service/weather.service';
import { Weather } from './../model/weather';

@Component({
    selector: 'weather-widget', 
    templateUrl: './weather.component.html', 
    styleUrls: ['./weather.component.css'], 
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit{
    pos : Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "mph";
    currentTempUnit = "fahrenheit";
    currentLocation = "";

    // TypeScript's constructor syntax for declaring parameters and properties simultaneously.
    constructor(private service : WeatherService) { }

    ngOnInit(){
        this.getCurrentLocation();
    }

    getCurrentLocation(){
        this
            .service
            .getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getCurrentLocationName();
            }, 
            err => console.error(err));
    }

    getCurrentWeather(){
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"],
                this.weatherData.summary = weather["currently"]["summary"],
                this.weatherData.wind = weather["currently"]["windSpeed"],
                this.weatherData.humidity = weather["currently"]["humidity"],
                this.weatherData.icon = weather["currently"]["icon"]
                console.log("Weather: ", this.weatherData); //TODO: Remove - just for testing data
            }, err => console.error(err));
       
    }

    getCurrentLocationName(){
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location =>{
                //console.log(location);  //TODO - Remove later
                this.currentLocation = location["results"][3]["formatted_address"];
            });
    }
    
}