import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  addToMemory(key, value): void {
    localStorage.setItem(JSON.stringify(key),JSON.stringify(value))
  }  

  loadMemory() {
    let array =  [];
    for (let index in localStorage) {
      if (localStorage.getItem(index) != null) {
        array.push(JSON.parse(localStorage.getItem(index)));
      }
    }
    return array;   
  }
}
