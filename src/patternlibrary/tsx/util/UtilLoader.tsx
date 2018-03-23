export class UtilLoader {
  startDisplay() {
    const preloaderHolder = document.getElementById('p-h'),
      preloaderContent = document.getElementsByClassName('p-c');

    preloaderHolder.classList.add("p-f");

    for(let loop=0; loop < preloaderContent.length; loop++) {
      (preloaderContent[loop] as HTMLElement).classList.add("p-f");
    }
  }
}
