import React from 'react';
import Card, {ICardProps} from "./Card";
import dynamic from "next/dynamic";
import NoSSR from 'react-no-ssr';

interface ICreationListv2Props {
  cards: Array<ICardProps>;
}

const Coverflow = dynamic(
  () => import("react-coverflow"),
  { ssr: false }
)

const recalculateWidth = (width: number) => {
  return ((width as number) - 100).toString();
}

const recalculateHeight = (height: number) => {
  return ((height as number) - 300).toString();
}

const renderCards = (cards: Array<ICardProps>) => {
  const cardDrawn = cards.map((card, idx) => (
    <Card
      {...card}
      key={`creationv2_${idx}`}
    />
  ));
  return cardDrawn;
}

const CreationListv2: React.SFC<ICreationListv2Props> = ({cards}) => {

  const [dimension, setDimension] = React.useState({width: 0, height: 0});

  React.useEffect(() => {
    //Correct way to use document is after mounting!
    setDimension({
      width:document!.querySelector("body")!.offsetWidth,
      height:document!.querySelector("body")!.offsetHeight
    });
    return () => {

    }
  }, []);

  return (
    <NoSSR>
      <Coverflow
        width={recalculateWidth(dimension.width)}
        height={recalculateHeight(dimension.height)}
        displayQuantityOfSide={(dimension.width < 600 ? 1: 2)}
        navigation={false}
        enableScroll={true}
        clickable={true}
        active={0}
      >
        {renderCards(cards)}
      </Coverflow>
    </NoSSR>
  );
}

export default CreationListv2;
