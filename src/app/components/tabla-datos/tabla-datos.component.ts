import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrls: ['./tabla-datos.component.scss']
})
export class TablaDatosComponent implements AfterViewInit, OnChanges {

  @Input() showFilter = false;
  @Input() dataSensores!: any[];

  filter: string = '';

  displayedColumns: string[] = ['humedad', 'temperatura', 'presion', 'luz', 'lluvia', 'viento', 'co', 'fecha'];
  dataSource!: MatTableDataSource<any>;

  startDate!: Date | null;
  endDate!: Date | null;


  oneDate!: Date | null;


  time!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService) { }

  ngAfterViewInit() {
    this.setDataSource();
  }

  setDataSource() {
    if (this.dataSensores) {
      // this.dataSensores.map(item => {
      //   item.temperatura = `${item.temperatura} °C`
      // })
      this.dataSource = new MatTableDataSource(this.dataSensores);
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.setDataSource();
    }
  }

  filterByDate(event?: any) {
    if (this.time) {
      if (this.oneDate) {
        const hour: number = Number(this.time.split(':')[0]);
        const minutes: number = Number(this.time.split(':')[1]);
        const fechaInicio = `${this.oneDate.getFullYear()}-${this.oneDate.getMonth() + 1}-${this.oneDate.getDate()} ${hour}:${minutes}:00`;
        const fechaFin = `${this.oneDate.getFullYear()}-${this.oneDate.getMonth() + 1}-${this.oneDate.getDate()} ${hour + 1}:${minutes}:59`;

        const start = new Date(fechaInicio);
        const end = new Date(fechaFin);

        this.dataService.filterByDate(start, end).subscribe((data) => {
          data.forEach(item => item.fecha = `${new Date(item.fecha.seconds * 1000).toLocaleDateString()} ${new Date(item.fecha.seconds * 1000).toLocaleTimeString()}`);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
      }
    }

    if (this.oneDate) {
      const fechaInicio = `${this.oneDate.getFullYear()}-${this.oneDate.getMonth() + 1}-${this.oneDate.getDate()} 00:00:00`;
      const fechaFin = `${this.oneDate.getFullYear()}-${this.oneDate.getMonth() + 1}-${this.oneDate.getDate()} 23:59:59`;

      const start = new Date(fechaInicio);
      const end = new Date(fechaFin);

      this.dataService.filterByDate(start, end).subscribe((data) => {
        data.forEach(item => item.fecha = `${new Date(item.fecha.seconds * 1000).toLocaleDateString()} ${new Date(item.fecha.seconds * 1000).toLocaleTimeString()}`);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    }

    if (!this.oneDate && !this.time) {
      alert('Faltan Datos');
    }
  }


  filterByRangeDate() {
    if (this.startDate && this.endDate) {

      const fechaInicio = `${this.startDate.getFullYear()}-${this.startDate.getMonth() + 1}-${this.startDate.getDate()} 00:00:00`;
      const fechaFin = `${this.endDate.getFullYear()}-${this.endDate.getMonth() + 1}-${this.endDate.getDate()} 23:59:59`;

      const start = new Date(fechaInicio);
      const end = new Date(fechaFin);

      this.dataService.filterByDate(start, end).subscribe((data) => {
        data.forEach(item => item.fecha = `${new Date(item.fecha.seconds * 1000).toLocaleDateString()} ${new Date(item.fecha.seconds * 1000).toLocaleTimeString()}`);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });

    }
  }



  clearFilter() {
    this.filter = '';
    this.time = '';
    this.oneDate = null;
    this.startDate = null;
    this.endDate = null;
    this.dataSource = new MatTableDataSource(this.dataSensores);
    this.dataSource.paginator = this.paginator;
  }

}
