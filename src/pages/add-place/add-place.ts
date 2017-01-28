import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ModalController, LoadingController, ToastController} from "ionic-angular";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location"
import {Geolocation, Camera, File, Entry, FileError} from "ionic-native";
import {PlacesService} from "../../services/places";

declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {

  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };

  locationIsSet = false;

  imageUrl = '';

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService) {}

  onSubmit(form: NgForm){
    this.placesService.addPlace(
      form.value.title,
      form.value.description,
      this.location,
      this.imageUrl);
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }

  onLocate(){
    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    });
    loader.present();
    Geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could not get location. Please pick it manually',
            duration: 2500
          });
         toast.present();
        }
      );
  }

  onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage, {
      location: this.location,
      isSet: this.locationIsSet
    });
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    )
  }

  onTakePhoto(){
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          //cordova.file.dataDirectory: path to storage directory in the device
          File.moveFile(path, currentName, cordova.file.dataDirectory, currentName)
            .then(
              (data: Entry) => {
                this.imageUrl = data.nativeURL;
                Camera.cleanup();
              }
            )
            .catch(
              (error: FileError) => {
                this.imageUrl = '';
                const toast = this.toastCtrl.create({
                  message: 'Could not save the image',
                  duration: 2500
                });
                toast.present();
                //clean temporary storage
                Camera.cleanup();
              }
            );
          this.imageUrl = imageData;
        }
      )
      .catch(
        error =>{
          const toast = this.toastCtrl.create({
            message: 'Could not take the picture',
            duration: 2500
          });
          toast.present();
        }
      )
  }

}
