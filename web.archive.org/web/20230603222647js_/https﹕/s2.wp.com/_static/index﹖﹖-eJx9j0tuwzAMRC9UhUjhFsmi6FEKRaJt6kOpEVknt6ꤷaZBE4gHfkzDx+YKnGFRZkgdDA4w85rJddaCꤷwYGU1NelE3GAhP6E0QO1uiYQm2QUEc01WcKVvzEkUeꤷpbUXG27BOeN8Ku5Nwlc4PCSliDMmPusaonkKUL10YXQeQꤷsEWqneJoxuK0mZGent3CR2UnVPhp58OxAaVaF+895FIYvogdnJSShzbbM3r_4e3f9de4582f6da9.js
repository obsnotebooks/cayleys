var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/* Detect-zoom
 * -----------
 * Cross Browser Zoom and Pixel Ratio Detector
 * Version 1.0.4 | Apr 1 2013
 * dual-licensed under the WTFPL and MIT license
 * Maintained by https://github/tombigel
 * Original developer https://github.com/yonran
 */

//AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
(function (root, ns, factory) {
    "use strict";

    if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(ns, root);
    } else if (typeof (define) === 'function' && define.amd) { // AMD
        define("factory", function () {
            return factory(ns, root);
        });
    } else {
        root[ns] = factory(ns, root);
    }

}(window, 'detectZoom', function () {

    /**
     * Use devicePixelRatio if supported by the browser
     * @return {Number}
     * @private
     */
    var devicePixelRatio = function () {
        return window.devicePixelRatio || 1;
    };

    /**
     * Fallback function to set default values
     * @return {Object}
     * @private
     */
    var fallback = function () {
        return {
            zoom: 1,
            devicePxPerCssPx: 1
        };
    };
    /**
     * IE 8 and 9: no trick needed!
     * TODO: Test on IE10 and Windows 8 RT
     * @return {Object}
     * @private
     **/
    var ie8 = function () {
        var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * For IE10 we need to change our technique again...
     * thanks https://github.com/stefanvanburen
     * @return {Object}
     * @private
     */
    var ie10 = function () {
        var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Mobile WebKit
     * the trick: window.innerWIdth is in CSS pixels, while
     * screen.width and screen.height are in system pixels.
     * And there are no scrollbars to mess up the measurement.
     * @return {Object}
     * @private
     */
    var webkitMobile = function () {
        var deviceWidth = (Math.abs(window.orientation) == 90) ? screen.height : screen.width;
        var zoom = deviceWidth / window.innerWidth;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Desktop Webkit
     * the trick: an element's clientHeight is in CSS pixels, while you can
     * set its line-height in system pixels using font-size and
     * -webkit-text-size-adjust:none.
     * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
     *
     * Previous trick (used before http://trac.webkit.org/changeset/100847):
     * documentElement.scrollWidth is in CSS pixels, while
     * document.width was in system pixels. Note that this is the
     * layout width of the document, which is slightly different from viewport
     * because document width does not include scrollbars and might be wider
     * due to big elements.
     * @return {Object}
     * @private
     */
    var webkit = function () {
        var important = function (str) {
            return str.replace(/;/g, " !important;");
        };

        var div = document.createElement('div');
        div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
        div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));

        // The container exists so that the div will be laid out in its own flow
        // while not impacting the layout, viewport size, or display of the
        // webpage as a whole.
        // Add !important and relevant CSS rule resets
        // so that other rules cannot affect the results.
        var container = document.createElement('div');
        container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
        container.appendChild(div);

        document.body.appendChild(container);
        var zoom = 1000 / div.clientHeight;
        zoom = Math.round(zoom * 100) / 100;
        document.body.removeChild(container);

        return{
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
     * (Note that this is a different interpretation than Webkit's device
     * pixel ratio, which is the ratio device dpi / system dpi).
     *
     * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
     *
     * @return {Object}
     * @private
     */
    var firefox4 = function () {
        var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom
        };
    };

    /**
     * Firefox 18.x
     * Mozilla added support for devicePixelRatio to Firefox 18,
     * but it is affected by the zoom level, so, like in older
     * Firefox we can't tell if we are in zoom mode or in a device
     * with a different pixel ratio
     * @return {Object}
     * @private
     */
    var firefox18 = function () {
        return {
            zoom: firefox4().zoom,
            devicePxPerCssPx: devicePixelRatio()
        };
    };

    /**
     * works starting Opera 11.11
     * the trick: outerWidth is the viewport width including scrollbars in
     * system px, while innerWidth is the viewport width including scrollbars
     * in CSS px
     * @return {Object}
     * @private
     */
    var opera11 = function () {
        var zoom = window.top.outerWidth / window.top.innerWidth;
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Use a binary search through media queries to find zoom level in Firefox
     * @param property
     * @param unit
     * @param a
     * @param b
     * @param maxIter
     * @param epsilon
     * @return {Number}
     */
    var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
        var matchMedia;
        var head, style, div;
        if (window.matchMedia) {
            matchMedia = window.matchMedia;
        } else {
            head = document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            head.appendChild(style);

            div = document.createElement('div');
            div.className = 'mediaQueryBinarySearch';
            div.style.display = 'none';
            document.body.appendChild(div);

            matchMedia = function (query) {
                style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
                var matched = getComputedStyle(div, null).textDecoration == 'underline';
                style.sheet.deleteRule(0);
                return {matches: matched};
            };
        }
        var ratio = binarySearch(a, b, maxIter);
        if (div) {
            head.removeChild(style);
            document.body.removeChild(div);
        }
        return ratio;

        function binarySearch(a, b, maxIter) {
            var mid = (a + b) / 2;
            if (maxIter <= 0 || b - a < epsilon) {
                return mid;
            }
            var query = "(" + property + ":" + mid + unit + ")";
            if (matchMedia(query).matches) {
                return binarySearch(mid, b, maxIter - 1);
            } else {
                return binarySearch(a, mid, maxIter - 1);
            }
        }
    };

    /**
     * Generate detection function
     * @private
     */
    var detectFunction = (function () {
        var func = fallback;
        //IE8+
        if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
            func = ie8;
        }
        // IE10+ / Touch
        else if (window.navigator.msMaxTouchPoints) {
            func = ie10;
        }
        //Mobile Webkit
        else if ('orientation' in window && typeof document.body.style.webkitMarquee === 'string') {
            func = webkitMobile;
        }
        //WebKit
        else if (typeof document.body.style.webkitMarquee === 'string') {
            func = webkit;
        }
        //Opera
        else if (navigator.userAgent.indexOf('Opera') >= 0) {
            func = opera11;
        }
        //Last one is Firefox
        //FF 18.x
        else if (window.devicePixelRatio) {
            func = firefox18;
        }
        //FF 4.0 - 17.x
        else if (firefox4().zoom > 0.001) {
            func = firefox4;
        }

        return func;
    }());


    return ({

        /**
         * Ratios.zoom shorthand
         * @return {Number} Zoom level
         */
        zoom: function () {
            return detectFunction().zoom;
        },

        /**
         * Ratios.devicePxPerCssPx shorthand
         * @return {Number} devicePxPerCssPx level
         */
        device: function () {
            return detectFunction().devicePxPerCssPx;
        }
    });
}));

var wpcom_img_zoomer = {
        clientHintSupport: {
                gravatar: false,
                files: false,
                photon: false,
                mshots: false,
                staticAssets: false,
                latex: false,
                imgpress: false,
        },
	useHints: false,
	zoomed: false,
	timer: null,
	interval: 1000, // zoom polling interval in millisecond

	// Should we apply width/height attributes to control the image size?
	imgNeedsSizeAtts: function( img ) {
		// Do not overwrite existing width/height attributes.
		if ( img.getAttribute('width') !== null || img.getAttribute('height') !== null )
			return false;
		// Do not apply the attributes if the image is already constrained by a parent element.
		if ( img.width < img.naturalWidth || img.height < img.naturalHeight )
			return false;
		return true;
	},

        hintsFor: function( service ) {
                if ( this.useHints === false ) {
                        return false;
                }
                if ( this.hints() === false ) {
                        return false;
                }
                if ( typeof this.clientHintSupport[service] === "undefined" ) {
                        return false;
                }
                if ( this.clientHintSupport[service] === true ) {
                        return true;
                }
                return false;
        },

	hints: function() {
		try {
			var chrome = window.navigator.userAgent.match(/\sChrome\/([0-9]+)\.[.0-9]+\s/)
			if (chrome !== null) {
				var version = parseInt(chrome[1], 10)
				if (isNaN(version) === false && version >= 46) {
					return true
				}
			}
		} catch (e) {
			return false
		}
		return false
	},

	init: function() {
		var t = this;
		try{
			t.zoomImages();
			t.timer = setInterval( function() { t.zoomImages(); }, t.interval );
		}
		catch(e){
		}
	},

	stop: function() {
		if ( this.timer )
			clearInterval( this.timer );
	},

	getScale: function() {
		var scale = detectZoom.device();
		// Round up to 1.5 or the next integer below the cap.
		if      ( scale <= 1.0 ) scale = 1.0;
		else if ( scale <= 1.5 ) scale = 1.5;
		else if ( scale <= 2.0 ) scale = 2.0;
		else if ( scale <= 3.0 ) scale = 3.0;
		else if ( scale <= 4.0 ) scale = 4.0;
		else                     scale = 5.0;
		return scale;
	},

	shouldZoom: function( scale ) {
		var t = this;
		// Do not operate on hidden frames.
		if ( "innerWidth" in window && !window.innerWidth )
			return false;
		// Don't do anything until scale > 1
		if ( scale == 1.0 && t.zoomed == false )
			return false;
		return true;
	},

	zoomImages: function() {
		var t = this;
		var scale = t.getScale();
		if ( ! t.shouldZoom( scale ) ){
			return;
		}
		t.zoomed = true;
		// Loop through all the <img> elements on the page.
		var imgs = document.getElementsByTagName("img");

		for ( var i = 0; i < imgs.length; i++ ) {
			// Wait for original images to load
			if ( "complete" in imgs[i] && ! imgs[i].complete )
				continue;

			// Skip images that have srcset attributes.
			if ( imgs[i].hasAttribute('srcset') ) {
				continue;
			}

			// Skip images that don't need processing.
			var imgScale = imgs[i].getAttribute("scale");
			if ( imgScale == scale || imgScale == "0" )
				continue;

			// Skip images that have already failed at this scale
			var scaleFail = imgs[i].getAttribute("scale-fail");
			if ( scaleFail && scaleFail <= scale )
				continue;

			// Skip images that have no dimensions yet.
			if ( ! ( imgs[i].width && imgs[i].height ) )
				continue;

			// Skip images from Lazy Load plugins
			if ( ! imgScale && imgs[i].getAttribute("data-lazy-src") && (imgs[i].getAttribute("data-lazy-src") !== imgs[i].getAttribute("src")))
				continue;

			if ( t.scaleImage( imgs[i], scale ) ) {
				// Mark the img as having been processed at this scale.
				imgs[i].setAttribute("scale", scale);
			}
			else {
				// Set the flag to skip this image.
				imgs[i].setAttribute("scale", "0");
			}
		}
	},

	scaleImage: function( img, scale ) {
		var t = this;
		var newSrc = img.src;

                var isFiles = false;
                var isLatex = false;
                var isPhoton = false;

		// Skip slideshow images
		if ( img.parentNode.className.match(/slideshow-slide/) )
			return false;

		// Skip CoBlocks Lightbox images
		if ( img.parentNode.className.match(/coblocks-lightbox__image/) )
			return false;

		// Scale gravatars that have ?s= or ?size=
		if ( img.src.match( /^https?:\/\/([^\/]*\.)?gravatar\.com\/.+[?&](s|size)=/ ) ) {
                        if ( this.hintsFor( "gravatar" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&](s|size)=)(\d+)/, function( $0, $1, $2, $3 ) {
				// Stash the original size
				var originalAtt = "originals",
				originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $3;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(img.clientWidth * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go larger than the service supports
				targetSize = Math.min( targetSize, 512 );
				return $1 + targetSize;
			});
		}

		// Scale mshots that have width
		else if ( img.src.match(/^https?:\/\/([^\/]+\.)*(wordpress|wp)\.com\/mshots\/.+[?&]w=\d+/) ) {
                        if ( this.hintsFor( "mshots" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&]w=)(\d+)/, function($0, $1, $2) {
				// Stash the original size
				var originalAtt = 'originalw', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalWidth )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});

			// Update height attribute to match width
			newSrc = newSrc.replace( /([?&]h=)(\d+)/, function($0, $1, $2) {
				if ( newSrc == img.src ) {
					return $0;
				}
				// Stash the original size
				var originalAtt = 'originalh', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
				}
				// Get the height of the image in CSS pixels
				var size = img.clientHeight;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalHeight )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});
		}

		// Scale simple imgpress queries (s0.wp.com) that only specify w/h/fit
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/imgpress\?(.+)/) ) {
                        if ( this.hintsFor( "imgpress" ) === true ) {
                                return false; 
                        }
			var imgpressSafeFunctions = ["zoom", "url", "h", "w", "fit", "filter", "brightness", "contrast", "colorize", "smooth", "unsharpmask"];
			// Search the query string for unsupported functions.
			var qs = RegExp.$3.split('&');
			for ( var q in qs ) {
				q = qs[q].split('=')[0];
				if ( imgpressSafeFunctions.indexOf(q) == -1 ) {
					return false;
				}
			}
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale files.wordpress.com, LaTeX, or Photon images (i#.wp.com)
		else if (
			( isFiles = img.src.match(/^https?:\/\/([^\/]+)\.files\.wordpress\.com\/.+[?&][wh]=/) ) ||
			( isLatex = img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/latex\.php\?(latex|zoom)=(.+)/) ) ||
			( isPhoton = img.src.match(/^https?:\/\/i[\d]{1}\.wp\.com\/(.+)/) )
		) {
                        if ( false !== isFiles && this.hintsFor( "files" ) === true ) {
                                return false
                        }
                        if ( false !== isLatex && this.hintsFor( "latex" ) === true ) {
                                return false
                        }
                        if ( false !== isPhoton && this.hintsFor( "photon" ) === true ) {
                                return false
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 ) {
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			} else {
				newSrc = img.src;

				var url_var = newSrc.match( /([?&]w=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.width );
				}

				url_var = newSrc.match( /([?&]h=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.height );
				}

				var zoom_arg = '&zoom=2';
				if ( !newSrc.match( /\?/ ) ) {
					zoom_arg = '?zoom=2';
				}
				img.setAttribute( 'srcset', newSrc + zoom_arg + ' ' + scale + 'x' );
			}
		}

		// Scale static assets that have a name matching *-1x.png or *@1x.png
		else if ( img.src.match(/^https?:\/\/[^\/]+\/.*[-@]([12])x\.(gif|jpeg|jpg|png)(\?|$)/) ) {
                        if ( this.hintsFor( "staticAssets" ) === true ) {
                                return false; 
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			var currentSize = RegExp.$1, newSize = currentSize;
			if ( scale <= 1 )
				newSize = 1;
			else
				newSize = 2;
			if ( currentSize != newSize )
				newSrc = img.src.replace(/([-@])[12]x\.(gif|jpeg|jpg|png)(\?|$)/, '$1'+newSize+'x.$2$3');
		}

		else {
			return false;
		}

		// Don't set img.src unless it has changed. This avoids unnecessary reloads.
		if ( newSrc != img.src ) {
			// Store the original img.src
			var prevSrc, origSrc = img.getAttribute("src-orig");
			if ( !origSrc ) {
				origSrc = img.src;
				img.setAttribute("src-orig", origSrc);
			}
			// In case of error, revert img.src
			prevSrc = img.src;
			img.onerror = function(){
				img.src = prevSrc;
				if ( img.getAttribute("scale-fail") < scale )
					img.setAttribute("scale-fail", scale);
				img.onerror = null;
			};
			// Finally load the new image
			img.src = newSrc;
		}

		return true;
	}
};

