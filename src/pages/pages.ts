import { MapPage } from './map/map';
import { ContactPage } from './contact/contact';
import { AboutPage } from './about/about';
import { WelcomePage } from './welcome/welcome';
import { TabsPage } from './tabs/tabs';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = WelcomePage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = MapPage;
export const Tab2Root = AboutPage;
export const Tab3Root = ContactPage;
