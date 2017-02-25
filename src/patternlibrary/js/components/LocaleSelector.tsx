`use strict`

import * as React from "react";
import Dropdown from 'react-toolbox/lib/dropdown';
import { UtilLocale } from '../util/UtilLocale';

import '../../css/base';
var styles = require('../../css/components/LocaleSelector');
declare function require(path: string): any;

const countries = [
  { value: 'en', label: 'English Language' },
  { value: 'my', label: 'Bahasa Melayu'}
];

/**
 * Configuration are tied closely with Gulp and Node.js Express functionality.
 */

export enum LocaleSelectorTypes {
  Dropdown,
  Link
}

export interface LocaleSelectorProps {
  type: LocaleSelectorTypes;
}

interface LocaleSelectorState {
  lang: string;
}

export class LocaleSelector extends React.Component<LocaleSelectorProps, LocaleSelectorState> {

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

  renderDropdown = ():JSX.Element => {
    return (
      <div className={styles['localeselector-table']}>
        <div className={styles['localeselector-cell']}>
          <Dropdown
            auto
            theme={styles}
            onChange={this.handleChange}
            source={countries}
            value={this.state.lang}
            className={styles['localeselector-dropdown']}
          />
        </div>
      </div>
    );
  };

  renderLink = ():JSX.Element[] => {
    let isFirst = true;
    const currLanguage = this.state.lang;

    const links:JSX.Element[] = countries.map(
      (country) => {
        let lang = country.value;
        let jsx = (<span key={lang}>
                    { !isFirst && ' | '}
                    { currLanguage === lang && lang.toUpperCase()}
                    { currLanguage !== lang &&
                      <a href={UtilLocale.redirectBrowser(lang, window.location.pathname)}>
                        {lang.toUpperCase()}
                      </a>
                    }
                  </span>);
        isFirst = !isFirst;
        return jsx
      }
    );

    return links;
  };

  render() {
    const {type} = this.props,
          isDropdown = type === LocaleSelectorTypes.Dropdown,
          isLink = type == LocaleSelectorTypes.Link;
    return (
      <div className={styles['localeselector'] + ' ' + styles['reacttoolbox']}>
        { isDropdown && this.renderDropdown() }
        { isLink && this.renderLink() }
      </div>
    );
  }
}
