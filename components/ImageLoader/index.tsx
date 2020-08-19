`use strict`

import * as React from "react";

interface IImageLoader {
  imagesSrcToLoad: Array<string>;
  allImageLoadedCallback: () => void;
  percentageLoad?: (percentage: number) => void;
}

const ImageLoader: React.FC<IImageLoader> =
  ({imagesSrcToLoad, allImageLoadedCallback, percentageLoad}) => {
  const [imgLoadedCount, setImgLoadedCount] = React.useState(0);

  React.useEffect(()=> {
    if(imgLoadedCount === imagesSrcToLoad.length) {
      allImageLoadedCallback();
    }
    if(percentageLoad) {
      percentageLoad(Math.floor(imgLoadedCount/imagesSrcToLoad.length) );
    }
  }, [imgLoadedCount]);

  React.useEffect(()=> {
    const images = Array.from(document.querySelectorAll('.image-loader'));
    var total = 0;
    for(let i=0; i<images.length; i++) {
      total += (images[i] as HTMLImageElement).complete?1: 0;
    }
    setImgLoadedCount(total);
  }, []);

  const _loadImages = () => {
    return imagesSrcToLoad.map((imageSrcToLoad, i) => (
      <React.Fragment key={`img_${i}`}>
        <img
          key={`img_${i}`}
          src={imageSrcToLoad}
          className="image-loader hidden"
          onLoad={()=>{setImgLoadedCount(imgLoadedCount + 1)}}
          onError={()=>{setImgLoadedCount(imgLoadedCount + 1)}}
          />

        <style jsx>{`
          .hidden {
            display: none;
          }
          `}</style>
      </React.Fragment>
    ))
  }

  return (
    <>{_loadImages()}</>
  )
}

export default ImageLoader;
