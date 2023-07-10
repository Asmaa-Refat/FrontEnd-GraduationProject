import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordEncruptionService {

  private secretKey = 'insert-your-secret-key-here';

  constructor() { }

}
