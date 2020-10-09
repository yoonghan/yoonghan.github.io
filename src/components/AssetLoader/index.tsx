`use strict`

import * as React from "react";

export enum EnumAssetLoader {
  IMAGE
}

interface IAsset {
  type: EnumAssetLoader;
  webpSrc: string;
  jpgSrc: string;
}

interface IAssetLoader {
  assetsSrcToLoad: Array<IAsset>;
  allAssetLoadedCallback?: () => void;
  percentageLoad?: (percentage: number) => void;
}

const AssetLoader: React.FC<IAssetLoader> =
  ({assetsSrcToLoad, allAssetLoadedCallback, percentageLoad}) => {
  const [assetLoadedCount, setAssetLoadedCount] = React.useState(0);
  const [assetsCreated, setAssetsCreated] = React.useState<Array<any>|null>(null);

  React.useEffect(() => {
    if(assetsCreated === null) {
      return;
    }

    for(let i=0; i<assetsCreated.length; i++) {
      if(assetsCreated[i] !== null) {
        const img = (assetsCreated[i] as HTMLImageElement);
        img.onload = _updateAsset;
        img.onerror = _updateAsset;
      }
    }
  }, [assetsCreated]);

  React.useEffect(()=> {
    const total = assetLoadedCount;
    if(total === assetsSrcToLoad.length) {
      if(allAssetLoadedCallback)
        allAssetLoadedCallback();
    }
    if(percentageLoad) {
      let percentageShown = Math.floor(total / assetsSrcToLoad.length * 100);
      percentageShown = percentageShown > 100?100:percentageShown;
      percentageLoad(percentageShown);
    }
  }, [assetLoadedCount]);

  React.useEffect(()=> {
    const assets = _loadAssets();
    setAssetLoadedCount(_sumCompleted(assets));
    setAssetsCreated(assets);
  }, []);

  const _sumCompleted = (assets:Array<any>|null) => {
    var total = 0;

    if(assets === null) {
      return 0;
    }

    for(let i=0; i<assets.length; i++) {
      if(assets[i] !== null) {
        total += (assets[i] as HTMLImageElement).complete?1: 0;
      }
      else {
        total += 1;
      }
    }
    return total;
  }

  const _updateAsset = () => {
    const total = _sumCompleted(assetsCreated);
    setAssetLoadedCount(total);
  }

  const buildAsset = (assetSrcToLoad:IAsset) => {
    switch(assetSrcToLoad.type) {
      case EnumAssetLoader.IMAGE:
        var img = new Image();
        img.src = assetSrcToLoad.jpgSrc; //load only png source
        return img;
      default:
        return null;
    }
  }

  const _loadAssets = () => {
    return assetsSrcToLoad.map((assetSrcToLoad) => buildAsset(assetSrcToLoad))
  }

  return (
    <></>
  )
}

export default AssetLoader;
