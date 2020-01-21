declare module "react-coverflow" {
  export interface CoverflowProps {
    width: string;
    height?: string;
    displayQuantityOfSide: number;
    navigation: boolean;
    enableScroll: boolean;
    clickable: boolean;
    children: ReactNode;
    active?: number;
  }
  class Coverflow extends React.Component<CoverflowProps, {}> {
  }
  export default Coverflow;
}