wpcom_img_zoomer.init();
;
( function() {
	var cookieValue = document.cookie.replace( /(?:(?:^|.*;\s*)eucookielaw\s*\=\s*([^;]*).*$)|^.*$/, '$1' );
	var overlay = document.querySelector( '#eu-cookie-law' );
	var container = document.querySelector( '.widget_eu_cookie_law_widget' );
	var initialScrollPosition, scrollFunction;

	function remove( el ) {
		return el && el.parentElement && el.parentElement.removeChild( el );
	}

	function triggerDismissEvent() {
		try {
			const dismissEvent = new Event( 'eucookielaw-dismissed' );
			document.dispatchEvent( dismissEvent );
		} catch ( err ) { }
	}

	function removeOverlay() {
		remove( overlay );
		triggerDismissEvent();
	}

	function fade( el, type, fn ) {
		var duration = 400;

		el.style.display = 'block';
		el.style.transitionProperty = 'opacity';
		el.style.transitionDuration = duration + 'ms';
		el.style.opacity = type === 'in' ? 0 : 1;

		// Double rAF to ensure styles are applied cross-browser.
		requestAnimationFrame( function () {
			requestAnimationFrame( function() {
				el.style.opacity = type === 'in' ? 1 : 0;
				// Wait for animation.
				setTimeout( function () {
					// Clean up.
					el.style.removeProperty( 'opacity' );
					el.style.removeProperty( 'transition-property' );
					el.style.removeProperty( 'transition-duration' );

					if ( type === 'out' ) {
						el.style.display = 'none';
					}

					if ( typeof fn === 'function' ) {
						fn();
					}
				}, duration + 50 );
			} );
		} );
	}

	function appendWidget() {
		document.body.appendChild( container );
		overlay.style.display = 'block';
		fade( container, 'in' );
	}

	if ( typeof wp !== 'undefined' && !! wp.customize ) {
		appendWidget();
		return;
	}

	if ( ! overlay || ! container ) {
		return;
	}

	if ( overlay.classList.contains( 'ads-active' ) ) {
		var adsCookieValue = document.cookie.replace( /(?:(?:^|.*;\s*)personalized-ads-consent\s*\=\s*([^;]*).*$)|^.*$/, '$1' );
		if ( cookieValue !== '' && adsCookieValue !== '' ) {
			removeOverlay();
		}
	} else if ( cookieValue !== '' ) {
		removeOverlay();
	}

	appendWidget();

	overlay.querySelector( 'form' ).addEventListener( 'submit', accept );

	if ( overlay.classList.contains( 'hide-on-scroll' ) ) {
		initialScrollPosition = window.pageYOffset;

		scrollFunction = function() {
			if ( Math.abs( window.pageYOffset - initialScrollPosition ) > 50 ) {
				accept();
			}
		};

		window.addEventListener( 'scroll', scrollFunction );
	} else if ( overlay.classList.contains( 'hide-on-time' ) ) {
		var timeout = parseInt( overlay.getAttribute( 'data-hide-timeout' ), 10 ) || 0;
		setTimeout( accept, timeout * 1000 );
	}

	var accepted = false;
	function accept( event ) {
		if ( accepted ) {
			return;
		}
		accepted = true;

		if ( event && event.preventDefault ) {
			event.preventDefault();
		}

		if ( overlay.classList.contains( 'hide-on-scroll' ) ) {
			window.removeEventListener( 'scroll', scrollFunction );
		}

		var expireTime = new Date();
		var consentExpiration = parseInt( overlay.getAttribute( 'data-consent-expiration' ), 10 ) || 0;
		expireTime.setTime( expireTime.getTime() + ( consentExpiration * 24 * 60 * 60 * 1000 ) );

		document.cookie = 'eucookielaw=' + expireTime.getTime() + ';path=/;expires=' + expireTime.toGMTString();
		if ( overlay.classList.contains( 'ads-active' ) && overlay.classList.contains( 'hide-on-button' ) ) {
			document.cookie = 'personalized-ads-consent=' + expireTime.getTime() + ';path=/;expires=' + expireTime.toGMTString();
		}

		fade( overlay, 'out', function() {
			removeOverlay();
			remove( container );
		} );
	}
} )();
;
/* global wpcom_reblog */

