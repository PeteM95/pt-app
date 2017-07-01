import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { GymSetup } from '../pages/setup/gym/gym';
import { AutocompletePage } from '../pages/setup/gym/autocomplete';
import { DaysSetup } from '../pages/setup/days/days';
import { OrganizationSetup } from '../pages/setup/organization/organization';
import { DonationSetup } from '../pages/setup/donation/donation';

import { User } from '../services/user';

import { Geolocation } from '@ionic-native/geolocation';
import { Geocoder, GoogleMaps } from '@ionic-native/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    MapPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    GymSetup,
    AutocompletePage,
    DaysSetup,
    OrganizationSetup,
    DonationSetup
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4E1g6MYlG73NQsdoJb4QW1Qzt3Cae2hI',
      libraries: ['places']
    }),
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    MapPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    GymSetup,
    AutocompletePage,
    DaysSetup,
    OrganizationSetup,
    DonationSetup
  ],
  providers: [
    Geocoder,
    Geolocation,
    GoogleMaps,
    StatusBar,
    SplashScreen,
    User,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
