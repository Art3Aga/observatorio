import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions  } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataSensor } from '../../models/datasensor.model';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {

  @Input() dataSensores: any[] = [];
  @Input() width: string = '500';
  @Input() height: string = '200';
  @Input() id: string = 'chart-1';

  humedades: any[] = [];
  temperaturas: any[] = [];
  vientos: any[] = [];
  presiones: any[] = [];
  luces: any[] = [];
  fechas: any[] = [];
  lluvias: any[] = [];
  monoxidos: any[] = [];

  chartData: ChartDataSets[] = [];

  chartLabels: Label[] = [];

  chartOptions: ChartOptions = {
    responsive: true,
    animation: {
      duration: 0
    },
  };
  chartLegend = true;

  chartType = 'line';

  chartPlugins = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes) {
      this.setData();
    }
  }

  ngOnInit(): void {
    if (this.dataSensores) {
      this.setData();
    }
  }

  setData() {
    this.humedades = this.dataSensores.map(data => (data.humedad));
    this.temperaturas = this.dataSensores.map(data => (data.temperatura));
    this.vientos = this.dataSensores.map(data => (data.viento));
    this.luces = this.dataSensores.map(data => (data.luz));
    this.presiones = this.dataSensores.map(data => (data.presion));
    this.fechas = this.dataSensores.map(data => data.fecha);
    this.monoxidos = this.dataSensores.map(data => data.co);
    this.lluvias = this.dataSensores.map(data => data.lluvia);


    this.chartData = [
      { data: this.humedades, label: 'Humedad (%)', fill: false },
      { data: this.temperaturas, label: 'Temperatura (°C)', fill: false },
      { data: this.vientos, label: 'Viento (Km/h)', fill: false, backgroundColor: '#FCFF33', borderColor: '#FCFF33' },
      { data: this.presiones, label: 'Presion (kPa)', fill: false, backgroundColor: '#49FF33', borderColor: '#49FF33' },
      { data: this.luces, label: 'Luz (Lx)', fill: false, backgroundColor: '#B533FF', borderColor: '#B533FF' },
      { data: this.monoxidos, label: 'Co', fill: false, backgroundColor: '#FE6DFA', borderColor: '#FE6DFA' },
      { data: this.lluvias, label: 'Lluvia', fill: false, backgroundColor: '#FEBA6D', borderColor: '#FEBA6D' }
    ];
    this.chartLabels = this.fechas;
  }

}
