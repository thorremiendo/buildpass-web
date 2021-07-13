import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { environment } from '../../../environments/environment';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/satellite-streets-v11';
  lat = 16.416665;
  lng = 120.5999976;
  zoom = 15;
  public currentMarkers = [];

  constructor(private httpClient: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  fetchProjectLocation(search) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?country=PH&bbox=120.46686,16.3466,120.710839,16.545825&access_token=pk.eyJ1IjoidGhvcnJlbWllbmRvIiwiYSI6ImNraGs1MnF4MDFsZG4yeW53M3U3ZjJ4ZTMifQ.a5GU9EWk45shfNxhK07G-w`;
    return this.httpClient.get(url).pipe(
      map((data: any) => {
        this.lat = data.features[0].center[1];
        this.lng = data.features[0].center[0];
        this.flyTo(data.features[0].center[0], data.features[0].center[1]);
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  flyTo(x, y) {
    this.map.flyTo({
      center: [x, y],
      essential: true,
    });
    this.marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([x, y])
      .addTo(this.map);
    this.currentMarkers.push(this.marker);
    this.marker.on('dragend', () => {});
  }

  removeMarker() {
    if (this.currentMarkers !== null) {
      for (var i = this.currentMarkers.length - 1; i >= 0; i--) {
        this.currentMarkers[i].remove();
      }
    }
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });

    // this.map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl,
    //     marker: false,
    //   })
    // );

    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
