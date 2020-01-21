import React from 'react';
import NoSSR from 'react-no-ssr';
import Loader from "../Loader";
import ReactResizeDetector from 'react-resize-detector';

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

const CreationListv2 = () => (
  <NoSSR>

      <React.Suspense fallback={<Loader/>}>
        <ReactResizeDetector handleWidth={true} handleHeight={true} querySelector="body">{
          (resizerProps:any) => {
            console.log(resizerProps, "resizerProps");
            return (<Coverflow
              width={recalculateWidth(resizerProps.width)}
              height={recalculateHeight(resizerProps.height)}
              displayQuantityOfSide={2}
              navigation={false}
              enableScroll={false}
              clickable={true}
              active={0}
            >
              <div>
                <img src='https://picsum.photos/200/300' alt='title or description' />
              </div>
              <img src='https://picsum.photos/200/300' alt='title or description' />
              <img src='https://picsum.photos/200/300' alt='title or description' />
            </Coverflow>)
          }
        }</ReactResizeDetector>
      </React.Suspense>
  </NoSSR>
)

export default CreationListv2;
