import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { LocationsService } from 'src/app/services/locations.service';
import { Location } from 'src/app/models/Location';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  location: Location;
  submitted: boolean;
  locationDialog: boolean;
  locations: Location[];
  selectedLocations: Location[];

  constructor(private locationService: LocationsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.loadLocations()
  }

  openNew() {
    this.location = {} as Location;
    this.submitted = false;
    this.locationDialog = true;
  }

  hideDialog() {
    this.locationDialog = false;
    this.submitted = false;
    this.spinner.hide();
  }

  loadLocations() {
    this.locationService.getJSON().subscribe((locationsJson: any) => {
      this.locations = locationsJson;
    }, (err: any) => { console.log(err); },
      () => { this.spinner.hide(); });
  }

  editLocation(location: Location) {
    this.location = { ...location };
    this.locationDialog = true;
  }

  saveLocation(location: Location) {
    this.spinner.show()
    setTimeout(() => {
      this.locations = this.locationService.saveLocation(location);
      this.hideDialog();
    }, 3000);
  }





}
