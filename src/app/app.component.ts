import { Component, VERSION } from '@angular/core';
import { map, Subject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public button1Click$: Subject<string> = new Subject<string>();
  public button2Click$: Subject<number> = new Subject<number>();
  public button3Click$: Subject<number> = new Subject<number>();
  public log: string[] = [];

  constructor() {
    this.button1Click$
      .pipe()
      .subscribe((value) => this.log.push(value.toString()));

    this.button2Click$
      .pipe(map((value) => value * 10))
      .subscribe((value) => this.log.push(value.toString()));

    this.button3Click$
      .pipe()
      .subscribe((value) => this.log.push(value.toString()));
  }

  button1Click() {
    this.button1Click$.next(new Date().toISOString());
  }

  button2Click() {
    this.button2Click$.next(this._btn2Counter);
    this._btn2Counter += 1;
  }

  button3Click() {
    this.button3Click$.next(this._btn3Array[this._btn3CurrentIndex]);
    this._btn3CurrentIndex++;
    if (this._btn3Array.length < this._btn3CurrentIndex + 1) {
      this.button3Click$.complete();
    }
  }

  private _btn2Counter = 0;

  private _btn3Array = [1, 2, 4, 4, 13, 13, 13, 4, 4, 3, 2, 5];
  private _btn3CurrentIndex = 0;
}
