import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Location } from 'src/app/models/Location';


@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  _jsonURL = 'assets/locations.json';
  locations: Location[] = []

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    return this.http.get<any>(this._jsonURL).pipe(
      map((json: any) => {

        this.locations = json.map((res: any) => {
          return {
            position: {
              lat: res.coordinates[0],
              lng: res.coordinates[1],
            },
            label: {
              color: 'red',
              text: `${res.name}`
            },
            title: `${res.name}`,
            info: `${res.name}`,
            options: {
              animation: google.maps.Animation.BOUNCE,
            },
            description: `${res.description == null ? "" : res.description}`,
            id: `${res.id}`
          }
        });
        return this.locations;
      })
    );
  }

  public createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  public saveLocation(location: Location) {

    if (location.title.trim()) {
      if (location.id) {
        this.locations[this.findIndexById(location.id)] = location;
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        location.id = this.createId();
        this.locations.push(location);
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Location Created', life: 3000 });
      }
    }
    return this.locations;
  }

  private findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

}
