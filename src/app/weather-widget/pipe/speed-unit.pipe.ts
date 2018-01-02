import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform{
    transform(speed: number, unitType: string){
        switch(unitType){
            case "kph":
            const miles = speed * 0.6214;
            return miles + "kph";

            default: 
            return speed + "mph";
        }
    }
}


