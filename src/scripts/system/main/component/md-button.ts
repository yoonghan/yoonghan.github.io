import {Component, provide} from 'angular2/core';
import {Router} from 'angular2/router';
import {RippleDirective} from '../directive/ripple.directive';

@Component({
    selector: 'md-button',
    inputs: ['routeLink', 'classcolor', 'label'],
    template: `
      <a class="button {{classcolor}}" (click)="goToDetail()" ripple><span [innerHTML]="label"></span></a>
    `,
    directives: [
      RippleDirective
    ]
})

export class MdButton {

  private routeLink:any;

  constructor(private _router: Router) {}

  goToDetail() {
    if(typeof this.routeLink !== 'undefined') {
      this._router.navigate(this.routeLink);
    }
  }
}
