import React from 'react';
import NoSSR from 'react-no-ssr';
import Loader from "../Loader";
import ReactResizeDetector from 'react-resize-detector';

interface ICard {
  src: string;
  desc: string;
}

interface ICreationListv2Props {
  cards: Array<ICard>;
}

const Coverflow = React.lazy(() => import('react-coverflow'));

const recalculateWidth = (width: any) => {
  if(typeof width !== "undefined") {
    return ((width as number) - 100).toString();
  }
  return "";
}

const recalculateHeight = (height: any) => {
  if(typeof height !== "undefined") {
    return ((height as number) - 300).toString();
  }
  return "";
}

const renderCards = (cards: Array<ICard>) => {
  const cardDrawn = cards.map((card, idx) => (
    <div>
      <img
        src={card.src}
        alt={card.desc}
        key={"creativev2_" + idx}
      />
    </div>
  ));
  return cardDrawn;
}

const CreationListv2: React.SFC<ICreationListv2Props> = ({cards}) => (
  <NoSSR>
    <React.Suspense fallback={<Loader/>}>
      <ReactResizeDetector handleWidth={true} handleHeight={true} querySelector="body">{
        (resizerProps:any) => {
          return (<Coverflow
            width={recalculateWidth(resizerProps.width)}
            height={recalculateHeight(resizerProps.height)}
            displayQuantityOfSide={2}
            navigation={false}
            enableScroll={false}
            clickable={true}
            active={0}
          >

            {renderCards(cards)}
          </Coverflow>)
        }
      }</ReactResizeDetector>
    </React.Suspense>
  </NoSSR>
)

export default React.memo(CreationListv2);
