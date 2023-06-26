import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, Timestamp, addDoc, collection, collectionData, doc, docData, orderBy, query, setDoc, where } from '@angular/fire/firestore';
import { Observable, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private collection!: CollectionReference<DocumentData>;
  private collectionAlarm!: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.collection = collection(this.firestore, 'sensor_data');
    this.collectionAlarm = collection(this.firestore, 'alarma');
  }


  getData() {
    const filter = query(this.collection, orderBy('fecha', 'desc'));
    return collectionData(filter) as Observable<any[]>;
  }

  filterByDate(start: any, end: any): Observable<any[]> {
    const filter = query(this.collection, where('fecha', '>=', start), where('fecha', '<=', end), orderBy('fecha', 'desc'));
    return collectionData(filter) as Observable<any[]>;
  }

  addData() {
    const id = `${new Date().valueOf()}`;
    const data = {
      humedad: this.randomData(1000),
      luz: this.randomData(1000),
      presion: this.randomData(1000),
      temperatura: this.randomData(50),
      viento: this.randomData(100),
      fecha: Timestamp.now()
    };
    return setDoc(doc(this.collection, id), data);
  }


  getDataAlarm() {
    return collectionData(this.collectionAlarm, { idField: 'id' }) as Observable<any[]>;
    // const docAlarm = doc(this.firestore, `temperatura`);
    // return docData(docAlarm);
  }


  randomData(limit: number) {
    return `${Math.floor(Math.random() * limit) + 1}`;
  }
}
