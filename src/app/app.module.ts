import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AddPlacePage} from "../pages/add-place/add-place";
import {SetLocationPage} from "../pages/set-location/set-location";
import {PlacePage} from "../pages/place/place";
import {AgmCoreModule} from "angular2-google-maps/core";
import {PlacesService} from "../services/places";
import {Storage} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    SetLocationPage,
    PlacePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBo69qEjj0GTVwFVz3p9VJRmtEqKWSgcQ'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    SetLocationPage,
    PlacePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PlacesService, Storage]
})
export class AppModule {}
