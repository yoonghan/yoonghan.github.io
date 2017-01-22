`use strict`

import * as React from "react";
import Dropdown from 'react-toolbox/lib/dropdown';

import '../../css/base';
var styles = require('../../css/components/Localize');
declare function require(path: string): any;

const countries = [
  { value: 'my', label: 'B. Melayu'},
  { value: 'en', label: 'English' }
];

/**
 * Configuration are tied closely with Gulp and Node.js Express functionality.
 */

interface LocalizeState {
  lang: string;
}

export class Localize extends React.Component<{}, LocalizeState> {
  static regLangInPath = /\/([a-z]{2})\//;

  constructor(props:any) {
    super(props);

    var lang = this.extractLanguageFromPath(window.location.pathname);

    this.state = {
      lang: lang
    };
  }

  extractLanguageFromPath = (path:string) => {
    var defaultLang = 'en',
      lang = defaultLang,
      pathLanguage = path.match(Localize.regLangInPath);

    if(pathLanguage && pathLanguage.length > 1) {
      lang = pathLanguage[1];
    }

    return lang;
  }

  removeLanguageFromPath = (path:string) => {
    var newPath = path,
      pathContainsLanguage = (Localize.regLangInPath).test(path);
    if(pathContainsLanguage) {
      newPath = path.replace(Localize.regLangInPath, '/');
    }

    return newPath;
  }

  handleChange = (lang: string) => {
    const currLanguage = this.state.lang;

    if(currLanguage === lang) {
      return;
    }

    window.location.href = this.redirectBrowser(lang, window.location.pathname);
    this.setState({lang: lang});
  };

  redirectBrowser = (lang:string, path:string) => {
    path = this.removeLanguageFromPath(path);
    var newLoc = path;
    if(/^\/patternlibrary/.test(path)) {
      var replacePatternString = "/patternlibrary/docs/";
      newLoc = replacePatternString + lang + path.substring(replacePatternString.length - 1 , path.length);
    }
    else {
      newLoc = "/" + lang + path;
    }

    return newLoc;
  }

  getBrowserLanguage = () => {
    var language = navigator.languages
      ? navigator.languages[0]
      : (navigator.language || navigator.userLanguage);

    if (language.indexOf('-') > 0) {
      language = language.split('-')[0];
    }
    return language;
  }

  render() {
    return (
      <div className={styles['localize']}>
        <Dropdown
          auto
          onChange={this.handleChange}
          source={countries}
          value={this.state.lang}
          className={styles['localize-dropdown']}
        />
      </div>
    );
  }
}
