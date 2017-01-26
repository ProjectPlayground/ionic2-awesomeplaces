import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AddPlacePage} from "../pages/add-place/add-place";
import {SetLocationPage} from "../pages/set-location/set-location";
import {PlacePage} from "../pages/place/place";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    SetLocationPage,
    PlacePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    SetLocationPage,
    PlacePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
