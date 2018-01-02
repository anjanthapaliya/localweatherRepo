import {Injectable} from '@angular/core';
import {FORECAST_KEY, FORECAST_ROOT, GOOGLE_KEY, GOOGLE_ROOT} from '../constants/constants';
import {Jsonp, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Always add Injectable() to services you create - for best practices/future
// proofing Even if there may not yet be any dependencies that Angular may need
// to inject into this service But as this class evolves over time, it may
// have dependencies that it will want Angular to inject into it. Injectable is
// not required, if the service doesn't have constructor parameters. It's
// considered to add it to all services anyway, because it's a common mistake
// that later parameters are added but the @Injectable() decorator is forgotten
// because it was working before.

@Injectable()
export class WeatherService {
    constructor(private jsonp : Jsonp, private http : Http) {}
    
    getCurrentLocation() : Observable < any > {
        if(navigator.geolocation) {
            ////Dummy one, which will result in a working next statement.
            navigator.geolocation.getCurrentPosition(function (pos) { console.log(pos.coords.latitude); }, function () {}, {});
            return Observable.create(observer => {
                navigator
                    .geolocation
                    .getCurrentPosition(pos => {
                        observer.next(pos);
                    }),
                err => {
                    return Observable.throw(err);
                }
            });
        } else {
            return Observable.throw("Geolocation is not available");
        }
    }

    getCurrentWeather(lat : number, long : number) : Observable < any > {
        const url = FORECAST_ROOT + FORECAST_KEY + "/" + lat + "," + long;
        const queryParams = "?callback=JSONP_CALLBACK";

        return this
            .jsonp
            .get(url + queryParams)
            .map(data => data.json())
            .catch(err => {
                console.error("Unable to get weather - " + err);
                return Observable.throw(err.json());
            });
    }

    getLocationName(lat : number, long : number) : Observable < any > {
        const url = GOOGLE_ROOT;
        const queryParams = "?latlng=" + lat + "," + long + "&key=" + GOOGLE_KEY;
        return this
            .http
            .get(url + queryParams)
            .map(loc => loc.json())
            .catch(err => {
                console.error("Unable to get Location name - " + err);
                return Observable.throw(err);
            });
    }
}