var jetpackLikesWidgetBatch = [];
var jetpackLikesMasterReady = false;

// Due to performance problems on pages with a large number of widget iframes that need to be loaded,
// we are limiting the processing at any instant to unloaded widgets that are currently in viewport,
// plus this constant that will allow processing of widgets above and bellow the current fold.
// This aim of it is to improve the UX and hide the transition from unloaded to loaded state from users.
var jetpackLikesLookAhead = 2000; // pixels

// Keeps track of loaded comment likes widget so we can unload them when they are scrolled out of view.
var jetpackCommentLikesLoadedWidgets = [];

var jetpackLikesDocReadyPromise = new Promise( resolve => {
	if ( document.readyState !== 'loading' ) {
		resolve();
	} else {
		window.addEventListener( 'DOMContentLoaded', () => resolve() );
	}
} );

function JetpackLikesPostMessage( message, target ) {
	if ( typeof message === 'string' ) {
		try {
			message = JSON.parse( message );
		} catch ( e ) {
			return;
		}
	}

	if ( target && typeof target.postMessage === 'function' ) {
		try {
			target.postMessage(
				JSON.stringify( {
					type: 'likesMessage',
					data: message,
				} ),
				'*'
			);
		} catch ( e ) {
			return;
		}
	}
}

function JetpackLikesBatchHandler() {
	const requests = [];
	document.querySelectorAll( 'div.jetpack-likes-widget-unloaded' ).forEach( widget => {
		if ( jetpackLikesWidgetBatch.indexOf( widget.id ) > -1 ) {
			return;
		}

		if ( ! jetpackIsScrolledIntoView( widget ) ) {
			return;
		}

		jetpackLikesWidgetBatch.push( widget.id );

		var regex = /like-(post|comment)-wrapper-(\d+)-(\d+)-(\w+)/,
			match = regex.exec( widget.id ),
			info;

		if ( ! match || match.length !== 5 ) {
			return;
		}

		info = {
			blog_id: match[ 2 ],
			width: widget.width,
		};

		if ( 'post' === match[ 1 ] ) {
			info.post_id = match[ 3 ];
		} else if ( 'comment' === match[ 1 ] ) {
			info.comment_id = match[ 3 ];
		}

		info.obj_id = match[ 4 ];

		requests.push( info );
	} );

	if ( requests.length > 0 ) {
		JetpackLikesPostMessage(
			{ event: 'initialBatch', requests: requests },
			window.frames[ 'likes-master' ]
		);
	}
}

function JetpackLikesMessageListener( event ) {
	let message = event && event.data;
	if ( typeof message === 'string' ) {
		try {
			message = JSON.parse( message );
		} catch ( err ) {
			return;
		}
	}

	const type = message && message.type;
	const data = message && message.data;

	if ( type !== 'likesMessage' || typeof data.event === 'undefined' ) {
		return;
	}

	// We only allow messages from one origin
	const allowedOrigin = 'https://web.archive.org/web/20230603222647/https://widgets.wp.com';
	if ( allowedOrigin !== event.origin ) {
		return;
	}

	switch ( data.event ) {
		case 'masterReady':
			jetpackLikesDocReadyPromise.then( () => {
				jetpackLikesMasterReady = true;

				const stylesData = {
					event: 'injectStyles',
				};
				const sdTextColor = document.querySelector( '.sd-text-color' );
				const sdLinkColor = document.querySelector( '.sd-link-color' );
				const sdTextColorStyles = ( sdTextColor && getComputedStyle( sdTextColor ) ) || {};
				const sdLinkColorStyles = ( sdLinkColor && getComputedStyle( sdLinkColor ) ) || {};

				if ( document.querySelectorAll( 'iframe.admin-bar-likes-widget' ).length > 0 ) {
					JetpackLikesPostMessage( { event: 'adminBarEnabled' }, window.frames[ 'likes-master' ] );

					const bgSource = document.querySelector(
						'#wpadminbar .quicklinks li#wp-admin-bar-wpl-like > a'
					);

					const wpAdminBar = document.querySelector( '#wpadminbar' );

					stylesData.adminBarStyles = {
						background: bgSource && getComputedStyle( bgSource ).background,
						isRtl: wpAdminBar && getComputedStyle( wpAdminBar ).direction === 'rtl',
					};
				}

				// enable reblogs if they are enabled for the page
				if ( document.body.classList.contains( 'jetpack-reblog-enabled' ) ) {
					JetpackLikesPostMessage( { event: 'reblogsEnabled' }, window.frames[ 'likes-master' ] );
				}

				stylesData.textStyles = {
					color: sdTextColorStyles[ 'color' ],
					fontFamily: sdTextColorStyles[ 'font-family' ],
					fontSize: sdTextColorStyles[ 'font-size' ],
					direction: sdTextColorStyles[ 'direction' ],
					fontWeight: sdTextColorStyles[ 'font-weight' ],
					fontStyle: sdTextColorStyles[ 'font-style' ],
					textDecoration: sdTextColorStyles[ 'text-decoration' ],
				};

				stylesData.linkStyles = {
					color: sdLinkColorStyles[ 'color' ],
					fontFamily: sdLinkColorStyles[ 'font-family' ],
					fontSize: sdLinkColorStyles[ 'font-size' ],
					textDecoration: sdLinkColorStyles[ 'text-decoration' ],
					fontWeight: sdLinkColorStyles[ 'font-weight' ],
					fontStyle: sdLinkColorStyles[ 'font-style' ],
				};

				JetpackLikesPostMessage( stylesData, window.frames[ 'likes-master' ] );

				JetpackLikesBatchHandler();
			} );

			break;

		case 'showLikeWidget': {
			const placeholder = document.querySelector( `#${ data.id } .likes-widget-placeholder` );
			if ( placeholder ) {
				placeholder.style.display = 'none';
			}
			break;
		}

		case 'showCommentLikeWidget': {
			const placeholder = document.querySelector( `#${ data.id } .likes-widget-placeholder` );
			if ( placeholder ) {
				placeholder.style.display = 'none';
			}
			break;
		}

		case 'killCommentLikes':
			// If kill switch for comment likes is enabled remove all widgets wrappers and `Loading...` placeholders.
			document
				.querySelectorAll( '.jetpack-comment-likes-widget-wrapper' )
				.forEach( wrapper => wrapper.remove() );
			break;

		case 'clickReblogFlair':
			if ( wpcom_reblog && typeof wpcom_reblog.toggle_reblog_box_flair === 'function' ) {
				wpcom_reblog.toggle_reblog_box_flair( data.obj_id, data.post_id );
			}
			break;

		case 'showOtherGravatars': {
			const container = document.querySelector( '#likes-other-gravatars' );
			if ( ! container ) {
				break;
			}

			const list = container.querySelector( 'ul' );

			container.style.display = 'none';
			list.innerHTML = '';

			container
				.querySelectorAll( '.likes-text span' )
				.forEach( item => ( item.textContent = data.total ) );

			( data.likers || [] ).forEach( async liker => {
				if ( liker.profile_URL.substr( 0, 4 ) !== 'http' ) {
					// We only display gravatars with http or https schema
					return;
				}

				try {
					const response = await fetch( liker.avatar_URL, { method: 'HEAD' } );
					if ( !response.ok ) {
						// Image doesn't exist, don't create the element
						return;
					}
					} catch ( error ) {
						// Error occurred while checking image existence, don't create the element
					return;
				}

				const element = document.createElement( 'li' );
				element.innerHTML = `
					<a href="${ encodeURI( liker.profile_URL ) }" rel="nofollow" target="_parent" class="wpl-liker">
						<img src="${ encodeURI( liker.avatar_URL ) }"
							alt=""
							style="width: 30px; height: 30px; padding-right: 3px;" />
					</a>
				`;

				list.append( element );

				// Add some extra attributes through native methods, to ensure strings are sanitized.
				element.classList.add( liker.css_class );
				element.querySelector( 'img' ).alt = liker.name;
			} );

			const el = document.querySelector( `*[name='${ data.parent }']` );
			const rect = el.getBoundingClientRect();
			const win = el.ownerDocument.defaultView;
			const offset = {
				top: rect.top + win.pageYOffset,
				left: rect.left + win.pageXOffset,
			};

			container.style.left = offset.left + data.position.left - 10 + 'px';
			container.style.top = offset.top + data.position.top - 33 + 'px';

			// Container width - padding
			const initContainerWidth = data.width - 20;
			const rowLength = Math.floor( initContainerWidth / 37 );
			// # of rows + (avatar + avatar padding) + text above + container padding
			let height = Math.ceil( data.likers.length / rowLength ) * 37 + 17 + 22;
			if ( height > 204 ) {
				height = 204;
			}

			// Avatars + padding
			const containerWidth = rowLength * 37 + 13;
			container.style.height = height + 'px';
			container.style.width = containerWidth + 'px';

			const listWidth = rowLength * 37;
			list.style.width = listWidth + 'px';

			container.style.display = 'block';
		}
	}
}

