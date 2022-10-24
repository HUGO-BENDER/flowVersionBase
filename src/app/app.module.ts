import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// --Firebase & Firebase UI
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';

// --App
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FlowButtonComponent } from './components/flow-button/flow-button.component';
import { FlowTileComponent } from './components/flow-tile/flow-tile.component';

@NgModule({
  declarations: [AppComponent, FlowButtonComponent, FlowTileComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
