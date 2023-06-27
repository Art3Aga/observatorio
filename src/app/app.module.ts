import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './pages/home/home.component';
import { FiltroComponent } from './pages/filtro/filtro.component';



//Angular Material Componentes
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';






import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { TablaDatosComponent } from './components/tabla-datos/tabla-datos.component';
import { GraficaComponent } from './components/grafica/grafica.component';

//Modulo de Grafica
import { ChartsModule } from 'ng2-charts';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FiltroComponent,
    TablaDatosComponent,
    GraficaComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    ChartsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatBadgeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    DataService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
