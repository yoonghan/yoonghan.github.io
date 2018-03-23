/**
 * Lookup a charset based on mime type. Maintainable
 */
module.exports =  {
  directives: {
    defaultSrc: ["'none'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", 'fonts.googleapis.com', 'blob:', "'sha256-IxBqGB25PsRAAJRiQR4+dYowUtzFBFXo9t3ERhZPhWI='", "'sha256-bWLnx2krAUW7we0zPmPs09KbYBg7SeMgAq3nWzw23yE='", "'sha256-9cv2aWOtBuARDX4PnzHn4/KqxpqXvz1JP5z8MV7rDvY='"],
    fontSrc: ["'self'", 'fonts.gstatic.com'],
    imgSrc: ["'self'"],
    frameAncestors: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    workerSrc: false
  }
};
