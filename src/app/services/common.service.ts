import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public answers: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor() { }
}
