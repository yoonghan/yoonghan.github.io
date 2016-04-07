import {Component, OnInit, View, Pipe, PipeTransform} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {MdSwitch} from '../component/md-switch';
import {MdTextField} from '../component/md-textfield';

interface Writing {
  date: string,
  task: string,
  detail: string
}

@Pipe({
  name: "search"
})
export class Search {
  transform(value:Writing[], args: string[]) {
    if(value && args.length > 0 && args[0] !== ''){
      let lowercaseText = args[0].toLowerCase();
      return value.filter(temp => (temp.detail.toLowerCase().indexOf(args[0]) >= 0));
    }
    else {
      return value;
    }
  }
}

@Injectable()
export class ProgressService {
  constructor(private http: Http) {}

  private _writingUrl = '/cache/json/writing.json';

  getWritings () {
    return this.http.get(this._writingUrl)
              .map(res => res.json().posts);
              //do not catch error
  }

//  private handleError (error: Response) {
//    console.error(error);
//    return Observable.throw(error.json().error || 'Server error');
//  }
}

@Component({
  selector: 'wal-progress',
  pipes: [Search],
  templateUrl: './progress',
  providers: [ProgressService, HTTP_PROVIDERS],
  directives: [
    MdSwitch,
    MdTextField
  ]
})
export class ProgressComponent implements OnInit{

  writings: Writing[];
  searchKey: String = "";
  initialized: Boolean = false; //used to fix bug

  constructor(private _writingService: ProgressService) { }

  ngOnInit() {
    this.getWritings();
    this.initialized=true;
  }

  searchKeyword(keyword: string) {
    if(keyword && keyword.length > 0) {
      this.searchKey = keyword;
    } else {
      this.searchKey = '';
    }
  }

  reorder(ascending) {
      if(typeof this.writings !== 'undefined') {
      let order = (ascending) ? -1: 1; // ascending = 1, descending = -1
      this.writings = _.sortBy(this.writings, function(o) {
        return (order * moment(o.date, "MMM Do, YYYY").valueOf());
      });
    }
  }

  getWritings() {
    return this._writingService.getWritings()
        .subscribe(datas => {this.writings = datas; this.reorder(true)});
  }
}
