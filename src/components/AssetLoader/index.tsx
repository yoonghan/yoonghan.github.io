`use strict`

import * as React from "react";

export enum EnumAssetLoader {
  IMAGE
}

interface IAsset {
  type: EnumAssetLoader;
  src: string;
}

interface IAssetLoader {
  assetsSrcToLoad: Array<IAsset>;
  allAssetLoadedCallback?: () => void;
  percentageLoad?: (percentage: number) => void;
}

const AssetLoader: React.FC<IAssetLoader> =
  ({assetsSrcToLoad, allAssetLoadedCallback, percentageLoad}) => {
  const [assetLoadedCount, setAssetLoadedCount] = React.useState(0);

  React.useEffect(()=> {
    if(assetLoadedCount === assetsSrcToLoad.length) {
      if(allAssetLoadedCallback)
        allAssetLoadedCallback();
    }
    if(percentageLoad) {
      let percentageShown = Math.floor(assetLoadedCount / assetsSrcToLoad.length * 100);
      percentageShown = percentageShown > 100?100:percentageShown;
      percentageLoad(percentageShown);
    }
  }, [assetLoadedCount]);

  React.useEffect(()=> {
    const images = Array.from(document.querySelectorAll('.image-loader'));
    var total = 0;
    for(let i=0; i<images.length; i++) {
      total += (images[i] as HTMLImageElement).complete?1: 0;
    }
    setAssetLoadedCount(total);
  }, []);

  const loadAsset = (assetSrcToLoad:IAsset) => {
    switch(assetSrcToLoad.type) {
      case EnumAssetLoader.IMAGE:
        return (<img
          alt={"walcron-load"}
          src={assetSrcToLoad.src}
          className="image-loader"
          onLoad={()=>{setAssetLoadedCount(assetLoadedCount + 1)}}
          onError={()=>{setAssetLoadedCount(assetLoadedCount + 1)}}
          />);
      default:
        return (<div></div>);
    }
  }

  const _loadAssets = () => {
    return assetsSrcToLoad.map((assetSrcToLoad, i) => (
      <div key={`asset_${i}`}>
        {loadAsset(assetSrcToLoad)}
      </div>
    ))
  }

  return (
    <div style={{"display": "none"}}>
      {_loadAssets()}
    </div>
  )
}

export default AssetLoader;
