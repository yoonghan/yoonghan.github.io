import {Component, provide, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RippleDirective} from '../directive/ripple.directive';

@Component({
    selector: 'md-tab',
    inputs: ['tabVal'],
    template: `
      <div class='tab-container'>
        <div class="tab-bar">
          <a class="tab" *ngFor="#tab of tabVal; #i=index" [class.is-active]="tab.active" (click)="goToDetail(tab.routeLink, i)" ripple [innerHTML]="tab.label"></a>
        </div>
      </div>
    `,
    directives: [
      RippleDirective
    ]
})

export class MdTab implements OnInit{

  private tabVal:Tab[];

  constructor(private _router: Router) {}

  ngOnInit () {
    for(let loop = 0; loop < this.tabVal.length; loop++) {
      if(this.tabVal[loop].active) {
        this._router.navigate(this.tabVal[loop].routeLink);
      }
    }
  }

  activateTab(index:number) {
    for(let loop = 0; loop < this.tabVal.length; loop++) {
      this.tabVal[loop].active = (loop === index);
    }
  }

  goToDetail(route:any, index:number) {
    this.activateTab(index);
    if(typeof route !== 'undefined') {
      this._router.navigate(route);
    }
  }
}

export class Tab {
  routeLink:any;
  active:boolean;
  label:string;
}
