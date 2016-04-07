import {Component, provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {ResearchComponent} from './research.component';
import {ArchitectureComponent} from './architecture.component';
import {ProgressComponent} from './progress.component';
import {MdButton} from '../component/md-button';
import {MdTab, Tab} from '../component/md-tab';

@Component({
    selector: 'wal-info',
    template: `
      <md-tab [tabVal]="tabVal"></md-tab>
      <router-outlet></router-outlet>
    `,
    directives: [
      ROUTER_DIRECTIVES,
      MdButton,
      MdTab
    ],
    providers: [
      ROUTER_PROVIDERS,
      provide(LocationStrategy,
         {useClass: HashLocationStrategy})
    ]
})

@RouteConfig([
  {
    path: '/Research',
    name: 'Research',
    component: ResearchComponent,
    useAsDefault: true
  },
  {
    path: '/Architecture',
    name: 'Architecture',
    component: ArchitectureComponent
  },
  {
    path: '/Progress',
    name: 'Progress',
    component: ProgressComponent
  }
])

export class InfoComponent {

  private tabVal:Tab[] = [
    { "routeLink": ['/Research'], active: true, "label": "Research" },
    { "routeLink": ['/Architecture'], active: false, "label": "Architecture" },
    { "routeLink": ['/Progress'], active: false, "label": "Progress" }
    ];
}
