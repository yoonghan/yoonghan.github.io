/**
 * Lookup a charset based on mime type. Maintainable
 */
module.exports =  function(mimeType) {
	  var ext = mimeType.substring(mimeType.lastIndexOf("."), mimeType.length)
		switch(ext){
			case ".css":
				return 'text/css';
			case ".jpg": case ".jpeg":
				return 'image/jpeg';
			case ".gif":
				return 'image/gif';
			case ".js":
				return "application/javascript";
			case ".svg":
				return "image/svg+xml";
			case ".ico":
				return "image/x-icon";
			case ".png":
				return "image/png";
			case ".json":
				return "application/json";
			case ".html":
				return "text/html";
			case ".woff":
				return "application/x-font-woff";
			case ".ttf":
				return "application/x-font-ttf";
			default:
				return "application/stream";
		}
  
};

