/**
 * Utilities for locale extraction.
 **/
export class UtilLocale {
  static regLangInPath = /\/([a-z]{2})\//;
  static defaultLang = 'en';

  public static redirectBrowser = (lang:string, path:string = window.location.pathname):string => {
    path = UtilLocale.removeLanguageFromPath(path);
    var newLoc = path;
    if(/^\/patternlibrary/.test(path)) {
      var replacePatternString = "/patternlibrary/docs/";
      newLoc = replacePatternString + lang + path.substring(replacePatternString.length - 1 , path.length);
    }
    else if(lang !== UtilLocale.defaultLang){
      newLoc = "/" + lang + path;
    }

    return newLoc;
  }

  public static extractLanguageFromPath = (path:string = window.location.pathname):string => {
    var defaultLang = 'en',
      lang = defaultLang,
      pathLanguage = path.match(UtilLocale.regLangInPath);

    if(pathLanguage && pathLanguage.length > 1) {
      lang = pathLanguage[1];
    }

    return lang;
  }

  public static removeLanguageFromPath = (path:string = window.location.pathname):string => {
    var newPath = path,
      pathContainsLanguage = (UtilLocale.regLangInPath).test(path);

    if(pathContainsLanguage) {
      newPath = path.replace(UtilLocale.regLangInPath, '/');
    }

    return newPath;
  }

  public static getLocalizedHref = (hrefPath:string, path:string = window.location.pathname):string => {
    if(UtilLocale.escapePath(hrefPath, path)) {
      return hrefPath;
    }

    const lang = UtilLocale.extractLanguageFromPath(path);
    return '/' + lang + (hrefPath.substr(0, 1) === '/' ? '':'/') + hrefPath;
  }

  private static escapePath = (pathToReplace:string, path:string):Boolean => {
    return pathToReplace.substr(0, 2) === '//' || pathToReplace.substr(0, 7) === 'http://' || UtilLocale.extractLanguageFromPath(path) === UtilLocale.defaultLang;
  }
}