window.addEventListener( 'message', JetpackLikesMessageListener );

document.addEventListener( 'click', e => {
	const container = document.querySelector( '#likes-other-gravatars' );

	if ( container && ! container.contains( e.target ) ) {
		container.style.display = 'none';
	}
} );

function JetpackLikesWidgetQueueHandler() {
	var wrapperID;

	if ( ! jetpackLikesMasterReady ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	// Restore widgets to initial unloaded state when they are scrolled out of view.
	jetpackUnloadScrolledOutWidgets();

	var unloadedWidgetsInView = jetpackGetUnloadedWidgetsInView();

	if ( unloadedWidgetsInView.length > 0 ) {
		// Grab any unloaded widgets for a batch request
		JetpackLikesBatchHandler();
	}

	for ( var i = 0, length = unloadedWidgetsInView.length; i <= length - 1; i++ ) {
		wrapperID = unloadedWidgetsInView[ i ].id;

		if ( ! wrapperID ) {
			continue;
		}

		jetpackLoadLikeWidgetIframe( wrapperID );
	}
}

function jetpackLoadLikeWidgetIframe( wrapperID ) {
	if ( typeof wrapperID === 'undefined' ) {
		return;
	}

	const wrapper = document.querySelector( '#' + wrapperID );
	wrapper.querySelectorAll( 'iframe' ).forEach( iFrame => iFrame.remove() );

	const placeholder = wrapper.querySelector( '.likes-widget-placeholder' );

	// Post like iframe
	if ( placeholder && placeholder.classList.contains( 'post-likes-widget-placeholder' ) ) {
		const postLikesFrame = document.createElement( 'iframe' );

		postLikesFrame.classList.add( 'post-likes-widget', 'jetpack-likes-widget' );
		postLikesFrame.name = wrapper.dataset.name;
		postLikesFrame.src = wrapper.dataset.src;
		postLikesFrame.height = '55px';
		postLikesFrame.width = '100%';
		postLikesFrame.frameBorder = '0';
		postLikesFrame.scrolling = 'no';
		postLikesFrame.title = wrapper.dataset.title;

		placeholder.after( postLikesFrame );
	}

	// Comment like iframe
	if ( placeholder.classList.contains( 'comment-likes-widget-placeholder' ) ) {
		const commentLikesFrame = document.createElement( 'iframe' );

		commentLikesFrame.class = 'comment-likes-widget-frame jetpack-likes-widget-frame';
		commentLikesFrame.name = wrapper.dataset.name;
		commentLikesFrame.src = wrapper.dataset.src;
		commentLikesFrame.height = '18px';
		commentLikesFrame.width = '100%';
		commentLikesFrame.frameBorder = '0';
		commentLikesFrame.scrolling = 'no';

		wrapper.querySelector( '.comment-like-feedback' ).after( commentLikesFrame );

		jetpackCommentLikesLoadedWidgets.push( commentLikesFrame );
	}

	wrapper.classList.remove( 'jetpack-likes-widget-unloaded' );
	wrapper.classList.add( 'jetpack-likes-widget-loading' );

	wrapper.querySelector( 'iframe' ).addEventListener( 'load', e => {
		JetpackLikesPostMessage(
			{ event: 'loadLikeWidget', name: e.target.name, width: e.target.width },
			window.frames[ 'likes-master' ]
		);

		wrapper.classList.remove( 'jetpack-likes-widget-loading' );
		wrapper.classList.add( 'jetpack-likes-widget-loaded' );
	} );
}

function jetpackGetUnloadedWidgetsInView() {
	const unloadedWidgets = document.querySelectorAll( 'div.jetpack-likes-widget-unloaded' );

	return [ ...unloadedWidgets ].filter( item => jetpackIsScrolledIntoView( item ) );
}

function jetpackIsScrolledIntoView( element ) {
	const top = element.getBoundingClientRect().top;
	const bottom = element.getBoundingClientRect().bottom;

	// Allow some slack above and bellow the fold with jetpackLikesLookAhead,
	// with the aim of hiding the transition from unloaded to loaded widget from users.
	return top + jetpackLikesLookAhead >= 0 && bottom <= window.innerHeight + jetpackLikesLookAhead;
}

function jetpackUnloadScrolledOutWidgets() {
	for ( let i = jetpackCommentLikesLoadedWidgets.length - 1; i >= 0; i-- ) {
		const currentWidgetIframe = jetpackCommentLikesLoadedWidgets[ i ];

		if ( ! jetpackIsScrolledIntoView( currentWidgetIframe ) ) {
			const widgetWrapper =
				currentWidgetIframe &&
				currentWidgetIframe.parentElement &&
				currentWidgetIframe.parentElement.parentElement;

			// Restore parent class to 'unloaded' so this widget can be picked up by queue manager again if needed.
			widgetWrapper.classList.remove( 'jetpack-likes-widget-loaded' );
			widgetWrapper.classList.remove( 'jetpack-likes-widget-loading' );
			widgetWrapper.classList.add( 'jetpack-likes-widget-unloaded' );

			// Bring back the loading placeholder into view.
			widgetWrapper
				.querySelectorAll( '.comment-likes-widget-placeholder' )
				.forEach( item => ( item.style.display = 'block' ) );

			// Remove it from the list of loaded widgets.
			jetpackCommentLikesLoadedWidgets.splice( i, 1 );

			// Remove comment like widget iFrame.
			currentWidgetIframe.remove();
		}
	}
}

var jetpackWidgetsDelayedExec = function ( after, fn ) {
	var timer;
	return function () {
		clearTimeout( timer );
		timer = setTimeout( fn, after );
	};
};

var jetpackOnScrollStopped = jetpackWidgetsDelayedExec( 250, JetpackLikesWidgetQueueHandler );

// Load initial batch of widgets, prior to any scrolling events.
JetpackLikesWidgetQueueHandler();

// Add event listener to execute queue handler after scroll.
window.addEventListener( 'scroll', jetpackOnScrollStopped, true );
;
/**
 * Comment Likes - JavaScript
 *
 * This handles liking and unliking comments, as well as viewing who has
 * liked a particular comment.
 *
 * @dependency  Swipe (dynamically loaded when needed)
 *
 * @package     Comment_Likes
 * @subpackage  JavaScript
 */
(function () {
	function init() {
		let extWin;
		let extWinCheck;
		let commentLikeEvent;

		// Only run once.
		if (window.comment_likes_loaded) {
			return;
		}
		window.comment_likes_loaded = true;

		// Client-side cache of who liked a particular comment to avoid
		// having to hit the server multiple times for the same data.
		const commentLikeCache = {};

		let swipeLibPromise;

		// Load the Swipe library, if it's not already loaded.
		function swipeLibLoader() {
			if (!swipeLibPromise) {
				swipeLibPromise = new Promise((resolve, reject) => {
					if (window.Swipe) {
						resolve(window.Swipe);
					} else {
						const swipeScript = document.createElement('script');
						swipeScript.src = comment_like_text.swipeUrl;
						swipeScript.async = true;
						document.body.appendChild(swipeScript);
						swipeScript.addEventListener('load', () => resolve(window.Swipe));
						swipeScript.addEventListener('error', error => reject(error));
					}
				});
			}
			return swipeLibPromise;
		}

		/**
		 * Parse the comment ID from a comment like link.
		 */
		function getCommentId(link) {
			const commentId =
				link && link.getAttribute('href') && link.getAttribute('href').split('like_comment=');
			return commentId[1].split('&_wpnonce=')[0];
		}

		/**
		 * Handle an ajax action on the comment like link.
		 */
		function handleLinkAction(link, action, commentId, callback) {
			const nonce =
				link && link.getAttribute('href') && link.getAttribute('href').split('_wpnonce=')[1];

			fetch('/wp-admin/admin-ajax.php', {
				method: 'POST',
				body: new URLSearchParams({
					action: action,
					_wpnonce: nonce,
					like_comment: commentId,
					blog_id: Number(link.dataset.blog),
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest',
					Accept: 'application/json',
					'cache-control': 'no-cache',
					pragma: 'no-cache',
				},
			})
				.then(response => response.json())
				.then(callback);
		}

		function startPolling() {
			// Append cookie polling login iframe to this window to wait for user to finish logging in (or cancel)
			const loginIframe = document.createElement('iframe');
			loginIframe.id = 'wp-login-polling-iframe';
			loginIframe.src = 'https://web.archive.org/web/20230603222647/https://wordpress.com/public.api/connect/?iframe=true';
			document.body.appendChild(loginIframe);
			loginIframe.style.display = 'none';
		}

		function stopPolling() {
			const iframe = document.querySelector('#wp-login-polling-iframe');
			if (iframe) {
				iframe.remove();
			}
		}

		function hide(el) {
			if (el && el.style) {
				el.style.display = 'none';
			}
		}

		function show(el) {
			if (el && el.style) {
				el.style.removeProperty('display');
			}
		}

		// Overlay used for displaying comment like info.
		class Overlay {
			constructor() {
				// Overlay element.
				this.el = document.createElement('div');
				this.el.classList.add('comment-likes-overlay');
				document.body.appendChild(this.el);
				hide(this.el);

				this.el.addEventListener('mouseenter', () => {
					// Don't hide the overlay if the user is mousing over it.
					overlay.cancelHide();
				});

				this.el.addEventListener('mouseleave', () => overlay.requestHide());

				// Inner contents of overlay.
				this.innerEl = null;

				// Instance of the Swipe library.
				this.swipe = null;

				// Timeout used for hiding the overlay.
				this.hideTimeout = null;
			}

			// Initialise the overlay for use, removing any old content.
			clear() {
				// Unload any previous instance of Swipe (to avoid leaking a global
				// event handler). This is done before clearing the contents of the
				// overlay because Swipe expects the slides to still be present.
				if (this.swipe) {
					this.swipe.kill();
					this.swipe = null;
				}
				this.el.innerHTML = '';
				this.innerEl = document.createElement('div');
				this.innerEl.classList.add('inner');
				this.el.appendChild(this.innerEl);
			}

			/**
			 * Construct a list (<ul>) of user (gravatar, name) details.
			 *
			 * @param  data     liker data returned from the server
			 * @param  klass    CSS class to apply to the <ul> element
			 * @param  start    index of user to start at
			 * @param  length   number of users to include in the list
			 *
			 * @return          A container element with the list
			 */
			getUserBits(data, klass, start, length) {
				start = start || 0;
				let last = start + (length || data.length);
				last = last > data.length ? data.length : last;
				const container = document.createElement('div');
				container.classList.add('liker-list');
				let html = `<ul class="${klass || ''}">`;
				for (let i = start; i < last; ++i) {
					const user = data[i];
					html += `
						<li>
							<a rel="nofollow" title="${user.display_name_esc}" href="${user.profile_url_esc}">
								<img src="${user.avatar_url_esc}" alt="${user.display_name_esc}" />
								<span class="user-name">${user.display_name_esc}</span>
							</a>
						</li>
					`;
				}
				html += '</ul>';
				container.innerHTML = html;
				return container;
			}

			/**
			 * Render the display of who has liked this comment. The type of
			 * display depends on how many people have liked the comment.
			 * If more than 10 people have liked the comment, this function
			 * renders navigation controls and sets up the Swipe library for
			 * changing between pages.
			 *
			 * @param link  the element over which the user is hovering
			 * @param data  the results retrieved from the server
			 */
			showLikes(link, data) {
				this.clear();

				link.dataset.likeCount = data.length;
				if (data.length === 0) {
					// No likers after all.
					hide(this.el);
					return;
				}

				this.innerEl.style.padding = '12px';

				if (data.length < 6) {
					// Only one column needed.
					this.innerEl.style.maxWidth = '200px';
					this.innerEl.innerHTML = '';
					this.innerEl.appendChild(this.getUserBits(data, 'single'));
					this.setPosition(link);
				} else if (data.length < 11) {
					// Two columns, but only one page.
					this.innerEl.innerHTML = '';
					this.innerEl.appendChild(this.getUserBits(data, 'double'));
					this.setPosition(link);
				} else {
					// Multiple pages.
					this.renderLikesWithPagination(data, link);
				}
			}

			/**
			 * Render multiple pages of likes with pagination controls.
			 * This function is intended to be called by `showLikes` above.
			 *
			 * @param data  the results retrieved from the server
			 */
			renderLikesWithPagination(data, link) {
				swipeLibLoader().then(() => {
					const page_count = Math.ceil(data.length / 10);
					// Swipe requires two nested containers.
					const swipe = document.createElement('div');
					swipe.classList.add('swipe');
					this.innerEl.appendChild(swipe);

					const wrap = document.createElement('div');
					wrap.classList.add('swipe-wrap');
					swipe.appendChild(wrap);

					for (let i = 0; i < page_count; ++i) {
						wrap.appendChild(this.getUserBits(data, 'double', i * 10, 10));
					}

					/**
					 * Navigation controls.
					 * This is based on the Newdash controls found in
					 *    reader/recommendations-templates.php
					 */
					const nav = document.createElement('nav');
					nav.classList.add('slider-nav');

					let navContents = `
						<a href="#" class="prev">
							<span class="noticon noticon-previous" title="Previous" alt="<"></span>
						</a>
						<span class="position">
					`;
					for (let i = 0; i < page_count; ++i) {
						navContents += `<em data-page="${i}" class="${i === 0 ? 'on' : ''}">&bull;</em>`;
					}
					navContents += `
						</span>
						<a href="#" class="next">
							<span class="noticon noticon-next" title="Next" alt=">"></span>
						</a>
					`;
					this.innerEl.appendChild(nav);
					nav.innerHTML = navContents;

					/** Set up Swipe. **/
					// Swipe cannot be set up successfully unless its container
					// is visible, so we show it now.
					show(this.el);
					this.setPosition(link);

					this.swipe = new Swipe(swipe, {
						callback: function (pos) {
							// Update the pagination indicators.
							//
							// If there are exactly two pages, Swipe has a weird
							// special case where it duplicates both pages and
							// can return index 2 and 3 even though those aren't
							// real pages (see swipe.js, line 47). To deal with
							// this, we use the expression `pos % page_count`.
							pos = pos % page_count;
							nav.querySelectorAll('em').forEach(em => {
								const page = Number(em.dataset.page);
								em.setAttribute('class', pos === page ? 'on' : '');
							});
						},
					});

					nav.querySelectorAll('em').forEach(em => {
						em.addEventListener('click', e => {
							// Go to the page corresponding to the indicator clicked.
							this.swipe.slide(Number(em.dataset.page));
							e.preventDefault();
						});
					});
					// Previous and next buttons.
					nav.querySelector('.prev').addEventListener('click', e => {
						this.swipe.prev();
						e.preventDefault();
					});
					nav.querySelector('.next').addEventListener('click', e => {
						this.swipe.next();
						e.preventDefault();
					});
				});
			}

			/**
			 * Open the overlay and show a loading message.
			 */
			showLoadingMessage(link) {
				this.clear();
				this.innerEl.textContent = comment_like_text.loading;
				this.setPosition(link);
			}

			/**
			 * Position the overlay near the current comment.
			 *
			 * @param link  element near which to position the overlay
			 */
			setPosition(link) {
				// Prepare a down arrow icon for the bottom of the overlay.
				const icon = document.createElement('span');
				this.el.appendChild(icon);
				icon.classList.add('icon', 'noticon', 'noticon-downarrow');
				icon.style.textShadow = '0px 1px 1px rgb(223, 223, 223)';

				const rect = link.getBoundingClientRect();
				const win = document.defaultView;
				const offset = {
					top: rect.top + win.scrollY,
					left: rect.left + win.scrollX,
				};

				// Take measurements with the element fully visible.
				show(this.el);
				let left = offset.left - (this.el.offsetWidth - link.offsetWidth) / 2;
				left = left < 5 ? 5 : left;
				let top = offset.top - this.el.offsetHeight + 5;
				hide(this.el);

				const adminBar = document.querySelector('#wpadminbar');

				// Check if the overlay would appear off the screen.
				if (top < win.scrollY + ((adminBar && adminBar.offsetHeight) || 0)) {
					// We'll display the overlay beneath the link instead.
					top = offset.top + link.offsetHeight;
					// Instead of using the down arrow icon, use an up arrow.
					icon.remove();
					this.el.prepend(icon);
					icon.classList.remove('noticon-downarrow');
					icon.classList.add('noticon-uparrow');
					icon.style.textShadow = '0px -1px 1px rgb(223, 223, 223)';
					icon.style.verticalAlign = 'bottom';
				}

				this.el.style.left = `${left}px`;
				this.el.style.top = `${top}px`;
				show(this.el);

				// The height of the arrow icon differs slightly between browsers,
				// so we compute the margin here to make sure it isn't disjointed
				// from the overlay.
				icon.style.marginTop = `${icon.scrollHeight - 26}px`;
				icon.style.marginBottom = `${20 - icon.scrollHeight}px`;

				// Position the arrow to be horizontally centred on the link.
				icon.style.paddingLeft = `${
					offset.left - left + (link.offsetWidth - icon.scrollWidth) / 2
				}px`;
			}

			/**
			 * Return whether the overlay is visible.
			 */
			isVisible() {
				return this.el.style.getPropertyValue('display') !== 'none';
			}

			/**
			 * Request that the overlay be hidden after a short delay.
			 */
			requestHide() {
				if (this.hideTimeout !== null) {
					return;
				}
				this.hideTimeout = setTimeout(() => {
					hide(this.el);
					this.clear();
				}, 300);
			}

			/**
			 * Cancel a request to hide the overlay.
			 */
			cancelHide() {
				if (this.hideTimeout !== null) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = null;
				}
			}
		}

		// Overlay used for displaying comment like info.
		const overlay = new Overlay();

		// The most recent comment for which the user has requested to see
		// who liked it.
		var relevantComment;

		// Precache after this timeout.
		var precacheTimeout = null;

		/**
		 * Fetch the like data for a particular comment.
		 */
		function fetchLikeData(link, commentId) {
			commentLikeCache[commentId] = null;

			const container = link && link.parentElement && link.parentElement.parentElement;
			const star = container.querySelector('a.comment-like-link');
			star &&
				handleLinkAction(star, 'view_comment_likes', commentId, data => {
					// Populate the cache.
					commentLikeCache[commentId] = data;

					// Only show the overlay if the user is interested.
					if (overlay.isVisible() && relevantComment === commentId) {
						overlay.showLikes(link, data);
					}
				});
		}

		function readCookie(c) {
			const nameEQ = c + '=';
			const cookieStrings = document.cookie.split(';');

			for (let i = 0; i < cookieStrings.length; i++) {
				let cookieString = cookieStrings[i];
				while (cookieString.charAt(0) === ' ') {
					cookieString = cookieString.substring(1, cookieString.length);
				}
				if (cookieString.indexOf(nameEQ) === 0) {
					const chunk = cookieString.substring(nameEQ.length, cookieString.length);
					const pairs = chunk.split('&');
					const cookieData = {};
					for (let num = pairs.length - 1; num >= 0; num--) {
						const pair = pairs[num].split('=');
						cookieData[pair[0]] = decodeURIComponent(pair[1]);
					}
					return cookieData;
				}
			}
			return null;
		}

		function getServiceData() {
			const data = readCookie('wpc_wpc');
			if (data === null || typeof data.access_token === 'undefined' || !data.access_token) {
				return false;
			}
			return data;
		}

		function readMessage(msg) {
			const event = msg.data;

			if (typeof event.event === 'undefined') {
				return;
			}

			if (event.event === 'login' && event.success) {
				extWinCheck = setInterval(function () {
					if (!extWin || extWin.closed) {
						clearInterval(extWinCheck);
						if (getServiceData()) {
							// Load page in an iframe to get the current comment nonce
							const nonceIframe = document.createElement('iframe');
							nonceIframe.id = 'wp-login-comment-nonce-iframe';
							nonceIframe.style.display = 'none';
							nonceIframe.src = commentLikeEvent + '';
							document.body.appendChild(nonceIframe);

							const commentLikeId = (commentLikeEvent + '')
								.split('like_comment=')[1]
								.split('&_wpnonce=')[0];
							let c;

							// Set a 5 second timeout to redirect to the comment page without doing the Like as a fallback
							const commentLikeTimeout = setTimeout(() => {
								window.location = commentLikeEvent;
							}, 5000);

							// Check for a new nonced redirect and use that if available before timing out
							const commentLikeCheck = setInterval(() => {
								const iframe = document.querySelector('#wp-login-comment-nonce-iframe');
								if (iframe) {
									c = iframe.querySelector(`#comment-like-${commentLikeId} .comment-like-link`);
								}
								if (c && typeof c.href !== 'undefined') {
									clearTimeout(commentLikeTimeout);
									clearInterval(commentLikeCheck);
									window.location = c.href;
								}
							}, 100);
						}
					}
				}, 100);

				if (extWin) {
					if (!extWin.closed) {
						extWin.close();
					}
					extWin = false;
				}

				stopPolling();
			}
		}

		if (typeof window.postMessage !== 'undefined') {
			window.addEventListener('message', e => {
				let message = e && e.data;
				if (typeof message === 'string') {
					try {
						message = JSON.parse(message);
					} catch (err) {
						return;
					}
				}

				const type = message && message.type;
				if (type === 'loginMessage') {
					readMessage(message);
				}
			});
		}

		document.body.addEventListener('click', e => {
			let target = e.target;

			// Don't do anything when clicking on the "X people" link.
			if (target.matches('p.comment-likes a.view-likers')) {
				e.preventDefault();
				return;
			}

			// Retrieve the surrounding paragraph to the star, if it hasn't been liked.
			const notLikedPar = target.closest('p.comment-not-liked');

			// Return if not clicking on star or surrounding paragraph.
			if (!target.matches('a.comment-like-link') && !notLikedPar) {
				return;
			}

			// When a comment hasn't been liked, make the text clickable, too.
			if (notLikedPar) {
				target = notLikedPar.querySelector('a.comment-like-link');
				if (!target) {
					return;
				}
			}

			if (target.classList.contains('needs-login')) {
				e.preventDefault();
				commentLikeEvent = target;
				if (extWin) {
					if (!extWin.closed) {
						extWin.close();
					}
					extWin = false;
				}

				stopPolling();

				const url = 'https://web.archive.org/web/20230603222647/https://wordpress.com/public.api/connect/?action=request&service=wordpress';
				extWin = window.open(
					url,
					'likeconn',
					'status=0,toolbar=0,location=1,menubar=0,directories=0,resizable=1,scrollbars=1,height=560,width=500'
				);

				startPolling();

				return false;
			}

			// Record that the user likes or does not like this comment.
			const commentId = getCommentId(target);
			target.classList.add('loading');

			let commentEl = document.querySelector(`p#comment-like-${commentId}`);
			// Determine whether to like or unlike based on whether the comment is
			// currently liked.
			const action =
				commentEl && commentEl.dataset.liked === 'comment-liked'
					? 'unlike_comment'
					: 'like_comment';
			handleLinkAction(target, action, commentId, data => {
				// Invalidate the like cache for this comment.
				delete commentLikeCache[commentId];

				const countEl = document.querySelector(`#comment-like-count-${data.context}`);
				if (countEl) {
					countEl.innerHTML = data.display;
				}

				commentEl = document.querySelector(`p#comment-like-${data.context}`);
				if (action === 'like_comment') {
					commentEl.classList.remove('comment-not-liked');
					commentEl.classList.add('comment-liked');
					commentEl.dataset.liked = 'comment-liked';
				} else {
					commentEl.classList.remove('comment-liked');
					commentEl.classList.add('comment-not-liked');
					commentEl.dataset.liked = 'comment-not-liked';
				}

				// Prefetch new data for this comment (if there are likers left).
				const parent = target.closest('.comment-likes');
				const link = parent && parent.querySelector('a.view-likers');
				if (link) {
					fetchLikeData(link, commentId);
				}

				target.classList.remove('loading');
			});
			e.preventDefault();
			e.stopPropagation();
		});

		document.body.addEventListener(
			'mouseenter',
			function (e) {
				if (!e.target.matches('p.comment-likes a.view-likers')) {
					return;
				}
				// Show the user a list of who has liked this comment.

				const link = e.target;
				if (Number(link.dataset.likeCount || 0) === 0) {
					// No one has liked this comment.
					return;
				}

				// Don't hide the overlay.
				overlay.cancelHide();

				// Get the comment ID.
				const container = link.parentElement && link.parentElement.parentElement;
				const star = container && container.querySelector('a.comment-like-link');
				const commentId = star && getCommentId(star);
				relevantComment = commentId;

				// Check if the list of likes for this comment is already in
				// the cache.
				if (commentId in commentLikeCache) {
					const entry = commentLikeCache[commentId];
					// Only display the likes if the ajax request is
					// actually done.
					if (entry !== null) {
						overlay.showLikes(link, entry);
					} else {
						// Make sure the overlay is visible (in case
						// the user moved the mouse away while loading
						// but then came back before it finished
						// loading).
						overlay.showLoadingMessage(link);
					}
					return;
				}

				// Position the "Loading..." overlay.
				overlay.showLoadingMessage(link);

				// Fetch the data.
				fetchLikeData(link, commentId);
			},
			true
		);

		document.body.addEventListener(
			'mouseleave',
			e => {
				if (!e.target.matches('p.comment-likes a.view-likers')) {
					return;
				}
				// User has moved cursor away - hide the overlay.
				overlay.requestHide();
			},
			true
		);

		document.body.addEventListener(
			'mouseenter',
			e => {
				if (!e.target.matches('.comment') || !e.target.querySelector('a.comment-like-link')) {
					return;
				}
				// User is moving over a comment - precache the comment like data.
				if (precacheTimeout !== null) {
					clearTimeout(precacheTimeout);
					precacheTimeout = null;
				}

				const star = e.target.querySelector('a.comment-like-link');
				const parent = star.closest('.comment-likes');
				const link = parent && parent.querySelector('a.view-likers');
				if (!link || Number(link.dataset.likeCount || 0) === 0) {
					// No likes.
					return;
				}
				const commentId = getCommentId(star);
				if (commentId in commentLikeCache) {
					// Already in cache.
					return;
				}

				precacheTimeout = setTimeout(() => {
					precacheTimeout = null;
					if (commentId in commentLikeCache) {
						// Was cached in the interim.
						return;
					}
					fetchLikeData(link, commentId);
				}, 1000);
			},
			true
		);
	}

	if (document.readyState !== 'loading') {
		init();
	} else {
		document.addEventListener('DOMContentLoaded', init);
	}
})();
;
/**
 * Makes "skip to content" link work correctly in IE9, Chrome, and Opera
 * for better accessibility.
 *
 * @link http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
 */

 ( function() {
	var isWebkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
		isOpera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
		isIE     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( isWebkit || isOpera || isIE ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();

				// Repositions the window on jump-to-anchor to account for admin bar and border height.
				window.scrollBy( 0, -53 );
			}
		}, false );
	}
} )();
;
/* global screenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */
( function () {
	'use strict';

	var mainNav, masthead, menuToggle, siteNavigation, socialNavigation, siteHeaderMenu, resizeTimer;

	function matches( el, sel ) {
		if ( Element.prototype.matches ) {
			return el.matches( sel );
		}

		if ( Element.prototype.msMatchesSelector ) {
			return el.msMatchesSelector( sel );
		}
	}

	// Based on https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
	function closest( el, sel ) {
		if ( el.closest ) {
			return el.closest( sel );
		}

		var current = el;

		do {
			if ( matches( el, sel ) ) {
				return current;
			}
			current = current.parentElement || current.parentNode;
		} while ( current !== null && current.nodeType === 1 );

		return null;
	}

	function forEachNode( parent, selector, fn ) {
		var nodes = parent.querySelectorAll( selector );
		for ( var i = 0; i < nodes.length; i++ ) {
			fn( nodes[ i ] );
		}
	}

	function initMainNavigation( container ) {
		forEachNode( container, '.menu-item-has-children > a', function ( el ) {
			// Add dropdown toggle that displays child menu items.
			var dropdownToggle = document.createElement( 'button' );
			dropdownToggle.className = 'dropdown-toggle';
			dropdownToggle.setAttribute( 'aria-expanded', 'false' );

			var span = document.createElement( 'span' );
			span.className = 'screen-reader-text';
			span.textContent = screenReaderText.expand;

			dropdownToggle.appendChild( span );

			el.parentNode.insertBefore( dropdownToggle, el.nextSibling );
		} );

		// Toggle buttons and submenu items with active children menu items.
		forEachNode( container, '.current-menu-ancestor > button', function ( el ) {
			el.classList.add( 'toggled-on' );
		} );
		forEachNode( container, '.current-menu-ancestor > .sub-menu', function ( el ) {
			el.classList.add( 'toggled-on' );
		} );

		// Add menu items with submenus to aria-haspopup="true".
		forEachNode( container, '.menu-item-has-children', function ( el ) {
			el.setAttribute( 'aria-haspopup', 'true' );
		} );

		forEachNode( container, '.dropdown-toggle', function ( el ) {
			el.addEventListener( 'click', function ( e ) {
				var screenReaderSpan = el.querySelector( '.screen-reader-text' );

				e.preventDefault();
				el.classList.toggle( 'toggled-on' );
				var next = el.nextSibling;
				if ( next && matches( next, '.children, .sub-menu' ) ) {
					next.classList.toggle( 'toggled-on' );
				}

				el.setAttribute(
					'aria-expanded',
					el.getAttribute( 'aria-expanded' ) === 'false' ? 'true' : 'false'
				);
				screenReaderSpan.textContent =
					screenReaderSpan.textContent === screenReaderText.expand ? screenReaderText.collapse: screenReaderText.expand;
			} );
		} );
	}

	mainNav = document.querySelector( '.main-navigation' );
	if ( mainNav ) {
		initMainNavigation( mainNav );
	}

	masthead = document.querySelector( '#masthead' );
	menuToggle = masthead && masthead.querySelector( '#menu-toggle' );
	siteHeaderMenu = masthead && masthead.querySelector( '#site-header-menu' );
	siteNavigation = masthead && masthead.querySelector( '#site-navigation' );
	socialNavigation = masthead && masthead.querySelector( '#social-navigation' );

	// Enable menuToggle.
	( function () {
		// Return early if menuToggle is missing.
		if ( ! menuToggle ) {
			return;
		}

		var controls = [ menuToggle, siteNavigation, socialNavigation ].filter( Boolean );

		// Add an initial values for the attribute.
		controls.forEach( function ( el ) {
			el.setAttribute( 'aria-expanded', 'false' );
		} );

		menuToggle.addEventListener( 'click', function () {
			menuToggle.classList.toggle( 'toggled-on' );
			siteHeaderMenu.classList.toggle( 'toggled-on' );

			var newVal = menuToggle.getAttribute( 'aria-expanded' ) === 'false' ? 'true' : 'false';
			controls.forEach( function ( el ) {
				el.setAttribute( 'aria-expanded', newVal );
			} );
		} );
	} )();

	// Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
	( function () {
		if ( ! siteNavigation || ! siteNavigation.children.length ) {
			return;
		}

		// Init `focus` class to allow submenu access on tablets.
		function initFocusClassTouchScreen() {
			document.body.addEventListener( 'touchstart', function ( e ) {
				if ( ! closest( e.target, '.main-navigation li' ) ) {
					forEachNode( document, '.main-navigation li', function ( el ) {
						el.classList.remove( 'focus' );
					} );
				}
			} );
			forEachNode( siteNavigation, '.menu-item-has-children > a', function ( link ) {
				link.addEventListener( 'touchstart', function ( e ) {
					if ( window.innerWidth >= 910 ) {
						var el = link.parentElement;

						if ( matches( el, 'li' ) && ! el.classList.contains( 'focus' ) ) {
							e.preventDefault();
							el.classList.toggle( 'focus' );
							var children = el.parentElement.children;
							for ( var i = 0; i < children.length; i++ ) {
								if ( children[ i ] !== el ) {
									children[ i ].classList.remove( 'focus' );
								}
							}
						}
					}
				} );
			} );
		}

		function toggleFocus( el ) {
			var item = closest( el, '.menu-item' );
			if ( item ) {
				item.classList.toggle( 'focus' );
			}
		}

		if ( 'ontouchstart' in window ) {
			initFocusClassTouchScreen();
		}

		forEachNode( siteNavigation, 'a', function ( link ) {
			link.addEventListener( 'focus', toggleFocus( link ) );
			link.addEventListener( 'blur', toggleFocus( link ) );
		} );
	} )();

	// Add the default ARIA attributes for the menu toggle and the navigations.
	function onResizeARIA() {
		if ( window.innerWidth < 910 ) {
			if ( menuToggle && menuToggle.classList.contains( 'toggled-on' ) ) {
				menuToggle.setAttribute( 'aria-expanded', 'true' );
			} else {
				menuToggle.setAttribute( 'aria-expanded', 'false' );
			}

			if ( siteHeaderMenu && siteHeaderMenu.classList.contains( 'toggled-on' ) ) {
				siteNavigation && siteNavigation.setAttribute( 'aria-expanded', 'true' );
				socialNavigation && socialNavigation.setAttribute( 'aria-expanded', 'true' );
			} else {
				siteNavigation && siteNavigation.setAttribute( 'aria-expanded', 'false' );
				socialNavigation && socialNavigation.setAttribute( 'aria-expanded', 'false' );
			}

			menuToggle && menuToggle.setAttribute( 'aria-controls', 'site-navigation social-navigation' );
		} else {
			menuToggle && menuToggle.removeAttribute( 'aria-expanded' );
			siteNavigation && siteNavigation.removeAttribute( 'aria-expanded' );
			socialNavigation && socialNavigation.removeAttribute( 'aria-expanded' );
			menuToggle && menuToggle.removeAttribute( 'aria-controls' );
		}
	}

	// Add 'below-entry-meta' class to elements.
	function belowEntryMetaClass( selector ) {
		if (
			document.body.classList.contains( 'page' ) ||
			document.body.classList.contains( 'search' ) ||
			document.body.classList.contains( 'single-attachment' ) ||
			document.body.classList.contains( 'error404' )
		) {
			return;
		}

		forEachNode( document, '.entry-content', function ( content ) {
			forEachNode( content, selector, function ( element ) {
				var elementPosTop = element.getBoundingClientRect().top;
				var article = closest( element, 'article' );
				var entryFooter = article && article.querySelector( '.entry-footer' );
				var entryFooterPosBottom =
					entryFooter ? entryFooter.getBoundingClientRect().top + entryFooter.offsetHeight + 28	: null;
				var caption = closest( element, 'figure' );
				var next = element.nextSibling;
				var figcaption = next && matches( next, 'figcaption' ) ? next : null;
				var newImg;

				// Add 'below-entry-meta' to elements below the entry meta.
				if ( entryFooterPosBottom !== null && elementPosTop > entryFooterPosBottom ) {
					// Check if full-size images and captions are larger than or equal to 840px.
					if ( selector === 'img.size-full' || selector === '.wp-block-image img' ) {
						// Create an image to find native image width of resized images (i.e. max-width: 100%).
						newImg = new Image();
						newImg.src = element.getAttribute( 'src' );
						newImg.onload = function () {
							if ( newImg.width >= 840 ) {
								// Check if an image in an image block has a width attribute; if its value is less than 840, return.
								if (
									selector === '.wp-block-image img' &&
									element.hasAttribute( 'width' ) &&
									element.getAttribute( 'width' ) < 840
								) {
									return;
								}

								element.classList.add( 'below-entry-meta' );

								if ( caption && caption.classList.contains( 'wp-caption' ) ) {
									caption.classList.add( 'below-entry-meta' );
									caption.removeAttribute( 'style' );
								}

								if ( figcaption ) {
									figcaption.classList.add( 'below-entry-meta' );
								}
							}
						};
					} else {
						element.classList.add( 'below-entry-meta' );
					}
				} else {
					element.classList.remove( 'below-entry-meta' );
					caption && caption.classList.remove( 'below-entry-meta' );
				}
			} );
		} );
	}

	function init() {
		window.addEventListener( 'load', onResizeARIA );
		window.addEventListener( 'resize', function () {
			clearTimeout( resizeTimer );
			resizeTimer = setTimeout( function () {
				belowEntryMetaClass( 'img.size-full' );
				belowEntryMetaClass( 'blockquote.alignleft, blockquote.alignright' );
				belowEntryMetaClass( '.wp-block-image img' );
			}, 300 );
			onResizeARIA();
		} );

		belowEntryMetaClass( 'img.size-full' );
		belowEntryMetaClass( 'blockquote.alignleft, blockquote.alignright' );
		belowEntryMetaClass( '.wp-block-image img' );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
;
!function(){var e=document.currentScript;function t(t){var n=document.createElement("script"),o=e||document.getElementsByTagName("script")[0];n.setAttribute("async",!0),n.setAttribute("src",t),o.parentNode.insertBefore(n,o)}function n(e,t){return Element.prototype.matches?e.matches(t):Element.prototype.msMatchesSelector?e.msMatchesSelector(t):void 0}function o(e,t){if(e.closest)return e.closest(t);var o=e;do{if(n(o,t))return o;o=o.parentElement||o.parentNode}while(null!==o&&1===o.nodeType);return null}function i(e,t){for(var n=0;n<e.length;n++)t(e[n],n,e)}var r=".sharing-hidden .inner",s="data-sharing-more-button-id";function a(e){this.button=e,this.pane=o(e,"div").querySelector(r),this.openedBy=null,this.recentlyOpenedByHover=!1,a.instances.push(this),this.pane.setAttribute(s,a.instances.length-1),this.attachHandlers()}if(a.instances=[],a.hoverOpenDelay=200,a.recentOpenDelay=400,a.hoverCloseDelay=300,a.instantiateOrReuse=function(e){var t=o(e,"div").querySelector(r),n=t&&t.getAttribute(s),i=a.instances[n];return i||new a(e)},a.getButtonInstanceFromPane=function(e){var t=e&&e.getAttribute(s);return a.instances[t]},a.closeAll=function(){for(var e=0;e<a.instances.length;e++)a.instances[e].close()},a.prototype.open=function(){var e,t,n=[0,0];function o(e){var t=e.getBoundingClientRect();return[t.left+(window.scrollX||window.pageXOffset||0),t.top+(window.scrollY||window.pageYOffset||0)]}function i(e,t){return parseInt(getComputedStyle(e).getPropertyValue(t)||0)}for(e=o(this.button),t=this.button.offsetParent||document.documentElement;t&&(t===document.body||t===document.documentElement)&&"static"===getComputedStyle(t).getPropertyValue("position");)t=t.parentNode;t&&t!==this.button&&1===t.nodeType&&(n=[(n=o(t))[0]+i(t,"border-left-width"),n[1]+i(t,"border-top-width")]);var r,s=e[0]-n[0]-i(this.button,"margin-left"),a=e[1]-n[1]-i(this.button,"margin-top");this.pane.style.left=s+"px",this.pane.style.top=a+this.button.offsetHeight+3+"px",(r=this.pane)&&r.style.removeProperty("display")},a.prototype.close=function(){var e;(e=this.pane)&&(e.style.display="none"),this.openedBy=null},a.prototype.toggle=function(){var e;(e=this.pane)&&"none"!==e.style.display?this.close():this.open()},a.prototype.nonHoverOpen=function(){clearTimeout(this.openTimer),clearTimeout(this.closeTimer),this.recentlyOpenedByHover?(this.recentlyOpenedByHover=!1,clearTimeout(this.hoverOpenTimer),this.open()):this.toggle()},a.prototype.resetCloseTimer=function(){clearTimeout(this.closeTimer),this.closeTimer=setTimeout(this.close.bind(this),a.hoverCloseDelay)},a.prototype.attachHandlers=function(){this.buttonClick=function(e){e.preventDefault(),e.stopPropagation(),this.openedBy="click",this.nonHoverOpen()}.bind(this),this.buttonKeydown=function(e){13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),e.stopPropagation(),this.openedBy="keydown",this.nonHoverOpen())}.bind(this),this.buttonEnter=function(){this.openedBy||(this.openTimer=setTimeout(function(){this.open(),this.openedBy="hover",this.recentlyOpenedByHover=!0,this.hoverOpenTimer=setTimeout(function(){this.recentlyOpenedByHover=!1}.bind(this),a.recentOpenDelay)}.bind(this),a.hoverOpenDelay)),clearTimeout(this.closeTimer)}.bind(this),this.buttonLeave=function(){"hover"===this.openedBy&&this.resetCloseTimer(),clearTimeout(this.openTimer)}.bind(this),this.paneEnter=function(){clearTimeout(this.closeTimer)}.bind(this),this.paneLeave=function(){"hover"===this.openedBy&&this.resetCloseTimer()}.bind(this),this.documentClick=function(){this.close()}.bind(this),this.button.addEventListener("click",this.buttonClick),this.button.addEventListener("keydown",this.buttonKeydown),document.addEventListener("click",this.documentClick),void 0===document.ontouchstart&&(this.button.addEventListener("mouseenter",this.buttonEnter),this.button.addEventListener("mouseleave",this.buttonLeave),this.pane.addEventListener("mouseenter",this.paneEnter),this.pane.addEventListener("mouseleave",this.paneLeave))},window.sharing_js_options&&window.sharing_js_options.counts){var c={done_urls:[],get_counts:function(){var e,n,o,i,r;if("undefined"!=typeof WPCOM_sharing_counts)for(e in WPCOM_sharing_counts)if(o=WPCOM_sharing_counts[e],void 0===c.done_urls[o]){for(i in n={pinterest:[window.location.protocol+"//web.archive.org/web/20230603222647/https://api.pinterest.com/v1/urls/count.json?callback=WPCOMSharing.update_pinterest_count&url="+encodeURIComponent(e)]})if(document.querySelector("a[data-shared=sharing-"+i+"-"+o+"]")){for(;r=n[i].pop();)t(r);window.sharing_js_options.is_stats_active&&c.bump_sharing_count_stat(i)}c.done_urls[o]=!0}},update_pinterest_count:function(e){void 0!==e.count&&1*e.count>0&&c.inject_share_count("sharing-pinterest-"+WPCOM_sharing_counts[e.url],e.count)},inject_share_count:function(e,t){i(document.querySelectorAll("a[data-shared="+e+"] > span"),(function(e){var n,o=e.querySelector(".share-count");(n=o)&&n.parentNode&&n.parentNode.removeChild(n);var i=document.createElement("span");i.className="share-count",i.textContent=c.format_count(t),e.appendChild(i)}))},format_count:function(e){return e<1e3?e:e>=1e3&&e<1e4?String(e).substring(0,1)+"K+":"10K+"},bump_sharing_count_stat:function(e){(new Image).src=document.location.protocol+"//web.archive.org/web/20230603222647/https://pixel.wp.com/g.gif?v=wpcom-no-pv&x_sharing-count-request="+e+"&r="+Math.random()}};window.WPCOMSharing=c}function u(e,t){e.setAttribute("jetpack-share-click-count",t)}function d(e){var t=e.getAttribute("jetpack-share-click-count");return null===t?0:parseInt(t,10)}function l(e,t){var n,o=new XMLHttpRequest;o.open("POST",e,!0),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),o.setRequestHeader("x-requested-with","XMLHttpRequest"),o.send((n=t,(encodeURIComponent("email-share-nonce")+"="+encodeURIComponent(n)).replace(/%20/g,"+")))}function h(){p()}function p(){window.WPCOMSharing&&window.WPCOMSharing.get_counts(),i(document.querySelectorAll(".sharedaddy a"),(function(e){var t=e.getAttribute("href");t&&-1!==t.indexOf("share=")&&-1===t.indexOf("&nb=1")&&e.setAttribute("href",t+"&nb=1")})),i(document.querySelectorAll(".sharedaddy a.sharing-anchor"),(function(e){a.instantiateOrReuse(e)})),void 0!==document.ontouchstart&&document.body.classList.add("jp-sharing-input-touch"),i(document.querySelectorAll(".sharedaddy ul"),(function(e){"true"!==e.getAttribute("data-sharing-events-added")&&(e.setAttribute("data-sharing-events-added","true"),i(e.querySelectorAll("a.share-print"),(function(e){e.addEventListener("click",(function(t){t.preventDefault(),t.stopPropagation();var n=e.getAttribute("href")||"",i=function(){if(-1===n.indexOf("#print")){var e=(new Date).getTime();t=e,o=n,(i=document.createElement("iframe")).setAttribute("style","position:fixed; top:100; left:100; height:1px; width:1px; border:none;"),i.setAttribute("id","printFrame-"+t),i.setAttribute("name",i.getAttribute("id")),i.setAttribute("src",o),i.setAttribute("onload",'frames["printFrame-'+t+'"].focus();frames["printFrame-'+t+'"].print();'),document.body.appendChild(i)}else window.print();var t,o,i},s=o(e,r);if(s){var c=a.getButtonInstanceFromPane(s);c&&(c.close(),i())}else i()}))})),i(e.querySelectorAll("a.share-press-this"),(function(e){e.addEventListener("click",(function(t){t.preventDefault(),t.stopPropagation();var n="";if(window.getSelection?n=window.getSelection():document.getSelection?n=document.getSelection():document.selection&&(n=document.selection.createRange().text),n){var o=e.getAttribute("href");e.setAttribute("href",o+"&sel="+encodeURI(n))}window.open(e.getAttribute("href"),"t","toolbar=0,resizable=1,scrollbars=1,status=1,width=720,height=570")||(document.location.href=e.getAttribute("href"))}))})),i(e.querySelectorAll("a.share-email"),(function(t){u(t,0);var n,o,r=t.getAttribute("data-email-share-nonce"),s=t.getAttribute("data-email-share-track-url");r&&s&&(n=s,o=window.location.protocol+"//"+window.location.hostname+"/",0===String(n).indexOf(o))&&t.addEventListener("click",(function(){var n;u(n=t,d(n)+1),d(t)>2&&function(e,t){var n=t.parentElement;if(n.classList.contains("sd-content")){i(n.querySelectorAll(".share-email-error"),(function(e){e.parentElement.removeChild(e)}));var o=document.createElement("div");o.className="share-email-error";var r=document.createElement("h6");r.className="share-email-error-title",r.innerText=e.getAttribute("data-email-share-error-title"),o.appendChild(r);var s=document.createElement("p");s.className="share-email-error-text",s.innerText=e.getAttribute("data-email-share-error-text"),o.appendChild(s),n.appendChild(o)}}(t,e),l(s,r)}))})))})),i(document.querySelectorAll("li.share-email, li.share-custom a.sharing-anchor"),(function(e){e.classList.add("share-service-visible")}))}"loading"!==document.readyState?h():document.addEventListener("DOMContentLoaded",h),document.body.addEventListener("is.post-load",p)}();;

}

/*
     FILE ARCHIVED ON 22:26:47 Jun 03, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:23:13 Aug 30, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.452
  load_resource: 672.567 (2)
  PetaboxLoader3.resolve: 447.969 (2)
  PetaboxLoader3.datanode: 40.66 (2)
*/