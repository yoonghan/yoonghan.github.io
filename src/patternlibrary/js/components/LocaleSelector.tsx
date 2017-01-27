`use strict`

import * as React from "react";
import Dropdown from 'react-toolbox/lib/dropdown';
import { UtilLocale } from '../util/UtilLocale';

import '../../css/base';
var styles = require('../../css/components/LocaleSelector');
declare function require(path: string): any;

const countries = [
  { value: 'my', label: 'B. Melayu'},
  { value: 'en', label: 'English' }
];

/**
 * Configuration are tied closely with Gulp and Node.js Express functionality.
 */

interface LocaleSelectorState {
  lang: string;
}

export class LocaleSelector extends React.Component<{}, LocaleSelectorState> {

  constructor(props:any) {
    super(props);

    var lang = UtilLocale.extractLanguageFromPath(window.location.pathname);

    this.state = {
      lang: lang
    };
  }

  handleChange = (lang: string) => {
    const currLanguage = this.state.lang;

    if(currLanguage === lang) {
      return;
    }

    window.location.href = UtilLocale.redirectBrowser(lang, window.location.pathname);
    this.setState({lang: lang});
  };

  /*getBrowserLanguage = () => {
    var language = navigator.languages
      ? navigator.languages[0]
      : (navigator.language || navigator.userLanguage);

    if (language.indexOf('-') > 0) {
      language = language.split('-')[0];
    }
    return language;
  }*/

  render() {
    return (
      <div className={styles['localeselector']}>
        <Dropdown
          auto
          onChange={this.handleChange}
          source={countries}
          value={this.state.lang}
          className={styles['localeselector-dropdown']}
        />
      </div>
    );
  }
}
