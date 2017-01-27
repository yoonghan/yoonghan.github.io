/**
 * Utilities for locale extraction.
 **/
export class UtilLocale {
  static regLangInPath = /\/([a-z]{2})\//;

  public static redirectBrowser = (lang:string, path:string = window.location.pathname) => {
    path = UtilLocale.removeLanguageFromPath(path);
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

  public static extractLanguageFromPath = (path:string = window.location.pathname) => {
    var defaultLang = 'en',
      lang = defaultLang,
      pathLanguage = path.match(UtilLocale.regLangInPath);

    if(pathLanguage && pathLanguage.length > 1) {
      lang = pathLanguage[1];
    }

    return lang;
  }

  public static removeLanguageFromPath = (path:string = window.location.pathname) => {
    var newPath = path,
      pathContainsLanguage = (UtilLocale.regLangInPath).test(path);

    if(pathContainsLanguage) {
      newPath = path.replace(UtilLocale.regLangInPath, '/');
    }

    return newPath;
  }
}
