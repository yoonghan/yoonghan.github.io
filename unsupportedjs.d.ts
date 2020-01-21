declare module "react-coverflow" {

  export interface CoverflowProps {
    width: string;
    height?: string;
    displayQuantityOfSide: number;
    navigation: boolean;
    enableScroll: boolean;
    clickable: boolean;
    active: number;
    children: ReactNode;
  }

  class Coverflow extends React.Component<CoverflowProps, {}> {
  }

  export default Coverflow;
}
