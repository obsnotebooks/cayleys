var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
( function ( g ) {

  var t = {
      PLATFORM_WINDOWS: 'windows',
      PLATFORM_IPHONE: 'iphone',
      PLATFORM_IPOD: 'ipod',
      PLATFORM_IPAD: 'ipad',
      PLATFORM_BLACKBERRY: 'blackberry',
      PLATFORM_BLACKBERRY_10: 'blackberry_10',
      PLATFORM_SYMBIAN: 'symbian_series60',
      PLATFORM_SYMBIAN_S40: 'symbian_series40',
      PLATFORM_J2ME_MIDP: 'j2me_midp',
      PLATFORM_ANDROID: 'android',
      PLATFORM_ANDROID_TABLET: 'android_tablet',
      PLATFORM_FIREFOX_OS: 'firefoxOS',
      PLATFORM_MOBILE_GENERIC: 'mobile_generic',

      userAgent : false, // Shortcut to the browser User Agent String.
      matchedPlatformName : false, // Matched platform name. False otherwise.
      matchedUserAgentName : false, // Matched UA String. False otherwise.

      init: function() {
        try {
          t.userAgent = g.navigator.userAgent.toLowerCase();
          t.getPlatformName();
          t.getMobileUserAgentName();
        }	catch ( e ) {
          console.error( e );
        }
      },

      initForTest: function( userAgent ) {
        t.matchedPlatformName = false;
        t.matchedUserAgentName = false;
        try {
          t.userAgent = userAgent.toLowerCase();
          t.getPlatformName();
          t.getMobileUserAgentName();
        }	catch ( e ) {
          console.error( e );
        }
      },

      /**
       * This method detects the mobile User Agent name.
       */
      getMobileUserAgentName: function() {
        if ( t.matchedUserAgentName !== false )
          return t.matchedUserAgentName;

        if ( t.userAgent === false )
          return false;

        if ( t.isChromeForIOS() )
          t.matchedUserAgentName = 'chrome-for-ios';
        else if ( t.isTwitterForIpad() )
          t.matchedUserAgentName =  'twitter-for-ipad';
        else if ( t.isTwitterForIphone() )
          t.matchedUserAgentName =  'twitter-for-iphone';
        else if ( t.isIPhoneOrIPod() )
          t.matchedUserAgentName = 'iphone';
        else if ( t.isIPad() )
          t.matchedUserAgentName = 'ipad';
        else if ( t.isAndroidTablet() )
          t.matchedUserAgentName = 'android_tablet';
        else if ( t.isAndroid() )
          t.matchedUserAgentName = 'android';
        else if ( t.isBlackberry10() )
          t.matchedUserAgentName = 'blackberry_10';
        else if ( has( 'blackberry' ) )
          t.matchedUserAgentName = 'blackberry';
        else if ( t.isBlackberryTablet() )
          t.matchedUserAgentName = 'blackberry_tablet';
        else if ( t.isWindowsPhone7() )
          t.matchedUserAgentName = 'win7';
        else if ( t.isWindowsPhone8() )
          t.matchedUserAgentName = 'winphone8';
        else if ( t.isOperaMini() )
          t.matchedUserAgentName = 'opera-mini';
        else if ( t.isOperaMobile() )
          t.matchedUserAgentName = 'opera-mobi';
        else if ( t.isKindleFire() )
          t.matchedUserAgentName = 'kindle-fire';
        else if ( t.isSymbianPlatform() )
          t.matchedUserAgentName = 'series60';
        else if ( t.isFirefoxMobile() )
          t.matchedUserAgentName = 'firefox_mobile';
        else if ( t.isFirefoxOS() )
          t.matchedUserAgentName = 'firefoxOS';
        else if ( t.isFacebookForIphone() )
          t.matchedUserAgentName = 'facebook-for-iphone';
        else if ( t.isFacebookForIpad() )
          t.matchedUserAgentName = 'facebook-for-ipad';
        else if ( t.isWordPressForIos() )
          t.matchedUserAgentName = 'ios-app';
        else if ( has( 'iphone' ) )
          t.matchedUserAgentName = 'iphone-unknown';
        else if ( has( 'ipad' ) )
          t.matchedUserAgentName = 'ipad-unknown';

        return t.matchedUserAgentName;
      },

      /**
       * This method detects the mobile platform name.
       */
      getPlatformName : function() {
        if ( t.matchedPlatformName !== false )
          return t.matchedPlatformName;

        if ( t.userAgent === false )
          return false;

        if ( has( 'windows ce' ) || has( 'windows phone' ) ) {
          t.matchedPlatformName = t.PLATFORM_WINDOWS;
        } else if ( has( 'ipad' ) ) {
          t.matchedPlatformName = t.PLATFORM_IPAD;
        } else if ( has( 'ipod' ) ) {
          t.matchedPlatformName = t.PLATFORM_IPOD;
        } else if ( has( 'iphone' ) ) {
          t.matchedPlatformName = t.PLATFORM_IPHONE;
        } else if ( has( 'android' ) ) {
          if ( t.isAndroidTablet() )
            t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
          else
            t.matchedPlatformName = t.PLATFORM_ANDROID;
        } else if ( t.isKindleFire() ) {
          t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
        } else if ( t.isBlackberry10() ) {
          t.matchedPlatformName = t.PLATFORM_BLACKBERRY_10;
        } else if ( has( 'blackberry' ) ) {
          t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
        } else if ( t.isBlackberryTablet() ) {
          t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
        } else if ( t.isSymbianPlatform() ) {
          t.matchedPlatformName = t.PLATFORM_SYMBIAN;
        } else if ( t.isSymbianS40Platform() ) {
          t.matchedPlatformName = t.PLATFORM_SYMBIAN_S40;
        } else if ( t.isJ2MEPlatform() ) {
          t.matchedPlatformName = t.PLATFORM_J2ME_MIDP;
        } else if ( t.isFirefoxOS() ) {
          t.matchedPlatformName = t.PLATFORM_FIREFOX_OS;
        } else if ( t.isFirefoxMobile() ) {
          t.matchedPlatformName = t.PLATFORM_MOBILE_GENERIC;
        }

        return t.matchedPlatformName;
      },


      /**
       * Detect the BlackBerry OS version.
       *
       * Note: This is for smartphones only. Does not work on BB tablets.
       */
      getBlackBerryOSVersion : check( function() {
        if ( t.isBlackberry10() )
          return '10';

        if ( ! has( 'blackberry' ) )
          return false;

        var rv = -1; // Return value assumes failure.
        var re;

        if ( has( 'webkit' ) ) { // Detecting the BB OS version for devices running OS 6.0 or higher
          re = /Version\/([\d\.]+)/i;
        } else {
          // BlackBerry devices <= 5.XX
          re = /BlackBerry\w+\/([\d\.]+)/i;
        }
        if ( re.exec( t.userAgent ) != null )
          rv =  RegExp.$1.toString();

        return rv === -1 ? false : rv;
      } ),

      /**
       * Detects if the current UA is iPhone Mobile Safari or another iPhone or iPod Touch Browser.
       */
      isIPhoneOrIPod : check( function() {
        return has( 'safari' ) && ( has( 'iphone' ) || has( 'ipod' ) );
      } ),

      /**
       * Detects if the current device is an iPad.
       */
      isIPad : check( function() {
        return has( 'ipad' ) && has( 'safari' );
      } ),


      /**
      *  Detects if the current UA is Chrome for iOS
      */
      isChromeForIOS : check( function() {
        return t.isIPhoneOrIPod() && has( 'crios/' );
      } ),

      /**
       * Detects if the current browser is the Native Android browser.
       */
      isAndroid : check( function() {
        if ( has( 'android' ) ) {
          return ! ( t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile() );
        }
      } ),

      /**
       * Detects if the current browser is the Native Android Tablet browser.
       */
       isAndroidTablet : check( function() {
        if ( has( 'android' ) && ! has( 'mobile' ) ) {
          return ! ( t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile() );
        }
      } ),


      /**
       * Detects if the current browser is Opera Mobile
       */
      isOperaMobile : check( function() {
        return has( 'opera' ) && has( 'mobi' );
      } ),

      /**
       * Detects if the current browser is Opera Mini
       */
      isOperaMini : check( function() {
        return has( 'opera' ) && has( 'mini' );
      } ),


      /**
       * isBlackberry10() can be used to check the User Agent for a BlackBerry 10 device.
       */
      isBlackberry10 : check( function() {
        return has( 'bb10' ) && has( 'mobile' );
      } ),

      /**
       * isBlackberryTablet() can be used to check the User Agent for a RIM blackberry tablet
       */
      isBlackberryTablet : check( function() {
        return has( 'playbook' ) && has( 'rim tablet' );
      } ),

      /**
       * Detects if the current browser is a Windows Phone 7 device.
       */
      isWindowsPhone7 : check( function () {
        return has( 'windows phone os 7' );
      } ),

      /**
       * Detects if the current browser is a Windows Phone 8 device.
       */
      isWindowsPhone8 : check( function () {
        return has( 'windows phone 8' );
      } ),

      /**
       * Detects if the device platform is J2ME.
       */
      isJ2MEPlatform : check( function () {
        return has( 'j2me/midp' ) || ( has( 'midp' ) && has( 'cldc' ) );
      } ),


      /**
       * Detects if the device platform is the Symbian Series 40.
       */
      isSymbianS40Platform : check( function() {
        if ( has( 'series40' ) ) {
          return has( 'nokia' ) || has( 'ovibrowser' ) || has( 'nokiabrowser' );
        }
      } ),


      /**
       * Detects if the device platform is the Symbian Series 60.
       */
      isSymbianPlatform : check( function() {
        if ( has( 'webkit' ) ) {
          // First, test for WebKit, then make sure it's either Symbian or S60.
          return has( 'symbian' ) || has( 'series60' );
        } else if ( has( 'symbianos' ) && has( 'series60' ) ) {
          return true;
        } else if ( has( 'nokia' ) && has( 'series60' ) ) {
          return true;
        } else if ( has( 'opera mini' ) ) {
          return has( 'symbianos' ) || has( 'symbos' ) || has( 'series 60' );
        }
      } ),


      /**
       * Detects if the current browser is the Kindle Fire Native browser.
       */
      isKindleFire : check( function() {
        return has( 'silk/' ) && has( 'silk-accelerated=' );
      } ),

      /**
       * Detects if the current browser is Firefox Mobile (Fennec)
       */
      isFirefoxMobile : check( function() {
        return has( 'fennec' );
      } ),


      /**
       * Detects if the current browser is the native FirefoxOS browser
       */
      isFirefoxOS : check( function() {
        return has( 'mozilla' ) && has( 'mobile' ) && has( 'gecko' ) && has( 'firefox' );
      } ),


      /**
       * Detects if the current UA is Facebook for iPad
       */
      isFacebookForIpad : check( function() {
        if ( ! has( 'ipad' ) )
          return false;

        return has( 'facebook' ) || has( 'fbforiphone' ) || has( 'fban/fbios;' );
      } ),

      /**
       * Detects if the current UA is Facebook for iPhone
       */
      isFacebookForIphone : check( function() {
        if ( ! has( 'iphone' ) )
          return false;

        return ( has( 'facebook' ) && ! has( 'ipad' ) ) ||
          ( has( 'fbforiphone' ) && ! has( 'tablet' ) ) ||
          ( has( 'fban/fbios;' ) && ! has( 'tablet' ) ); // FB app v5.0 or higher
      } ),

      /**
       * Detects if the current UA is Twitter for iPhone
       */
      isTwitterForIphone : check( function() {
        if ( has( 'ipad' ) )
          return false;

        return has( 'twitter for iphone' );
      } ),

      /**
       * Detects if the current UA is Twitter for iPad
       */
      isTwitterForIpad : check( function() {
        return has( 'twitter for ipad' ) || ( has( 'ipad' ) && has( 'twitter for iphone' ) );
      } ),


      /**
       * Detects if the current UA is WordPress for iOS
       */
      isWordPressForIos : check( function() {
        return has( 'wp-iphone' );
      } )
  };

  function has( str ) {
    return t.userAgent.indexOf( str ) != -1;
  }

  function check( fn ) {
    return function() {
      return t.userAgent === false ? false : fn() || false;
    }
  }

  g.wpcom_mobile_user_agent_info = t;

} )( typeof window !== 'undefined' ? window : this );
;
!function(){"use strict";var t={response:null,getEndpointURL:function(t){var e,s="undefined"!=typeof wp&&wp.customize&&wp.customize.settings&&wp.customize.settings.url&&wp.customize.settings.url.self;s?(e=document.createElement("a")).href=wp.customize.settings.url.self:e=document.location,"string"==typeof t&&t.match(/^https?:\/\//)&&((e=document.createElement("a")).href=t);var a="relatedposts=1",o=document.querySelector("#jp-relatedposts");if(!o)return!1;o.hasAttribute("data-exclude")&&(a+="&relatedposts_exclude="+o.getAttribute("data-exclude")),s&&(a+="&jetpackrpcustomize=1");var r=e.pathname;return"/"!==r[0]&&(r="/"+r),""===e.search?r+"?"+a:r+e.search+"&"+a},getAnchor:function(t,e){var s=t.title,a=document.createElement("a");a.setAttribute("class",e),a.setAttribute("href",t.url),a.setAttribute("title",s),a.setAttribute("data-origin",t.url_meta.origin),a.setAttribute("data-position",t.url_meta.position),""!==t.rel&&a.setAttribute("rel",t.rel);var o=document.createElement("div");o.appendChild(a);var r=o.innerHTML;return[r.substring(0,r.length-4),"</a>"]},generateMinimalHtml:function(t,e){var s=this,a="";return t.forEach((function(t,o){var r=s.getAnchor(t,"jp-relatedposts-post-a"),p="jp-relatedposts-post jp-relatedposts-post"+o;t.classes.length>0&&(p+=" "+t.classes.join(" ")),a+='<p class="'+p+'" data-post-id="'+t.id+'" data-post-format="'+t.format+'">',a+='<span class="jp-relatedposts-post-title">'+r[0]+t.title+r[1]+"</span>",e.showDate&&(a+='<time class="jp-relatedposts-post-date" datetime="'+t.date+'">'+t.date+"</time>"),e.showContext&&(a+='<span class="jp-relatedposts-post-context">'+t.context+"</span>"),a+="</p>"})),'<div class="jp-relatedposts-items jp-relatedposts-items-minimal jp-relatedposts-'+e.layout+' ">'+a+"</div>"},generateVisualHtml:function(t,e){var s=this,a="";return t.forEach((function(t,o){var r=s.getAnchor(t,"jp-relatedposts-post-a"),p="jp-relatedposts-post jp-relatedposts-post"+o;t.classes.length>0&&(p+=" "+t.classes.join(" ")),t.img.src?p+=" jp-relatedposts-post-thumbs":p+=" jp-relatedposts-post-nothumbs";var n=document.createElement("p");n.innerHTML=t.excerpt;var i=n.textContent;if(a+='<div class="'+p+'" data-post-id="'+t.id+'" data-post-format="'+t.format+'">',t.img.src)a+=r[0]+'<img class="jp-relatedposts-post-img" loading="lazy" src="'+t.img.src+'" width="'+t.img.width+'" height="'+t.img.height+'" alt="'+t.img.alt_text+'" />'+r[1];else{var l=s.getAnchor(t,"jp-relatedposts-post-a jp-relatedposts-post-aoverlay");a+=l[0]+l[1]}a+="<"+related_posts_js_options.post_heading+' class="jp-relatedposts-post-title">'+r[0]+t.title+r[1]+"</"+related_posts_js_options.post_heading+">",a+='<p class="jp-relatedposts-post-excerpt">'+i+"</p>",e.showDate&&(a+='<time class="jp-relatedposts-post-date" datetime="'+t.date+'">'+t.date+"</time>"),e.showContext&&(a+='<p class="jp-relatedposts-post-context">'+t.context+"</p>"),a+="</div>"})),'<div class="jp-relatedposts-items jp-relatedposts-items-visual jp-relatedposts-'+e.layout+' ">'+a+"</div>"},setVisualExcerptHeights:function(){var t=document.querySelectorAll("#jp-relatedposts .jp-relatedposts-post-nothumbs .jp-relatedposts-post-excerpt");if(t.length)for(var e=getComputedStyle(t[0]),s=parseInt(e.fontSize,10),a=parseInt(e.lineHeight,10),o=0;o<t.length;o++)t[o].style.maxHeight=5*a/s+"em"},getTrackedUrl:function(t){var e="relatedposts_hit=1";e+="&relatedposts_origin="+t.getAttribute("data-origin"),e+="&relatedposts_position="+t.getAttribute("data-position");var s=t.pathname;return"/"!==s[0]&&(s="/"+s),""===t.search?s+"?"+e:s+t.search+"&"+e},cleanupTrackedUrl:function(){if("function"==typeof history.replaceState){var t=document.location.search.replace(/\brelatedposts_[a-z]+=[0-9]*&?\b/gi,"");"?"===t&&(t=""),document.location.search!==t&&history.replaceState({},document.title,document.location.pathname+t)}}};function e(){t.setVisualExcerptHeights();var e=document.querySelectorAll("#jp-relatedposts a.jp-relatedposts-post-a");Array.prototype.forEach.call(e,(function(e){document.addEventListener("click",(function(){e.href=t.getTrackedUrl(e)}))}))}function s(){t.cleanupTrackedUrl();var s=t.getEndpointURL(),a=document.querySelector("#jp-relatedposts");if(s)if(document.querySelectorAll("#jp-relatedposts .jp-relatedposts-post").length)e();else{var o=new XMLHttpRequest;o.open("GET",s,!0),o.setRequestHeader("x-requested-with","XMLHttpRequest"),o.onreadystatechange=function(){if(this.readyState===XMLHttpRequest.DONE&&200===this.status)try{var s=JSON.parse(o.responseText);if(0===s.items.length||0===a.length)return;t.response=s;var r,p,n={};"undefined"!=typeof wp&&wp.customize?(p=wp.customize.instance("jetpack_relatedposts[show_thumbnails]").get(),n.showDate=wp.customize.instance("jetpack_relatedposts[show_date]").get(),n.showContext=wp.customize.instance("jetpack_relatedposts[show_context]").get(),n.layout=wp.customize.instance("jetpack_relatedposts[layout]").get()):(p=s.show_thumbnails,n.showDate=s.show_date,n.showContext=s.show_context,n.layout=s.layout),r=p?t.generateVisualHtml(s.items,n):t.generateMinimalHtml(s.items,n);var i=document.createElement("div");if(a.appendChild(i),i.outerHTML=r,n.showDate){var l=a.querySelectorAll(".jp-relatedposts-post-date");Array.prototype.forEach.call(l,(function(t){t.style.display="block"}))}a.style.display="block",e()}catch(t){}},o.send()}}function a(){"undefined"!=typeof wp&&wp.customize?(wp.customize.selectiveRefresh&&wp.customize.selectiveRefresh.bind("partial-content-rendered",(function(t){"jetpack_relatedposts"===t.partial.id&&s()})),wp.customize.bind("preview-ready",s)):s()}"loading"!==document.readyState?a():document.addEventListener("DOMContentLoaded",a)}();;
// listen for rlt authentication events and pass them to children of this document.
( function() {
	var currentToken;
	var parentOrigin;
	var iframeOrigins;
	var initializationListeners = [];
	var hasBeenInitialized = false;
	var RLT_KEY = 'jetpack:wpcomRLT';

	// IE11 compat version that doesn't require on `new URL( src )`
	function getOriginFromUrl( url ) {
		var parser = document.createElement('a');
		parser.href = url;
		return parser.origin;
	}

	// run on `load` for suitable iframes, this injects the current token if available
	function rltIframeInjector( event ) {
		if ( ! currentToken ) {
			return;
		}
		rltInjectToken( currentToken, event.target.contentWindow, getOriginFromUrl( event.target.src ) );
	}

	// run on DOMContentLoaded or later
	function rltMonitorIframes() {
		// wait until suitable iframes are loaded before trying to inject the RLT
		var iframes = document.querySelectorAll( "iframe" );
		for( var i=0; i<iframes.length; i++ ) {
			var iframe = iframes[i];
			if ( rltShouldAuthorizeIframe( iframe ) ) {
				iframe.addEventListener('load', rltIframeInjector);
			}
		}

		// listen for newly-created iframes, since some are injected dynamically
		var observer = new MutationObserver(function( mutationsList, observer ) {
			for(var i=0; i<mutationsList.length; i++) {
				var mutation = mutationsList[i];
				if (mutation.type === 'childList') {
					for(var j=0; j<mutation.addedNodes.length; j++) {
						var node = mutation.addedNodes[j];
						if (node instanceof HTMLElement && node.nodeName === 'IFRAME' && rltShouldAuthorizeIframe(node)) {
							node.addEventListener('load', rltIframeInjector);
						}
					}
				}
			}
		});

		observer.observe(document.body, { subtree: true, childList: true });
	}

	// should we inject RLT into this iframe?
	function rltShouldAuthorizeIframe( iframe ) {
		if ( ! Array.isArray( iframeOrigins ) ) {
			return;
		}
		return iframeOrigins.indexOf( getOriginFromUrl( iframe.src ) ) >= 0;
	}

	function rltInvalidateWindowToken( token, target, origin ) {
		if ( target && typeof target.postMessage === 'function' ) {
			try {
				target.postMessage( JSON.stringify( {
					type: 'rltMessage',
					data: {
						event: 'invalidate',
						token: token,
						sourceOrigin: window.location.origin,
					},
				} ), origin );
			} catch ( err ) {
				return;
			}
		}
	}

	/**
	 * PUBLIC METHODS
	 */
	window.rltInvalidateToken = function( token, sourceOrigin ) {
		// invalidate in current context
		if ( token === currentToken ) {
			currentToken = null;
		}

		// remove from localstorage, but only if in a top level window, not iframe
		try {
			if ( window.location === window.parent.location && window.localStorage ) {
				if ( window.localStorage.getItem(RLT_KEY) === token ) {
					window.localStorage.removeItem(RLT_KEY);
				}
			}
		} catch( e ) {
			console.info("localstorage access for invalidate denied - probably blocked third-party access", window.location.href);
		}

		// invalidate in iframes
		var iframes = document.querySelectorAll("iframe");
		for( var i=0; i<iframes.length; i++ ) {
			var iframe = iframes[i];
			var iframeOrigin = getOriginFromUrl( iframe.src );
			if ( iframeOrigin !== sourceOrigin && rltShouldAuthorizeIframe( iframe ) ) {
				rltInvalidateWindowToken( token, iframe.contentWindow, iframeOrigin );
			}
		}

		// invalidate in parent
		if ( parentOrigin && parentOrigin !== sourceOrigin && window.parent ) {
			rltInvalidateWindowToken( token, window.parent, parentOrigin );
		}
	}

	window.rltInjectToken = function( token, target, origin ) {
		if ( target && typeof target.postMessage === 'function' ) {
			try {
				target.postMessage( JSON.stringify( {
					type: 'loginMessage',
					data: {
						event: 'login',
						success: true,
						type: 'rlt',
						token: token,
						sourceOrigin: window.location.origin,
					},
				} ), origin );
			} catch ( err ) {
				return;
			}
		}
	};

	window.rltIsAuthenticated = function() {
		return !! currentToken;
	};

	window.rltGetToken = function() {
		return currentToken;
	};

	window.rltAddInitializationListener = function( listener ) {
		// if RLT is already initialized, call the listener immediately
		if ( hasBeenInitialized ) {
			listener( currentToken );
		} else {
			initializationListeners.push( listener );
		}
	};

	// store the token in localStorage
	window.rltStoreToken = function( token ) {
		currentToken = token;
		try {
			if ( window.location === window.parent.location && window.localStorage ) {
				window.localStorage.setItem( RLT_KEY, token );
			}
		} catch( e ) {
			console.info("localstorage access denied - probably blocked third-party access", window.location.href);
		}
	}

	window.rltInitialize = function( config ) {
		if ( ! config || typeof window.postMessage !== 'function' ) {
			return;
		}

		currentToken  = config.token;
		iframeOrigins = config.iframeOrigins;
		parentOrigin  = config.parentOrigin; // needed?

		// load token from localStorage if possible, but only in top level window
		try {
			if ( ! currentToken && window.location === window.parent.location && window.localStorage ) {
				currentToken = window.localStorage.getItem(RLT_KEY);
			}
		} catch( e ) {
			console.info("localstorage access denied - probably blocked third-party access", window.location.href);
		}

		// listen for RLT events from approved origins
		window.addEventListener( 'message', function( e ) {
			var message = e && e.data;
			if ( typeof message === 'string' ) {
				try {
					message = JSON.parse( message );
				} catch ( err ) {
					return;
				}
			}

			var type = message && message.type;
			var data = message && message.data;

			if ( type !== 'loginMessage' ) {
				return;
			}

			if ( data && data.type === 'rlt' && data.token !== currentToken ) {

				// put into localStorage if running in top-level window (not iframe)
				rltStoreToken( data.token );

				// send to allowlisted iframes
				var iframes = document.querySelectorAll("iframe");
				for( var i=0; i<iframes.length; i++ ) {
					var iframe = iframes[i];
					if ( rltShouldAuthorizeIframe( iframe ) ) {
						rltInjectToken( currentToken, iframe.contentWindow, getOriginFromUrl( iframe.src ) );
					}
				}

				// send to the parent, unless the event was sent _by_ the parent
				if ( parentOrigin && parentOrigin !== data.sourceOrigin && window.parent ) {
					rltInjectToken( currentToken, window.parent, parentOrigin );
				}
			}
		} );

		// listen for RLT events from approved origins
		window.addEventListener( 'message', function( e ) {
			var message = e && e.data;
			if ( typeof message === 'string' ) {
				try {
					message = JSON.parse( message );
				} catch ( err ) {
					return;
				}
			}

			var type = message && message.type;
			var data = message && message.data;

			if ( type !== 'rltMessage' ) {
				return;
			}

			if ( data && data.event === 'invalidate' && data.token === currentToken ) {
				rltInvalidateToken( data.token );
			}
		} );

		if ( iframeOrigins ) {
			if ( document.readyState !== 'loading' ) {
				rltMonitorIframes();
			} else {
				window.addEventListener( 'DOMContentLoaded', rltMonitorIframes );
			}
		}

		initializationListeners.forEach( function( listener ) {
			listener( currentToken );
		} );

		initializationListeners = [];

		hasBeenInitialized = true;
	};
} )();
;
/**
* @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
;(function(window, document) {
/*jshint evil:true */
  /** version */
  var version = '3.7.3';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
        supportsHtml5Styles = ('hidden' in a);

        supportsUnknownElements = a.childNodes.length == 1 || (function() {
          // assign a false positive if unable to shiv
          (document.createElement)('a');
          var frag = document.createDocumentFragment();
          return (
            typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
          );
        }());
    } catch(e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Extends the built-in list of html5 elements
   * @memberOf html5
   * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
   * @param {Document} ownerDocument The context document.
   */
  function addElements(newElements, ownerDocument) {
    var elements = html5.elements;
    if(typeof elements != 'string'){
      elements = elements.join(' ');
    }
    if(typeof newElements != 'string'){
      newElements = newElements.join(' ');
    }
    html5.elements = elements +' '+ newElements;
    shivDocument(ownerDocument);
  }

   /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
        data = {};
        expanID++;
        ownerDocument[expando] = expanID;
        expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document|DocumentFragment} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createElement(nodeName);
    }
    if (!data) {
        data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
        node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length;
    for(;i<l;i++){
        clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
        data.cache = {};
        data.createElem = ownerDocument.createElement;
        data.createFrag = ownerDocument.createDocumentFragment;
        data.frag = data.createFrag();
    }


    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
          return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
      ');return n}'
    )(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
        ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}' +
        // hides non-rendered elements
        'template{display:none}'
      );
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

    /**
     * current version of html5shiv
     */
    'version': version,

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': (options.shivCSS !== false),

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': (options.shivMethods !== false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment,

    //extends list of elements
    addElements: addElements
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

  if(typeof module == 'object' && module.exports){
    module.exports = html5;
  }

}(typeof window !== "undefined" ? window : this, document));;
window.__tcfapi=function(){let e=[].slice.call(arguments),t=e[0],n=e[2];"ping"===t?"function"==typeof n&&n({gdprApplies:!1,cmpLoaded:!1,cmpStatus:"stub",displayStatus:"disabled",apiVersion:"2"}):"getTCData"!==t&&"addEventListener"!==t||"function"==typeof n&&n({gdprApplies:!1,tcfPolicyVersion:2,cmpId:258,cmpVersion:1},!0)},window.addEventListener("message",(function(e){let t="string"==typeof e.data,n={};try{n=t?JSON.parse(e.data):e.data}catch(e){}let a=n.__tcfapiCall;a&&window.__tcfapi(a.command,a.version,(function(n,c){let s={__tcfapiReturn:{returnValue:n,success:c,callId:a.callId}};t&&(s=JSON.stringify(s)),e&&e.source&&e.source.postMessage&&e.source.postMessage(s,"*")}),a.parameter)}),!1),document.addEventListener("DOMContentLoaded",(function(){!function(){const e=document.createElement("iframe");e.style.cssText="display:none",e.name="__tcfapiLocator",document.body.appendChild(e)}()}));;

}

/*
     FILE ARCHIVED ON 05:25:32 Jun 04, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:25:34 Aug 30, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.43
  load_resource: 158.836
  PetaboxLoader3.resolve: 55.257
  PetaboxLoader3.datanode: 18.658
*/