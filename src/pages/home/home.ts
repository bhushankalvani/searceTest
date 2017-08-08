import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { io } from 'socket.io-client';
declare var io: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  coords: any = {
    lat: String,
    lon : String,
  };

  socket:any = io('http://192.168.43.7:3000/');

  constructor(public navCtrl: NavController, private geoloc: Geolocation) {
  }

  ionViewDidEnter(){
    console.log('SOCKET: ');
    console.log(this.socket);
    console.log('ION CONSTRUCTOR');
    this.socket.on('connect',()=>{
      console.log('SOCKET CONNECT');
      this.getLoc();
    });
  }

  getLoc(){
    this.geoloc.getCurrentPosition().then((resp)=>{
      this.coords.lat = resp.coords.latitude;
      this.coords.lon = resp.coords.longitude;
      this.socket.emit('loc',this.coords);
    });

    let watch = this.geoloc.watchPosition();
    watch.subscribe((data)=>{
      if(data.coords.latitude && data.coords.longitude){
        this.coords.lat = data.coords.latitude;
        this.coords.lon = data.coords.longitude;
        this.socket.emit('locChange', this.coords);
      }
    });
  }


}
