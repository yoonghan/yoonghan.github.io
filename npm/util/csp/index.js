`use strict`

/**
 * Lookup a charset based on mime type. Maintainable
 */
module.exports = function generateCsp(testEnvUrl) {

  const _connectSrc = ["https://walcron.com", "https://www.walcron.com"];
  if(testEnvUrl) {
    _connectSrc.push(testEnvUrl);
  }

  return(
  {
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: _connectSrc,
      styleSrc: ["'self'", 'fonts.googleapis.com', 'blob:', "'sha256-IxBqGB25PsRAAJRiQR4+dYowUtzFBFXo9t3ERhZPhWI='", "'sha256-bWLnx2krAUW7we0zPmPs09KbYBg7SeMgAq3nWzw23yE='", "'sha256-9cv2aWOtBuARDX4PnzHn4/KqxpqXvz1JP5z8MV7rDvY='"],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", "data:"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      workerSrc: false
    }
  });
}
