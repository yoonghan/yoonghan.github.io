import {Component} from 'angular2/core';
import {MdButton} from '../component/md-button';

@Component({
  selector: 'wal-research',
  templateUrl: './research.html',
  styles: ['.hide {display:none}'],
  directives: [
    MdButton
  ]
})

export class ResearchComponent {

  private openList:Boolean[] = [false, false, false, false, false, false];
  private showAll:Boolean = false;
  private showAll_Text:String = '<i class="fa fa-level-down"></i> Display All';
  private showAll_Color:String = 'red';

  hideLink(loc:Number) {
    var index = +loc;
    this.openList[index] = !this.openList[index];
  }

  showAllLinks() {
    this.showAll = !this.showAll;
    for (var loop = 0; loop < this.openList.length; loop++) {
      this.openList[loop] = this.showAll;
    }
    if(this.showAll) {
      this.showAll_Text = '<i class="fa fa-level-up"></i> Hide All';
      this.showAll_Color = 'blue';
    } else {
      this.showAll_Text = '<i class="fa fa-level-down"></i> Display All';
      this.showAll_Color = 'red';
    }
  }
}
