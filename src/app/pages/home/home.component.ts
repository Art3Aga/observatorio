import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataSensor } from 'src/app/models/datasensor.model';
import { DataService } from 'src/app/services/data.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  dataSensores: DataSensor[] = [];
  dataAlarm: any[] = [];
  alarmIncendio: any;
  alarmTemperatura: any;
  alarmLluvia: any;


  initialDate!: Date | null;
  endDate!: Date | null;


  initialTime!: string;
  endTime!: string;


  initialData: any[] = [];
  endData: any[] = [];


  dataResult: DataSensor[] = [];
  alarmaTempOpen: boolean = false;
  alarmaFireOpen: boolean = false;
  alarmaRainOpen: boolean = false;

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.dataSensores = data;
      this.dataSensores.forEach(item => item.fecha = `${new Date(item.fecha.seconds * 1000).toLocaleDateString()} ${new Date(item.fecha.seconds * 1000).toLocaleTimeString()}`);
      this.validateAlarm();
    });
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.addData();
    // }, 2500);
  }


  validateAlarm() {

    this.dataService.getLastDocCreated();

    this.dataService.getDataAlarm().subscribe(data => {
      this.dataAlarm = data;
      this.alarmIncendio = data[0];
      this.alarmLluvia = data[1];
      this.alarmTemperatura = data[2];

      if (Number(this.alarmTemperatura.valor) >= 40) {
        this.openAlarmTemp(this.alarmTemperatura, 'ALERTA DE TEMPERATURA ALTA', this.alarmTemperatura.id);
      }
      if (Number(this.alarmLluvia.valor) <= 600) {
        this.openAlarmRain(this.alarmLluvia, 'ALERTA DE LLUVIA', this.alarmLluvia.id);
      }
      if (Number(this.alarmIncendio.valor) >= 300) {
        this.openAlarmFire(this.alarmIncendio, 'ALERTA DE INCENDIO ¡CO ALTO!', this.alarmIncendio.id);
      }

    });
  }

  addData() {
    this.dataService.addData();
  }

  openAlarmTemp(alarmType: any, title: string, animationType: string) {
    if (!this.alarmaTempOpen) {
      this.alarmaTempOpen = true;
      const dialog = this.dialog.open(AlertComponent, {
        data: {
          valor: alarmType.valor,
          title: title,
          animationType: animationType
        },
      });
      dialog.afterClosed().subscribe(() => {
        this.alarmaTempOpen = false;
      })
    }
  }

  openAlarmRain(alarmType: any, title: string, animationType: string) {
    if (!this.alarmaRainOpen) {
      this.alarmaRainOpen = true;
      const dialog = this.dialog.open(AlertComponent, {
        data: {
          valor: alarmType.valor,
          title: title,
          animationType: animationType
        },
      });
      dialog.afterClosed().subscribe(() => {
        this.alarmaRainOpen = false;
      })
    }
  }

  openAlarmFire(alarmType: any, title: string, animationType: string) {
    if (!this.alarmaFireOpen) {
      this.alarmaFireOpen = true;
      const dialog = this.dialog.open(AlertComponent, {
        data: {
          valor: alarmType.valor,
          title: title,
          animationType: animationType
        },
      });
      dialog.afterClosed().subscribe(() => {
        this.alarmaFireOpen = false;
      })
    }
  }


  filterByDate() {
    if (this.initialTime && this.endTime) {
      if (this.initialDate && this.endDate) {

        //fecha inicial
        const initialHour: number = Number(this.initialTime.split(':')[0]);
        const initialMinutes: number = Number(this.initialTime.split(':')[1]);


        const initialFechaInicio = `${this.initialDate.getFullYear()}-${this.initialDate.getMonth() + 1}-${this.initialDate.getDate()} ${initialHour}:${initialMinutes}:00`;
        const initialFechaFin = `${this.initialDate.getFullYear()}-${this.initialDate.getMonth() + 1}-${this.initialDate.getDate()} ${initialHour + 1}:${initialMinutes}:59`;

        const start = new Date(initialFechaInicio);
        const end = new Date(initialFechaFin);


        // fecha final
        const endHour: number = Number(this.endTime.split(':')[0]);
        const endMinutes: number = Number(this.endTime.split(':')[1]);


        const endFechaInicio = `${this.endDate.getFullYear()}-${this.endDate.getMonth() + 1}-${this.endDate.getDate()} ${endHour}:${endMinutes}:00`;
        const endFechaFin = `${this.endDate.getFullYear()}-${this.endDate.getMonth() + 1}-${this.endDate.getDate()} ${endHour + 1}:${endMinutes}:59`;

        const dateStart = new Date(endFechaInicio);
        const dateEnd = new Date(endFechaFin);


        this.dataService.filterByDate(start, end).subscribe((data) => {
          data.forEach(item => item.fecha = `${new Date(item.fecha.seconds * 1000).toLocaleDateString()} ${new Date(item.fecha.seconds * 1000).toLocaleTimeString()}`);
          this.initialData = data.reverse();

          this.dataService.filterByDate(dateStart, dateEnd).subscribe((data) => {
            data.forEach(item => item.fecha = `${new Date(item.fecha.seconds * 1000).toLocaleDateString()} ${new Date(item.fecha.seconds * 1000).toLocaleTimeString()}`);
            this.endData = data.reverse();
            this.dataResult = this.initialData.concat(this.endData);
          });
        });

      }
    }

    if (this.initialDate && this.endDate) {


      // fecha inicial
      const initialFechaInicio = `${this.initialDate.getFullYear()}-${this.initialDate.getMonth() + 1}-${this.initialDate.getDate()} 00:00:00`;
      const initialFechaFin = `${this.initialDate.getFullYear()}-${this.initialDate.getMonth() + 1}-${this.initialDate.getDate()} 23:59:59`;

      const start = new Date(initialFechaInicio);
      const end = new Date(initialFechaFin);


      //fecha final
      const endFechaInicio = `${this.endDate.getFullYear()}-${this.endDate.getMonth() + 1}-${this.endDate.getDate()} 00:00:00`;
      const endFechaFin = `${this.endDate.getFullYear()}-${this.endDate.getMonth() + 1}-${this.endDate.getDate()} 23:59:59`;

      const dateStart = new Date(endFechaInicio);
      const dateEnd = new Date(endFechaFin);


      this.dataService.filterByDate(start, end).subscribe((data) => {
        data.forEach(item => item.fecha = `${new Date(item.fecha.seconds * 1000).toLocaleDateString()} ${new Date(item.fecha.seconds * 1000).toLocaleTimeString()}`);
        this.initialData = data.reverse();
        this.dataService.filterByDate(dateStart, dateEnd).subscribe((data) => {
          data.forEach(item => item.fecha = `${new Date(item.fecha.seconds * 1000).toLocaleDateString()} ${new Date(item.fecha.seconds * 1000).toLocaleTimeString()}`);
          this.endData = data.reverse();
          this.dataResult = this.initialData.concat(this.endData);
        });
      });
    }


    if (!this.initialDate && !this.endDate && !this.initialTime && !this.endTime) {
      alert('Faltan Datos');
    }

  }


  clearFilter() {
    this.initialDate = null;
    this.endDate = null;
  }
}
