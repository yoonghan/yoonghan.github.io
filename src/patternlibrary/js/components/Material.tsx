`use strict`

import * as React from "react";
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
var styles = require('../../css/components/Material');
declare function require(path: string): any;

/**
 * Please use this as component references only. Use only the CSS/Themes as components has already been built in react-toolbox.
 */

const GithubIcon = () => (
  <svg viewBox="0 0 284 277">
    <g><path d="M141.888675,0.0234927555 C63.5359948,0.0234927555 0,63.5477395 0,141.912168 C0,204.6023 40.6554239,257.788232 97.0321356,276.549924 C104.12328,277.86336 106.726656,273.471926 106.726656,269.724287 C106.726656,266.340838 106.595077,255.16371 106.533987,243.307542 C67.0604204,251.890693 58.7310279,226.56652 58.7310279,226.56652 C52.2766299,210.166193 42.9768456,205.805304 42.9768456,205.805304 C30.1032937,196.998939 43.9472374,197.17986 43.9472374,197.17986 C58.1953153,198.180797 65.6976425,211.801527 65.6976425,211.801527 C78.35268,233.493192 98.8906827,227.222064 106.987463,223.596605 C108.260955,214.426049 111.938106,208.166669 115.995895,204.623447 C84.4804813,201.035582 51.3508808,188.869264 51.3508808,134.501475 C51.3508808,119.01045 56.8936274,106.353063 65.9701981,96.4165325 C64.4969882,92.842765 59.6403297,78.411417 67.3447241,58.8673023 C67.3447241,58.8673023 79.2596322,55.0538738 106.374213,73.4114319 C117.692318,70.2676443 129.83044,68.6910512 141.888675,68.63701 C153.94691,68.6910512 166.09443,70.2676443 177.433682,73.4114319 C204.515368,55.0538738 216.413829,58.8673023 216.413829,58.8673023 C224.13702,78.411417 219.278012,92.842765 217.804802,96.4165325 C226.902519,106.353063 232.407672,119.01045 232.407672,134.501475 C232.407672,188.998493 199.214632,200.997988 167.619331,204.510665 C172.708602,208.913848 177.243363,217.54869 177.243363,230.786433 C177.243363,249.771339 177.078889,265.050898 177.078889,269.724287 C177.078889,273.500121 179.632923,277.92445 186.825101,276.531127 C243.171268,257.748288 283.775,204.581154 283.775,141.912168 C283.775,63.5477395 220.248404,0.0234927555 141.888675,0.0234927555" /></g>
  </svg>
);

export class Material extends React.Component<{}, {}> {

  constructor(props:any) {
    super(props);
  }

  render() {
    return (
    <div className={styles['material'] + ' ' + styles['reacttoolbox']}>
      <Card className={styles['material-split']}>
        <CardMedia
          aspectRatio="wide"
          image="https://placeimg.com/640/250/tech"
        />
        <CardTitle
          title="Deep Learning"
          subtitle={'Won a hackaton based on image scanning to identify a vehicle model using a mobile.'+
          ' Will be dedicating this year 2017 in research on deep learning using Scala programming language.'}
        />
        <CardActions>
          <Button label="Read More" href='http://blog.walcron.com' theme={styles} primary/>
        </CardActions>
      </Card>
      <Card className={styles['material-split']}>
        <CardTitle
          title="Parallel Processings"
          subtitle={'I had been focusing this mostly, but still have not get my grip on it. Had been touching Scala, RxJS, Akka.'
          + ' My ultimate goal now is having Apache Sparks with Deep Learning, working.'}
        />
      </Card>
      <Card className={styles['material-split']}>
        <CardTitle
          title="Precache"
          subtitle={'An available offline webpage that still works offline without being online! I need one seriously!'}
        />
      </Card>
      <Card className={styles['material-split']}>
        <CardTitle
          title="React and javascripts"
          subtitle={'This website has went through 3 interations, and the recent technology used in ReactJS.' +
          ' I had been writing this in AngularJS, AngularJS2 and vanilla JS; but I\'m prefering ReactJS out of these.' +
          ' This site\'s CSS is build based on CSS modules.'}
        />
        <CardActions>
          <Button href='https://github.com/yoonghan' primary>
            <GithubIcon /> Github
          </Button>
        </CardActions>
      </Card>
      <Card className={styles['material-split']}>
        <CardTitle
          title="React Native"
          subtitle={'Writing react native was extremely wonderful as I learn Android, iOS and Javascripts writing formats with React Native. ' +
          'The only problem I had is to override the background color. On my job basis, I am still writing native Android and iOS codes.' +
          'Advice to anyone writing React Native/Nativescript: it is very important to learn native language to harness it\'s potential.'}
        />
        <CardActions>
          <Button label="Download" href='https://play.google.com/store/apps/details?id=com.walcron.hanleewan.weddingplanner' accent/>
        </CardActions>
      </Card>
      <Card className={styles['material-split']}>
        <CardTitle
          title="Scala, C# and Java"
          subtitle={'Han has been writing Java for about 10 years, but jumping on the current site, the backend is using PlayFramework written in' +
          ' Scala. Lee Wan on the other hand has been writing in C#, don\'t see a reason why other languages needs to be replaced on this vast language.' }
        />
      </Card>
      <Card className={styles['material-split']}>
        <CardMedia
          aspectRatio="wide"
          image="https://placeimg.com/640/250/nature"
        />
        <CardTitle
          title="Deutsch from Malaysia"
          subtitle={'Wir lernen gemainsam am Wochenende Deutsch. Wir lieben Deutsch.' }
        />
      </Card>
      <Card className={styles['material-split']}>
        <CardMedia
          aspectRatio="wide"
          image="https://placeimg.com/640/250/people"
        />
        <CardTitle
          title="Lee Wan's Journal"
          subtitle={'A journal Lee Wan kept, it\'s unfortunately not being updated as there\'s no followers on this.' +
          ' I guess nobody actually goes much to bloggin nowadays, as there is already facebook.' }
        />
        <CardActions>
          <Button label="Bragging Blog" href='http://tf.walcron.com/' accent/>
        </CardActions>
      </Card>
    </div>
    );
  }
}
