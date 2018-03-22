/**
 * Lookup a charset based on mime type. Maintainable
 */
module.exports =  {
  directives: {
    defaultSrc: ["'none'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", 'fonts.googleapis.com', 'blob:', "'sha256-DzBaz0CFnwWcMZJGgBdaBSm526NuvqFR+6vjX2QW/Wc='", "'sha256-bWLnx2krAUW7we0zPmPs09KbYBg7SeMgAq3nWzw23yE='"],
    fontSrc: ["'self'", 'fonts.gstatic.com'],
    imgSrc: ["'self'"],
    frameAncestors: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    workerSrc: false
  }
};
