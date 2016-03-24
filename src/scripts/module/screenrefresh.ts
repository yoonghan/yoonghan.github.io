class ScreenRefresh {

  private refreshElement;

  constructor() {
    this.refreshElement = document.createElement('div');
    this.refreshElement.setAttribute('class','wal-refresh');
    document.body.appendChild(this.refreshElement);
  }
}

new ScreenRefresh();
