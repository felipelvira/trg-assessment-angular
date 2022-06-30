import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NgxSpinnerService } from 'ngx-spinner';

import { LocationsService } from 'src/app/services/locations.service';
import { Location } from 'src/app/models/Location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow


  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 15,
    minZoom: 2,
  }
  markers: Location[] = [];
  selectedLocation: Location;
  infoContent = '';
  openLeftPanel: boolean = false;

  constructor(private locationService: LocationsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.loadMarkers();
    });
  }

  openInfo(marker: MapMarker, content: any, location: Location) {
    this.infoContent = content;
    this.info.open(marker);
    this.openLeftPanel = true;
    this.selectedLocation = location;
    this.info.closeclick.subscribe((infoClosed: any) => {
      this.openLeftPanel = false;
      this.selectedLocation = {} as Location;
    },
      (err: any) => { console.log(err); });
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--
  }

  loadMarkers() {

    this.locationService.getJSON().subscribe((locationsJson: any) => {
      this.markers = locationsJson;

    }, (err: any) => { console.log(err); },
      () => { this.spinner.hide(); });
  }

}
