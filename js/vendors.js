/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
  * Bootstrap v4.6.0 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).bootstrap={},t.jQuery)}(this,(function(t,e){"use strict";function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var i=n(e);function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}function s(t){var e=this,n=!1;return i.default(this).one(l.TRANSITION_END,(function(){n=!0})),setTimeout((function(){n||l.triggerTransitionEnd(e)}),t),this}var l={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");if(!e||"#"===e){var n=t.getAttribute("href");e=n&&"#"!==n?n.trim():""}try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement:function(t){if(!t)return 0;var e=i.default(t).css("transition-duration"),n=i.default(t).css("transition-delay"),o=parseFloat(e),r=parseFloat(n);return o||r?(e=e.split(",")[0],n=n.split(",")[0],1e3*(parseFloat(e)+parseFloat(n))):0},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(t){i.default(t).trigger("transitionend")},supportsTransitionEnd:function(){return Boolean("transitionend")},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var o=n[i],r=e[i],a=r&&l.isElement(r)?"element":null===(s=r)||"undefined"==typeof s?""+s:{}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(o).test(a))throw new Error(t.toUpperCase()+': Option "'+i+'" provided type "'+a+'" but expected type "'+o+'".')}var s},findShadowRoot:function(t){if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){var e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?l.findShadowRoot(t.parentNode):null},jQueryDetection:function(){if("undefined"==typeof i.default)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t=i.default.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||t[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}};l.jQueryDetection(),i.default.fn.emulateTransitionEnd=s,i.default.event.special[l.TRANSITION_END]={bindType:"transitionend",delegateType:"transitionend",handle:function(t){if(i.default(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}};var u="alert",f=i.default.fn[u],d=function(){function t(t){this._element=t}var e=t.prototype;return e.close=function(t){var e=this._element;t&&(e=this._getRootElement(t)),this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},e.dispose=function(){i.default.removeData(this._element,"bs.alert"),this._element=null},e._getRootElement=function(t){var e=l.getSelectorFromElement(t),n=!1;return e&&(n=document.querySelector(e)),n||(n=i.default(t).closest(".alert")[0]),n},e._triggerCloseEvent=function(t){var e=i.default.Event("close.bs.alert");return i.default(t).trigger(e),e},e._removeElement=function(t){var e=this;if(i.default(t).removeClass("show"),i.default(t).hasClass("fade")){var n=l.getTransitionDurationFromElement(t);i.default(t).one(l.TRANSITION_END,(function(n){return e._destroyElement(t,n)})).emulateTransitionEnd(n)}else this._destroyElement(t)},e._destroyElement=function(t){i.default(t).detach().trigger("closed.bs.alert").remove()},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.alert");o||(o=new t(this),n.data("bs.alert",o)),"close"===e&&o[e](this)}))},t._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}}]),t}();i.default(document).on("click.bs.alert.data-api",'[data-dismiss="alert"]',d._handleDismiss(new d)),i.default.fn[u]=d._jQueryInterface,i.default.fn[u].Constructor=d,i.default.fn[u].noConflict=function(){return i.default.fn[u]=f,d._jQueryInterface};var c=i.default.fn.button,h=function(){function t(t){this._element=t,this.shouldAvoidTriggerChange=!1}var e=t.prototype;return e.toggle=function(){var t=!0,e=!0,n=i.default(this._element).closest('[data-toggle="buttons"]')[0];if(n){var o=this._element.querySelector('input:not([type="hidden"])');if(o){if("radio"===o.type)if(o.checked&&this._element.classList.contains("active"))t=!1;else{var r=n.querySelector(".active");r&&i.default(r).removeClass("active")}t&&("checkbox"!==o.type&&"radio"!==o.type||(o.checked=!this._element.classList.contains("active")),this.shouldAvoidTriggerChange||i.default(o).trigger("change")),o.focus(),e=!1}}this._element.hasAttribute("disabled")||this._element.classList.contains("disabled")||(e&&this._element.setAttribute("aria-pressed",!this._element.classList.contains("active")),t&&i.default(this._element).toggleClass("active"))},e.dispose=function(){i.default.removeData(this._element,"bs.button"),this._element=null},t._jQueryInterface=function(e,n){return this.each((function(){var o=i.default(this),r=o.data("bs.button");r||(r=new t(this),o.data("bs.button",r)),r.shouldAvoidTriggerChange=n,"toggle"===e&&r[e]()}))},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}}]),t}();i.default(document).on("click.bs.button.data-api",'[data-toggle^="button"]',(function(t){var e=t.target,n=e;if(i.default(e).hasClass("btn")||(e=i.default(e).closest(".btn")[0]),!e||e.hasAttribute("disabled")||e.classList.contains("disabled"))t.preventDefault();else{var o=e.querySelector('input:not([type="hidden"])');if(o&&(o.hasAttribute("disabled")||o.classList.contains("disabled")))return void t.preventDefault();"INPUT"!==n.tagName&&"LABEL"===e.tagName||h._jQueryInterface.call(i.default(e),"toggle","INPUT"===n.tagName)}})).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',(function(t){var e=i.default(t.target).closest(".btn")[0];i.default(e).toggleClass("focus",/^focus(in)?$/.test(t.type))})),i.default(window).on("load.bs.button.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')),e=0,n=t.length;e<n;e++){var i=t[e],o=i.querySelector('input:not([type="hidden"])');o.checked||o.hasAttribute("checked")?i.classList.add("active"):i.classList.remove("active")}for(var r=0,a=(t=[].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length;r<a;r++){var s=t[r];"true"===s.getAttribute("aria-pressed")?s.classList.add("active"):s.classList.remove("active")}})),i.default.fn.button=h._jQueryInterface,i.default.fn.button.Constructor=h,i.default.fn.button.noConflict=function(){return i.default.fn.button=c,h._jQueryInterface};var p="carousel",m=".bs.carousel",g=i.default.fn[p],v={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},_={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},b={TOUCH:"touch",PEN:"pen"},y=function(){function t(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._element=t,this._indicatorsElement=this._element.querySelector(".carousel-indicators"),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var e=t.prototype;return e.next=function(){this._isSliding||this._slide("next")},e.nextWhenVisible=function(){var t=i.default(this._element);!document.hidden&&t.is(":visible")&&"hidden"!==t.css("visibility")&&this.next()},e.prev=function(){this._isSliding||this._slide("prev")},e.pause=function(t){t||(this._isPaused=!0),this._element.querySelector(".carousel-item-next, .carousel-item-prev")&&(l.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},e.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._updateInterval(),this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},e.to=function(t){var e=this;this._activeElement=this._element.querySelector(".active.carousel-item");var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)i.default(this._element).one("slid.bs.carousel",(function(){return e.to(t)}));else{if(n===t)return this.pause(),void this.cycle();var o=t>n?"next":"prev";this._slide(o,this._items[t])}},e.dispose=function(){i.default(this._element).off(m),i.default.removeData(this._element,"bs.carousel"),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},e._getConfig=function(t){return t=a({},v,t),l.typeCheckConfig(p,t,_),t},e._handleSwipe=function(){var t=Math.abs(this.touchDeltaX);if(!(t<=40)){var e=t/this.touchDeltaX;this.touchDeltaX=0,e>0&&this.prev(),e<0&&this.next()}},e._addEventListeners=function(){var t=this;this._config.keyboard&&i.default(this._element).on("keydown.bs.carousel",(function(e){return t._keydown(e)})),"hover"===this._config.pause&&i.default(this._element).on("mouseenter.bs.carousel",(function(e){return t.pause(e)})).on("mouseleave.bs.carousel",(function(e){return t.cycle(e)})),this._config.touch&&this._addTouchEventListeners()},e._addTouchEventListeners=function(){var t=this;if(this._touchSupported){var e=function(e){t._pointerEvent&&b[e.originalEvent.pointerType.toUpperCase()]?t.touchStartX=e.originalEvent.clientX:t._pointerEvent||(t.touchStartX=e.originalEvent.touches[0].clientX)},n=function(e){t._pointerEvent&&b[e.originalEvent.pointerType.toUpperCase()]&&(t.touchDeltaX=e.originalEvent.clientX-t.touchStartX),t._handleSwipe(),"hover"===t._config.pause&&(t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout((function(e){return t.cycle(e)}),500+t._config.interval))};i.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel",(function(t){return t.preventDefault()})),this._pointerEvent?(i.default(this._element).on("pointerdown.bs.carousel",(function(t){return e(t)})),i.default(this._element).on("pointerup.bs.carousel",(function(t){return n(t)})),this._element.classList.add("pointer-event")):(i.default(this._element).on("touchstart.bs.carousel",(function(t){return e(t)})),i.default(this._element).on("touchmove.bs.carousel",(function(e){return function(e){e.originalEvent.touches&&e.originalEvent.touches.length>1?t.touchDeltaX=0:t.touchDeltaX=e.originalEvent.touches[0].clientX-t.touchStartX}(e)})),i.default(this._element).on("touchend.bs.carousel",(function(t){return n(t)})))}},e._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},e._getItemIndex=function(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(".carousel-item")):[],this._items.indexOf(t)},e._getItemByDirection=function(t,e){var n="next"===t,i="prev"===t,o=this._getItemIndex(e),r=this._items.length-1;if((i&&0===o||n&&o===r)&&!this._config.wrap)return e;var a=(o+("prev"===t?-1:1))%this._items.length;return-1===a?this._items[this._items.length-1]:this._items[a]},e._triggerSlideEvent=function(t,e){var n=this._getItemIndex(t),o=this._getItemIndex(this._element.querySelector(".active.carousel-item")),r=i.default.Event("slide.bs.carousel",{relatedTarget:t,direction:e,from:o,to:n});return i.default(this._element).trigger(r),r},e._setActiveIndicatorElement=function(t){if(this._indicatorsElement){var e=[].slice.call(this._indicatorsElement.querySelectorAll(".active"));i.default(e).removeClass("active");var n=this._indicatorsElement.children[this._getItemIndex(t)];n&&i.default(n).addClass("active")}},e._updateInterval=function(){var t=this._activeElement||this._element.querySelector(".active.carousel-item");if(t){var e=parseInt(t.getAttribute("data-interval"),10);e?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=e):this._config.interval=this._config.defaultInterval||this._config.interval}},e._slide=function(t,e){var n,o,r,a=this,s=this._element.querySelector(".active.carousel-item"),u=this._getItemIndex(s),f=e||s&&this._getItemByDirection(t,s),d=this._getItemIndex(f),c=Boolean(this._interval);if("next"===t?(n="carousel-item-left",o="carousel-item-next",r="left"):(n="carousel-item-right",o="carousel-item-prev",r="right"),f&&i.default(f).hasClass("active"))this._isSliding=!1;else if(!this._triggerSlideEvent(f,r).isDefaultPrevented()&&s&&f){this._isSliding=!0,c&&this.pause(),this._setActiveIndicatorElement(f),this._activeElement=f;var h=i.default.Event("slid.bs.carousel",{relatedTarget:f,direction:r,from:u,to:d});if(i.default(this._element).hasClass("slide")){i.default(f).addClass(o),l.reflow(f),i.default(s).addClass(n),i.default(f).addClass(n);var p=l.getTransitionDurationFromElement(s);i.default(s).one(l.TRANSITION_END,(function(){i.default(f).removeClass(n+" "+o).addClass("active"),i.default(s).removeClass("active "+o+" "+n),a._isSliding=!1,setTimeout((function(){return i.default(a._element).trigger(h)}),0)})).emulateTransitionEnd(p)}else i.default(s).removeClass("active"),i.default(f).addClass("active"),this._isSliding=!1,i.default(this._element).trigger(h);c&&this.cycle()}},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this).data("bs.carousel"),o=a({},v,i.default(this).data());"object"==typeof e&&(o=a({},o,e));var r="string"==typeof e?e:o.slide;if(n||(n=new t(this,o),i.default(this).data("bs.carousel",n)),"number"==typeof e)n.to(e);else if("string"==typeof r){if("undefined"==typeof n[r])throw new TypeError('No method named "'+r+'"');n[r]()}else o.interval&&o.ride&&(n.pause(),n.cycle())}))},t._dataApiClickHandler=function(e){var n=l.getSelectorFromElement(this);if(n){var o=i.default(n)[0];if(o&&i.default(o).hasClass("carousel")){var r=a({},i.default(o).data(),i.default(this).data()),s=this.getAttribute("data-slide-to");s&&(r.interval=!1),t._jQueryInterface.call(i.default(o),r),s&&i.default(o).data("bs.carousel").to(s),e.preventDefault()}}},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return v}}]),t}();i.default(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",y._dataApiClickHandler),i.default(window).on("load.bs.carousel.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-ride="carousel"]')),e=0,n=t.length;e<n;e++){var o=i.default(t[e]);y._jQueryInterface.call(o,o.data())}})),i.default.fn[p]=y._jQueryInterface,i.default.fn[p].Constructor=y,i.default.fn[p].noConflict=function(){return i.default.fn[p]=g,y._jQueryInterface};var w="collapse",E=i.default.fn[w],T={toggle:!0,parent:""},C={toggle:"boolean",parent:"(string|element)"},S=function(){function t(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var n=[].slice.call(document.querySelectorAll('[data-toggle="collapse"]')),i=0,o=n.length;i<o;i++){var r=n[i],a=l.getSelectorFromElement(r),s=[].slice.call(document.querySelectorAll(a)).filter((function(e){return e===t}));null!==a&&s.length>0&&(this._selector=a,this._triggerArray.push(r))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var e=t.prototype;return e.toggle=function(){i.default(this._element).hasClass("show")?this.hide():this.show()},e.show=function(){var e,n,o=this;if(!this._isTransitioning&&!i.default(this._element).hasClass("show")&&(this._parent&&0===(e=[].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter((function(t){return"string"==typeof o._config.parent?t.getAttribute("data-parent")===o._config.parent:t.classList.contains("collapse")}))).length&&(e=null),!(e&&(n=i.default(e).not(this._selector).data("bs.collapse"))&&n._isTransitioning))){var r=i.default.Event("show.bs.collapse");if(i.default(this._element).trigger(r),!r.isDefaultPrevented()){e&&(t._jQueryInterface.call(i.default(e).not(this._selector),"hide"),n||i.default(e).data("bs.collapse",null));var a=this._getDimension();i.default(this._element).removeClass("collapse").addClass("collapsing"),this._element.style[a]=0,this._triggerArray.length&&i.default(this._triggerArray).removeClass("collapsed").attr("aria-expanded",!0),this.setTransitioning(!0);var s="scroll"+(a[0].toUpperCase()+a.slice(1)),u=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,(function(){i.default(o._element).removeClass("collapsing").addClass("collapse show"),o._element.style[a]="",o.setTransitioning(!1),i.default(o._element).trigger("shown.bs.collapse")})).emulateTransitionEnd(u),this._element.style[a]=this._element[s]+"px"}}},e.hide=function(){var t=this;if(!this._isTransitioning&&i.default(this._element).hasClass("show")){var e=i.default.Event("hide.bs.collapse");if(i.default(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._getDimension();this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",l.reflow(this._element),i.default(this._element).addClass("collapsing").removeClass("collapse show");var o=this._triggerArray.length;if(o>0)for(var r=0;r<o;r++){var a=this._triggerArray[r],s=l.getSelectorFromElement(a);if(null!==s)i.default([].slice.call(document.querySelectorAll(s))).hasClass("show")||i.default(a).addClass("collapsed").attr("aria-expanded",!1)}this.setTransitioning(!0);this._element.style[n]="";var u=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,(function(){t.setTransitioning(!1),i.default(t._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")})).emulateTransitionEnd(u)}}},e.setTransitioning=function(t){this._isTransitioning=t},e.dispose=function(){i.default.removeData(this._element,"bs.collapse"),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},e._getConfig=function(t){return(t=a({},T,t)).toggle=Boolean(t.toggle),l.typeCheckConfig(w,t,C),t},e._getDimension=function(){return i.default(this._element).hasClass("width")?"width":"height"},e._getParent=function(){var e,n=this;l.isElement(this._config.parent)?(e=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(e=this._config.parent[0])):e=document.querySelector(this._config.parent);var o='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',r=[].slice.call(e.querySelectorAll(o));return i.default(r).each((function(e,i){n._addAriaAndCollapsedClass(t._getTargetFromElement(i),[i])})),e},e._addAriaAndCollapsedClass=function(t,e){var n=i.default(t).hasClass("show");e.length&&i.default(e).toggleClass("collapsed",!n).attr("aria-expanded",n)},t._getTargetFromElement=function(t){var e=l.getSelectorFromElement(t);return e?document.querySelector(e):null},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.collapse"),r=a({},T,n.data(),"object"==typeof e&&e?e:{});if(!o&&r.toggle&&"string"==typeof e&&/show|hide/.test(e)&&(r.toggle=!1),o||(o=new t(this,r),n.data("bs.collapse",o)),"string"==typeof e){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e]()}}))},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return T}}]),t}();i.default(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',(function(t){"A"===t.currentTarget.tagName&&t.preventDefault();var e=i.default(this),n=l.getSelectorFromElement(this),o=[].slice.call(document.querySelectorAll(n));i.default(o).each((function(){var t=i.default(this),n=t.data("bs.collapse")?"toggle":e.data();S._jQueryInterface.call(t,n)}))})),i.default.fn[w]=S._jQueryInterface,i.default.fn[w].Constructor=S,i.default.fn[w].noConflict=function(){return i.default.fn[w]=E,S._jQueryInterface};var D="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator,N=function(){for(var t=["Edge","Trident","Firefox"],e=0;e<t.length;e+=1)if(D&&navigator.userAgent.indexOf(t[e])>=0)return 1;return 0}();var k=D&&window.Promise?function(t){var e=!1;return function(){e||(e=!0,window.Promise.resolve().then((function(){e=!1,t()})))}}:function(t){var e=!1;return function(){e||(e=!0,setTimeout((function(){e=!1,t()}),N))}};function A(t){return t&&"[object Function]"==={}.toString.call(t)}function I(t,e){if(1!==t.nodeType)return[];var n=t.ownerDocument.defaultView.getComputedStyle(t,null);return e?n[e]:n}function O(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function x(t){if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}var e=I(t),n=e.overflow,i=e.overflowX,o=e.overflowY;return/(auto|scroll|overlay)/.test(n+o+i)?t:x(O(t))}function j(t){return t&&t.referenceNode?t.referenceNode:t}var L=D&&!(!window.MSInputMethodContext||!document.documentMode),P=D&&/MSIE 10/.test(navigator.userAgent);function F(t){return 11===t?L:10===t?P:L||P}function R(t){if(!t)return document.documentElement;for(var e=F(10)?document.body:null,n=t.offsetParent||null;n===e&&t.nextElementSibling;)n=(t=t.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===I(n,"position")?R(n):n:t?t.ownerDocument.documentElement:document.documentElement}function H(t){return null!==t.parentNode?H(t.parentNode):t}function M(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?t:e,o=n?e:t,r=document.createRange();r.setStart(i,0),r.setEnd(o,0);var a,s,l=r.commonAncestorContainer;if(t!==l&&e!==l||i.contains(o))return"BODY"===(s=(a=l).nodeName)||"HTML"!==s&&R(a.firstElementChild)!==a?R(l):l;var u=H(t);return u.host?M(u.host,e):M(t,H(e).host)}function q(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n="top"===e?"scrollTop":"scrollLeft",i=t.nodeName;if("BODY"===i||"HTML"===i){var o=t.ownerDocument.documentElement,r=t.ownerDocument.scrollingElement||o;return r[n]}return t[n]}function B(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=q(e,"top"),o=q(e,"left"),r=n?-1:1;return t.top+=i*r,t.bottom+=i*r,t.left+=o*r,t.right+=o*r,t}function Q(t,e){var n="x"===e?"Left":"Top",i="Left"===n?"Right":"Bottom";return parseFloat(t["border"+n+"Width"])+parseFloat(t["border"+i+"Width"])}function W(t,e,n,i){return Math.max(e["offset"+t],e["scroll"+t],n["client"+t],n["offset"+t],n["scroll"+t],F(10)?parseInt(n["offset"+t])+parseInt(i["margin"+("Height"===t?"Top":"Left")])+parseInt(i["margin"+("Height"===t?"Bottom":"Right")]):0)}function U(t){var e=t.body,n=t.documentElement,i=F(10)&&getComputedStyle(n);return{height:W("Height",e,n,i),width:W("Width",e,n,i)}}var V=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},Y=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),z=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},X=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function K(t){return X({},t,{right:t.left+t.width,bottom:t.top+t.height})}function G(t){var e={};try{if(F(10)){e=t.getBoundingClientRect();var n=q(t,"top"),i=q(t,"left");e.top+=n,e.left+=i,e.bottom+=n,e.right+=i}else e=t.getBoundingClientRect()}catch(t){}var o={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},r="HTML"===t.nodeName?U(t.ownerDocument):{},a=r.width||t.clientWidth||o.width,s=r.height||t.clientHeight||o.height,l=t.offsetWidth-a,u=t.offsetHeight-s;if(l||u){var f=I(t);l-=Q(f,"x"),u-=Q(f,"y"),o.width-=l,o.height-=u}return K(o)}function $(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=F(10),o="HTML"===e.nodeName,r=G(t),a=G(e),s=x(t),l=I(e),u=parseFloat(l.borderTopWidth),f=parseFloat(l.borderLeftWidth);n&&o&&(a.top=Math.max(a.top,0),a.left=Math.max(a.left,0));var d=K({top:r.top-a.top-u,left:r.left-a.left-f,width:r.width,height:r.height});if(d.marginTop=0,d.marginLeft=0,!i&&o){var c=parseFloat(l.marginTop),h=parseFloat(l.marginLeft);d.top-=u-c,d.bottom-=u-c,d.left-=f-h,d.right-=f-h,d.marginTop=c,d.marginLeft=h}return(i&&!n?e.contains(s):e===s&&"BODY"!==s.nodeName)&&(d=B(d,e)),d}function J(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.ownerDocument.documentElement,i=$(t,n),o=Math.max(n.clientWidth,window.innerWidth||0),r=Math.max(n.clientHeight,window.innerHeight||0),a=e?0:q(n),s=e?0:q(n,"left"),l={top:a-i.top+i.marginTop,left:s-i.left+i.marginLeft,width:o,height:r};return K(l)}function Z(t){var e=t.nodeName;if("BODY"===e||"HTML"===e)return!1;if("fixed"===I(t,"position"))return!0;var n=O(t);return!!n&&Z(n)}function tt(t){if(!t||!t.parentElement||F())return document.documentElement;for(var e=t.parentElement;e&&"none"===I(e,"transform");)e=e.parentElement;return e||document.documentElement}function et(t,e,n,i){var o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r={top:0,left:0},a=o?tt(t):M(t,j(e));if("viewport"===i)r=J(a,o);else{var s=void 0;"scrollParent"===i?"BODY"===(s=x(O(e))).nodeName&&(s=t.ownerDocument.documentElement):s="window"===i?t.ownerDocument.documentElement:i;var l=$(s,a,o);if("HTML"!==s.nodeName||Z(a))r=l;else{var u=U(t.ownerDocument),f=u.height,d=u.width;r.top+=l.top-l.marginTop,r.bottom=f+l.top,r.left+=l.left-l.marginLeft,r.right=d+l.left}}var c="number"==typeof(n=n||0);return r.left+=c?n:n.left||0,r.top+=c?n:n.top||0,r.right-=c?n:n.right||0,r.bottom-=c?n:n.bottom||0,r}function nt(t){return t.width*t.height}function it(t,e,n,i,o){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var a=et(n,i,r,o),s={top:{width:a.width,height:e.top-a.top},right:{width:a.right-e.right,height:a.height},bottom:{width:a.width,height:a.bottom-e.bottom},left:{width:e.left-a.left,height:a.height}},l=Object.keys(s).map((function(t){return X({key:t},s[t],{area:nt(s[t])})})).sort((function(t,e){return e.area-t.area})),u=l.filter((function(t){var e=t.width,i=t.height;return e>=n.clientWidth&&i>=n.clientHeight})),f=u.length>0?u[0].key:l[0].key,d=t.split("-")[1];return f+(d?"-"+d:"")}function ot(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=i?tt(e):M(e,j(n));return $(n,o,i)}function rt(t){var e=t.ownerDocument.defaultView.getComputedStyle(t),n=parseFloat(e.marginTop||0)+parseFloat(e.marginBottom||0),i=parseFloat(e.marginLeft||0)+parseFloat(e.marginRight||0);return{width:t.offsetWidth+i,height:t.offsetHeight+n}}function at(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,(function(t){return e[t]}))}function st(t,e,n){n=n.split("-")[0];var i=rt(t),o={width:i.width,height:i.height},r=-1!==["right","left"].indexOf(n),a=r?"top":"left",s=r?"left":"top",l=r?"height":"width",u=r?"width":"height";return o[a]=e[a]+e[l]/2-i[l]/2,o[s]=n===s?e[s]-i[u]:e[at(s)],o}function lt(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function ut(t,e,n){return(void 0===n?t:t.slice(0,function(t,e,n){if(Array.prototype.findIndex)return t.findIndex((function(t){return t[e]===n}));var i=lt(t,(function(t){return t[e]===n}));return t.indexOf(i)}(t,"name",n))).forEach((function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=t.function||t.fn;t.enabled&&A(n)&&(e.offsets.popper=K(e.offsets.popper),e.offsets.reference=K(e.offsets.reference),e=n(e,t))})),e}function ft(){if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=ot(this.state,this.popper,this.reference,this.options.positionFixed),t.placement=it(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,t.offsets.popper=st(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",t=ut(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}function dt(t,e){return t.some((function(t){var n=t.name;return t.enabled&&n===e}))}function ct(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),i=0;i<e.length;i++){var o=e[i],r=o?""+o+n:t;if("undefined"!=typeof document.body.style[r])return r}return null}function ht(){return this.state.isDestroyed=!0,dt(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[ct("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function pt(t){var e=t.ownerDocument;return e?e.defaultView:window}function mt(t,e,n,i){n.updateBound=i,pt(t).addEventListener("resize",n.updateBound,{passive:!0});var o=x(t);return function t(e,n,i,o){var r="BODY"===e.nodeName,a=r?e.ownerDocument.defaultView:e;a.addEventListener(n,i,{passive:!0}),r||t(x(a.parentNode),n,i,o),o.push(a)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function gt(){this.state.eventsEnabled||(this.state=mt(this.reference,this.options,this.state,this.scheduleUpdate))}function vt(){var t,e;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(t=this.reference,e=this.state,pt(t).removeEventListener("resize",e.updateBound),e.scrollParents.forEach((function(t){t.removeEventListener("scroll",e.updateBound)})),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e))}function _t(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function bt(t,e){Object.keys(e).forEach((function(n){var i="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&_t(e[n])&&(i="px"),t.style[n]=e[n]+i}))}var yt=D&&/Firefox/i.test(navigator.userAgent);function wt(t,e,n){var i=lt(t,(function(t){return t.name===e})),o=!!i&&t.some((function(t){return t.name===n&&t.enabled&&t.order<i.order}));if(!o){var r="`"+e+"`",a="`"+n+"`";console.warn(a+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return o}var Et=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],Tt=Et.slice(3);function Ct(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Tt.indexOf(t),i=Tt.slice(n+1).concat(Tt.slice(0,n));return e?i.reverse():i}var St="flip",Dt="clockwise",Nt="counterclockwise";function kt(t,e,n,i){var o=[0,0],r=-1!==["right","left"].indexOf(i),a=t.split(/(\+|\-)/).map((function(t){return t.trim()})),s=a.indexOf(lt(a,(function(t){return-1!==t.search(/,|\s/)})));a[s]&&-1===a[s].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,u=-1!==s?[a.slice(0,s).concat([a[s].split(l)[0]]),[a[s].split(l)[1]].concat(a.slice(s+1))]:[a];return(u=u.map((function(t,i){var o=(1===i?!r:r)?"height":"width",a=!1;return t.reduce((function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,a=!0,t):a?(t[t.length-1]+=e,a=!1,t):t.concat(e)}),[]).map((function(t){return function(t,e,n,i){var o=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+o[1],a=o[2];if(!r)return t;if(0===a.indexOf("%")){var s=void 0;switch(a){case"%p":s=n;break;case"%":case"%r":default:s=i}return K(s)[e]/100*r}if("vh"===a||"vw"===a)return("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*r;return r}(t,o,e,n)}))}))).forEach((function(t,e){t.forEach((function(n,i){_t(n)&&(o[e]+=n*("-"===t[i-1]?-1:1))}))})),o}var At={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(t){var e=t.placement,n=e.split("-")[0],i=e.split("-")[1];if(i){var o=t.offsets,r=o.reference,a=o.popper,s=-1!==["bottom","top"].indexOf(n),l=s?"left":"top",u=s?"width":"height",f={start:z({},l,r[l]),end:z({},l,r[l]+r[u]-a[u])};t.offsets.popper=X({},a,f[i])}return t}},offset:{order:200,enabled:!0,fn:function(t,e){var n=e.offset,i=t.placement,o=t.offsets,r=o.popper,a=o.reference,s=i.split("-")[0],l=void 0;return l=_t(+n)?[+n,0]:kt(n,r,a,s),"left"===s?(r.top+=l[0],r.left-=l[1]):"right"===s?(r.top+=l[0],r.left+=l[1]):"top"===s?(r.left+=l[0],r.top-=l[1]):"bottom"===s&&(r.left+=l[0],r.top+=l[1]),t.popper=r,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,e){var n=e.boundariesElement||R(t.instance.popper);t.instance.reference===n&&(n=R(n));var i=ct("transform"),o=t.instance.popper.style,r=o.top,a=o.left,s=o[i];o.top="",o.left="",o[i]="";var l=et(t.instance.popper,t.instance.reference,e.padding,n,t.positionFixed);o.top=r,o.left=a,o[i]=s,e.boundaries=l;var u=e.priority,f=t.offsets.popper,d={primary:function(t){var n=f[t];return f[t]<l[t]&&!e.escapeWithReference&&(n=Math.max(f[t],l[t])),z({},t,n)},secondary:function(t){var n="right"===t?"left":"top",i=f[n];return f[t]>l[t]&&!e.escapeWithReference&&(i=Math.min(f[n],l[t]-("right"===t?f.width:f.height))),z({},n,i)}};return u.forEach((function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";f=X({},f,d[e](t))})),t.offsets.popper=f,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){var e=t.offsets,n=e.popper,i=e.reference,o=t.placement.split("-")[0],r=Math.floor,a=-1!==["top","bottom"].indexOf(o),s=a?"right":"bottom",l=a?"left":"top",u=a?"width":"height";return n[s]<r(i[l])&&(t.offsets.popper[l]=r(i[l])-n[u]),n[l]>r(i[s])&&(t.offsets.popper[l]=r(i[s])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){var n;if(!wt(t.instance.modifiers,"arrow","keepTogether"))return t;var i=e.element;if("string"==typeof i){if(!(i=t.instance.popper.querySelector(i)))return t}else if(!t.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var o=t.placement.split("-")[0],r=t.offsets,a=r.popper,s=r.reference,l=-1!==["left","right"].indexOf(o),u=l?"height":"width",f=l?"Top":"Left",d=f.toLowerCase(),c=l?"left":"top",h=l?"bottom":"right",p=rt(i)[u];s[h]-p<a[d]&&(t.offsets.popper[d]-=a[d]-(s[h]-p)),s[d]+p>a[h]&&(t.offsets.popper[d]+=s[d]+p-a[h]),t.offsets.popper=K(t.offsets.popper);var m=s[d]+s[u]/2-p/2,g=I(t.instance.popper),v=parseFloat(g["margin"+f]),_=parseFloat(g["border"+f+"Width"]),b=m-t.offsets.popper[d]-v-_;return b=Math.max(Math.min(a[u]-p,b),0),t.arrowElement=i,t.offsets.arrow=(z(n={},d,Math.round(b)),z(n,c,""),n),t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(t,e){if(dt(t.instance.modifiers,"inner"))return t;if(t.flipped&&t.placement===t.originalPlacement)return t;var n=et(t.instance.popper,t.instance.reference,e.padding,e.boundariesElement,t.positionFixed),i=t.placement.split("-")[0],o=at(i),r=t.placement.split("-")[1]||"",a=[];switch(e.behavior){case St:a=[i,o];break;case Dt:a=Ct(i);break;case Nt:a=Ct(i,!0);break;default:a=e.behavior}return a.forEach((function(s,l){if(i!==s||a.length===l+1)return t;i=t.placement.split("-")[0],o=at(i);var u=t.offsets.popper,f=t.offsets.reference,d=Math.floor,c="left"===i&&d(u.right)>d(f.left)||"right"===i&&d(u.left)<d(f.right)||"top"===i&&d(u.bottom)>d(f.top)||"bottom"===i&&d(u.top)<d(f.bottom),h=d(u.left)<d(n.left),p=d(u.right)>d(n.right),m=d(u.top)<d(n.top),g=d(u.bottom)>d(n.bottom),v="left"===i&&h||"right"===i&&p||"top"===i&&m||"bottom"===i&&g,_=-1!==["top","bottom"].indexOf(i),b=!!e.flipVariations&&(_&&"start"===r&&h||_&&"end"===r&&p||!_&&"start"===r&&m||!_&&"end"===r&&g),y=!!e.flipVariationsByContent&&(_&&"start"===r&&p||_&&"end"===r&&h||!_&&"start"===r&&g||!_&&"end"===r&&m),w=b||y;(c||v||w)&&(t.flipped=!0,(c||v)&&(i=a[l+1]),w&&(r=function(t){return"end"===t?"start":"start"===t?"end":t}(r)),t.placement=i+(r?"-"+r:""),t.offsets.popper=X({},t.offsets.popper,st(t.instance.popper,t.offsets.reference,t.placement)),t=ut(t.instance.modifiers,t,"flip"))})),t},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(t){var e=t.placement,n=e.split("-")[0],i=t.offsets,o=i.popper,r=i.reference,a=-1!==["left","right"].indexOf(n),s=-1===["top","left"].indexOf(n);return o[a?"left":"top"]=r[n]-(s?o[a?"width":"height"]:0),t.placement=at(e),t.offsets.popper=K(o),t}},hide:{order:800,enabled:!0,fn:function(t){if(!wt(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=lt(t.instance.modifiers,(function(t){return"preventOverflow"===t.name})).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){var n=e.x,i=e.y,o=t.offsets.popper,r=lt(t.instance.modifiers,(function(t){return"applyStyle"===t.name})).gpuAcceleration;void 0!==r&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0!==r?r:e.gpuAcceleration,s=R(t.instance.popper),l=G(s),u={position:o.position},f=function(t,e){var n=t.offsets,i=n.popper,o=n.reference,r=Math.round,a=Math.floor,s=function(t){return t},l=r(o.width),u=r(i.width),f=-1!==["left","right"].indexOf(t.placement),d=-1!==t.placement.indexOf("-"),c=e?f||d||l%2==u%2?r:a:s,h=e?r:s;return{left:c(l%2==1&&u%2==1&&!d&&e?i.left-1:i.left),top:h(i.top),bottom:h(i.bottom),right:c(i.right)}}(t,window.devicePixelRatio<2||!yt),d="bottom"===n?"top":"bottom",c="right"===i?"left":"right",h=ct("transform"),p=void 0,m=void 0;if(m="bottom"===d?"HTML"===s.nodeName?-s.clientHeight+f.bottom:-l.height+f.bottom:f.top,p="right"===c?"HTML"===s.nodeName?-s.clientWidth+f.right:-l.width+f.right:f.left,a&&h)u[h]="translate3d("+p+"px, "+m+"px, 0)",u[d]=0,u[c]=0,u.willChange="transform";else{var g="bottom"===d?-1:1,v="right"===c?-1:1;u[d]=m*g,u[c]=p*v,u.willChange=d+", "+c}var _={"x-placement":t.placement};return t.attributes=X({},_,t.attributes),t.styles=X({},u,t.styles),t.arrowStyles=X({},t.offsets.arrow,t.arrowStyles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){var e,n;return bt(t.instance.popper,t.styles),e=t.instance.popper,n=t.attributes,Object.keys(n).forEach((function(t){!1!==n[t]?e.setAttribute(t,n[t]):e.removeAttribute(t)})),t.arrowElement&&Object.keys(t.arrowStyles).length&&bt(t.arrowElement,t.arrowStyles),t},onLoad:function(t,e,n,i,o){var r=ot(o,e,t,n.positionFixed),a=it(n.placement,r,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",a),bt(e,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},It=function(){function t(e,n){var i=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};V(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=k(this.update.bind(this)),this.options=X({},t.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(X({},t.Defaults.modifiers,o.modifiers)).forEach((function(e){i.options.modifiers[e]=X({},t.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((function(t){return X({name:t},i.options.modifiers[t])})).sort((function(t,e){return t.order-e.order})),this.modifiers.forEach((function(t){t.enabled&&A(t.onLoad)&&t.onLoad(i.reference,i.popper,i.options,t,i.state)})),this.update();var r=this.options.eventsEnabled;r&&this.enableEventListeners(),this.state.eventsEnabled=r}return Y(t,[{key:"update",value:function(){return ft.call(this)}},{key:"destroy",value:function(){return ht.call(this)}},{key:"enableEventListeners",value:function(){return gt.call(this)}},{key:"disableEventListeners",value:function(){return vt.call(this)}}]),t}();It.Utils=("undefined"!=typeof window?window:global).PopperUtils,It.placements=Et,It.Defaults=At;var Ot="dropdown",xt=i.default.fn[Ot],jt=new RegExp("38|40|27"),Lt={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic",popperConfig:null},Pt={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string",popperConfig:"(null|object)"},Ft=function(){function t(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var e=t.prototype;return e.toggle=function(){if(!this._element.disabled&&!i.default(this._element).hasClass("disabled")){var e=i.default(this._menu).hasClass("show");t._clearMenus(),e||this.show(!0)}},e.show=function(e){if(void 0===e&&(e=!1),!(this._element.disabled||i.default(this._element).hasClass("disabled")||i.default(this._menu).hasClass("show"))){var n={relatedTarget:this._element},o=i.default.Event("show.bs.dropdown",n),r=t._getParentFromElement(this._element);if(i.default(r).trigger(o),!o.isDefaultPrevented()){if(!this._inNavbar&&e){if("undefined"==typeof It)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");var a=this._element;"parent"===this._config.reference?a=r:l.isElement(this._config.reference)&&(a=this._config.reference,"undefined"!=typeof this._config.reference.jquery&&(a=this._config.reference[0])),"scrollParent"!==this._config.boundary&&i.default(r).addClass("position-static"),this._popper=new It(a,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===i.default(r).closest(".navbar-nav").length&&i.default(document.body).children().on("mouseover",null,i.default.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),i.default(this._menu).toggleClass("show"),i.default(r).toggleClass("show").trigger(i.default.Event("shown.bs.dropdown",n))}}},e.hide=function(){if(!this._element.disabled&&!i.default(this._element).hasClass("disabled")&&i.default(this._menu).hasClass("show")){var e={relatedTarget:this._element},n=i.default.Event("hide.bs.dropdown",e),o=t._getParentFromElement(this._element);i.default(o).trigger(n),n.isDefaultPrevented()||(this._popper&&this._popper.destroy(),i.default(this._menu).toggleClass("show"),i.default(o).toggleClass("show").trigger(i.default.Event("hidden.bs.dropdown",e)))}},e.dispose=function(){i.default.removeData(this._element,"bs.dropdown"),i.default(this._element).off(".bs.dropdown"),this._element=null,this._menu=null,null!==this._popper&&(this._popper.destroy(),this._popper=null)},e.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},e._addEventListeners=function(){var t=this;i.default(this._element).on("click.bs.dropdown",(function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}))},e._getConfig=function(t){return t=a({},this.constructor.Default,i.default(this._element).data(),t),l.typeCheckConfig(Ot,t,this.constructor.DefaultType),t},e._getMenuElement=function(){if(!this._menu){var e=t._getParentFromElement(this._element);e&&(this._menu=e.querySelector(".dropdown-menu"))}return this._menu},e._getPlacement=function(){var t=i.default(this._element.parentNode),e="bottom-start";return t.hasClass("dropup")?e=i.default(this._menu).hasClass("dropdown-menu-right")?"top-end":"top-start":t.hasClass("dropright")?e="right-start":t.hasClass("dropleft")?e="left-start":i.default(this._menu).hasClass("dropdown-menu-right")&&(e="bottom-end"),e},e._detectNavbar=function(){return i.default(this._element).closest(".navbar").length>0},e._getOffset=function(){var t=this,e={};return"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=a({},e.offsets,t._config.offset(e.offsets,t._element)||{}),e}:e.offset=this._config.offset,e},e._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(t.modifiers.applyStyle={enabled:!1}),a({},t,this._config.popperConfig)},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this).data("bs.dropdown");if(n||(n=new t(this,"object"==typeof e?e:null),i.default(this).data("bs.dropdown",n)),"string"==typeof e){if("undefined"==typeof n[e])throw new TypeError('No method named "'+e+'"');n[e]()}}))},t._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var n=[].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')),o=0,r=n.length;o<r;o++){var a=t._getParentFromElement(n[o]),s=i.default(n[o]).data("bs.dropdown"),l={relatedTarget:n[o]};if(e&&"click"===e.type&&(l.clickEvent=e),s){var u=s._menu;if(i.default(a).hasClass("show")&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&i.default.contains(a,e.target))){var f=i.default.Event("hide.bs.dropdown",l);i.default(a).trigger(f),f.isDefaultPrevented()||("ontouchstart"in document.documentElement&&i.default(document.body).children().off("mouseover",null,i.default.noop),n[o].setAttribute("aria-expanded","false"),s._popper&&s._popper.destroy(),i.default(u).removeClass("show"),i.default(a).removeClass("show").trigger(i.default.Event("hidden.bs.dropdown",l)))}}}},t._getParentFromElement=function(t){var e,n=l.getSelectorFromElement(t);return n&&(e=document.querySelector(n)),e||t.parentNode},t._dataApiKeydownHandler=function(e){if(!(/input|textarea/i.test(e.target.tagName)?32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||i.default(e.target).closest(".dropdown-menu").length):!jt.test(e.which))&&!this.disabled&&!i.default(this).hasClass("disabled")){var n=t._getParentFromElement(this),o=i.default(n).hasClass("show");if(o||27!==e.which){if(e.preventDefault(),e.stopPropagation(),!o||27===e.which||32===e.which)return 27===e.which&&i.default(n.querySelector('[data-toggle="dropdown"]')).trigger("focus"),void i.default(this).trigger("click");var r=[].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter((function(t){return i.default(t).is(":visible")}));if(0!==r.length){var a=r.indexOf(e.target);38===e.which&&a>0&&a--,40===e.which&&a<r.length-1&&a++,a<0&&(a=0),r[a].focus()}}}},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return Lt}},{key:"DefaultType",get:function(){return Pt}}]),t}();i.default(document).on("keydown.bs.dropdown.data-api",'[data-toggle="dropdown"]',Ft._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api",".dropdown-menu",Ft._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api",Ft._clearMenus).on("click.bs.dropdown.data-api",'[data-toggle="dropdown"]',(function(t){t.preventDefault(),t.stopPropagation(),Ft._jQueryInterface.call(i.default(this),"toggle")})).on("click.bs.dropdown.data-api",".dropdown form",(function(t){t.stopPropagation()})),i.default.fn[Ot]=Ft._jQueryInterface,i.default.fn[Ot].Constructor=Ft,i.default.fn[Ot].noConflict=function(){return i.default.fn[Ot]=xt,Ft._jQueryInterface};var Rt=i.default.fn.modal,Ht={backdrop:!0,keyboard:!0,focus:!0,show:!0},Mt={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},qt=function(){function t(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=t.querySelector(".modal-dialog"),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var e=t.prototype;return e.toggle=function(t){return this._isShown?this.hide():this.show(t)},e.show=function(t){var e=this;if(!this._isShown&&!this._isTransitioning){i.default(this._element).hasClass("fade")&&(this._isTransitioning=!0);var n=i.default.Event("show.bs.modal",{relatedTarget:t});i.default(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),i.default(this._element).on("click.dismiss.bs.modal",'[data-dismiss="modal"]',(function(t){return e.hide(t)})),i.default(this._dialog).on("mousedown.dismiss.bs.modal",(function(){i.default(e._element).one("mouseup.dismiss.bs.modal",(function(t){i.default(t.target).is(e._element)&&(e._ignoreBackdropClick=!0)}))})),this._showBackdrop((function(){return e._showElement(t)})))}},e.hide=function(t){var e=this;if(t&&t.preventDefault(),this._isShown&&!this._isTransitioning){var n=i.default.Event("hide.bs.modal");if(i.default(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var o=i.default(this._element).hasClass("fade");if(o&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),i.default(document).off("focusin.bs.modal"),i.default(this._element).removeClass("show"),i.default(this._element).off("click.dismiss.bs.modal"),i.default(this._dialog).off("mousedown.dismiss.bs.modal"),o){var r=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,(function(t){return e._hideModal(t)})).emulateTransitionEnd(r)}else this._hideModal()}}},e.dispose=function(){[window,this._element,this._dialog].forEach((function(t){return i.default(t).off(".bs.modal")})),i.default(document).off("focusin.bs.modal"),i.default.removeData(this._element,"bs.modal"),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},e.handleUpdate=function(){this._adjustDialog()},e._getConfig=function(t){return t=a({},Ht,t),l.typeCheckConfig("modal",t,Mt),t},e._triggerBackdropTransition=function(){var t=this,e=i.default.Event("hidePrevented.bs.modal");if(i.default(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._element.scrollHeight>document.documentElement.clientHeight;n||(this._element.style.overflowY="hidden"),this._element.classList.add("modal-static");var o=l.getTransitionDurationFromElement(this._dialog);i.default(this._element).off(l.TRANSITION_END),i.default(this._element).one(l.TRANSITION_END,(function(){t._element.classList.remove("modal-static"),n||i.default(t._element).one(l.TRANSITION_END,(function(){t._element.style.overflowY=""})).emulateTransitionEnd(t._element,o)})).emulateTransitionEnd(o),this._element.focus()}},e._showElement=function(t){var e=this,n=i.default(this._element).hasClass("fade"),o=this._dialog?this._dialog.querySelector(".modal-body"):null;this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),i.default(this._dialog).hasClass("modal-dialog-scrollable")&&o?o.scrollTop=0:this._element.scrollTop=0,n&&l.reflow(this._element),i.default(this._element).addClass("show"),this._config.focus&&this._enforceFocus();var r=i.default.Event("shown.bs.modal",{relatedTarget:t}),a=function(){e._config.focus&&e._element.focus(),e._isTransitioning=!1,i.default(e._element).trigger(r)};if(n){var s=l.getTransitionDurationFromElement(this._dialog);i.default(this._dialog).one(l.TRANSITION_END,a).emulateTransitionEnd(s)}else a()},e._enforceFocus=function(){var t=this;i.default(document).off("focusin.bs.modal").on("focusin.bs.modal",(function(e){document!==e.target&&t._element!==e.target&&0===i.default(t._element).has(e.target).length&&t._element.focus()}))},e._setEscapeEvent=function(){var t=this;this._isShown?i.default(this._element).on("keydown.dismiss.bs.modal",(function(e){t._config.keyboard&&27===e.which?(e.preventDefault(),t.hide()):t._config.keyboard||27!==e.which||t._triggerBackdropTransition()})):this._isShown||i.default(this._element).off("keydown.dismiss.bs.modal")},e._setResizeEvent=function(){var t=this;this._isShown?i.default(window).on("resize.bs.modal",(function(e){return t.handleUpdate(e)})):i.default(window).off("resize.bs.modal")},e._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._showBackdrop((function(){i.default(document.body).removeClass("modal-open"),t._resetAdjustments(),t._resetScrollbar(),i.default(t._element).trigger("hidden.bs.modal")}))},e._removeBackdrop=function(){this._backdrop&&(i.default(this._backdrop).remove(),this._backdrop=null)},e._showBackdrop=function(t){var e=this,n=i.default(this._element).hasClass("fade")?"fade":"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className="modal-backdrop",n&&this._backdrop.classList.add(n),i.default(this._backdrop).appendTo(document.body),i.default(this._element).on("click.dismiss.bs.modal",(function(t){e._ignoreBackdropClick?e._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===e._config.backdrop?e._triggerBackdropTransition():e.hide())})),n&&l.reflow(this._backdrop),i.default(this._backdrop).addClass("show"),!t)return;if(!n)return void t();var o=l.getTransitionDurationFromElement(this._backdrop);i.default(this._backdrop).one(l.TRANSITION_END,t).emulateTransitionEnd(o)}else if(!this._isShown&&this._backdrop){i.default(this._backdrop).removeClass("show");var r=function(){e._removeBackdrop(),t&&t()};if(i.default(this._element).hasClass("fade")){var a=l.getTransitionDurationFromElement(this._backdrop);i.default(this._backdrop).one(l.TRANSITION_END,r).emulateTransitionEnd(a)}else r()}else t&&t()},e._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},e._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},e._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=Math.round(t.left+t.right)<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},e._setScrollbar=function(){var t=this;if(this._isBodyOverflowing){var e=[].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),n=[].slice.call(document.querySelectorAll(".sticky-top"));i.default(e).each((function(e,n){var o=n.style.paddingRight,r=i.default(n).css("padding-right");i.default(n).data("padding-right",o).css("padding-right",parseFloat(r)+t._scrollbarWidth+"px")})),i.default(n).each((function(e,n){var o=n.style.marginRight,r=i.default(n).css("margin-right");i.default(n).data("margin-right",o).css("margin-right",parseFloat(r)-t._scrollbarWidth+"px")}));var o=document.body.style.paddingRight,r=i.default(document.body).css("padding-right");i.default(document.body).data("padding-right",o).css("padding-right",parseFloat(r)+this._scrollbarWidth+"px")}i.default(document.body).addClass("modal-open")},e._resetScrollbar=function(){var t=[].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));i.default(t).each((function(t,e){var n=i.default(e).data("padding-right");i.default(e).removeData("padding-right"),e.style.paddingRight=n||""}));var e=[].slice.call(document.querySelectorAll(".sticky-top"));i.default(e).each((function(t,e){var n=i.default(e).data("margin-right");"undefined"!=typeof n&&i.default(e).css("margin-right",n).removeData("margin-right")}));var n=i.default(document.body).data("padding-right");i.default(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},e._getScrollbarWidth=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},t._jQueryInterface=function(e,n){return this.each((function(){var o=i.default(this).data("bs.modal"),r=a({},Ht,i.default(this).data(),"object"==typeof e&&e?e:{});if(o||(o=new t(this,r),i.default(this).data("bs.modal",o)),"string"==typeof e){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e](n)}else r.show&&o.show(n)}))},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return Ht}}]),t}();i.default(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',(function(t){var e,n=this,o=l.getSelectorFromElement(this);o&&(e=document.querySelector(o));var r=i.default(e).data("bs.modal")?"toggle":a({},i.default(e).data(),i.default(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var s=i.default(e).one("show.bs.modal",(function(t){t.isDefaultPrevented()||s.one("hidden.bs.modal",(function(){i.default(n).is(":visible")&&n.focus()}))}));qt._jQueryInterface.call(i.default(e),r,this)})),i.default.fn.modal=qt._jQueryInterface,i.default.fn.modal.Constructor=qt,i.default.fn.modal.noConflict=function(){return i.default.fn.modal=Rt,qt._jQueryInterface};var Bt=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],Qt={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Wt=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,Ut=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;function Vt(t,e,n){if(0===t.length)return t;if(n&&"function"==typeof n)return n(t);for(var i=(new window.DOMParser).parseFromString(t,"text/html"),o=Object.keys(e),r=[].slice.call(i.body.querySelectorAll("*")),a=function(t,n){var i=r[t],a=i.nodeName.toLowerCase();if(-1===o.indexOf(i.nodeName.toLowerCase()))return i.parentNode.removeChild(i),"continue";var s=[].slice.call(i.attributes),l=[].concat(e["*"]||[],e[a]||[]);s.forEach((function(t){(function(t,e){var n=t.nodeName.toLowerCase();if(-1!==e.indexOf(n))return-1===Bt.indexOf(n)||Boolean(t.nodeValue.match(Wt)||t.nodeValue.match(Ut));for(var i=e.filter((function(t){return t instanceof RegExp})),o=0,r=i.length;o<r;o++)if(n.match(i[o]))return!0;return!1})(t,l)||i.removeAttribute(t.nodeName)}))},s=0,l=r.length;s<l;s++)a(s);return i.body.innerHTML}var Yt="tooltip",zt=i.default.fn[Yt],Xt=new RegExp("(^|\\s)bs-tooltip\\S+","g"),Kt=["sanitize","whiteList","sanitizeFn"],Gt={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",customClass:"(string|function)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object",popperConfig:"(null|object)"},$t={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},Jt={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",customClass:"",sanitize:!0,sanitizeFn:null,whiteList:Qt,popperConfig:null},Zt={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"},te=function(){function t(t,e){if("undefined"==typeof It)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var e=t.prototype;return e.enable=function(){this._isEnabled=!0},e.disable=function(){this._isEnabled=!1},e.toggleEnabled=function(){this._isEnabled=!this._isEnabled},e.toggle=function(t){if(this._isEnabled)if(t){var e=this.constructor.DATA_KEY,n=i.default(t.currentTarget).data(e);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),i.default(t.currentTarget).data(e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(i.default(this.getTipElement()).hasClass("show"))return void this._leave(null,this);this._enter(null,this)}},e.dispose=function(){clearTimeout(this._timeout),i.default.removeData(this.element,this.constructor.DATA_KEY),i.default(this.element).off(this.constructor.EVENT_KEY),i.default(this.element).closest(".modal").off("hide.bs.modal",this._hideModalHandler),this.tip&&i.default(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},e.show=function(){var t=this;if("none"===i.default(this.element).css("display"))throw new Error("Please use show on visible elements");var e=i.default.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){i.default(this.element).trigger(e);var n=l.findShadowRoot(this.element),o=i.default.contains(null!==n?n:this.element.ownerDocument.documentElement,this.element);if(e.isDefaultPrevented()||!o)return;var r=this.getTipElement(),a=l.getUID(this.constructor.NAME);r.setAttribute("id",a),this.element.setAttribute("aria-describedby",a),this.setContent(),this.config.animation&&i.default(r).addClass("fade");var s="function"==typeof this.config.placement?this.config.placement.call(this,r,this.element):this.config.placement,u=this._getAttachment(s);this.addAttachmentClass(u);var f=this._getContainer();i.default(r).data(this.constructor.DATA_KEY,this),i.default.contains(this.element.ownerDocument.documentElement,this.tip)||i.default(r).appendTo(f),i.default(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new It(this.element,r,this._getPopperConfig(u)),i.default(r).addClass("show"),i.default(r).addClass(this.config.customClass),"ontouchstart"in document.documentElement&&i.default(document.body).children().on("mouseover",null,i.default.noop);var d=function(){t.config.animation&&t._fixTransition();var e=t._hoverState;t._hoverState=null,i.default(t.element).trigger(t.constructor.Event.SHOWN),"out"===e&&t._leave(null,t)};if(i.default(this.tip).hasClass("fade")){var c=l.getTransitionDurationFromElement(this.tip);i.default(this.tip).one(l.TRANSITION_END,d).emulateTransitionEnd(c)}else d()}},e.hide=function(t){var e=this,n=this.getTipElement(),o=i.default.Event(this.constructor.Event.HIDE),r=function(){"show"!==e._hoverState&&n.parentNode&&n.parentNode.removeChild(n),e._cleanTipClass(),e.element.removeAttribute("aria-describedby"),i.default(e.element).trigger(e.constructor.Event.HIDDEN),null!==e._popper&&e._popper.destroy(),t&&t()};if(i.default(this.element).trigger(o),!o.isDefaultPrevented()){if(i.default(n).removeClass("show"),"ontouchstart"in document.documentElement&&i.default(document.body).children().off("mouseover",null,i.default.noop),this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1,i.default(this.tip).hasClass("fade")){var a=l.getTransitionDurationFromElement(n);i.default(n).one(l.TRANSITION_END,r).emulateTransitionEnd(a)}else r();this._hoverState=""}},e.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},e.isWithContent=function(){return Boolean(this.getTitle())},e.addAttachmentClass=function(t){i.default(this.getTipElement()).addClass("bs-tooltip-"+t)},e.getTipElement=function(){return this.tip=this.tip||i.default(this.config.template)[0],this.tip},e.setContent=function(){var t=this.getTipElement();this.setElementContent(i.default(t.querySelectorAll(".tooltip-inner")),this.getTitle()),i.default(t).removeClass("fade show")},e.setElementContent=function(t,e){"object"!=typeof e||!e.nodeType&&!e.jquery?this.config.html?(this.config.sanitize&&(e=Vt(e,this.config.whiteList,this.config.sanitizeFn)),t.html(e)):t.text(e):this.config.html?i.default(e).parent().is(t)||t.empty().append(e):t.text(i.default(e).text())},e.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},e._getPopperConfig=function(t){var e=this;return a({},{placement:t,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:".arrow"},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}},this.config.popperConfig)},e._getOffset=function(){var t=this,e={};return"function"==typeof this.config.offset?e.fn=function(e){return e.offsets=a({},e.offsets,t.config.offset(e.offsets,t.element)||{}),e}:e.offset=this.config.offset,e},e._getContainer=function(){return!1===this.config.container?document.body:l.isElement(this.config.container)?i.default(this.config.container):i.default(document).find(this.config.container)},e._getAttachment=function(t){return $t[t.toUpperCase()]},e._setListeners=function(){var t=this;this.config.trigger.split(" ").forEach((function(e){if("click"===e)i.default(t.element).on(t.constructor.Event.CLICK,t.config.selector,(function(e){return t.toggle(e)}));else if("manual"!==e){var n="hover"===e?t.constructor.Event.MOUSEENTER:t.constructor.Event.FOCUSIN,o="hover"===e?t.constructor.Event.MOUSELEAVE:t.constructor.Event.FOCUSOUT;i.default(t.element).on(n,t.config.selector,(function(e){return t._enter(e)})).on(o,t.config.selector,(function(e){return t._leave(e)}))}})),this._hideModalHandler=function(){t.element&&t.hide()},i.default(this.element).closest(".modal").on("hide.bs.modal",this._hideModalHandler),this.config.selector?this.config=a({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},e._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},e._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||i.default(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),i.default(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusin"===t.type?"focus":"hover"]=!0),i.default(e.getTipElement()).hasClass("show")||"show"===e._hoverState?e._hoverState="show":(clearTimeout(e._timeout),e._hoverState="show",e.config.delay&&e.config.delay.show?e._timeout=setTimeout((function(){"show"===e._hoverState&&e.show()}),e.config.delay.show):e.show())},e._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||i.default(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),i.default(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusout"===t.type?"focus":"hover"]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState="out",e.config.delay&&e.config.delay.hide?e._timeout=setTimeout((function(){"out"===e._hoverState&&e.hide()}),e.config.delay.hide):e.hide())},e._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},e._getConfig=function(t){var e=i.default(this.element).data();return Object.keys(e).forEach((function(t){-1!==Kt.indexOf(t)&&delete e[t]})),"number"==typeof(t=a({},this.constructor.Default,e,"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),l.typeCheckConfig(Yt,t,this.constructor.DefaultType),t.sanitize&&(t.template=Vt(t.template,t.whiteList,t.sanitizeFn)),t},e._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},e._cleanTipClass=function(){var t=i.default(this.getTipElement()),e=t.attr("class").match(Xt);null!==e&&e.length&&t.removeClass(e.join(""))},e._handlePopperPlacementChange=function(t){this.tip=t.instance.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},e._fixTransition=function(){var t=this.getTipElement(),e=this.config.animation;null===t.getAttribute("x-placement")&&(i.default(t).removeClass("fade"),this.config.animation=!1,this.hide(),this.show(),this.config.animation=e)},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.tooltip"),r="object"==typeof e&&e;if((o||!/dispose|hide/.test(e))&&(o||(o=new t(this,r),n.data("bs.tooltip",o)),"string"==typeof e)){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e]()}}))},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return Jt}},{key:"NAME",get:function(){return Yt}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return Zt}},{key:"EVENT_KEY",get:function(){return".bs.tooltip"}},{key:"DefaultType",get:function(){return Gt}}]),t}();i.default.fn[Yt]=te._jQueryInterface,i.default.fn[Yt].Constructor=te,i.default.fn[Yt].noConflict=function(){return i.default.fn[Yt]=zt,te._jQueryInterface};var ee="popover",ne=i.default.fn[ee],ie=new RegExp("(^|\\s)bs-popover\\S+","g"),oe=a({},te.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),re=a({},te.DefaultType,{content:"(string|element|function)"}),ae={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"},se=function(t){var e,n;function o(){return t.apply(this,arguments)||this}n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var a=o.prototype;return a.isWithContent=function(){return this.getTitle()||this._getContent()},a.addAttachmentClass=function(t){i.default(this.getTipElement()).addClass("bs-popover-"+t)},a.getTipElement=function(){return this.tip=this.tip||i.default(this.config.template)[0],this.tip},a.setContent=function(){var t=i.default(this.getTipElement());this.setElementContent(t.find(".popover-header"),this.getTitle());var e=this._getContent();"function"==typeof e&&(e=e.call(this.element)),this.setElementContent(t.find(".popover-body"),e),t.removeClass("fade show")},a._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},a._cleanTipClass=function(){var t=i.default(this.getTipElement()),e=t.attr("class").match(ie);null!==e&&e.length>0&&t.removeClass(e.join(""))},o._jQueryInterface=function(t){return this.each((function(){var e=i.default(this).data("bs.popover"),n="object"==typeof t?t:null;if((e||!/dispose|hide/.test(t))&&(e||(e=new o(this,n),i.default(this).data("bs.popover",e)),"string"==typeof t)){if("undefined"==typeof e[t])throw new TypeError('No method named "'+t+'"');e[t]()}}))},r(o,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return oe}},{key:"NAME",get:function(){return ee}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return ae}},{key:"EVENT_KEY",get:function(){return".bs.popover"}},{key:"DefaultType",get:function(){return re}}]),o}(te);i.default.fn[ee]=se._jQueryInterface,i.default.fn[ee].Constructor=se,i.default.fn[ee].noConflict=function(){return i.default.fn[ee]=ne,se._jQueryInterface};var le="scrollspy",ue=i.default.fn[le],fe={offset:10,method:"auto",target:""},de={offset:"number",method:"string",target:"(string|element)"},ce=function(){function t(t,e){var n=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(e),this._selector=this._config.target+" .nav-link,"+this._config.target+" .list-group-item,"+this._config.target+" .dropdown-item",this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,i.default(this._scrollElement).on("scroll.bs.scrollspy",(function(t){return n._process(t)})),this.refresh(),this._process()}var e=t.prototype;return e.refresh=function(){var t=this,e=this._scrollElement===this._scrollElement.window?"offset":"position",n="auto"===this._config.method?e:this._config.method,o="position"===n?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map((function(t){var e,r=l.getSelectorFromElement(t);if(r&&(e=document.querySelector(r)),e){var a=e.getBoundingClientRect();if(a.width||a.height)return[i.default(e)[n]().top+o,r]}return null})).filter((function(t){return t})).sort((function(t,e){return t[0]-e[0]})).forEach((function(e){t._offsets.push(e[0]),t._targets.push(e[1])}))},e.dispose=function(){i.default.removeData(this._element,"bs.scrollspy"),i.default(this._scrollElement).off(".bs.scrollspy"),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},e._getConfig=function(t){if("string"!=typeof(t=a({},fe,"object"==typeof t&&t?t:{})).target&&l.isElement(t.target)){var e=i.default(t.target).attr("id");e||(e=l.getUID(le),i.default(t.target).attr("id",e)),t.target="#"+e}return l.typeCheckConfig(le,t,de),t},e._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},e._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},e._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},e._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;){this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&("undefined"==typeof this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}}},e._activate=function(t){this._activeTarget=t,this._clear();var e=this._selector.split(",").map((function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'})),n=i.default([].slice.call(document.querySelectorAll(e.join(","))));n.hasClass("dropdown-item")?(n.closest(".dropdown").find(".dropdown-toggle").addClass("active"),n.addClass("active")):(n.addClass("active"),n.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"),n.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active")),i.default(this._scrollElement).trigger("activate.bs.scrollspy",{relatedTarget:t})},e._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter((function(t){return t.classList.contains("active")})).forEach((function(t){return t.classList.remove("active")}))},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this).data("bs.scrollspy");if(n||(n=new t(this,"object"==typeof e&&e),i.default(this).data("bs.scrollspy",n)),"string"==typeof e){if("undefined"==typeof n[e])throw new TypeError('No method named "'+e+'"');n[e]()}}))},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return fe}}]),t}();i.default(window).on("load.bs.scrollspy.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-spy="scroll"]')),e=t.length;e--;){var n=i.default(t[e]);ce._jQueryInterface.call(n,n.data())}})),i.default.fn[le]=ce._jQueryInterface,i.default.fn[le].Constructor=ce,i.default.fn[le].noConflict=function(){return i.default.fn[le]=ue,ce._jQueryInterface};var he=i.default.fn.tab,pe=function(){function t(t){this._element=t}var e=t.prototype;return e.show=function(){var t=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&i.default(this._element).hasClass("active")||i.default(this._element).hasClass("disabled"))){var e,n,o=i.default(this._element).closest(".nav, .list-group")[0],r=l.getSelectorFromElement(this._element);if(o){var a="UL"===o.nodeName||"OL"===o.nodeName?"> li > .active":".active";n=(n=i.default.makeArray(i.default(o).find(a)))[n.length-1]}var s=i.default.Event("hide.bs.tab",{relatedTarget:this._element}),u=i.default.Event("show.bs.tab",{relatedTarget:n});if(n&&i.default(n).trigger(s),i.default(this._element).trigger(u),!u.isDefaultPrevented()&&!s.isDefaultPrevented()){r&&(e=document.querySelector(r)),this._activate(this._element,o);var f=function(){var e=i.default.Event("hidden.bs.tab",{relatedTarget:t._element}),o=i.default.Event("shown.bs.tab",{relatedTarget:n});i.default(n).trigger(e),i.default(t._element).trigger(o)};e?this._activate(e,e.parentNode,f):f()}}},e.dispose=function(){i.default.removeData(this._element,"bs.tab"),this._element=null},e._activate=function(t,e,n){var o=this,r=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?i.default(e).children(".active"):i.default(e).find("> li > .active"))[0],a=n&&r&&i.default(r).hasClass("fade"),s=function(){return o._transitionComplete(t,r,n)};if(r&&a){var u=l.getTransitionDurationFromElement(r);i.default(r).removeClass("show").one(l.TRANSITION_END,s).emulateTransitionEnd(u)}else s()},e._transitionComplete=function(t,e,n){if(e){i.default(e).removeClass("active");var o=i.default(e.parentNode).find("> .dropdown-menu .active")[0];o&&i.default(o).removeClass("active"),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}if(i.default(t).addClass("active"),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),l.reflow(t),t.classList.contains("fade")&&t.classList.add("show"),t.parentNode&&i.default(t.parentNode).hasClass("dropdown-menu")){var r=i.default(t).closest(".dropdown")[0];if(r){var a=[].slice.call(r.querySelectorAll(".dropdown-toggle"));i.default(a).addClass("active")}t.setAttribute("aria-expanded",!0)}n&&n()},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.tab");if(o||(o=new t(this),n.data("bs.tab",o)),"string"==typeof e){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e]()}}))},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}}]),t}();i.default(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',(function(t){t.preventDefault(),pe._jQueryInterface.call(i.default(this),"show")})),i.default.fn.tab=pe._jQueryInterface,i.default.fn.tab.Constructor=pe,i.default.fn.tab.noConflict=function(){return i.default.fn.tab=he,pe._jQueryInterface};var me=i.default.fn.toast,ge={animation:"boolean",autohide:"boolean",delay:"number"},ve={animation:!0,autohide:!0,delay:500},_e=function(){function t(t,e){this._element=t,this._config=this._getConfig(e),this._timeout=null,this._setListeners()}var e=t.prototype;return e.show=function(){var t=this,e=i.default.Event("show.bs.toast");if(i.default(this._element).trigger(e),!e.isDefaultPrevented()){this._clearTimeout(),this._config.animation&&this._element.classList.add("fade");var n=function(){t._element.classList.remove("showing"),t._element.classList.add("show"),i.default(t._element).trigger("shown.bs.toast"),t._config.autohide&&(t._timeout=setTimeout((function(){t.hide()}),t._config.delay))};if(this._element.classList.remove("hide"),l.reflow(this._element),this._element.classList.add("showing"),this._config.animation){var o=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,n).emulateTransitionEnd(o)}else n()}},e.hide=function(){if(this._element.classList.contains("show")){var t=i.default.Event("hide.bs.toast");i.default(this._element).trigger(t),t.isDefaultPrevented()||this._close()}},e.dispose=function(){this._clearTimeout(),this._element.classList.contains("show")&&this._element.classList.remove("show"),i.default(this._element).off("click.dismiss.bs.toast"),i.default.removeData(this._element,"bs.toast"),this._element=null,this._config=null},e._getConfig=function(t){return t=a({},ve,i.default(this._element).data(),"object"==typeof t&&t?t:{}),l.typeCheckConfig("toast",t,this.constructor.DefaultType),t},e._setListeners=function(){var t=this;i.default(this._element).on("click.dismiss.bs.toast",'[data-dismiss="toast"]',(function(){return t.hide()}))},e._close=function(){var t=this,e=function(){t._element.classList.add("hide"),i.default(t._element).trigger("hidden.bs.toast")};if(this._element.classList.remove("show"),this._config.animation){var n=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,e).emulateTransitionEnd(n)}else e()},e._clearTimeout=function(){clearTimeout(this._timeout),this._timeout=null},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.toast");if(o||(o=new t(this,"object"==typeof e&&e),n.data("bs.toast",o)),"string"==typeof e){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e](this)}}))},r(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"DefaultType",get:function(){return ge}},{key:"Default",get:function(){return ve}}]),t}();i.default.fn.toast=_e._jQueryInterface,i.default.fn.toast.Constructor=_e,i.default.fn.toast.noConflict=function(){return i.default.fn.toast=me,_e._jQueryInterface},t.Alert=d,t.Button=h,t.Carousel=y,t.Collapse=S,t.Dropdown=Ft,t.Modal=qt,t.Popover=se,t.Scrollspy=ce,t.Tab=pe,t.Toast=_e,t.Tooltip=te,t.Util=l,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=bootstrap.bundle.min.js.map
/**
 * Swiper 7.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: December 24, 2021
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Swiper=t()}(this,(function(){"use strict";function e(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function t(s={},a={}){Object.keys(a).forEach((i=>{void 0===s[i]?s[i]=a[i]:e(a[i])&&e(s[i])&&Object.keys(a[i]).length>0&&t(s[i],a[i])}))}const s={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function a(){const e="undefined"!=typeof document?document:{};return t(e,s),e}const i={document:s,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function r(){const e="undefined"!=typeof window?window:{};return t(e,i),e}class n extends Array{constructor(e){super(...e||[]),function(e){const t=e.__proto__;Object.defineProperty(e,"__proto__",{get:()=>t,set(e){t.__proto__=e}})}(this)}}function l(e=[]){const t=[];return e.forEach((e=>{Array.isArray(e)?t.push(...l(e)):t.push(e)})),t}function o(e,t){return Array.prototype.filter.call(e,t)}function d(e,t){const s=r(),i=a();let l=[];if(!t&&e instanceof n)return e;if(!e)return new n(l);if("string"==typeof e){const s=e.trim();if(s.indexOf("<")>=0&&s.indexOf(">")>=0){let e="div";0===s.indexOf("<li")&&(e="ul"),0===s.indexOf("<tr")&&(e="tbody"),0!==s.indexOf("<td")&&0!==s.indexOf("<th")||(e="tr"),0===s.indexOf("<tbody")&&(e="table"),0===s.indexOf("<option")&&(e="select");const t=i.createElement(e);t.innerHTML=s;for(let e=0;e<t.childNodes.length;e+=1)l.push(t.childNodes[e])}else l=function(e,t){if("string"!=typeof e)return[e];const s=[],a=t.querySelectorAll(e);for(let e=0;e<a.length;e+=1)s.push(a[e]);return s}(e.trim(),t||i)}else if(e.nodeType||e===s||e===i)l.push(e);else if(Array.isArray(e)){if(e instanceof n)return e;l=e}return new n(function(e){const t=[];for(let s=0;s<e.length;s+=1)-1===t.indexOf(e[s])&&t.push(e[s]);return t}(l))}d.fn=n.prototype;const p={addClass:function(...e){const t=l(e.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.add(...t)})),this},removeClass:function(...e){const t=l(e.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.remove(...t)})),this},hasClass:function(...e){const t=l(e.map((e=>e.split(" "))));return o(this,(e=>t.filter((t=>e.classList.contains(t))).length>0)).length>0},toggleClass:function(...e){const t=l(e.map((e=>e.split(" "))));this.forEach((e=>{t.forEach((t=>{e.classList.toggle(t)}))}))},attr:function(e,t){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(let s=0;s<this.length;s+=1)if(2===arguments.length)this[s].setAttribute(e,t);else for(const t in e)this[s][t]=e[t],this[s].setAttribute(t,e[t]);return this},removeAttr:function(e){for(let t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this},transform:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transform=e;return this},transition:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transitionDuration="string"!=typeof e?`${e}ms`:e;return this},on:function(...e){let[t,s,a,i]=e;function r(e){const t=e.target;if(!t)return;const i=e.target.dom7EventData||[];if(i.indexOf(e)<0&&i.unshift(e),d(t).is(s))a.apply(t,i);else{const e=d(t).parents();for(let t=0;t<e.length;t+=1)d(e[t]).is(s)&&a.apply(e[t],i)}}function n(e){const t=e&&e.target&&e.target.dom7EventData||[];t.indexOf(e)<0&&t.unshift(e),a.apply(this,t)}"function"==typeof e[1]&&([t,a,i]=e,s=void 0),i||(i=!1);const l=t.split(" ");let o;for(let e=0;e<this.length;e+=1){const t=this[e];if(s)for(o=0;o<l.length;o+=1){const e=l[o];t.dom7LiveListeners||(t.dom7LiveListeners={}),t.dom7LiveListeners[e]||(t.dom7LiveListeners[e]=[]),t.dom7LiveListeners[e].push({listener:a,proxyListener:r}),t.addEventListener(e,r,i)}else for(o=0;o<l.length;o+=1){const e=l[o];t.dom7Listeners||(t.dom7Listeners={}),t.dom7Listeners[e]||(t.dom7Listeners[e]=[]),t.dom7Listeners[e].push({listener:a,proxyListener:n}),t.addEventListener(e,n,i)}}return this},off:function(...e){let[t,s,a,i]=e;"function"==typeof e[1]&&([t,a,i]=e,s=void 0),i||(i=!1);const r=t.split(" ");for(let e=0;e<r.length;e+=1){const t=r[e];for(let e=0;e<this.length;e+=1){const r=this[e];let n;if(!s&&r.dom7Listeners?n=r.dom7Listeners[t]:s&&r.dom7LiveListeners&&(n=r.dom7LiveListeners[t]),n&&n.length)for(let e=n.length-1;e>=0;e-=1){const s=n[e];a&&s.listener===a||a&&s.listener&&s.listener.dom7proxy&&s.listener.dom7proxy===a?(r.removeEventListener(t,s.proxyListener,i),n.splice(e,1)):a||(r.removeEventListener(t,s.proxyListener,i),n.splice(e,1))}}}return this},trigger:function(...e){const t=r(),s=e[0].split(" "),a=e[1];for(let i=0;i<s.length;i+=1){const r=s[i];for(let s=0;s<this.length;s+=1){const i=this[s];if(t.CustomEvent){const s=new t.CustomEvent(r,{detail:a,bubbles:!0,cancelable:!0});i.dom7EventData=e.filter(((e,t)=>t>0)),i.dispatchEvent(s),i.dom7EventData=[],delete i.dom7EventData}}}return this},transitionEnd:function(e){const t=this;return e&&t.on("transitionend",(function s(a){a.target===this&&(e.call(this,a),t.off("transitionend",s))})),this},outerWidth:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetWidth+parseFloat(e.getPropertyValue("margin-right"))+parseFloat(e.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null},outerHeight:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetHeight+parseFloat(e.getPropertyValue("margin-top"))+parseFloat(e.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null},styles:function(){const e=r();return this[0]?e.getComputedStyle(this[0],null):{}},offset:function(){if(this.length>0){const e=r(),t=a(),s=this[0],i=s.getBoundingClientRect(),n=t.body,l=s.clientTop||n.clientTop||0,o=s.clientLeft||n.clientLeft||0,d=s===e?e.scrollY:s.scrollTop,p=s===e?e.scrollX:s.scrollLeft;return{top:i.top+d-l,left:i.left+p-o}}return null},css:function(e,t){const s=r();let a;if(1===arguments.length){if("string"!=typeof e){for(a=0;a<this.length;a+=1)for(const t in e)this[a].style[t]=e[t];return this}if(this[0])return s.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(a=0;a<this.length;a+=1)this[a].style[e]=t;return this}return this},each:function(e){return e?(this.forEach(((t,s)=>{e.apply(t,[t,s])})),this):this},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:null;for(let t=0;t<this.length;t+=1)this[t].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(let t=0;t<this.length;t+=1)this[t].textContent=e;return this},is:function(e){const t=r(),s=a(),i=this[0];let l,o;if(!i||void 0===e)return!1;if("string"==typeof e){if(i.matches)return i.matches(e);if(i.webkitMatchesSelector)return i.webkitMatchesSelector(e);if(i.msMatchesSelector)return i.msMatchesSelector(e);for(l=d(e),o=0;o<l.length;o+=1)if(l[o]===i)return!0;return!1}if(e===s)return i===s;if(e===t)return i===t;if(e.nodeType||e instanceof n){for(l=e.nodeType?[e]:e,o=0;o<l.length;o+=1)if(l[o]===i)return!0;return!1}return!1},index:function(){let e,t=this[0];if(t){for(e=0;null!==(t=t.previousSibling);)1===t.nodeType&&(e+=1);return e}},eq:function(e){if(void 0===e)return this;const t=this.length;if(e>t-1)return d([]);if(e<0){const s=t+e;return d(s<0?[]:[this[s]])}return d([this[e]])},append:function(...e){let t;const s=a();for(let a=0;a<e.length;a+=1){t=e[a];for(let e=0;e<this.length;e+=1)if("string"==typeof t){const a=s.createElement("div");for(a.innerHTML=t;a.firstChild;)this[e].appendChild(a.firstChild)}else if(t instanceof n)for(let s=0;s<t.length;s+=1)this[e].appendChild(t[s]);else this[e].appendChild(t)}return this},prepend:function(e){const t=a();let s,i;for(s=0;s<this.length;s+=1)if("string"==typeof e){const a=t.createElement("div");for(a.innerHTML=e,i=a.childNodes.length-1;i>=0;i-=1)this[s].insertBefore(a.childNodes[i],this[s].childNodes[0])}else if(e instanceof n)for(i=0;i<e.length;i+=1)this[s].insertBefore(e[i],this[s].childNodes[0]);else this[s].insertBefore(e,this[s].childNodes[0]);return this},next:function(e){return this.length>0?e?this[0].nextElementSibling&&d(this[0].nextElementSibling).is(e)?d([this[0].nextElementSibling]):d([]):this[0].nextElementSibling?d([this[0].nextElementSibling]):d([]):d([])},nextAll:function(e){const t=[];let s=this[0];if(!s)return d([]);for(;s.nextElementSibling;){const a=s.nextElementSibling;e?d(a).is(e)&&t.push(a):t.push(a),s=a}return d(t)},prev:function(e){if(this.length>0){const t=this[0];return e?t.previousElementSibling&&d(t.previousElementSibling).is(e)?d([t.previousElementSibling]):d([]):t.previousElementSibling?d([t.previousElementSibling]):d([])}return d([])},prevAll:function(e){const t=[];let s=this[0];if(!s)return d([]);for(;s.previousElementSibling;){const a=s.previousElementSibling;e?d(a).is(e)&&t.push(a):t.push(a),s=a}return d(t)},parent:function(e){const t=[];for(let s=0;s<this.length;s+=1)null!==this[s].parentNode&&(e?d(this[s].parentNode).is(e)&&t.push(this[s].parentNode):t.push(this[s].parentNode));return d(t)},parents:function(e){const t=[];for(let s=0;s<this.length;s+=1){let a=this[s].parentNode;for(;a;)e?d(a).is(e)&&t.push(a):t.push(a),a=a.parentNode}return d(t)},closest:function(e){let t=this;return void 0===e?d([]):(t.is(e)||(t=t.parents(e).eq(0)),t)},find:function(e){const t=[];for(let s=0;s<this.length;s+=1){const a=this[s].querySelectorAll(e);for(let e=0;e<a.length;e+=1)t.push(a[e])}return d(t)},children:function(e){const t=[];for(let s=0;s<this.length;s+=1){const a=this[s].children;for(let s=0;s<a.length;s+=1)e&&!d(a[s]).is(e)||t.push(a[s])}return d(t)},filter:function(e){return d(o(this,e))},remove:function(){for(let e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this}};function c(e,t=0){return setTimeout(e,t)}function u(){return Date.now()}function h(e,t="x"){const s=r();let a,i,n;const l=function(e){const t=r();let s;return t.getComputedStyle&&(s=t.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}(e);return s.WebKitCSSMatrix?(i=l.transform||l.webkitTransform,i.split(",").length>6&&(i=i.split(", ").map((e=>e.replace(",","."))).join(", ")),n=new s.WebKitCSSMatrix("none"===i?"":i)):(n=l.MozTransform||l.OTransform||l.MsTransform||l.msTransform||l.transform||l.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=n.toString().split(",")),"x"===t&&(i=s.WebKitCSSMatrix?n.m41:16===a.length?parseFloat(a[12]):parseFloat(a[4])),"y"===t&&(i=s.WebKitCSSMatrix?n.m42:16===a.length?parseFloat(a[13]):parseFloat(a[5])),i||0}function m(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function f(...e){const t=Object(e[0]),s=["__proto__","constructor","prototype"];for(let i=1;i<e.length;i+=1){const r=e[i];if(null!=r&&(a=r,!("undefined"!=typeof window&&void 0!==window.HTMLElement?a instanceof HTMLElement:a&&(1===a.nodeType||11===a.nodeType)))){const e=Object.keys(Object(r)).filter((e=>s.indexOf(e)<0));for(let s=0,a=e.length;s<a;s+=1){const a=e[s],i=Object.getOwnPropertyDescriptor(r,a);void 0!==i&&i.enumerable&&(m(t[a])&&m(r[a])?r[a].__swiper__?t[a]=r[a]:f(t[a],r[a]):!m(t[a])&&m(r[a])?(t[a]={},r[a].__swiper__?t[a]=r[a]:f(t[a],r[a])):t[a]=r[a])}}}var a;return t}function g(e,t,s){e.style.setProperty(t,s)}function v({swiper:e,targetPosition:t,side:s}){const a=r(),i=-e.translate;let n,l=null;const o=e.params.speed;e.wrapperEl.style.scrollSnapType="none",a.cancelAnimationFrame(e.cssModeFrameID);const d=t>i?"next":"prev",p=(e,t)=>"next"===d&&e>=t||"prev"===d&&e<=t,c=()=>{n=(new Date).getTime(),null===l&&(l=n);const r=Math.max(Math.min((n-l)/o,1),0),d=.5-Math.cos(r*Math.PI)/2;let u=i+d*(t-i);if(p(u,t)&&(u=t),e.wrapperEl.scrollTo({[s]:u}),p(u,t))return e.wrapperEl.style.overflow="hidden",e.wrapperEl.style.scrollSnapType="",setTimeout((()=>{e.wrapperEl.style.overflow="",e.wrapperEl.scrollTo({[s]:u})})),void a.cancelAnimationFrame(e.cssModeFrameID);e.cssModeFrameID=a.requestAnimationFrame(c)};c()}let w,b,x;function y(){return w||(w=function(){const e=r(),t=a();return{smoothScroll:t.documentElement&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch),passiveListener:function(){let t=!1;try{const s=Object.defineProperty({},"passive",{get(){t=!0}});e.addEventListener("testPassiveListener",null,s)}catch(e){}return t}(),gestures:"ongesturestart"in e}}()),w}function E(e={}){return b||(b=function({userAgent:e}={}){const t=y(),s=r(),a=s.navigator.platform,i=e||s.navigator.userAgent,n={ios:!1,android:!1},l=s.screen.width,o=s.screen.height,d=i.match(/(Android);?[\s\/]+([\d.]+)?/);let p=i.match(/(iPad).*OS\s([\d_]+)/);const c=i.match(/(iPod)(.*OS\s([\d_]+))?/),u=!p&&i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),h="Win32"===a;let m="MacIntel"===a;return!p&&m&&t.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${l}x${o}`)>=0&&(p=i.match(/(Version)\/([\d.]+)/),p||(p=[0,1,"13_0_0"]),m=!1),d&&!h&&(n.os="android",n.android=!0),(p||u||c)&&(n.os="ios",n.ios=!0),n}(e)),b}function T(){return x||(x=function(){const e=r();return{isSafari:function(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}(),isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}()),x}Object.keys(p).forEach((e=>{Object.defineProperty(d.fn,e,{value:p[e],writable:!0})}));var C={on(e,t,s){const a=this;if("function"!=typeof t)return a;const i=s?"unshift":"push";return e.split(" ").forEach((e=>{a.eventsListeners[e]||(a.eventsListeners[e]=[]),a.eventsListeners[e][i](t)})),a},once(e,t,s){const a=this;if("function"!=typeof t)return a;function i(...s){a.off(e,i),i.__emitterProxy&&delete i.__emitterProxy,t.apply(a,s)}return i.__emitterProxy=t,a.on(e,i,s)},onAny(e,t){const s=this;if("function"!=typeof e)return s;const a=t?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[a](e),s},offAny(e){const t=this;if(!t.eventsAnyListeners)return t;const s=t.eventsAnyListeners.indexOf(e);return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this;return s.eventsListeners?(e.split(" ").forEach((e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach(((a,i)=>{(a===t||a.__emitterProxy&&a.__emitterProxy===t)&&s.eventsListeners[e].splice(i,1)}))})),s):s},emit(...e){const t=this;if(!t.eventsListeners)return t;let s,a,i;"string"==typeof e[0]||Array.isArray(e[0])?(s=e[0],a=e.slice(1,e.length),i=t):(s=e[0].events,a=e[0].data,i=e[0].context||t),a.unshift(i);return(Array.isArray(s)?s:s.split(" ")).forEach((e=>{t.eventsAnyListeners&&t.eventsAnyListeners.length&&t.eventsAnyListeners.forEach((t=>{t.apply(i,[e,...a])})),t.eventsListeners&&t.eventsListeners[e]&&t.eventsListeners[e].forEach((e=>{e.apply(i,a)}))})),t}};function $({swiper:e,runCallbacks:t,direction:s,step:a}){const{activeIndex:i,previousIndex:r}=e;let n=s;if(n||(n=i>r?"next":i<r?"prev":"reset"),e.emit(`transition${a}`),t&&i!==r){if("reset"===n)return void e.emit(`slideResetTransition${a}`);e.emit(`slideChangeTransition${a}`),"next"===n?e.emit(`slideNextTransition${a}`):e.emit(`slidePrevTransition${a}`)}}function S(e){const t=this,s=a(),i=r(),n=t.touchEventsData,{params:l,touches:o,enabled:p}=t;if(!p)return;if(t.animating&&l.preventInteractionOnTransition)return;!t.animating&&l.cssMode&&l.loop&&t.loopFix();let c=e;c.originalEvent&&(c=c.originalEvent);let h=d(c.target);if("wrapper"===l.touchEventsTarget&&!h.closest(t.wrapperEl).length)return;if(n.isTouchEvent="touchstart"===c.type,!n.isTouchEvent&&"which"in c&&3===c.which)return;if(!n.isTouchEvent&&"button"in c&&c.button>0)return;if(n.isTouched&&n.isMoved)return;!!l.noSwipingClass&&""!==l.noSwipingClass&&c.target&&c.target.shadowRoot&&e.path&&e.path[0]&&(h=d(e.path[0]));const m=l.noSwipingSelector?l.noSwipingSelector:`.${l.noSwipingClass}`,f=!(!c.target||!c.target.shadowRoot);if(l.noSwiping&&(f?function(e,t=this){return function t(s){return s&&s!==a()&&s!==r()?(s.assignedSlot&&(s=s.assignedSlot),s.closest(e)||t(s.getRootNode().host)):null}(t)}(m,c.target):h.closest(m)[0]))return void(t.allowClick=!0);if(l.swipeHandler&&!h.closest(l.swipeHandler)[0])return;o.currentX="touchstart"===c.type?c.targetTouches[0].pageX:c.pageX,o.currentY="touchstart"===c.type?c.targetTouches[0].pageY:c.pageY;const g=o.currentX,v=o.currentY,w=l.edgeSwipeDetection||l.iOSEdgeSwipeDetection,b=l.edgeSwipeThreshold||l.iOSEdgeSwipeThreshold;if(w&&(g<=b||g>=i.innerWidth-b)){if("prevent"!==w)return;e.preventDefault()}if(Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),o.startX=g,o.startY=v,n.touchStartTime=u(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,l.threshold>0&&(n.allowThresholdMove=!1),"touchstart"!==c.type){let e=!0;h.is(n.focusableElements)&&(e=!1),s.activeElement&&d(s.activeElement).is(n.focusableElements)&&s.activeElement!==h[0]&&s.activeElement.blur();const a=e&&t.allowTouchMove&&l.touchStartPreventDefault;!l.touchStartForcePreventDefault&&!a||h[0].isContentEditable||c.preventDefault()}t.emit("touchStart",c)}function M(e){const t=a(),s=this,i=s.touchEventsData,{params:r,touches:n,rtlTranslate:l,enabled:o}=s;if(!o)return;let p=e;if(p.originalEvent&&(p=p.originalEvent),!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",p));if(i.isTouchEvent&&"touchmove"!==p.type)return;const c="touchmove"===p.type&&p.targetTouches&&(p.targetTouches[0]||p.changedTouches[0]),h="touchmove"===p.type?c.pageX:p.pageX,m="touchmove"===p.type?c.pageY:p.pageY;if(p.preventedByNestedSwiper)return n.startX=h,void(n.startY=m);if(!s.allowTouchMove)return s.allowClick=!1,void(i.isTouched&&(Object.assign(n,{startX:h,startY:m,currentX:h,currentY:m}),i.touchStartTime=u()));if(i.isTouchEvent&&r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(m<n.startY&&s.translate<=s.maxTranslate()||m>n.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(h<n.startX&&s.translate<=s.maxTranslate()||h>n.startX&&s.translate>=s.minTranslate())return;if(i.isTouchEvent&&t.activeElement&&p.target===t.activeElement&&d(p.target).is(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1);if(i.allowTouchCallbacks&&s.emit("touchMove",p),p.targetTouches&&p.targetTouches.length>1)return;n.currentX=h,n.currentY=m;const f=n.currentX-n.startX,g=n.currentY-n.startY;if(s.params.threshold&&Math.sqrt(f**2+g**2)<s.params.threshold)return;if(void 0===i.isScrolling){let e;s.isHorizontal()&&n.currentY===n.startY||s.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:f*f+g*g>=25&&(e=180*Math.atan2(Math.abs(g),Math.abs(f))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle)}if(i.isScrolling&&s.emit("touchMoveOpposite",p),void 0===i.startMoving&&(n.currentX===n.startX&&n.currentY===n.startY||(i.startMoving=!0)),i.isScrolling)return void(i.isTouched=!1);if(!i.startMoving)return;s.allowClick=!1,!r.cssMode&&p.cancelable&&p.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&p.stopPropagation(),i.isMoved||(r.loop&&!r.cssMode&&s.loopFix(),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating&&s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",p)),s.emit("sliderMove",p),i.isMoved=!0;let v=s.isHorizontal()?f:g;n.diff=v,v*=r.touchRatio,l&&(v=-v),s.swipeDirection=v>0?"prev":"next",i.currentTranslate=v+i.startTranslate;let w=!0,b=r.resistanceRatio;if(r.touchReleaseOnEdges&&(b=0),v>0&&i.currentTranslate>s.minTranslate()?(w=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+v)**b)):v<0&&i.currentTranslate<s.maxTranslate()&&(w=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-v)**b)),w&&(p.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(v)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,void(n.diff=s.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),s.params.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate))}function P(e){const t=this,s=t.touchEventsData,{params:a,touches:i,rtlTranslate:r,slidesGrid:n,enabled:l}=t;if(!l)return;let o=e;if(o.originalEvent&&(o=o.originalEvent),s.allowTouchCallbacks&&t.emit("touchEnd",o),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&a.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1);a.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const d=u(),p=d-s.touchStartTime;if(t.allowClick){const e=o.path||o.composedPath&&o.composedPath();t.updateClickedSlide(e&&e[0]||o.target),t.emit("tap click",o),p<300&&d-s.lastClickTime<300&&t.emit("doubleTap doubleClick",o)}if(s.lastClickTime=u(),c((()=>{t.destroyed||(t.allowClick=!0)})),!s.isTouched||!s.isMoved||!t.swipeDirection||0===i.diff||s.currentTranslate===s.startTranslate)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1);let h;if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,h=a.followFinger?r?t.translate:-t.translate:-s.currentTranslate,a.cssMode)return;if(t.params.freeMode&&a.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:h});let m=0,f=t.slidesSizesGrid[0];for(let e=0;e<n.length;e+=e<a.slidesPerGroupSkip?1:a.slidesPerGroup){const t=e<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;void 0!==n[e+t]?h>=n[e]&&h<n[e+t]&&(m=e,f=n[e+t]-n[e]):h>=n[e]&&(m=e,f=n[n.length-1]-n[n.length-2])}const g=(h-n[m])/f,v=m<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;if(p>a.longSwipesMs){if(!a.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(g>=a.longSwipesRatio?t.slideTo(m+v):t.slideTo(m)),"prev"===t.swipeDirection&&(g>1-a.longSwipesRatio?t.slideTo(m+v):t.slideTo(m))}else{if(!a.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(o.target===t.navigation.nextEl||o.target===t.navigation.prevEl)?o.target===t.navigation.nextEl?t.slideTo(m+v):t.slideTo(m):("next"===t.swipeDirection&&t.slideTo(m+v),"prev"===t.swipeDirection&&t.slideTo(m))}}function k(){const e=this,{params:t,el:s}=e;if(s&&0===s.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:a,allowSlidePrev:i,snapGrid:r}=e;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses(),("auto"===t.slidesPerView||t.slidesPerView>1)&&e.isEnd&&!e.isBeginning&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.run(),e.allowSlidePrev=i,e.allowSlideNext=a,e.params.watchOverflow&&r!==e.snapGrid&&e.checkOverflow()}function z(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function O(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:a}=e;if(!a)return;let i;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,-0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const r=e.maxTranslate()-e.minTranslate();i=0===r?0:(e.translate-e.minTranslate())/r,i!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}let I=!1;function L(){}const A=(e,t)=>{const s=a(),{params:i,touchEvents:r,el:n,wrapperEl:l,device:o,support:d}=e,p=!!i.nested,c="on"===t?"addEventListener":"removeEventListener",u=t;if(d.touch){const t=!("touchstart"!==r.start||!d.passiveListener||!i.passiveListeners)&&{passive:!0,capture:!1};n[c](r.start,e.onTouchStart,t),n[c](r.move,e.onTouchMove,d.passiveListener?{passive:!1,capture:p}:p),n[c](r.end,e.onTouchEnd,t),r.cancel&&n[c](r.cancel,e.onTouchEnd,t)}else n[c](r.start,e.onTouchStart,!1),s[c](r.move,e.onTouchMove,p),s[c](r.end,e.onTouchEnd,!1);(i.preventClicks||i.preventClicksPropagation)&&n[c]("click",e.onClick,!0),i.cssMode&&l[c]("scroll",e.onScroll),i.updateOnWindowResize?e[u](o.ios||o.android?"resize orientationchange observerUpdate":"resize observerUpdate",k,!0):e[u]("observerUpdate",k,!0)};const D=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;var G={init:!0,direction:"horizontal",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopFillGroupWithBlank:!1,loopPreventsSlide:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0,_emitClasses:!1};function N(e,t){return function(s={}){const a=Object.keys(s)[0],i=s[a];"object"==typeof i&&null!==i?(["navigation","pagination","scrollbar"].indexOf(a)>=0&&!0===e[a]&&(e[a]={auto:!0}),a in e&&"enabled"in i?(!0===e[a]&&(e[a]={enabled:!0}),"object"!=typeof e[a]||"enabled"in e[a]||(e[a].enabled=!0),e[a]||(e[a]={enabled:!1}),f(t,s)):f(t,s)):f(t,s)}}const B={eventsEmitter:C,update:{updateSize:function(){const e=this;let t,s;const a=e.$el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:a[0].clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:a[0].clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(a.css("padding-left")||0,10)-parseInt(a.css("padding-right")||0,10),s=s-parseInt(a.css("padding-top")||0,10)-parseInt(a.css("padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}))},updateSlides:function(){const e=this;function t(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function s(e,s){return parseFloat(e.getPropertyValue(t(s))||0)}const a=e.params,{$wrapperEl:i,size:r,rtlTranslate:n,wrongRTL:l}=e,o=e.virtual&&a.virtual.enabled,d=o?e.virtual.slides.length:e.slides.length,p=i.children(`.${e.params.slideClass}`),c=o?e.virtual.slides.length:p.length;let u=[];const h=[],m=[];let f=a.slidesOffsetBefore;"function"==typeof f&&(f=a.slidesOffsetBefore.call(e));let v=a.slidesOffsetAfter;"function"==typeof v&&(v=a.slidesOffsetAfter.call(e));const w=e.snapGrid.length,b=e.slidesGrid.length;let x=a.spaceBetween,y=-f,E=0,T=0;if(void 0===r)return;"string"==typeof x&&x.indexOf("%")>=0&&(x=parseFloat(x.replace("%",""))/100*r),e.virtualSize=-x,n?p.css({marginLeft:"",marginBottom:"",marginTop:""}):p.css({marginRight:"",marginBottom:"",marginTop:""}),a.centeredSlides&&a.cssMode&&(g(e.wrapperEl,"--swiper-centered-offset-before",""),g(e.wrapperEl,"--swiper-centered-offset-after",""));const C=a.grid&&a.grid.rows>1&&e.grid;let $;C&&e.grid.initSlides(c);const S="auto"===a.slidesPerView&&a.breakpoints&&Object.keys(a.breakpoints).filter((e=>void 0!==a.breakpoints[e].slidesPerView)).length>0;for(let i=0;i<c;i+=1){$=0;const n=p.eq(i);if(C&&e.grid.updateSlide(i,n,c,t),"none"!==n.css("display")){if("auto"===a.slidesPerView){S&&(p[i].style[t("width")]="");const r=getComputedStyle(n[0]),l=n[0].style.transform,o=n[0].style.webkitTransform;if(l&&(n[0].style.transform="none"),o&&(n[0].style.webkitTransform="none"),a.roundLengths)$=e.isHorizontal()?n.outerWidth(!0):n.outerHeight(!0);else{const e=s(r,"width"),t=s(r,"padding-left"),a=s(r,"padding-right"),i=s(r,"margin-left"),l=s(r,"margin-right"),o=r.getPropertyValue("box-sizing");if(o&&"border-box"===o)$=e+i+l;else{const{clientWidth:s,offsetWidth:r}=n[0];$=e+t+a+i+l+(r-s)}}l&&(n[0].style.transform=l),o&&(n[0].style.webkitTransform=o),a.roundLengths&&($=Math.floor($))}else $=(r-(a.slidesPerView-1)*x)/a.slidesPerView,a.roundLengths&&($=Math.floor($)),p[i]&&(p[i].style[t("width")]=`${$}px`);p[i]&&(p[i].swiperSlideSize=$),m.push($),a.centeredSlides?(y=y+$/2+E/2+x,0===E&&0!==i&&(y=y-r/2-x),0===i&&(y=y-r/2-x),Math.abs(y)<.001&&(y=0),a.roundLengths&&(y=Math.floor(y)),T%a.slidesPerGroup==0&&u.push(y),h.push(y)):(a.roundLengths&&(y=Math.floor(y)),(T-Math.min(e.params.slidesPerGroupSkip,T))%e.params.slidesPerGroup==0&&u.push(y),h.push(y),y=y+$+x),e.virtualSize+=$+x,E=$,T+=1}}if(e.virtualSize=Math.max(e.virtualSize,r)+v,n&&l&&("slide"===a.effect||"coverflow"===a.effect)&&i.css({width:`${e.virtualSize+a.spaceBetween}px`}),a.setWrapperSize&&i.css({[t("width")]:`${e.virtualSize+a.spaceBetween}px`}),C&&e.grid.updateWrapperSize($,u,t),!a.centeredSlides){const t=[];for(let s=0;s<u.length;s+=1){let i=u[s];a.roundLengths&&(i=Math.floor(i)),u[s]<=e.virtualSize-r&&t.push(i)}u=t,Math.floor(e.virtualSize-r)-Math.floor(u[u.length-1])>1&&u.push(e.virtualSize-r)}if(0===u.length&&(u=[0]),0!==a.spaceBetween){const s=e.isHorizontal()&&n?"marginLeft":t("marginRight");p.filter(((e,t)=>!a.cssMode||t!==p.length-1)).css({[s]:`${x}px`})}if(a.centeredSlides&&a.centeredSlidesBounds){let e=0;m.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween;const t=e-r;u=u.map((e=>e<0?-f:e>t?t+v:e))}if(a.centerInsufficientSlides){let e=0;if(m.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween,e<r){const t=(r-e)/2;u.forEach(((e,s)=>{u[s]=e-t})),h.forEach(((e,s)=>{h[s]=e+t}))}}if(Object.assign(e,{slides:p,snapGrid:u,slidesGrid:h,slidesSizesGrid:m}),a.centeredSlides&&a.cssMode&&!a.centeredSlidesBounds){g(e.wrapperEl,"--swiper-centered-offset-before",-u[0]+"px"),g(e.wrapperEl,"--swiper-centered-offset-after",e.size/2-m[m.length-1]/2+"px");const t=-e.snapGrid[0],s=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+s))}c!==d&&e.emit("slidesLengthChange"),u.length!==w&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),h.length!==b&&e.emit("slidesGridLengthChange"),a.watchSlidesProgress&&e.updateSlidesOffset()},updateAutoHeight:function(e){const t=this,s=[],a=t.virtual&&t.params.virtual.enabled;let i,r=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const n=e=>a?t.slides.filter((t=>parseInt(t.getAttribute("data-swiper-slide-index"),10)===e))[0]:t.slides.eq(e)[0];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)t.visibleSlides.each((e=>{s.push(e)}));else for(i=0;i<Math.ceil(t.params.slidesPerView);i+=1){const e=t.activeIndex+i;if(e>t.slides.length&&!a)break;s.push(n(e))}else s.push(n(t.activeIndex));for(i=0;i<s.length;i+=1)if(void 0!==s[i]){const e=s[i].offsetHeight;r=e>r?e:r}(r||0===r)&&t.$wrapperEl.css("height",`${r}px`)},updateSlidesOffset:function(){const e=this,t=e.slides;for(let s=0;s<t.length;s+=1)t[s].swiperSlideOffset=e.isHorizontal()?t[s].offsetLeft:t[s].offsetTop},updateSlidesProgress:function(e=this&&this.translate||0){const t=this,s=t.params,{slides:a,rtlTranslate:i,snapGrid:r}=t;if(0===a.length)return;void 0===a[0].swiperSlideOffset&&t.updateSlidesOffset();let n=-e;i&&(n=e),a.removeClass(s.slideVisibleClass),t.visibleSlidesIndexes=[],t.visibleSlides=[];for(let e=0;e<a.length;e+=1){const l=a[e];let o=l.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(o-=a[0].swiperSlideOffset);const d=(n+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),p=(n-r[0]+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),c=-(n-o),u=c+t.slidesSizesGrid[e];(c>=0&&c<t.size-1||u>1&&u<=t.size||c<=0&&u>=t.size)&&(t.visibleSlides.push(l),t.visibleSlidesIndexes.push(e),a.eq(e).addClass(s.slideVisibleClass)),l.progress=i?-d:d,l.originalProgress=i?-p:p}t.visibleSlides=d(t.visibleSlides)},updateProgress:function(e){const t=this;if(void 0===e){const s=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*s||0}const s=t.params,a=t.maxTranslate()-t.minTranslate();let{progress:i,isBeginning:r,isEnd:n}=t;const l=r,o=n;0===a?(i=0,r=!0,n=!0):(i=(e-t.minTranslate())/a,r=i<=0,n=i>=1),Object.assign(t,{progress:i,isBeginning:r,isEnd:n}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),r&&!l&&t.emit("reachBeginning toEdge"),n&&!o&&t.emit("reachEnd toEdge"),(l&&!r||o&&!n)&&t.emit("fromEdge"),t.emit("progress",i)},updateSlidesClasses:function(){const e=this,{slides:t,params:s,$wrapperEl:a,activeIndex:i,realIndex:r}=e,n=e.virtual&&s.virtual.enabled;let l;t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`),l=n?e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`):t.eq(i),l.addClass(s.slideActiveClass),s.loop&&(l.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));let o=l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);s.loop&&0===o.length&&(o=t.eq(0),o.addClass(s.slideNextClass));let d=l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);s.loop&&0===d.length&&(d=t.eq(-1),d.addClass(s.slidePrevClass)),s.loop&&(o.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass),d.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)),e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{slidesGrid:a,snapGrid:i,params:r,activeIndex:n,realIndex:l,snapIndex:o}=t;let d,p=e;if(void 0===p){for(let e=0;e<a.length;e+=1)void 0!==a[e+1]?s>=a[e]&&s<a[e+1]-(a[e+1]-a[e])/2?p=e:s>=a[e]&&s<a[e+1]&&(p=e+1):s>=a[e]&&(p=e);r.normalizeSlideIndex&&(p<0||void 0===p)&&(p=0)}if(i.indexOf(s)>=0)d=i.indexOf(s);else{const e=Math.min(r.slidesPerGroupSkip,p);d=e+Math.floor((p-e)/r.slidesPerGroup)}if(d>=i.length&&(d=i.length-1),p===n)return void(d!==o&&(t.snapIndex=d,t.emit("snapIndexChange")));const c=parseInt(t.slides.eq(p).attr("data-swiper-slide-index")||p,10);Object.assign(t,{snapIndex:d,realIndex:c,previousIndex:n,activeIndex:p}),t.emit("activeIndexChange"),t.emit("snapIndexChange"),l!==c&&t.emit("realIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&t.emit("slideChange")},updateClickedSlide:function(e){const t=this,s=t.params,a=d(e).closest(`.${s.slideClass}`)[0];let i,r=!1;if(a)for(let e=0;e<t.slides.length;e+=1)if(t.slides[e]===a){r=!0,i=e;break}if(!a||!r)return t.clickedSlide=void 0,void(t.clickedIndex=void 0);t.clickedSlide=a,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(d(a).attr("data-swiper-slide-index"),10):t.clickedIndex=i,s.slideToClickedSlide&&void 0!==t.clickedIndex&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}},translate:{getTranslate:function(e=(this.isHorizontal()?"x":"y")){const{params:t,rtlTranslate:s,translate:a,$wrapperEl:i}=this;if(t.virtualTranslate)return s?-a:a;if(t.cssMode)return a;let r=h(i[0],e);return s&&(r=-r),r||0},setTranslate:function(e,t){const s=this,{rtlTranslate:a,params:i,$wrapperEl:r,wrapperEl:n,progress:l}=s;let o,d=0,p=0;s.isHorizontal()?d=a?-e:e:p=e,i.roundLengths&&(d=Math.floor(d),p=Math.floor(p)),i.cssMode?n[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-d:-p:i.virtualTranslate||r.transform(`translate3d(${d}px, ${p}px, 0px)`),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?d:p;const c=s.maxTranslate()-s.minTranslate();o=0===c?0:(e-s.minTranslate())/c,o!==l&&s.updateProgress(e),s.emit("setTranslate",s.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e=0,t=this.params.speed,s=!0,a=!0,i){const r=this,{params:n,wrapperEl:l}=r;if(r.animating&&n.preventInteractionOnTransition)return!1;const o=r.minTranslate(),d=r.maxTranslate();let p;if(p=a&&e>o?o:a&&e<d?d:e,r.updateProgress(p),n.cssMode){const e=r.isHorizontal();if(0===t)l[e?"scrollLeft":"scrollTop"]=-p;else{if(!r.support.smoothScroll)return v({swiper:r,targetPosition:-p,side:e?"left":"top"}),!0;l.scrollTo({[e?"left":"top"]:-p,behavior:"smooth"})}return!0}return 0===t?(r.setTransition(0),r.setTranslate(p),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionEnd"))):(r.setTransition(t),r.setTranslate(p),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionStart")),r.animating||(r.animating=!0,r.onTranslateToWrapperTransitionEnd||(r.onTranslateToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onTranslateToWrapperTransitionEnd),r.onTranslateToWrapperTransitionEnd=null,delete r.onTranslateToWrapperTransitionEnd,s&&r.emit("transitionEnd"))}),r.$wrapperEl[0].addEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onTranslateToWrapperTransitionEnd))),!0}},transition:{setTransition:function(e,t){const s=this;s.params.cssMode||s.$wrapperEl.transition(e),s.emit("setTransition",e,t)},transitionStart:function(e=!0,t){const s=this,{params:a}=s;a.cssMode||(a.autoHeight&&s.updateAutoHeight(),$({swiper:s,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e=!0,t){const s=this,{params:a}=s;s.animating=!1,a.cssMode||(s.setTransition(0),$({swiper:s,runCallbacks:e,direction:t,step:"End"}))}},slide:{slideTo:function(e=0,t=this.params.speed,s=!0,a,i){if("number"!=typeof e&&"string"!=typeof e)throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);if("string"==typeof e){const t=parseInt(e,10);if(!isFinite(t))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=t}const r=this;let n=e;n<0&&(n=0);const{params:l,snapGrid:o,slidesGrid:d,previousIndex:p,activeIndex:c,rtlTranslate:u,wrapperEl:h,enabled:m}=r;if(r.animating&&l.preventInteractionOnTransition||!m&&!a&&!i)return!1;const f=Math.min(r.params.slidesPerGroupSkip,n);let g=f+Math.floor((n-f)/r.params.slidesPerGroup);g>=o.length&&(g=o.length-1),(c||l.initialSlide||0)===(p||0)&&s&&r.emit("beforeSlideChangeStart");const w=-o[g];if(r.updateProgress(w),l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*w),s=Math.floor(100*d[e]),a=Math.floor(100*d[e+1]);void 0!==d[e+1]?t>=s&&t<a-(a-s)/2?n=e:t>=s&&t<a&&(n=e+1):t>=s&&(n=e)}if(r.initialized&&n!==c){if(!r.allowSlideNext&&w<r.translate&&w<r.minTranslate())return!1;if(!r.allowSlidePrev&&w>r.translate&&w>r.maxTranslate()&&(c||0)!==n)return!1}let b;if(b=n>c?"next":n<c?"prev":"reset",u&&-w===r.translate||!u&&w===r.translate)return r.updateActiveIndex(n),l.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==l.effect&&r.setTranslate(w),"reset"!==b&&(r.transitionStart(s,b),r.transitionEnd(s,b)),!1;if(l.cssMode){const e=r.isHorizontal(),s=u?w:-w;if(0===t){const t=r.virtual&&r.params.virtual.enabled;t&&(r.wrapperEl.style.scrollSnapType="none",r._immediateVirtual=!0),h[e?"scrollLeft":"scrollTop"]=s,t&&requestAnimationFrame((()=>{r.wrapperEl.style.scrollSnapType="",r._swiperImmediateVirtual=!1}))}else{if(!r.support.smoothScroll)return v({swiper:r,targetPosition:s,side:e?"left":"top"}),!0;h.scrollTo({[e?"left":"top"]:s,behavior:"smooth"})}return!0}return r.setTransition(t),r.setTranslate(w),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,a),r.transitionStart(s,b),0===t?r.transitionEnd(s,b):r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(s,b))}),r.$wrapperEl[0].addEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e=0,t=this.params.speed,s=!0,a){const i=this;let r=e;return i.params.loop&&(r+=i.loopedSlides),i.slideTo(r,t,s,a)},slideNext:function(e=this.params.speed,t=!0,s){const a=this,{animating:i,enabled:r,params:n}=a;if(!r)return a;let l=n.slidesPerGroup;"auto"===n.slidesPerView&&1===n.slidesPerGroup&&n.slidesPerGroupAuto&&(l=Math.max(a.slidesPerViewDynamic("current",!0),1));const o=a.activeIndex<n.slidesPerGroupSkip?1:l;if(n.loop){if(i&&n.loopPreventsSlide)return!1;a.loopFix(),a._clientLeft=a.$wrapperEl[0].clientLeft}return n.rewind&&a.isEnd?a.slideTo(0,e,t,s):a.slideTo(a.activeIndex+o,e,t,s)},slidePrev:function(e=this.params.speed,t=!0,s){const a=this,{params:i,animating:r,snapGrid:n,slidesGrid:l,rtlTranslate:o,enabled:d}=a;if(!d)return a;if(i.loop){if(r&&i.loopPreventsSlide)return!1;a.loopFix(),a._clientLeft=a.$wrapperEl[0].clientLeft}function p(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const c=p(o?a.translate:-a.translate),u=n.map((e=>p(e)));let h=n[u.indexOf(c)-1];if(void 0===h&&i.cssMode){let e;n.forEach(((t,s)=>{c>=t&&(e=s)})),void 0!==e&&(h=n[e>0?e-1:e])}let m=0;return void 0!==h&&(m=l.indexOf(h),m<0&&(m=a.activeIndex-1),"auto"===i.slidesPerView&&1===i.slidesPerGroup&&i.slidesPerGroupAuto&&(m=m-a.slidesPerViewDynamic("previous",!0)+1,m=Math.max(m,0))),i.rewind&&a.isBeginning?a.slideTo(a.slides.length-1,e,t,s):a.slideTo(m,e,t,s)},slideReset:function(e=this.params.speed,t=!0,s){return this.slideTo(this.activeIndex,e,t,s)},slideToClosest:function(e=this.params.speed,t=!0,s,a=.5){const i=this;let r=i.activeIndex;const n=Math.min(i.params.slidesPerGroupSkip,r),l=n+Math.floor((r-n)/i.params.slidesPerGroup),o=i.rtlTranslate?i.translate:-i.translate;if(o>=i.snapGrid[l]){const e=i.snapGrid[l];o-e>(i.snapGrid[l+1]-e)*a&&(r+=i.params.slidesPerGroup)}else{const e=i.snapGrid[l-1];o-e<=(i.snapGrid[l]-e)*a&&(r-=i.params.slidesPerGroup)}return r=Math.max(r,0),r=Math.min(r,i.slidesGrid.length-1),i.slideTo(r,e,t,s)},slideToClickedSlide:function(){const e=this,{params:t,$wrapperEl:s}=e,a="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let i,r=e.clickedIndex;if(t.loop){if(e.animating)return;i=parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"),10),t.centeredSlides?r<e.loopedSlides-a/2||r>e.slides.length-e.loopedSlides+a/2?(e.loopFix(),r=s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),c((()=>{e.slideTo(r)}))):e.slideTo(r):r>e.slides.length-a?(e.loopFix(),r=s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),c((()=>{e.slideTo(r)}))):e.slideTo(r)}else e.slideTo(r)}},loop:{loopCreate:function(){const e=this,t=a(),{params:s,$wrapperEl:i}=e,r=i.children().length>0?d(i.children()[0].parentNode):i;r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();let n=r.children(`.${s.slideClass}`);if(s.loopFillGroupWithBlank){const e=s.slidesPerGroup-n.length%s.slidesPerGroup;if(e!==s.slidesPerGroup){for(let a=0;a<e;a+=1){const e=d(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);r.append(e)}n=r.children(`.${s.slideClass}`)}}"auto"!==s.slidesPerView||s.loopedSlides||(s.loopedSlides=n.length),e.loopedSlides=Math.ceil(parseFloat(s.loopedSlides||s.slidesPerView,10)),e.loopedSlides+=s.loopAdditionalSlides,e.loopedSlides>n.length&&(e.loopedSlides=n.length);const l=[],o=[];n.each(((t,s)=>{const a=d(t);s<e.loopedSlides&&o.push(t),s<n.length&&s>=n.length-e.loopedSlides&&l.push(t),a.attr("data-swiper-slide-index",s)}));for(let e=0;e<o.length;e+=1)r.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));for(let e=l.length-1;e>=0;e-=1)r.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass))},loopFix:function(){const e=this;e.emit("beforeLoopFix");const{activeIndex:t,slides:s,loopedSlides:a,allowSlidePrev:i,allowSlideNext:r,snapGrid:n,rtlTranslate:l}=e;let o;e.allowSlidePrev=!0,e.allowSlideNext=!0;const d=-n[t]-e.getTranslate();if(t<a){o=s.length-3*a+t,o+=a;e.slideTo(o,0,!1,!0)&&0!==d&&e.setTranslate((l?-e.translate:e.translate)-d)}else if(t>=s.length-a){o=-s.length+t+a,o+=a;e.slideTo(o,0,!1,!0)&&0!==d&&e.setTranslate((l?-e.translate:e.translate)-d)}e.allowSlidePrev=i,e.allowSlideNext=r,e.emit("loopFix")},loopDestroy:function(){const{$wrapperEl:e,params:t,slides:s}=this;e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),s.removeAttr("data-swiper-slide-index")}},grabCursor:{setGrabCursor:function(e){const t=this;if(t.support.touch||!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;s.style.cursor="move",s.style.cursor=e?"-webkit-grabbing":"-webkit-grab",s.style.cursor=e?"-moz-grabbin":"-moz-grab",s.style.cursor=e?"grabbing":"grab"},unsetGrabCursor:function(){const e=this;e.support.touch||e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="")}},events:{attachEvents:function(){const e=this,t=a(),{params:s,support:i}=e;e.onTouchStart=S.bind(e),e.onTouchMove=M.bind(e),e.onTouchEnd=P.bind(e),s.cssMode&&(e.onScroll=O.bind(e)),e.onClick=z.bind(e),i.touch&&!I&&(t.addEventListener("touchstart",L),I=!0),A(e,"on")},detachEvents:function(){A(this,"off")}},breakpoints:{setBreakpoint:function(){const e=this,{activeIndex:t,initialized:s,loopedSlides:a=0,params:i,$el:r}=e,n=i.breakpoints;if(!n||n&&0===Object.keys(n).length)return;const l=e.getBreakpoint(n,e.params.breakpointsBase,e.el);if(!l||e.currentBreakpoint===l)return;const o=(l in n?n[l]:void 0)||e.originalParams,d=D(e,i),p=D(e,o),c=i.enabled;d&&!p?(r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`),e.emitContainerClasses()):!d&&p&&(r.addClass(`${i.containerModifierClass}grid`),(o.grid.fill&&"column"===o.grid.fill||!o.grid.fill&&"column"===i.grid.fill)&&r.addClass(`${i.containerModifierClass}grid-column`),e.emitContainerClasses());const u=o.direction&&o.direction!==i.direction,h=i.loop&&(o.slidesPerView!==i.slidesPerView||u);u&&s&&e.changeDirection(),f(e.params,o);const m=e.params.enabled;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),c&&!m?e.disable():!c&&m&&e.enable(),e.currentBreakpoint=l,e.emit("_beforeBreakpoint",o),h&&s&&(e.loopDestroy(),e.loopCreate(),e.updateSlides(),e.slideTo(t-a+e.loopedSlides,0,!1)),e.emit("breakpoint",o)},getBreakpoint:function(e,t="window",s){if(!e||"container"===t&&!s)return;let a=!1;const i=r(),n="window"===t?i.innerHeight:s.clientHeight,l=Object.keys(e).map((e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:n*t,point:e}}return{value:e,point:e}}));l.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let e=0;e<l.length;e+=1){const{point:r,value:n}=l[e];"window"===t?i.matchMedia(`(min-width: ${n}px)`).matches&&(a=r):n<=s.clientWidth&&(a=r)}return a||"max"}},checkOverflow:{checkOverflow:function(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:a}=s;if(a){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*a;e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:{addClasses:function(){const e=this,{classNames:t,params:s,rtl:a,$el:i,device:r,support:n}=e,l=function(e,t){const s=[];return e.forEach((e=>{"object"==typeof e?Object.keys(e).forEach((a=>{e[a]&&s.push(t+a)})):"string"==typeof e&&s.push(t+e)})),s}(["initialized",s.direction,{"pointer-events":!n.touch},{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:a},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&"column"===s.grid.fill},{android:r.android},{ios:r.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides}],s.containerModifierClass);t.push(...l),i.addClass([...t].join(" ")),e.emitContainerClasses()},removeClasses:function(){const{$el:e,classNames:t}=this;e.removeClass(t.join(" ")),this.emitContainerClasses()}},images:{loadImage:function(e,t,s,a,i,n){const l=r();let o;function p(){n&&n()}d(e).parent("picture")[0]||e.complete&&i?p():t?(o=new l.Image,o.onload=p,o.onerror=p,a&&(o.sizes=a),s&&(o.srcset=s),t&&(o.src=t)):p()},preloadImages:function(){const e=this;function t(){null!=e&&e&&!e.destroyed&&(void 0!==e.imagesLoaded&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}e.imagesToLoad=e.$el.find("img");for(let s=0;s<e.imagesToLoad.length;s+=1){const a=e.imagesToLoad[s];e.loadImage(a,a.currentSrc||a.getAttribute("src"),a.srcset||a.getAttribute("srcset"),a.sizes||a.getAttribute("sizes"),!0,t)}}}},X={};class H{constructor(...e){let t,s;if(1===e.length&&e[0].constructor&&"Object"===Object.prototype.toString.call(e[0]).slice(8,-1)?s=e[0]:[t,s]=e,s||(s={}),s=f({},s),t&&!s.el&&(s.el=t),s.el&&d(s.el).length>1){const e=[];return d(s.el).each((t=>{const a=f({},s,{el:t});e.push(new H(a))})),e}const a=this;a.__swiper__=!0,a.support=y(),a.device=E({userAgent:s.userAgent}),a.browser=T(),a.eventsListeners={},a.eventsAnyListeners=[],a.modules=[...a.__modules__],s.modules&&Array.isArray(s.modules)&&a.modules.push(...s.modules);const i={};a.modules.forEach((e=>{e({swiper:a,extendParams:N(s,i),on:a.on.bind(a),once:a.once.bind(a),off:a.off.bind(a),emit:a.emit.bind(a)})}));const r=f({},G,i);return a.params=f({},r,X,s),a.originalParams=f({},a.params),a.passedParams=f({},s),a.params&&a.params.on&&Object.keys(a.params.on).forEach((e=>{a.on(e,a.params.on[e])})),a.params&&a.params.onAny&&a.onAny(a.params.onAny),a.$=d,Object.assign(a,{enabled:a.params.enabled,el:t,classNames:[],slides:d(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===a.params.direction,isVertical:()=>"vertical"===a.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:a.params.allowSlideNext,allowSlidePrev:a.params.allowSlidePrev,touchEvents:function(){const e=["touchstart","touchmove","touchend","touchcancel"],t=["pointerdown","pointermove","pointerup"];return a.touchEventsTouch={start:e[0],move:e[1],end:e[2],cancel:e[3]},a.touchEventsDesktop={start:t[0],move:t[1],end:t[2]},a.support.touch||!a.params.simulateTouch?a.touchEventsTouch:a.touchEventsDesktop}(),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:a.params.focusableElements,lastClickTime:u(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:a.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),a.emit("_swiper"),a.params.init&&a.init(),a}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const s=this;e=Math.min(Math.max(e,0),1);const a=s.minTranslate(),i=(s.maxTranslate()-a)*e+a;s.translateTo(i,void 0===t?0:t),s.updateActiveIndex(),s.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.each((s=>{const a=e.getSlideClasses(s);t.push({slideEl:s,classNames:a}),e.emit("_slideClass",s,a)})),e.emit("_slideClasses",t)}slidesPerViewDynamic(e="current",t=!1){const{params:s,slides:a,slidesGrid:i,slidesSizesGrid:r,size:n,activeIndex:l}=this;let o=1;if(s.centeredSlides){let e,t=a[l].swiperSlideSize;for(let s=l+1;s<a.length;s+=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0));for(let s=l-1;s>=0;s-=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0))}else if("current"===e)for(let e=l+1;e<a.length;e+=1){(t?i[e]+r[e]-i[l]<n:i[e]-i[l]<n)&&(o+=1)}else for(let e=l-1;e>=0;e-=1){i[l]-i[e]<n&&(o+=1)}return o}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:s}=e;function a(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses()}let i;s.breakpoints&&e.setBreakpoint(),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode&&e.params.freeMode.enabled?(a(),e.params.autoHeight&&e.updateAutoHeight()):(i=("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),i||a()),s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t=!0){const s=this,a=s.params.direction;return e||(e="horizontal"===a?"vertical":"horizontal"),e===a||"horizontal"!==e&&"vertical"!==e||(s.$el.removeClass(`${s.params.containerModifierClass}${a}`).addClass(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.each((t=>{"vertical"===e?t.style.width="":t.style.height=""})),s.emit("changeDirection"),t&&s.update()),s}mount(e){const t=this;if(t.mounted)return!0;const s=d(e||t.params.el);if(!(e=s[0]))return!1;e.swiper=t;const i=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let r=(()=>{if(e&&e.shadowRoot&&e.shadowRoot.querySelector){const t=d(e.shadowRoot.querySelector(i()));return t.children=e=>s.children(e),t}return s.children(i())})();if(0===r.length&&t.params.createElements){const e=a().createElement("div");r=d(e),e.className=t.params.wrapperClass,s.append(e),s.children(`.${t.params.slideClass}`).each((e=>{r.append(e)}))}return Object.assign(t,{$el:s,el:e,$wrapperEl:r,wrapperEl:r[0],mounted:!0,rtl:"rtl"===e.dir.toLowerCase()||"rtl"===s.css("direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===e.dir.toLowerCase()||"rtl"===s.css("direction")),wrongRTL:"-webkit-box"===r.css("display")}),!0}init(e){const t=this;if(t.initialized)return t;return!1===t.mount(e)||(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.params.loop&&t.loopCreate(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.preloadImages&&t.preloadImages(),t.params.loop?t.slideTo(t.params.initialSlide+t.loopedSlides,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.attachEvents(),t.initialized=!0,t.emit("init"),t.emit("afterInit")),t}destroy(e=!0,t=!0){const s=this,{params:a,$el:i,$wrapperEl:r,slides:n}=s;return void 0===s.params||s.destroyed||(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),a.loop&&s.loopDestroy(),t&&(s.removeClasses(),i.removeAttr("style"),r.removeAttr("style"),n&&n.length&&n.removeClass([a.slideVisibleClass,a.slideActiveClass,a.slideNextClass,a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),s.emit("destroy"),Object.keys(s.eventsListeners).forEach((e=>{s.off(e)})),!1!==e&&(s.$el[0].swiper=null,function(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))}(s)),s.destroyed=!0),null}static extendDefaults(e){f(X,e)}static get extendedDefaults(){return X}static get defaults(){return G}static installModule(e){H.prototype.__modules__||(H.prototype.__modules__=[]);const t=H.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>H.installModule(e))),H):(H.installModule(e),H)}}function Y(e,t,s,i){const r=a();return e.params.createElements&&Object.keys(i).forEach((a=>{if(!s[a]&&!0===s.auto){let n=e.$el.children(`.${i[a]}`)[0];n||(n=r.createElement("div"),n.className=i[a],e.$el.append(n)),s[a]=n,t[a]=n}})),s}function W(e=""){return`.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`}function R(e){const t=this,{$wrapperEl:s,params:a}=t;if(a.loop&&t.loopDestroy(),"object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.append(e[t]);else s.append(e);a.loop&&t.loopCreate(),a.observer||t.update()}function j(e){const t=this,{params:s,$wrapperEl:a,activeIndex:i}=t;s.loop&&t.loopDestroy();let r=i+1;if("object"==typeof e&&"length"in e){for(let t=0;t<e.length;t+=1)e[t]&&a.prepend(e[t]);r=i+e.length}else a.prepend(e);s.loop&&t.loopCreate(),s.observer||t.update(),t.slideTo(r,0,!1)}function _(e,t){const s=this,{$wrapperEl:a,params:i,activeIndex:r}=s;let n=r;i.loop&&(n-=s.loopedSlides,s.loopDestroy(),s.slides=a.children(`.${i.slideClass}`));const l=s.slides.length;if(e<=0)return void s.prependSlide(t);if(e>=l)return void s.appendSlide(t);let o=n>e?n+1:n;const d=[];for(let t=l-1;t>=e;t-=1){const e=s.slides.eq(t);e.remove(),d.unshift(e)}if("object"==typeof t&&"length"in t){for(let e=0;e<t.length;e+=1)t[e]&&a.append(t[e]);o=n>e?n+t.length:n}else a.append(t);for(let e=0;e<d.length;e+=1)a.append(d[e]);i.loop&&s.loopCreate(),i.observer||s.update(),i.loop?s.slideTo(o+s.loopedSlides,0,!1):s.slideTo(o,0,!1)}function V(e){const t=this,{params:s,$wrapperEl:a,activeIndex:i}=t;let r=i;s.loop&&(r-=t.loopedSlides,t.loopDestroy(),t.slides=a.children(`.${s.slideClass}`));let n,l=r;if("object"==typeof e&&"length"in e){for(let s=0;s<e.length;s+=1)n=e[s],t.slides[n]&&t.slides.eq(n).remove(),n<l&&(l-=1);l=Math.max(l,0)}else n=e,t.slides[n]&&t.slides.eq(n).remove(),n<l&&(l-=1),l=Math.max(l,0);s.loop&&t.loopCreate(),s.observer||t.update(),s.loop?t.slideTo(l+t.loopedSlides,0,!1):t.slideTo(l,0,!1)}function q(){const e=this,t=[];for(let s=0;s<e.slides.length;s+=1)t.push(s);e.removeSlide(t)}function F(e){const{effect:t,swiper:s,on:a,setTranslate:i,setTransition:r,overwriteParams:n,perspective:l}=e;a("beforeInit",(()=>{if(s.params.effect!==t)return;s.classNames.push(`${s.params.containerModifierClass}${t}`),l&&l()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(s.params,e),Object.assign(s.originalParams,e)})),a("setTranslate",(()=>{s.params.effect===t&&i()})),a("setTransition",((e,a)=>{s.params.effect===t&&r(a)}))}function U(e,t){return e.transformEl?t.find(e.transformEl).css({"backface-visibility":"hidden","-webkit-backface-visibility":"hidden"}):t}function K({swiper:e,duration:t,transformEl:s,allSlides:a}){const{slides:i,activeIndex:r,$wrapperEl:n}=e;if(e.params.virtualTranslate&&0!==t){let t,l=!1;t=a?s?i.find(s):i:s?i.eq(r).find(s):i.eq(r),t.transitionEnd((()=>{if(l)return;if(!e||e.destroyed)return;l=!0,e.animating=!1;const t=["webkitTransitionEnd","transitionend"];for(let e=0;e<t.length;e+=1)n.trigger(t[e])}))}}function Z(e,t,s){const a="swiper-slide-shadow"+(s?`-${s}`:""),i=e.transformEl?t.find(e.transformEl):t;let r=i.children(`.${a}`);return r.length||(r=d(`<div class="swiper-slide-shadow${s?`-${s}`:""}"></div>`),i.append(r)),r}Object.keys(B).forEach((e=>{Object.keys(B[e]).forEach((t=>{H.prototype[t]=B[e][t]}))})),H.use([function({swiper:e,on:t,emit:s}){const a=r();let i=null;const n=()=>{e&&!e.destroyed&&e.initialized&&(s("beforeResize"),s("resize"))},l=()=>{e&&!e.destroyed&&e.initialized&&s("orientationchange")};t("init",(()=>{e.params.resizeObserver&&void 0!==a.ResizeObserver?e&&!e.destroyed&&e.initialized&&(i=new ResizeObserver((t=>{const{width:s,height:a}=e;let i=s,r=a;t.forEach((({contentBoxSize:t,contentRect:s,target:a})=>{a&&a!==e.el||(i=s?s.width:(t[0]||t).inlineSize,r=s?s.height:(t[0]||t).blockSize)})),i===s&&r===a||n()})),i.observe(e.el)):(a.addEventListener("resize",n),a.addEventListener("orientationchange",l))})),t("destroy",(()=>{i&&i.unobserve&&e.el&&(i.unobserve(e.el),i=null),a.removeEventListener("resize",n),a.removeEventListener("orientationchange",l)}))},function({swiper:e,extendParams:t,on:s,emit:a}){const i=[],n=r(),l=(e,t={})=>{const s=new(n.MutationObserver||n.WebkitMutationObserver)((e=>{if(1===e.length)return void a("observerUpdate",e[0]);const t=function(){a("observerUpdate",e[0])};n.requestAnimationFrame?n.requestAnimationFrame(t):n.setTimeout(t,0)}));s.observe(e,{attributes:void 0===t.attributes||t.attributes,childList:void 0===t.childList||t.childList,characterData:void 0===t.characterData||t.characterData}),i.push(s)};t({observer:!1,observeParents:!1,observeSlideChildren:!1}),s("init",(()=>{if(e.params.observer){if(e.params.observeParents){const t=e.$el.parents();for(let e=0;e<t.length;e+=1)l(t[e])}l(e.$el[0],{childList:e.params.observeSlideChildren}),l(e.$wrapperEl[0],{attributes:!1})}})),s("destroy",(()=>{i.forEach((e=>{e.disconnect()})),i.splice(0,i.length)}))}]);const J=[function({swiper:e,extendParams:t,on:s}){let a;function i(t,s){const a=e.params.virtual;if(a.cache&&e.virtual.cache[s])return e.virtual.cache[s];const i=a.renderSlide?d(a.renderSlide.call(e,t,s)):d(`<div class="${e.params.slideClass}" data-swiper-slide-index="${s}">${t}</div>`);return i.attr("data-swiper-slide-index")||i.attr("data-swiper-slide-index",s),a.cache&&(e.virtual.cache[s]=i),i}function r(t){const{slidesPerView:s,slidesPerGroup:a,centeredSlides:r}=e.params,{addSlidesBefore:n,addSlidesAfter:l}=e.params.virtual,{from:o,to:d,slides:p,slidesGrid:c,offset:u}=e.virtual;e.params.cssMode||e.updateActiveIndex();const h=e.activeIndex||0;let m,f,g;m=e.rtlTranslate?"right":e.isHorizontal()?"left":"top",r?(f=Math.floor(s/2)+a+l,g=Math.floor(s/2)+a+n):(f=s+(a-1)+l,g=a+n);const v=Math.max((h||0)-g,0),w=Math.min((h||0)+f,p.length-1),b=(e.slidesGrid[v]||0)-(e.slidesGrid[0]||0);function x(){e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.lazy&&e.params.lazy.enabled&&e.lazy.load()}if(Object.assign(e.virtual,{from:v,to:w,offset:b,slidesGrid:e.slidesGrid}),o===v&&d===w&&!t)return e.slidesGrid!==c&&b!==u&&e.slides.css(m,`${b}px`),void e.updateProgress();if(e.params.virtual.renderExternal)return e.params.virtual.renderExternal.call(e,{offset:b,from:v,to:w,slides:function(){const e=[];for(let t=v;t<=w;t+=1)e.push(p[t]);return e}()}),void(e.params.virtual.renderExternalUpdate&&x());const y=[],E=[];if(t)e.$wrapperEl.find(`.${e.params.slideClass}`).remove();else for(let t=o;t<=d;t+=1)(t<v||t>w)&&e.$wrapperEl.find(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`).remove();for(let e=0;e<p.length;e+=1)e>=v&&e<=w&&(void 0===d||t?E.push(e):(e>d&&E.push(e),e<o&&y.push(e)));E.forEach((t=>{e.$wrapperEl.append(i(p[t],t))})),y.sort(((e,t)=>t-e)).forEach((t=>{e.$wrapperEl.prepend(i(p[t],t))})),e.$wrapperEl.children(".swiper-slide").css(m,`${b}px`),x()}t({virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,renderExternalUpdate:!0,addSlidesBefore:0,addSlidesAfter:0}}),e.virtual={cache:{},from:void 0,to:void 0,slides:[],offset:0,slidesGrid:[]},s("beforeInit",(()=>{e.params.virtual.enabled&&(e.virtual.slides=e.params.virtual.slides,e.classNames.push(`${e.params.containerModifierClass}virtual`),e.params.watchSlidesProgress=!0,e.originalParams.watchSlidesProgress=!0,e.params.initialSlide||r())})),s("setTranslate",(()=>{e.params.virtual.enabled&&(e.params.cssMode&&!e._immediateVirtual?(clearTimeout(a),a=setTimeout((()=>{r()}),100)):r())})),s("init update resize",(()=>{e.params.virtual.enabled&&e.params.cssMode&&g(e.wrapperEl,"--swiper-virtual-size",`${e.virtualSize}px`)})),Object.assign(e.virtual,{appendSlide:function(t){if("object"==typeof t&&"length"in t)for(let s=0;s<t.length;s+=1)t[s]&&e.virtual.slides.push(t[s]);else e.virtual.slides.push(t);r(!0)},prependSlide:function(t){const s=e.activeIndex;let a=s+1,i=1;if(Array.isArray(t)){for(let s=0;s<t.length;s+=1)t[s]&&e.virtual.slides.unshift(t[s]);a=s+t.length,i=t.length}else e.virtual.slides.unshift(t);if(e.params.virtual.cache){const t=e.virtual.cache,s={};Object.keys(t).forEach((e=>{const a=t[e],r=a.attr("data-swiper-slide-index");r&&a.attr("data-swiper-slide-index",parseInt(r,10)+i),s[parseInt(e,10)+i]=a})),e.virtual.cache=s}r(!0),e.slideTo(a,0)},removeSlide:function(t){if(null==t)return;let s=e.activeIndex;if(Array.isArray(t))for(let a=t.length-1;a>=0;a-=1)e.virtual.slides.splice(t[a],1),e.params.virtual.cache&&delete e.virtual.cache[t[a]],t[a]<s&&(s-=1),s=Math.max(s,0);else e.virtual.slides.splice(t,1),e.params.virtual.cache&&delete e.virtual.cache[t],t<s&&(s-=1),s=Math.max(s,0);r(!0),e.slideTo(s,0)},removeAllSlides:function(){e.virtual.slides=[],e.params.virtual.cache&&(e.virtual.cache={}),r(!0),e.slideTo(0,0)},update:r})},function({swiper:e,extendParams:t,on:s,emit:i}){const n=a(),l=r();function o(t){if(!e.enabled)return;const{rtlTranslate:s}=e;let a=t;a.originalEvent&&(a=a.originalEvent);const r=a.keyCode||a.charCode,o=e.params.keyboard.pageUpDown,d=o&&33===r,p=o&&34===r,c=37===r,u=39===r,h=38===r,m=40===r;if(!e.allowSlideNext&&(e.isHorizontal()&&u||e.isVertical()&&m||p))return!1;if(!e.allowSlidePrev&&(e.isHorizontal()&&c||e.isVertical()&&h||d))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||n.activeElement&&n.activeElement.nodeName&&("input"===n.activeElement.nodeName.toLowerCase()||"textarea"===n.activeElement.nodeName.toLowerCase()))){if(e.params.keyboard.onlyInViewport&&(d||p||c||u||h||m)){let t=!1;if(e.$el.parents(`.${e.params.slideClass}`).length>0&&0===e.$el.parents(`.${e.params.slideActiveClass}`).length)return;const a=e.$el,i=a[0].clientWidth,r=a[0].clientHeight,n=l.innerWidth,o=l.innerHeight,d=e.$el.offset();s&&(d.left-=e.$el[0].scrollLeft);const p=[[d.left,d.top],[d.left+i,d.top],[d.left,d.top+r],[d.left+i,d.top+r]];for(let e=0;e<p.length;e+=1){const s=p[e];if(s[0]>=0&&s[0]<=n&&s[1]>=0&&s[1]<=o){if(0===s[0]&&0===s[1])continue;t=!0}}if(!t)return}e.isHorizontal()?((d||p||c||u)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),((p||u)&&!s||(d||c)&&s)&&e.slideNext(),((d||c)&&!s||(p||u)&&s)&&e.slidePrev()):((d||p||h||m)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),(p||m)&&e.slideNext(),(d||h)&&e.slidePrev()),i("keyPress",r)}}function p(){e.keyboard.enabled||(d(n).on("keydown",o),e.keyboard.enabled=!0)}function c(){e.keyboard.enabled&&(d(n).off("keydown",o),e.keyboard.enabled=!1)}e.keyboard={enabled:!1},t({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}}),s("init",(()=>{e.params.keyboard.enabled&&p()})),s("destroy",(()=>{e.keyboard.enabled&&c()})),Object.assign(e.keyboard,{enable:p,disable:c})},function({swiper:e,extendParams:t,on:s,emit:a}){const i=r();let n;t({mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarget:"container",thresholdDelta:null,thresholdTime:null}}),e.mousewheel={enabled:!1};let l,o=u();const p=[];function h(){e.enabled&&(e.mouseEntered=!0)}function m(){e.enabled&&(e.mouseEntered=!1)}function f(t){return!(e.params.mousewheel.thresholdDelta&&t.delta<e.params.mousewheel.thresholdDelta)&&(!(e.params.mousewheel.thresholdTime&&u()-o<e.params.mousewheel.thresholdTime)&&(t.delta>=6&&u()-o<60||(t.direction<0?e.isEnd&&!e.params.loop||e.animating||(e.slideNext(),a("scroll",t.raw)):e.isBeginning&&!e.params.loop||e.animating||(e.slidePrev(),a("scroll",t.raw)),o=(new i.Date).getTime(),!1)))}function g(t){let s=t,i=!0;if(!e.enabled)return;const r=e.params.mousewheel;e.params.cssMode&&s.preventDefault();let o=e.$el;if("container"!==e.params.mousewheel.eventsTarget&&(o=d(e.params.mousewheel.eventsTarget)),!e.mouseEntered&&!o[0].contains(s.target)&&!r.releaseOnEdges)return!0;s.originalEvent&&(s=s.originalEvent);let h=0;const m=e.rtlTranslate?-1:1,g=function(e){let t=0,s=0,a=0,i=0;return"detail"in e&&(s=e.detail),"wheelDelta"in e&&(s=-e.wheelDelta/120),"wheelDeltaY"in e&&(s=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=s,s=0),a=10*t,i=10*s,"deltaY"in e&&(i=e.deltaY),"deltaX"in e&&(a=e.deltaX),e.shiftKey&&!a&&(a=i,i=0),(a||i)&&e.deltaMode&&(1===e.deltaMode?(a*=40,i*=40):(a*=800,i*=800)),a&&!t&&(t=a<1?-1:1),i&&!s&&(s=i<1?-1:1),{spinX:t,spinY:s,pixelX:a,pixelY:i}}(s);if(r.forceToAxis)if(e.isHorizontal()){if(!(Math.abs(g.pixelX)>Math.abs(g.pixelY)))return!0;h=-g.pixelX*m}else{if(!(Math.abs(g.pixelY)>Math.abs(g.pixelX)))return!0;h=-g.pixelY}else h=Math.abs(g.pixelX)>Math.abs(g.pixelY)?-g.pixelX*m:-g.pixelY;if(0===h)return!0;r.invert&&(h=-h);let v=e.getTranslate()+h*r.sensitivity;if(v>=e.minTranslate()&&(v=e.minTranslate()),v<=e.maxTranslate()&&(v=e.maxTranslate()),i=!!e.params.loop||!(v===e.minTranslate()||v===e.maxTranslate()),i&&e.params.nested&&s.stopPropagation(),e.params.freeMode&&e.params.freeMode.enabled){const t={time:u(),delta:Math.abs(h),direction:Math.sign(h)},i=l&&t.time<l.time+500&&t.delta<=l.delta&&t.direction===l.direction;if(!i){l=void 0,e.params.loop&&e.loopFix();let o=e.getTranslate()+h*r.sensitivity;const d=e.isBeginning,u=e.isEnd;if(o>=e.minTranslate()&&(o=e.minTranslate()),o<=e.maxTranslate()&&(o=e.maxTranslate()),e.setTransition(0),e.setTranslate(o),e.updateProgress(),e.updateActiveIndex(),e.updateSlidesClasses(),(!d&&e.isBeginning||!u&&e.isEnd)&&e.updateSlidesClasses(),e.params.freeMode.sticky){clearTimeout(n),n=void 0,p.length>=15&&p.shift();const s=p.length?p[p.length-1]:void 0,a=p[0];if(p.push(t),s&&(t.delta>s.delta||t.direction!==s.direction))p.splice(0);else if(p.length>=15&&t.time-a.time<500&&a.delta-t.delta>=1&&t.delta<=6){const s=h>0?.8:.2;l=t,p.splice(0),n=c((()=>{e.slideToClosest(e.params.speed,!0,void 0,s)}),0)}n||(n=c((()=>{l=t,p.splice(0),e.slideToClosest(e.params.speed,!0,void 0,.5)}),500))}if(i||a("scroll",s),e.params.autoplay&&e.params.autoplayDisableOnInteraction&&e.autoplay.stop(),o===e.minTranslate()||o===e.maxTranslate())return!0}}else{const s={time:u(),delta:Math.abs(h),direction:Math.sign(h),raw:t};p.length>=2&&p.shift();const a=p.length?p[p.length-1]:void 0;if(p.push(s),a?(s.direction!==a.direction||s.delta>a.delta||s.time>a.time+150)&&f(s):f(s),function(t){const s=e.params.mousewheel;if(t.direction<0){if(e.isEnd&&!e.params.loop&&s.releaseOnEdges)return!0}else if(e.isBeginning&&!e.params.loop&&s.releaseOnEdges)return!0;return!1}(s))return!0}return s.preventDefault?s.preventDefault():s.returnValue=!1,!1}function v(t){let s=e.$el;"container"!==e.params.mousewheel.eventsTarget&&(s=d(e.params.mousewheel.eventsTarget)),s[t]("mouseenter",h),s[t]("mouseleave",m),s[t]("wheel",g)}function w(){return e.params.cssMode?(e.wrapperEl.removeEventListener("wheel",g),!0):!e.mousewheel.enabled&&(v("on"),e.mousewheel.enabled=!0,!0)}function b(){return e.params.cssMode?(e.wrapperEl.addEventListener(event,g),!0):!!e.mousewheel.enabled&&(v("off"),e.mousewheel.enabled=!1,!0)}s("init",(()=>{!e.params.mousewheel.enabled&&e.params.cssMode&&b(),e.params.mousewheel.enabled&&w()})),s("destroy",(()=>{e.params.cssMode&&w(),e.mousewheel.enabled&&b()})),Object.assign(e.mousewheel,{enable:w,disable:b})},function({swiper:e,extendParams:t,on:s,emit:a}){function i(t){let s;return t&&(s=d(t),e.params.uniqueNavElements&&"string"==typeof t&&s.length>1&&1===e.$el.find(t).length&&(s=e.$el.find(t))),s}function r(t,s){const a=e.params.navigation;t&&t.length>0&&(t[s?"addClass":"removeClass"](a.disabledClass),t[0]&&"BUTTON"===t[0].tagName&&(t[0].disabled=s),e.params.watchOverflow&&e.enabled&&t[e.isLocked?"addClass":"removeClass"](a.lockClass))}function n(){if(e.params.loop)return;const{$nextEl:t,$prevEl:s}=e.navigation;r(s,e.isBeginning&&!e.params.rewind),r(t,e.isEnd&&!e.params.rewind)}function l(t){t.preventDefault(),(!e.isBeginning||e.params.loop||e.params.rewind)&&e.slidePrev()}function o(t){t.preventDefault(),(!e.isEnd||e.params.loop||e.params.rewind)&&e.slideNext()}function p(){const t=e.params.navigation;if(e.params.navigation=Y(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!t.nextEl&&!t.prevEl)return;const s=i(t.nextEl),a=i(t.prevEl);s&&s.length>0&&s.on("click",o),a&&a.length>0&&a.on("click",l),Object.assign(e.navigation,{$nextEl:s,nextEl:s&&s[0],$prevEl:a,prevEl:a&&a[0]}),e.enabled||(s&&s.addClass(t.lockClass),a&&a.addClass(t.lockClass))}function c(){const{$nextEl:t,$prevEl:s}=e.navigation;t&&t.length&&(t.off("click",o),t.removeClass(e.params.navigation.disabledClass)),s&&s.length&&(s.off("click",l),s.removeClass(e.params.navigation.disabledClass))}t({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock"}}),e.navigation={nextEl:null,$nextEl:null,prevEl:null,$prevEl:null},s("init",(()=>{p(),n()})),s("toEdge fromEdge lock unlock",(()=>{n()})),s("destroy",(()=>{c()})),s("enable disable",(()=>{const{$nextEl:t,$prevEl:s}=e.navigation;t&&t[e.enabled?"removeClass":"addClass"](e.params.navigation.lockClass),s&&s[e.enabled?"removeClass":"addClass"](e.params.navigation.lockClass)})),s("click",((t,s)=>{const{$nextEl:i,$prevEl:r}=e.navigation,n=s.target;if(e.params.navigation.hideOnClick&&!d(n).is(r)&&!d(n).is(i)){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===n||e.pagination.el.contains(n)))return;let t;i?t=i.hasClass(e.params.navigation.hiddenClass):r&&(t=r.hasClass(e.params.navigation.hiddenClass)),a(!0===t?"navigationShow":"navigationHide"),i&&i.toggleClass(e.params.navigation.hiddenClass),r&&r.toggleClass(e.params.navigation.hiddenClass)}})),Object.assign(e.navigation,{update:n,init:p,destroy:c})},function({swiper:e,extendParams:t,on:s,emit:a}){const i="swiper-pagination";let r;t({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${i}-bullet`,bulletActiveClass:`${i}-bullet-active`,modifierClass:`${i}-`,currentClass:`${i}-current`,totalClass:`${i}-total`,hiddenClass:`${i}-hidden`,progressbarFillClass:`${i}-progressbar-fill`,progressbarOppositeClass:`${i}-progressbar-opposite`,clickableClass:`${i}-clickable`,lockClass:`${i}-lock`,horizontalClass:`${i}-horizontal`,verticalClass:`${i}-vertical`}}),e.pagination={el:null,$el:null,bullets:[]};let n=0;function l(){return!e.params.pagination.el||!e.pagination.el||!e.pagination.$el||0===e.pagination.$el.length}function o(t,s){const{bulletActiveClass:a}=e.params.pagination;t[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`)}function p(){const t=e.rtl,s=e.params.pagination;if(l())return;const i=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,p=e.pagination.$el;let c;const u=e.params.loop?Math.ceil((i-2*e.loopedSlides)/e.params.slidesPerGroup):e.snapGrid.length;if(e.params.loop?(c=Math.ceil((e.activeIndex-e.loopedSlides)/e.params.slidesPerGroup),c>i-1-2*e.loopedSlides&&(c-=i-2*e.loopedSlides),c>u-1&&(c-=u),c<0&&"bullets"!==e.params.paginationType&&(c=u+c)):c=void 0!==e.snapIndex?e.snapIndex:e.activeIndex||0,"bullets"===s.type&&e.pagination.bullets&&e.pagination.bullets.length>0){const a=e.pagination.bullets;let i,l,u;if(s.dynamicBullets&&(r=a.eq(0)[e.isHorizontal()?"outerWidth":"outerHeight"](!0),p.css(e.isHorizontal()?"width":"height",r*(s.dynamicMainBullets+4)+"px"),s.dynamicMainBullets>1&&void 0!==e.previousIndex&&(n+=c-(e.previousIndex-e.loopedSlides||0),n>s.dynamicMainBullets-1?n=s.dynamicMainBullets-1:n<0&&(n=0)),i=Math.max(c-n,0),l=i+(Math.min(a.length,s.dynamicMainBullets)-1),u=(l+i)/2),a.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${s.bulletActiveClass}${e}`)).join(" ")),p.length>1)a.each((e=>{const t=d(e),a=t.index();a===c&&t.addClass(s.bulletActiveClass),s.dynamicBullets&&(a>=i&&a<=l&&t.addClass(`${s.bulletActiveClass}-main`),a===i&&o(t,"prev"),a===l&&o(t,"next"))}));else{const t=a.eq(c),r=t.index();if(t.addClass(s.bulletActiveClass),s.dynamicBullets){const t=a.eq(i),n=a.eq(l);for(let e=i;e<=l;e+=1)a.eq(e).addClass(`${s.bulletActiveClass}-main`);if(e.params.loop)if(r>=a.length){for(let e=s.dynamicMainBullets;e>=0;e-=1)a.eq(a.length-e).addClass(`${s.bulletActiveClass}-main`);a.eq(a.length-s.dynamicMainBullets-1).addClass(`${s.bulletActiveClass}-prev`)}else o(t,"prev"),o(n,"next");else o(t,"prev"),o(n,"next")}}if(s.dynamicBullets){const i=Math.min(a.length,s.dynamicMainBullets+4),n=(r*i-r)/2-u*r,l=t?"right":"left";a.css(e.isHorizontal()?l:"top",`${n}px`)}}if("fraction"===s.type&&(p.find(W(s.currentClass)).text(s.formatFractionCurrent(c+1)),p.find(W(s.totalClass)).text(s.formatFractionTotal(u))),"progressbar"===s.type){let t;t=s.progressbarOpposite?e.isHorizontal()?"vertical":"horizontal":e.isHorizontal()?"horizontal":"vertical";const a=(c+1)/u;let i=1,r=1;"horizontal"===t?i=a:r=a,p.find(W(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${r})`).transition(e.params.speed)}"custom"===s.type&&s.renderCustom?(p.html(s.renderCustom(e,c+1,u)),a("paginationRender",p[0])):a("paginationUpdate",p[0]),e.params.watchOverflow&&e.enabled&&p[e.isLocked?"addClass":"removeClass"](s.lockClass)}function c(){const t=e.params.pagination;if(l())return;const s=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,i=e.pagination.$el;let r="";if("bullets"===t.type){let a=e.params.loop?Math.ceil((s-2*e.loopedSlides)/e.params.slidesPerGroup):e.snapGrid.length;e.params.freeMode&&e.params.freeMode.enabled&&!e.params.loop&&a>s&&(a=s);for(let s=0;s<a;s+=1)t.renderBullet?r+=t.renderBullet.call(e,s,t.bulletClass):r+=`<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`;i.html(r),e.pagination.bullets=i.find(W(t.bulletClass))}"fraction"===t.type&&(r=t.renderFraction?t.renderFraction.call(e,t.currentClass,t.totalClass):`<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`,i.html(r)),"progressbar"===t.type&&(r=t.renderProgressbar?t.renderProgressbar.call(e,t.progressbarFillClass):`<span class="${t.progressbarFillClass}"></span>`,i.html(r)),"custom"!==t.type&&a("paginationRender",e.pagination.$el[0])}function u(){e.params.pagination=Y(e,e.originalParams.pagination,e.params.pagination,{el:"swiper-pagination"});const t=e.params.pagination;if(!t.el)return;let s=d(t.el);0!==s.length&&(e.params.uniqueNavElements&&"string"==typeof t.el&&s.length>1&&(s=e.$el.find(t.el),s.length>1&&(s=s.filter((t=>d(t).parents(".swiper")[0]===e.el)))),"bullets"===t.type&&t.clickable&&s.addClass(t.clickableClass),s.addClass(t.modifierClass+t.type),s.addClass(t.modifierClass+e.params.direction),"bullets"===t.type&&t.dynamicBullets&&(s.addClass(`${t.modifierClass}${t.type}-dynamic`),n=0,t.dynamicMainBullets<1&&(t.dynamicMainBullets=1)),"progressbar"===t.type&&t.progressbarOpposite&&s.addClass(t.progressbarOppositeClass),t.clickable&&s.on("click",W(t.bulletClass),(function(t){t.preventDefault();let s=d(this).index()*e.params.slidesPerGroup;e.params.loop&&(s+=e.loopedSlides),e.slideTo(s)})),Object.assign(e.pagination,{$el:s,el:s[0]}),e.enabled||s.addClass(t.lockClass))}function h(){const t=e.params.pagination;if(l())return;const s=e.pagination.$el;s.removeClass(t.hiddenClass),s.removeClass(t.modifierClass+t.type),s.removeClass(t.modifierClass+e.params.direction),e.pagination.bullets&&e.pagination.bullets.removeClass&&e.pagination.bullets.removeClass(t.bulletActiveClass),t.clickable&&s.off("click",W(t.bulletClass))}s("init",(()=>{u(),c(),p()})),s("activeIndexChange",(()=>{(e.params.loop||void 0===e.snapIndex)&&p()})),s("snapIndexChange",(()=>{e.params.loop||p()})),s("slidesLengthChange",(()=>{e.params.loop&&(c(),p())})),s("snapGridLengthChange",(()=>{e.params.loop||(c(),p())})),s("destroy",(()=>{h()})),s("enable disable",(()=>{const{$el:t}=e.pagination;t&&t[e.enabled?"removeClass":"addClass"](e.params.pagination.lockClass)})),s("lock unlock",(()=>{p()})),s("click",((t,s)=>{const i=s.target,{$el:r}=e.pagination;if(e.params.pagination.el&&e.params.pagination.hideOnClick&&r.length>0&&!d(i).hasClass(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&i===e.navigation.nextEl||e.navigation.prevEl&&i===e.navigation.prevEl))return;const t=r.hasClass(e.params.pagination.hiddenClass);a(!0===t?"paginationShow":"paginationHide"),r.toggleClass(e.params.pagination.hiddenClass)}})),Object.assign(e.pagination,{render:c,update:p,init:u,destroy:h})},function({swiper:e,extendParams:t,on:s,emit:i}){const r=a();let n,l,o,p,u=!1,h=null,m=null;function f(){if(!e.params.scrollbar.el||!e.scrollbar.el)return;const{scrollbar:t,rtlTranslate:s,progress:a}=e,{$dragEl:i,$el:r}=t,n=e.params.scrollbar;let d=l,p=(o-l)*a;s?(p=-p,p>0?(d=l-p,p=0):-p+l>o&&(d=o+p)):p<0?(d=l+p,p=0):p+l>o&&(d=o-p),e.isHorizontal()?(i.transform(`translate3d(${p}px, 0, 0)`),i[0].style.width=`${d}px`):(i.transform(`translate3d(0px, ${p}px, 0)`),i[0].style.height=`${d}px`),n.hide&&(clearTimeout(h),r[0].style.opacity=1,h=setTimeout((()=>{r[0].style.opacity=0,r.transition(400)}),1e3))}function g(){if(!e.params.scrollbar.el||!e.scrollbar.el)return;const{scrollbar:t}=e,{$dragEl:s,$el:a}=t;s[0].style.width="",s[0].style.height="",o=e.isHorizontal()?a[0].offsetWidth:a[0].offsetHeight,p=e.size/(e.virtualSize+e.params.slidesOffsetBefore-(e.params.centeredSlides?e.snapGrid[0]:0)),l="auto"===e.params.scrollbar.dragSize?o*p:parseInt(e.params.scrollbar.dragSize,10),e.isHorizontal()?s[0].style.width=`${l}px`:s[0].style.height=`${l}px`,a[0].style.display=p>=1?"none":"",e.params.scrollbar.hide&&(a[0].style.opacity=0),e.params.watchOverflow&&e.enabled&&t.$el[e.isLocked?"addClass":"removeClass"](e.params.scrollbar.lockClass)}function v(t){return e.isHorizontal()?"touchstart"===t.type||"touchmove"===t.type?t.targetTouches[0].clientX:t.clientX:"touchstart"===t.type||"touchmove"===t.type?t.targetTouches[0].clientY:t.clientY}function w(t){const{scrollbar:s,rtlTranslate:a}=e,{$el:i}=s;let r;r=(v(t)-i.offset()[e.isHorizontal()?"left":"top"]-(null!==n?n:l/2))/(o-l),r=Math.max(Math.min(r,1),0),a&&(r=1-r);const d=e.minTranslate()+(e.maxTranslate()-e.minTranslate())*r;e.updateProgress(d),e.setTranslate(d),e.updateActiveIndex(),e.updateSlidesClasses()}function b(t){const s=e.params.scrollbar,{scrollbar:a,$wrapperEl:r}=e,{$el:l,$dragEl:o}=a;u=!0,n=t.target===o[0]||t.target===o?v(t)-t.target.getBoundingClientRect()[e.isHorizontal()?"left":"top"]:null,t.preventDefault(),t.stopPropagation(),r.transition(100),o.transition(100),w(t),clearTimeout(m),l.transition(0),s.hide&&l.css("opacity",1),e.params.cssMode&&e.$wrapperEl.css("scroll-snap-type","none"),i("scrollbarDragStart",t)}function x(t){const{scrollbar:s,$wrapperEl:a}=e,{$el:r,$dragEl:n}=s;u&&(t.preventDefault?t.preventDefault():t.returnValue=!1,w(t),a.transition(0),r.transition(0),n.transition(0),i("scrollbarDragMove",t))}function y(t){const s=e.params.scrollbar,{scrollbar:a,$wrapperEl:r}=e,{$el:n}=a;u&&(u=!1,e.params.cssMode&&(e.$wrapperEl.css("scroll-snap-type",""),r.transition("")),s.hide&&(clearTimeout(m),m=c((()=>{n.css("opacity",0),n.transition(400)}),1e3)),i("scrollbarDragEnd",t),s.snapOnRelease&&e.slideToClosest())}function E(t){const{scrollbar:s,touchEventsTouch:a,touchEventsDesktop:i,params:n,support:l}=e,o=s.$el[0],d=!(!l.passiveListener||!n.passiveListeners)&&{passive:!1,capture:!1},p=!(!l.passiveListener||!n.passiveListeners)&&{passive:!0,capture:!1};if(!o)return;const c="on"===t?"addEventListener":"removeEventListener";l.touch?(o[c](a.start,b,d),o[c](a.move,x,d),o[c](a.end,y,p)):(o[c](i.start,b,d),r[c](i.move,x,d),r[c](i.end,y,p))}function T(){const{scrollbar:t,$el:s}=e;e.params.scrollbar=Y(e,e.originalParams.scrollbar,e.params.scrollbar,{el:"swiper-scrollbar"});const a=e.params.scrollbar;if(!a.el)return;let i=d(a.el);e.params.uniqueNavElements&&"string"==typeof a.el&&i.length>1&&1===s.find(a.el).length&&(i=s.find(a.el));let r=i.find(`.${e.params.scrollbar.dragClass}`);0===r.length&&(r=d(`<div class="${e.params.scrollbar.dragClass}"></div>`),i.append(r)),Object.assign(t,{$el:i,el:i[0],$dragEl:r,dragEl:r[0]}),a.draggable&&e.params.scrollbar.el&&E("on"),i&&i[e.enabled?"removeClass":"addClass"](e.params.scrollbar.lockClass)}function C(){e.params.scrollbar.el&&E("off")}t({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag"}}),e.scrollbar={el:null,dragEl:null,$el:null,$dragEl:null},s("init",(()=>{T(),g(),f()})),s("update resize observerUpdate lock unlock",(()=>{g()})),s("setTranslate",(()=>{f()})),s("setTransition",((t,s)=>{!function(t){e.params.scrollbar.el&&e.scrollbar.el&&e.scrollbar.$dragEl.transition(t)}(s)})),s("enable disable",(()=>{const{$el:t}=e.scrollbar;t&&t[e.enabled?"removeClass":"addClass"](e.params.scrollbar.lockClass)})),s("destroy",(()=>{C()})),Object.assign(e.scrollbar,{updateSize:g,setTranslate:f,init:T,destroy:C})},function({swiper:e,extendParams:t,on:s}){t({parallax:{enabled:!1}});const a=(t,s)=>{const{rtl:a}=e,i=d(t),r=a?-1:1,n=i.attr("data-swiper-parallax")||"0";let l=i.attr("data-swiper-parallax-x"),o=i.attr("data-swiper-parallax-y");const p=i.attr("data-swiper-parallax-scale"),c=i.attr("data-swiper-parallax-opacity");if(l||o?(l=l||"0",o=o||"0"):e.isHorizontal()?(l=n,o="0"):(o=n,l="0"),l=l.indexOf("%")>=0?parseInt(l,10)*s*r+"%":l*s*r+"px",o=o.indexOf("%")>=0?parseInt(o,10)*s+"%":o*s+"px",null!=c){const e=c-(c-1)*(1-Math.abs(s));i[0].style.opacity=e}if(null==p)i.transform(`translate3d(${l}, ${o}, 0px)`);else{const e=p-(p-1)*(1-Math.abs(s));i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`)}},i=()=>{const{$el:t,slides:s,progress:i,snapGrid:r}=e;t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{a(e,i)})),s.each(((t,s)=>{let n=t.progress;e.params.slidesPerGroup>1&&"auto"!==e.params.slidesPerView&&(n+=Math.ceil(s/2)-i*(r.length-1)),n=Math.min(Math.max(n,-1),1),d(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{a(e,n)}))}))};s("beforeInit",(()=>{e.params.parallax.enabled&&(e.params.watchSlidesProgress=!0,e.originalParams.watchSlidesProgress=!0)})),s("init",(()=>{e.params.parallax.enabled&&i()})),s("setTranslate",(()=>{e.params.parallax.enabled&&i()})),s("setTransition",((t,s)=>{e.params.parallax.enabled&&((t=e.params.speed)=>{const{$el:s}=e;s.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{const s=d(e);let a=parseInt(s.attr("data-swiper-parallax-duration"),10)||t;0===t&&(a=0),s.transition(a)}))})(s)}))},function({swiper:e,extendParams:t,on:s,emit:a}){const i=r();t({zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}}),e.zoom={enabled:!1};let n,l,o,p=1,c=!1;const u={$slideEl:void 0,slideWidth:void 0,slideHeight:void 0,$imageEl:void 0,$imageWrapEl:void 0,maxRatio:3},m={isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},f={x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0};let g=1;function v(e){if(e.targetTouches.length<2)return 1;const t=e.targetTouches[0].pageX,s=e.targetTouches[0].pageY,a=e.targetTouches[1].pageX,i=e.targetTouches[1].pageY;return Math.sqrt((a-t)**2+(i-s)**2)}function w(t){const s=e.support,a=e.params.zoom;if(l=!1,o=!1,!s.gestures){if("touchstart"!==t.type||"touchstart"===t.type&&t.targetTouches.length<2)return;l=!0,u.scaleStart=v(t)}u.$slideEl&&u.$slideEl.length||(u.$slideEl=d(t.target).closest(`.${e.params.slideClass}`),0===u.$slideEl.length&&(u.$slideEl=e.slides.eq(e.activeIndex)),u.$imageEl=u.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),u.$imageWrapEl=u.$imageEl.parent(`.${a.containerClass}`),u.maxRatio=u.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,0!==u.$imageWrapEl.length)?(u.$imageEl&&u.$imageEl.transition(0),c=!0):u.$imageEl=void 0}function b(t){const s=e.support,a=e.params.zoom,i=e.zoom;if(!s.gestures){if("touchmove"!==t.type||"touchmove"===t.type&&t.targetTouches.length<2)return;o=!0,u.scaleMove=v(t)}u.$imageEl&&0!==u.$imageEl.length?(s.gestures?i.scale=t.scale*p:i.scale=u.scaleMove/u.scaleStart*p,i.scale>u.maxRatio&&(i.scale=u.maxRatio-1+(i.scale-u.maxRatio+1)**.5),i.scale<a.minRatio&&(i.scale=a.minRatio+1-(a.minRatio-i.scale+1)**.5),u.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)):"gesturechange"===t.type&&w(t)}function x(t){const s=e.device,a=e.support,i=e.params.zoom,r=e.zoom;if(!a.gestures){if(!l||!o)return;if("touchend"!==t.type||"touchend"===t.type&&t.changedTouches.length<2&&!s.android)return;l=!1,o=!1}u.$imageEl&&0!==u.$imageEl.length&&(r.scale=Math.max(Math.min(r.scale,u.maxRatio),i.minRatio),u.$imageEl.transition(e.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`),p=r.scale,c=!1,1===r.scale&&(u.$slideEl=void 0))}function y(t){const s=e.zoom;if(!u.$imageEl||0===u.$imageEl.length)return;if(e.allowClick=!1,!m.isTouched||!u.$slideEl)return;m.isMoved||(m.width=u.$imageEl[0].offsetWidth,m.height=u.$imageEl[0].offsetHeight,m.startX=h(u.$imageWrapEl[0],"x")||0,m.startY=h(u.$imageWrapEl[0],"y")||0,u.slideWidth=u.$slideEl[0].offsetWidth,u.slideHeight=u.$slideEl[0].offsetHeight,u.$imageWrapEl.transition(0));const a=m.width*s.scale,i=m.height*s.scale;if(!(a<u.slideWidth&&i<u.slideHeight)){if(m.minX=Math.min(u.slideWidth/2-a/2,0),m.maxX=-m.minX,m.minY=Math.min(u.slideHeight/2-i/2,0),m.maxY=-m.minY,m.touchesCurrent.x="touchmove"===t.type?t.targetTouches[0].pageX:t.pageX,m.touchesCurrent.y="touchmove"===t.type?t.targetTouches[0].pageY:t.pageY,!m.isMoved&&!c){if(e.isHorizontal()&&(Math.floor(m.minX)===Math.floor(m.startX)&&m.touchesCurrent.x<m.touchesStart.x||Math.floor(m.maxX)===Math.floor(m.startX)&&m.touchesCurrent.x>m.touchesStart.x))return void(m.isTouched=!1);if(!e.isHorizontal()&&(Math.floor(m.minY)===Math.floor(m.startY)&&m.touchesCurrent.y<m.touchesStart.y||Math.floor(m.maxY)===Math.floor(m.startY)&&m.touchesCurrent.y>m.touchesStart.y))return void(m.isTouched=!1)}t.cancelable&&t.preventDefault(),t.stopPropagation(),m.isMoved=!0,m.currentX=m.touchesCurrent.x-m.touchesStart.x+m.startX,m.currentY=m.touchesCurrent.y-m.touchesStart.y+m.startY,m.currentX<m.minX&&(m.currentX=m.minX+1-(m.minX-m.currentX+1)**.8),m.currentX>m.maxX&&(m.currentX=m.maxX-1+(m.currentX-m.maxX+1)**.8),m.currentY<m.minY&&(m.currentY=m.minY+1-(m.minY-m.currentY+1)**.8),m.currentY>m.maxY&&(m.currentY=m.maxY-1+(m.currentY-m.maxY+1)**.8),f.prevPositionX||(f.prevPositionX=m.touchesCurrent.x),f.prevPositionY||(f.prevPositionY=m.touchesCurrent.y),f.prevTime||(f.prevTime=Date.now()),f.x=(m.touchesCurrent.x-f.prevPositionX)/(Date.now()-f.prevTime)/2,f.y=(m.touchesCurrent.y-f.prevPositionY)/(Date.now()-f.prevTime)/2,Math.abs(m.touchesCurrent.x-f.prevPositionX)<2&&(f.x=0),Math.abs(m.touchesCurrent.y-f.prevPositionY)<2&&(f.y=0),f.prevPositionX=m.touchesCurrent.x,f.prevPositionY=m.touchesCurrent.y,f.prevTime=Date.now(),u.$imageWrapEl.transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)}}function E(){const t=e.zoom;u.$slideEl&&e.previousIndex!==e.activeIndex&&(u.$imageEl&&u.$imageEl.transform("translate3d(0,0,0) scale(1)"),u.$imageWrapEl&&u.$imageWrapEl.transform("translate3d(0,0,0)"),t.scale=1,p=1,u.$slideEl=void 0,u.$imageEl=void 0,u.$imageWrapEl=void 0)}function T(t){const s=e.zoom,a=e.params.zoom;if(u.$slideEl||(t&&t.target&&(u.$slideEl=d(t.target).closest(`.${e.params.slideClass}`)),u.$slideEl||(e.params.virtual&&e.params.virtual.enabled&&e.virtual?u.$slideEl=e.$wrapperEl.children(`.${e.params.slideActiveClass}`):u.$slideEl=e.slides.eq(e.activeIndex)),u.$imageEl=u.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),u.$imageWrapEl=u.$imageEl.parent(`.${a.containerClass}`)),!u.$imageEl||0===u.$imageEl.length||!u.$imageWrapEl||0===u.$imageWrapEl.length)return;let r,n,l,o,c,h,f,g,v,w,b,x,y,E,T,C,$,S;e.params.cssMode&&(e.wrapperEl.style.overflow="hidden",e.wrapperEl.style.touchAction="none"),u.$slideEl.addClass(`${a.zoomedSlideClass}`),void 0===m.touchesStart.x&&t?(r="touchend"===t.type?t.changedTouches[0].pageX:t.pageX,n="touchend"===t.type?t.changedTouches[0].pageY:t.pageY):(r=m.touchesStart.x,n=m.touchesStart.y),s.scale=u.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,p=u.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,t?($=u.$slideEl[0].offsetWidth,S=u.$slideEl[0].offsetHeight,l=u.$slideEl.offset().left+i.scrollX,o=u.$slideEl.offset().top+i.scrollY,c=l+$/2-r,h=o+S/2-n,v=u.$imageEl[0].offsetWidth,w=u.$imageEl[0].offsetHeight,b=v*s.scale,x=w*s.scale,y=Math.min($/2-b/2,0),E=Math.min(S/2-x/2,0),T=-y,C=-E,f=c*s.scale,g=h*s.scale,f<y&&(f=y),f>T&&(f=T),g<E&&(g=E),g>C&&(g=C)):(f=0,g=0),u.$imageWrapEl.transition(300).transform(`translate3d(${f}px, ${g}px,0)`),u.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`)}function C(){const t=e.zoom,s=e.params.zoom;u.$slideEl||(e.params.virtual&&e.params.virtual.enabled&&e.virtual?u.$slideEl=e.$wrapperEl.children(`.${e.params.slideActiveClass}`):u.$slideEl=e.slides.eq(e.activeIndex),u.$imageEl=u.$slideEl.find(`.${s.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),u.$imageWrapEl=u.$imageEl.parent(`.${s.containerClass}`)),u.$imageEl&&0!==u.$imageEl.length&&u.$imageWrapEl&&0!==u.$imageWrapEl.length&&(e.params.cssMode&&(e.wrapperEl.style.overflow="",e.wrapperEl.style.touchAction=""),t.scale=1,p=1,u.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),u.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),u.$slideEl.removeClass(`${s.zoomedSlideClass}`),u.$slideEl=void 0)}function $(t){const s=e.zoom;s.scale&&1!==s.scale?C():T(t)}function S(){const t=e.support;return{passiveListener:!("touchstart"!==e.touchEvents.start||!t.passiveListener||!e.params.passiveListeners)&&{passive:!0,capture:!1},activeListenerWithCapture:!t.passiveListener||{passive:!1,capture:!0}}}function M(){return`.${e.params.slideClass}`}function P(t){const{passiveListener:s}=S(),a=M();e.$wrapperEl[t]("gesturestart",a,w,s),e.$wrapperEl[t]("gesturechange",a,b,s),e.$wrapperEl[t]("gestureend",a,x,s)}function k(){n||(n=!0,P("on"))}function z(){n&&(n=!1,P("off"))}function O(){const t=e.zoom;if(t.enabled)return;t.enabled=!0;const s=e.support,{passiveListener:a,activeListenerWithCapture:i}=S(),r=M();s.gestures?(e.$wrapperEl.on(e.touchEvents.start,k,a),e.$wrapperEl.on(e.touchEvents.end,z,a)):"touchstart"===e.touchEvents.start&&(e.$wrapperEl.on(e.touchEvents.start,r,w,a),e.$wrapperEl.on(e.touchEvents.move,r,b,i),e.$wrapperEl.on(e.touchEvents.end,r,x,a),e.touchEvents.cancel&&e.$wrapperEl.on(e.touchEvents.cancel,r,x,a)),e.$wrapperEl.on(e.touchEvents.move,`.${e.params.zoom.containerClass}`,y,i)}function I(){const t=e.zoom;if(!t.enabled)return;const s=e.support;t.enabled=!1;const{passiveListener:a,activeListenerWithCapture:i}=S(),r=M();s.gestures?(e.$wrapperEl.off(e.touchEvents.start,k,a),e.$wrapperEl.off(e.touchEvents.end,z,a)):"touchstart"===e.touchEvents.start&&(e.$wrapperEl.off(e.touchEvents.start,r,w,a),e.$wrapperEl.off(e.touchEvents.move,r,b,i),e.$wrapperEl.off(e.touchEvents.end,r,x,a),e.touchEvents.cancel&&e.$wrapperEl.off(e.touchEvents.cancel,r,x,a)),e.$wrapperEl.off(e.touchEvents.move,`.${e.params.zoom.containerClass}`,y,i)}Object.defineProperty(e.zoom,"scale",{get:()=>g,set(e){if(g!==e){const t=u.$imageEl?u.$imageEl[0]:void 0,s=u.$slideEl?u.$slideEl[0]:void 0;a("zoomChange",e,t,s)}g=e}}),s("init",(()=>{e.params.zoom.enabled&&O()})),s("destroy",(()=>{I()})),s("touchStart",((t,s)=>{e.zoom.enabled&&function(t){const s=e.device;u.$imageEl&&0!==u.$imageEl.length&&(m.isTouched||(s.android&&t.cancelable&&t.preventDefault(),m.isTouched=!0,m.touchesStart.x="touchstart"===t.type?t.targetTouches[0].pageX:t.pageX,m.touchesStart.y="touchstart"===t.type?t.targetTouches[0].pageY:t.pageY))}(s)})),s("touchEnd",((t,s)=>{e.zoom.enabled&&function(){const t=e.zoom;if(!u.$imageEl||0===u.$imageEl.length)return;if(!m.isTouched||!m.isMoved)return m.isTouched=!1,void(m.isMoved=!1);m.isTouched=!1,m.isMoved=!1;let s=300,a=300;const i=f.x*s,r=m.currentX+i,n=f.y*a,l=m.currentY+n;0!==f.x&&(s=Math.abs((r-m.currentX)/f.x)),0!==f.y&&(a=Math.abs((l-m.currentY)/f.y));const o=Math.max(s,a);m.currentX=r,m.currentY=l;const d=m.width*t.scale,p=m.height*t.scale;m.minX=Math.min(u.slideWidth/2-d/2,0),m.maxX=-m.minX,m.minY=Math.min(u.slideHeight/2-p/2,0),m.maxY=-m.minY,m.currentX=Math.max(Math.min(m.currentX,m.maxX),m.minX),m.currentY=Math.max(Math.min(m.currentY,m.maxY),m.minY),u.$imageWrapEl.transition(o).transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)}()})),s("doubleTap",((t,s)=>{!e.animating&&e.params.zoom.enabled&&e.zoom.enabled&&e.params.zoom.toggle&&$(s)})),s("transitionEnd",(()=>{e.zoom.enabled&&e.params.zoom.enabled&&E()})),s("slideChange",(()=>{e.zoom.enabled&&e.params.zoom.enabled&&e.params.cssMode&&E()})),Object.assign(e.zoom,{enable:O,disable:I,in:T,out:C,toggle:$})},function({swiper:e,extendParams:t,on:s,emit:a}){t({lazy:{checkInView:!1,enabled:!1,loadPrevNext:!1,loadPrevNextAmount:1,loadOnTransitionStart:!1,scrollingElement:"",elementClass:"swiper-lazy",loadingClass:"swiper-lazy-loading",loadedClass:"swiper-lazy-loaded",preloaderClass:"swiper-lazy-preloader"}}),e.lazy={};let i=!1,n=!1;function l(t,s=!0){const i=e.params.lazy;if(void 0===t)return;if(0===e.slides.length)return;const r=e.virtual&&e.params.virtual.enabled?e.$wrapperEl.children(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`):e.slides.eq(t),n=r.find(`.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`);!r.hasClass(i.elementClass)||r.hasClass(i.loadedClass)||r.hasClass(i.loadingClass)||n.push(r[0]),0!==n.length&&n.each((t=>{const n=d(t);n.addClass(i.loadingClass);const o=n.attr("data-background"),p=n.attr("data-src"),c=n.attr("data-srcset"),u=n.attr("data-sizes"),h=n.parent("picture");e.loadImage(n[0],p||o,c,u,!1,(()=>{if(null!=e&&e&&(!e||e.params)&&!e.destroyed){if(o?(n.css("background-image",`url("${o}")`),n.removeAttr("data-background")):(c&&(n.attr("srcset",c),n.removeAttr("data-srcset")),u&&(n.attr("sizes",u),n.removeAttr("data-sizes")),h.length&&h.children("source").each((e=>{const t=d(e);t.attr("data-srcset")&&(t.attr("srcset",t.attr("data-srcset")),t.removeAttr("data-srcset"))})),p&&(n.attr("src",p),n.removeAttr("data-src"))),n.addClass(i.loadedClass).removeClass(i.loadingClass),r.find(`.${i.preloaderClass}`).remove(),e.params.loop&&s){const t=r.attr("data-swiper-slide-index");if(r.hasClass(e.params.slideDuplicateClass)){l(e.$wrapperEl.children(`[data-swiper-slide-index="${t}"]:not(.${e.params.slideDuplicateClass})`).index(),!1)}else{l(e.$wrapperEl.children(`.${e.params.slideDuplicateClass}[data-swiper-slide-index="${t}"]`).index(),!1)}}a("lazyImageReady",r[0],n[0]),e.params.autoHeight&&e.updateAutoHeight()}})),a("lazyImageLoad",r[0],n[0])}))}function o(){const{$wrapperEl:t,params:s,slides:a,activeIndex:i}=e,r=e.virtual&&s.virtual.enabled,o=s.lazy;let p=s.slidesPerView;function c(e){if(r){if(t.children(`.${s.slideClass}[data-swiper-slide-index="${e}"]`).length)return!0}else if(a[e])return!0;return!1}function u(e){return r?d(e).attr("data-swiper-slide-index"):d(e).index()}if("auto"===p&&(p=0),n||(n=!0),e.params.watchSlidesProgress)t.children(`.${s.slideVisibleClass}`).each((e=>{l(r?d(e).attr("data-swiper-slide-index"):d(e).index())}));else if(p>1)for(let e=i;e<i+p;e+=1)c(e)&&l(e);else l(i);if(o.loadPrevNext)if(p>1||o.loadPrevNextAmount&&o.loadPrevNextAmount>1){const e=o.loadPrevNextAmount,t=p,s=Math.min(i+t+Math.max(e,t),a.length),r=Math.max(i-Math.max(t,e),0);for(let e=i+p;e<s;e+=1)c(e)&&l(e);for(let e=r;e<i;e+=1)c(e)&&l(e)}else{const e=t.children(`.${s.slideNextClass}`);e.length>0&&l(u(e));const a=t.children(`.${s.slidePrevClass}`);a.length>0&&l(u(a))}}function p(){const t=r();if(!e||e.destroyed)return;const s=e.params.lazy.scrollingElement?d(e.params.lazy.scrollingElement):d(t),a=s[0]===t,n=a?t.innerWidth:s[0].offsetWidth,l=a?t.innerHeight:s[0].offsetHeight,c=e.$el.offset(),{rtlTranslate:u}=e;let h=!1;u&&(c.left-=e.$el[0].scrollLeft);const m=[[c.left,c.top],[c.left+e.width,c.top],[c.left,c.top+e.height],[c.left+e.width,c.top+e.height]];for(let e=0;e<m.length;e+=1){const t=m[e];if(t[0]>=0&&t[0]<=n&&t[1]>=0&&t[1]<=l){if(0===t[0]&&0===t[1])continue;h=!0}}const f=!("touchstart"!==e.touchEvents.start||!e.support.passiveListener||!e.params.passiveListeners)&&{passive:!0,capture:!1};h?(o(),s.off("scroll",p,f)):i||(i=!0,s.on("scroll",p,f))}s("beforeInit",(()=>{e.params.lazy.enabled&&e.params.preloadImages&&(e.params.preloadImages=!1)})),s("init",(()=>{e.params.lazy.enabled&&(e.params.lazy.checkInView?p():o())})),s("scroll",(()=>{e.params.freeMode&&e.params.freeMode.enabled&&!e.params.freeMode.sticky&&o()})),s("scrollbarDragMove resize _freeModeNoMomentumRelease",(()=>{e.params.lazy.enabled&&(e.params.lazy.checkInView?p():o())})),s("transitionStart",(()=>{e.params.lazy.enabled&&(e.params.lazy.loadOnTransitionStart||!e.params.lazy.loadOnTransitionStart&&!n)&&(e.params.lazy.checkInView?p():o())})),s("transitionEnd",(()=>{e.params.lazy.enabled&&!e.params.lazy.loadOnTransitionStart&&(e.params.lazy.checkInView?p():o())})),s("slideChange",(()=>{const{lazy:t,cssMode:s,watchSlidesProgress:a,touchReleaseOnEdges:i,resistanceRatio:r}=e.params;t.enabled&&(s||a&&(i||0===r))&&o()})),Object.assign(e.lazy,{load:o,loadInSlide:l})},function({swiper:e,extendParams:t,on:s}){function a(e,t){const s=function(){let e,t,s;return(a,i)=>{for(t=-1,e=a.length;e-t>1;)s=e+t>>1,a[s]<=i?t=s:e=s;return e}}();let a,i;return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(i=s(this.x,e),a=i-1,(e-this.x[a])*(this.y[i]-this.y[a])/(this.x[i]-this.x[a])+this.y[a]):0},this}function i(){e.controller.control&&e.controller.spline&&(e.controller.spline=void 0,delete e.controller.spline)}t({controller:{control:void 0,inverse:!1,by:"slide"}}),e.controller={control:void 0},s("beforeInit",(()=>{e.controller.control=e.params.controller.control})),s("update",(()=>{i()})),s("resize",(()=>{i()})),s("observerUpdate",(()=>{i()})),s("setTranslate",((t,s,a)=>{e.controller.control&&e.controller.setTranslate(s,a)})),s("setTransition",((t,s,a)=>{e.controller.control&&e.controller.setTransition(s,a)})),Object.assign(e.controller,{setTranslate:function(t,s){const i=e.controller.control;let r,n;const l=e.constructor;function o(t){const s=e.rtlTranslate?-e.translate:e.translate;"slide"===e.params.controller.by&&(!function(t){e.controller.spline||(e.controller.spline=e.params.loop?new a(e.slidesGrid,t.slidesGrid):new a(e.snapGrid,t.snapGrid))}(t),n=-e.controller.spline.interpolate(-s)),n&&"container"!==e.params.controller.by||(r=(t.maxTranslate()-t.minTranslate())/(e.maxTranslate()-e.minTranslate()),n=(s-e.minTranslate())*r+t.minTranslate()),e.params.controller.inverse&&(n=t.maxTranslate()-n),t.updateProgress(n),t.setTranslate(n,e),t.updateActiveIndex(),t.updateSlidesClasses()}if(Array.isArray(i))for(let e=0;e<i.length;e+=1)i[e]!==s&&i[e]instanceof l&&o(i[e]);else i instanceof l&&s!==i&&o(i)},setTransition:function(t,s){const a=e.constructor,i=e.controller.control;let r;function n(s){s.setTransition(t,e),0!==t&&(s.transitionStart(),s.params.autoHeight&&c((()=>{s.updateAutoHeight()})),s.$wrapperEl.transitionEnd((()=>{i&&(s.params.loop&&"slide"===e.params.controller.by&&s.loopFix(),s.transitionEnd())})))}if(Array.isArray(i))for(r=0;r<i.length;r+=1)i[r]!==s&&i[r]instanceof a&&n(i[r]);else i instanceof a&&s!==i&&n(i)}})},function({swiper:e,extendParams:t,on:s}){t({a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",slideLabelMessage:"{{index}} / {{slidesLength}}",containerMessage:null,containerRoleDescriptionMessage:null,itemRoleDescriptionMessage:null,slideRole:"group"}});let a=null;function i(e){const t=a;0!==t.length&&(t.html(""),t.html(e))}function r(e){e.attr("tabIndex","0")}function n(e){e.attr("tabIndex","-1")}function l(e,t){e.attr("role",t)}function o(e,t){e.attr("aria-roledescription",t)}function p(e,t){e.attr("aria-label",t)}function c(e){e.attr("aria-disabled",!0)}function u(e){e.attr("aria-disabled",!1)}function h(t){if(13!==t.keyCode&&32!==t.keyCode)return;const s=e.params.a11y,a=d(t.target);e.navigation&&e.navigation.$nextEl&&a.is(e.navigation.$nextEl)&&(e.isEnd&&!e.params.loop||e.slideNext(),e.isEnd?i(s.lastSlideMessage):i(s.nextSlideMessage)),e.navigation&&e.navigation.$prevEl&&a.is(e.navigation.$prevEl)&&(e.isBeginning&&!e.params.loop||e.slidePrev(),e.isBeginning?i(s.firstSlideMessage):i(s.prevSlideMessage)),e.pagination&&a.is(W(e.params.pagination.bulletClass))&&a[0].click()}function m(){if(e.params.loop||e.params.rewind||!e.navigation)return;const{$nextEl:t,$prevEl:s}=e.navigation;s&&s.length>0&&(e.isBeginning?(c(s),n(s)):(u(s),r(s))),t&&t.length>0&&(e.isEnd?(c(t),n(t)):(u(t),r(t)))}function f(){return e.pagination&&e.pagination.bullets&&e.pagination.bullets.length}function g(){return f()&&e.params.pagination.clickable}const v=(e,t,s)=>{r(e),"BUTTON"!==e[0].tagName&&(l(e,"button"),e.on("keydown",h)),p(e,s),function(e,t){e.attr("aria-controls",t)}(e,t)};function w(){const t=e.params.a11y;e.$el.append(a);const s=e.$el;t.containerRoleDescriptionMessage&&o(s,t.containerRoleDescriptionMessage),t.containerMessage&&p(s,t.containerMessage);const i=e.$wrapperEl,r=i.attr("id")||`swiper-wrapper-${function(e=16){return"x".repeat(e).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}(16)}`,n=e.params.autoplay&&e.params.autoplay.enabled?"off":"polite";var c;c=r,i.attr("id",c),function(e,t){e.attr("aria-live",t)}(i,n),t.itemRoleDescriptionMessage&&o(d(e.slides),t.itemRoleDescriptionMessage),l(d(e.slides),t.slideRole);const u=e.params.loop?e.slides.filter((t=>!t.classList.contains(e.params.slideDuplicateClass))).length:e.slides.length;let m,f;e.slides.each(((s,a)=>{const i=d(s),r=e.params.loop?parseInt(i.attr("data-swiper-slide-index"),10):a;p(i,t.slideLabelMessage.replace(/\{\{index\}\}/,r+1).replace(/\{\{slidesLength\}\}/,u))})),e.navigation&&e.navigation.$nextEl&&(m=e.navigation.$nextEl),e.navigation&&e.navigation.$prevEl&&(f=e.navigation.$prevEl),m&&m.length&&v(m,r,t.nextSlideMessage),f&&f.length&&v(f,r,t.prevSlideMessage),g()&&e.pagination.$el.on("keydown",W(e.params.pagination.bulletClass),h)}s("beforeInit",(()=>{a=d(`<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)})),s("afterInit",(()=>{e.params.a11y.enabled&&(w(),m())})),s("toEdge",(()=>{e.params.a11y.enabled&&m()})),s("fromEdge",(()=>{e.params.a11y.enabled&&m()})),s("paginationUpdate",(()=>{e.params.a11y.enabled&&function(){const t=e.params.a11y;f()&&e.pagination.bullets.each((s=>{const a=d(s);e.params.pagination.clickable&&(r(a),e.params.pagination.renderBullet||(l(a,"button"),p(a,t.paginationBulletMessage.replace(/\{\{index\}\}/,a.index()+1)))),a.is(`.${e.params.pagination.bulletActiveClass}`)?a.attr("aria-current","true"):a.removeAttr("aria-current")}))}()})),s("destroy",(()=>{e.params.a11y.enabled&&function(){let t,s;a&&a.length>0&&a.remove(),e.navigation&&e.navigation.$nextEl&&(t=e.navigation.$nextEl),e.navigation&&e.navigation.$prevEl&&(s=e.navigation.$prevEl),t&&t.off("keydown",h),s&&s.off("keydown",h),g()&&e.pagination.$el.off("keydown",W(e.params.pagination.bulletClass),h)}()}))},function({swiper:e,extendParams:t,on:s}){t({history:{enabled:!1,root:"",replaceState:!1,key:"slides"}});let a=!1,i={};const n=e=>e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),l=e=>{const t=r();let s;s=e?new URL(e):t.location;const a=s.pathname.slice(1).split("/").filter((e=>""!==e)),i=a.length;return{key:a[i-2],value:a[i-1]}},o=(t,s)=>{const i=r();if(!a||!e.params.history.enabled)return;let l;l=e.params.url?new URL(e.params.url):i.location;const o=e.slides.eq(s);let d=n(o.attr("data-history"));if(e.params.history.root.length>0){let s=e.params.history.root;"/"===s[s.length-1]&&(s=s.slice(0,s.length-1)),d=`${s}/${t}/${d}`}else l.pathname.includes(t)||(d=`${t}/${d}`);const p=i.history.state;p&&p.value===d||(e.params.history.replaceState?i.history.replaceState({value:d},null,d):i.history.pushState({value:d},null,d))},d=(t,s,a)=>{if(s)for(let i=0,r=e.slides.length;i<r;i+=1){const r=e.slides.eq(i);if(n(r.attr("data-history"))===s&&!r.hasClass(e.params.slideDuplicateClass)){const s=r.index();e.slideTo(s,t,a)}}else e.slideTo(0,t,a)},p=()=>{i=l(e.params.url),d(e.params.speed,e.paths.value,!1)};s("init",(()=>{e.params.history.enabled&&(()=>{const t=r();if(e.params.history){if(!t.history||!t.history.pushState)return e.params.history.enabled=!1,void(e.params.hashNavigation.enabled=!0);a=!0,i=l(e.params.url),(i.key||i.value)&&(d(0,i.value,e.params.runCallbacksOnInit),e.params.history.replaceState||t.addEventListener("popstate",p))}})()})),s("destroy",(()=>{e.params.history.enabled&&(()=>{const t=r();e.params.history.replaceState||t.removeEventListener("popstate",p)})()})),s("transitionEnd _freeModeNoMomentumRelease",(()=>{a&&o(e.params.history.key,e.activeIndex)})),s("slideChange",(()=>{a&&e.params.cssMode&&o(e.params.history.key,e.activeIndex)}))},function({swiper:e,extendParams:t,emit:s,on:i}){let n=!1;const l=a(),o=r();t({hashNavigation:{enabled:!1,replaceState:!1,watchState:!1}});const p=()=>{s("hashChange");const t=l.location.hash.replace("#","");if(t!==e.slides.eq(e.activeIndex).attr("data-hash")){const s=e.$wrapperEl.children(`.${e.params.slideClass}[data-hash="${t}"]`).index();if(void 0===s)return;e.slideTo(s)}},c=()=>{if(n&&e.params.hashNavigation.enabled)if(e.params.hashNavigation.replaceState&&o.history&&o.history.replaceState)o.history.replaceState(null,null,`#${e.slides.eq(e.activeIndex).attr("data-hash")}`||""),s("hashSet");else{const t=e.slides.eq(e.activeIndex),a=t.attr("data-hash")||t.attr("data-history");l.location.hash=a||"",s("hashSet")}};i("init",(()=>{e.params.hashNavigation.enabled&&(()=>{if(!e.params.hashNavigation.enabled||e.params.history&&e.params.history.enabled)return;n=!0;const t=l.location.hash.replace("#","");if(t){const s=0;for(let a=0,i=e.slides.length;a<i;a+=1){const i=e.slides.eq(a);if((i.attr("data-hash")||i.attr("data-history"))===t&&!i.hasClass(e.params.slideDuplicateClass)){const t=i.index();e.slideTo(t,s,e.params.runCallbacksOnInit,!0)}}}e.params.hashNavigation.watchState&&d(o).on("hashchange",p)})()})),i("destroy",(()=>{e.params.hashNavigation.enabled&&e.params.hashNavigation.watchState&&d(o).off("hashchange",p)})),i("transitionEnd _freeModeNoMomentumRelease",(()=>{n&&c()})),i("slideChange",(()=>{n&&e.params.cssMode&&c()}))},function({swiper:e,extendParams:t,on:s,emit:i}){let r;function n(){const t=e.slides.eq(e.activeIndex);let s=e.params.autoplay.delay;t.attr("data-swiper-autoplay")&&(s=t.attr("data-swiper-autoplay")||e.params.autoplay.delay),clearTimeout(r),r=c((()=>{let t;e.params.autoplay.reverseDirection?e.params.loop?(e.loopFix(),t=e.slidePrev(e.params.speed,!0,!0),i("autoplay")):e.isBeginning?e.params.autoplay.stopOnLastSlide?o():(t=e.slideTo(e.slides.length-1,e.params.speed,!0,!0),i("autoplay")):(t=e.slidePrev(e.params.speed,!0,!0),i("autoplay")):e.params.loop?(e.loopFix(),t=e.slideNext(e.params.speed,!0,!0),i("autoplay")):e.isEnd?e.params.autoplay.stopOnLastSlide?o():(t=e.slideTo(0,e.params.speed,!0,!0),i("autoplay")):(t=e.slideNext(e.params.speed,!0,!0),i("autoplay")),(e.params.cssMode&&e.autoplay.running||!1===t)&&n()}),s)}function l(){return void 0===r&&(!e.autoplay.running&&(e.autoplay.running=!0,i("autoplayStart"),n(),!0))}function o(){return!!e.autoplay.running&&(void 0!==r&&(r&&(clearTimeout(r),r=void 0),e.autoplay.running=!1,i("autoplayStop"),!0))}function d(t){e.autoplay.running&&(e.autoplay.paused||(r&&clearTimeout(r),e.autoplay.paused=!0,0!==t&&e.params.autoplay.waitForTransition?["transitionend","webkitTransitionEnd"].forEach((t=>{e.$wrapperEl[0].addEventListener(t,u)})):(e.autoplay.paused=!1,n())))}function p(){const t=a();"hidden"===t.visibilityState&&e.autoplay.running&&d(),"visible"===t.visibilityState&&e.autoplay.paused&&(n(),e.autoplay.paused=!1)}function u(t){e&&!e.destroyed&&e.$wrapperEl&&t.target===e.$wrapperEl[0]&&(["transitionend","webkitTransitionEnd"].forEach((t=>{e.$wrapperEl[0].removeEventListener(t,u)})),e.autoplay.paused=!1,e.autoplay.running?n():o())}function h(){e.params.autoplay.disableOnInteraction?o():d(),["transitionend","webkitTransitionEnd"].forEach((t=>{e.$wrapperEl[0].removeEventListener(t,u)}))}function m(){e.params.autoplay.disableOnInteraction||(e.autoplay.paused=!1,n())}e.autoplay={running:!1,paused:!1},t({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}}),s("init",(()=>{if(e.params.autoplay.enabled){l();a().addEventListener("visibilitychange",p),e.params.autoplay.pauseOnMouseEnter&&(e.$el.on("mouseenter",h),e.$el.on("mouseleave",m))}})),s("beforeTransitionStart",((t,s,a)=>{e.autoplay.running&&(a||!e.params.autoplay.disableOnInteraction?e.autoplay.pause(s):o())})),s("sliderFirstMove",(()=>{e.autoplay.running&&(e.params.autoplay.disableOnInteraction?o():d())})),s("touchEnd",(()=>{e.params.cssMode&&e.autoplay.paused&&!e.params.autoplay.disableOnInteraction&&n()})),s("destroy",(()=>{e.$el.off("mouseenter",h),e.$el.off("mouseleave",m),e.autoplay.running&&o();a().removeEventListener("visibilitychange",p)})),Object.assign(e.autoplay,{pause:d,run:n,start:l,stop:o})},function({swiper:e,extendParams:t,on:s}){t({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let a=!1,i=!1;function r(){const t=e.thumbs.swiper;if(!t)return;const s=t.clickedIndex,a=t.clickedSlide;if(a&&d(a).hasClass(e.params.thumbs.slideThumbActiveClass))return;if(null==s)return;let i;if(i=t.params.loop?parseInt(d(t.clickedSlide).attr("data-swiper-slide-index"),10):s,e.params.loop){let t=e.activeIndex;e.slides.eq(t).hasClass(e.params.slideDuplicateClass)&&(e.loopFix(),e._clientLeft=e.$wrapperEl[0].clientLeft,t=e.activeIndex);const s=e.slides.eq(t).prevAll(`[data-swiper-slide-index="${i}"]`).eq(0).index(),a=e.slides.eq(t).nextAll(`[data-swiper-slide-index="${i}"]`).eq(0).index();i=void 0===s?a:void 0===a?s:a-t<t-s?a:s}e.slideTo(i)}function n(){const{thumbs:t}=e.params;if(a)return!1;a=!0;const s=e.constructor;if(t.swiper instanceof s)e.thumbs.swiper=t.swiper,Object.assign(e.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(e.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1});else if(m(t.swiper)){const a=Object.assign({},t.swiper);Object.assign(a,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper=new s(a),i=!0}return e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),e.thumbs.swiper.on("tap",r),!0}function l(t){const s=e.thumbs.swiper;if(!s)return;const a="auto"===s.params.slidesPerView?s.slidesPerViewDynamic():s.params.slidesPerView,i=e.params.thumbs.autoScrollOffset,r=i&&!s.params.loop;if(e.realIndex!==s.realIndex||r){let n,l,o=s.activeIndex;if(s.params.loop){s.slides.eq(o).hasClass(s.params.slideDuplicateClass)&&(s.loopFix(),s._clientLeft=s.$wrapperEl[0].clientLeft,o=s.activeIndex);const t=s.slides.eq(o).prevAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index(),a=s.slides.eq(o).nextAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index();n=void 0===t?a:void 0===a?t:a-o==o-t?s.params.slidesPerGroup>1?a:o:a-o<o-t?a:t,l=e.activeIndex>e.previousIndex?"next":"prev"}else n=e.realIndex,l=n>e.previousIndex?"next":"prev";r&&(n+="next"===l?i:-1*i),s.visibleSlidesIndexes&&s.visibleSlidesIndexes.indexOf(n)<0&&(s.params.centeredSlides?n=n>o?n-Math.floor(a/2)+1:n+Math.floor(a/2)-1:n>o&&s.params.slidesPerGroup,s.slideTo(n,t?0:void 0))}let n=1;const l=e.params.thumbs.slideThumbActiveClass;if(e.params.slidesPerView>1&&!e.params.centeredSlides&&(n=e.params.slidesPerView),e.params.thumbs.multipleActiveThumbs||(n=1),n=Math.floor(n),s.slides.removeClass(l),s.params.loop||s.params.virtual&&s.params.virtual.enabled)for(let t=0;t<n;t+=1)s.$wrapperEl.children(`[data-swiper-slide-index="${e.realIndex+t}"]`).addClass(l);else for(let t=0;t<n;t+=1)s.slides.eq(e.realIndex+t).addClass(l)}e.thumbs={swiper:null},s("beforeInit",(()=>{const{thumbs:t}=e.params;t&&t.swiper&&(n(),l(!0))})),s("slideChange update resize observerUpdate",(()=>{e.thumbs.swiper&&l()})),s("setTransition",((t,s)=>{const a=e.thumbs.swiper;a&&a.setTransition(s)})),s("beforeDestroy",(()=>{const t=e.thumbs.swiper;t&&i&&t&&t.destroy()})),Object.assign(e.thumbs,{init:n,update:l})},function({swiper:e,extendParams:t,emit:s,once:a}){t({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}}),Object.assign(e,{freeMode:{onTouchMove:function(){const{touchEventsData:t,touches:s}=e;0===t.velocities.length&&t.velocities.push({position:s[e.isHorizontal()?"startX":"startY"],time:t.touchStartTime}),t.velocities.push({position:s[e.isHorizontal()?"currentX":"currentY"],time:u()})},onTouchEnd:function({currentPos:t}){const{params:i,$wrapperEl:r,rtlTranslate:n,snapGrid:l,touchEventsData:o}=e,d=u()-o.touchStartTime;if(t<-e.minTranslate())e.slideTo(e.activeIndex);else if(t>-e.maxTranslate())e.slides.length<l.length?e.slideTo(l.length-1):e.slideTo(e.slides.length-1);else{if(i.freeMode.momentum){if(o.velocities.length>1){const t=o.velocities.pop(),s=o.velocities.pop(),a=t.position-s.position,r=t.time-s.time;e.velocity=a/r,e.velocity/=2,Math.abs(e.velocity)<i.freeMode.minimumVelocity&&(e.velocity=0),(r>150||u()-t.time>300)&&(e.velocity=0)}else e.velocity=0;e.velocity*=i.freeMode.momentumVelocityRatio,o.velocities.length=0;let t=1e3*i.freeMode.momentumRatio;const d=e.velocity*t;let p=e.translate+d;n&&(p=-p);let c,h=!1;const m=20*Math.abs(e.velocity)*i.freeMode.momentumBounceRatio;let f;if(p<e.maxTranslate())i.freeMode.momentumBounce?(p+e.maxTranslate()<-m&&(p=e.maxTranslate()-m),c=e.maxTranslate(),h=!0,o.allowMomentumBounce=!0):p=e.maxTranslate(),i.loop&&i.centeredSlides&&(f=!0);else if(p>e.minTranslate())i.freeMode.momentumBounce?(p-e.minTranslate()>m&&(p=e.minTranslate()+m),c=e.minTranslate(),h=!0,o.allowMomentumBounce=!0):p=e.minTranslate(),i.loop&&i.centeredSlides&&(f=!0);else if(i.freeMode.sticky){let t;for(let e=0;e<l.length;e+=1)if(l[e]>-p){t=e;break}p=Math.abs(l[t]-p)<Math.abs(l[t-1]-p)||"next"===e.swipeDirection?l[t]:l[t-1],p=-p}if(f&&a("transitionEnd",(()=>{e.loopFix()})),0!==e.velocity){if(t=n?Math.abs((-p-e.translate)/e.velocity):Math.abs((p-e.translate)/e.velocity),i.freeMode.sticky){const s=Math.abs((n?-p:p)-e.translate),a=e.slidesSizesGrid[e.activeIndex];t=s<a?i.speed:s<2*a?1.5*i.speed:2.5*i.speed}}else if(i.freeMode.sticky)return void e.slideToClosest();i.freeMode.momentumBounce&&h?(e.updateProgress(c),e.setTransition(t),e.setTranslate(p),e.transitionStart(!0,e.swipeDirection),e.animating=!0,r.transitionEnd((()=>{e&&!e.destroyed&&o.allowMomentumBounce&&(s("momentumBounce"),e.setTransition(i.speed),setTimeout((()=>{e.setTranslate(c),r.transitionEnd((()=>{e&&!e.destroyed&&e.transitionEnd()}))}),0))}))):e.velocity?(s("_freeModeNoMomentumRelease"),e.updateProgress(p),e.setTransition(t),e.setTranslate(p),e.transitionStart(!0,e.swipeDirection),e.animating||(e.animating=!0,r.transitionEnd((()=>{e&&!e.destroyed&&e.transitionEnd()})))):e.updateProgress(p),e.updateActiveIndex(),e.updateSlidesClasses()}else{if(i.freeMode.sticky)return void e.slideToClosest();i.freeMode&&s("_freeModeNoMomentumRelease")}(!i.freeMode.momentum||d>=i.longSwipesMs)&&(e.updateProgress(),e.updateActiveIndex(),e.updateSlidesClasses())}}}})},function({swiper:e,extendParams:t}){let s,a,i;t({grid:{rows:1,fill:"column"}}),e.grid={initSlides:t=>{const{slidesPerView:r}=e.params,{rows:n,fill:l}=e.params.grid;a=s/n,i=Math.floor(t/n),s=Math.floor(t/n)===t/n?t:Math.ceil(t/n)*n,"auto"!==r&&"row"===l&&(s=Math.max(s,r*n))},updateSlide:(t,r,n,l)=>{const{slidesPerGroup:o,spaceBetween:d}=e.params,{rows:p,fill:c}=e.params.grid;let u,h,m;if("row"===c&&o>1){const e=Math.floor(t/(o*p)),a=t-p*o*e,i=0===e?o:Math.min(Math.ceil((n-e*p*o)/p),o);m=Math.floor(a/i),h=a-m*i+e*o,u=h+m*s/p,r.css({"-webkit-order":u,order:u})}else"column"===c?(h=Math.floor(t/p),m=t-h*p,(h>i||h===i&&m===p-1)&&(m+=1,m>=p&&(m=0,h+=1))):(m=Math.floor(t/a),h=t-m*a);r.css(l("margin-top"),0!==m?d&&`${d}px`:"")},updateWrapperSize:(t,a,i)=>{const{spaceBetween:r,centeredSlides:n,roundLengths:l}=e.params,{rows:o}=e.params.grid;if(e.virtualSize=(t+r)*s,e.virtualSize=Math.ceil(e.virtualSize/o)-r,e.$wrapperEl.css({[i("width")]:`${e.virtualSize+r}px`}),n){a.splice(0,a.length);const t=[];for(let s=0;s<a.length;s+=1){let i=a[s];l&&(i=Math.floor(i)),a[s]<e.virtualSize+a[0]&&t.push(i)}a.push(...t)}}}},function({swiper:e}){Object.assign(e,{appendSlide:R.bind(e),prependSlide:j.bind(e),addSlide:_.bind(e),removeSlide:V.bind(e),removeAllSlides:q.bind(e)})},function({swiper:e,extendParams:t,on:s}){t({fadeEffect:{crossFade:!1,transformEl:null}}),F({effect:"fade",swiper:e,on:s,setTranslate:()=>{const{slides:t}=e,s=e.params.fadeEffect;for(let a=0;a<t.length;a+=1){const t=e.slides.eq(a);let i=-t[0].swiperSlideOffset;e.params.virtualTranslate||(i-=e.translate);let r=0;e.isHorizontal()||(r=i,i=0);const n=e.params.fadeEffect.crossFade?Math.max(1-Math.abs(t[0].progress),0):1+Math.min(Math.max(t[0].progress,-1),0);U(s,t).css({opacity:n}).transform(`translate3d(${i}px, ${r}px, 0px)`)}},setTransition:t=>{const{transformEl:s}=e.params.fadeEffect;(s?e.slides.find(s):e.slides).transition(t),K({swiper:e,duration:t,transformEl:s,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!e.params.cssMode})})},function({swiper:e,extendParams:t,on:s}){t({cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}}),F({effect:"cube",swiper:e,on:s,setTranslate:()=>{const{$el:t,$wrapperEl:s,slides:a,width:i,height:r,rtlTranslate:n,size:l,browser:o}=e,p=e.params.cubeEffect,c=e.isHorizontal(),u=e.virtual&&e.params.virtual.enabled;let h,m=0;p.shadow&&(c?(h=s.find(".swiper-cube-shadow"),0===h.length&&(h=d('<div class="swiper-cube-shadow"></div>'),s.append(h)),h.css({height:`${i}px`})):(h=t.find(".swiper-cube-shadow"),0===h.length&&(h=d('<div class="swiper-cube-shadow"></div>'),t.append(h))));for(let e=0;e<a.length;e+=1){const t=a.eq(e);let s=e;u&&(s=parseInt(t.attr("data-swiper-slide-index"),10));let i=90*s,r=Math.floor(i/360);n&&(i=-i,r=Math.floor(-i/360));const o=Math.max(Math.min(t[0].progress,1),-1);let h=0,f=0,g=0;s%4==0?(h=4*-r*l,g=0):(s-1)%4==0?(h=0,g=4*-r*l):(s-2)%4==0?(h=l+4*r*l,g=l):(s-3)%4==0&&(h=-l,g=3*l+4*l*r),n&&(h=-h),c||(f=h,h=0);const v=`rotateX(${c?0:-i}deg) rotateY(${c?i:0}deg) translate3d(${h}px, ${f}px, ${g}px)`;if(o<=1&&o>-1&&(m=90*s+90*o,n&&(m=90*-s-90*o)),t.transform(v),p.slideShadows){let e=c?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),s=c?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===e.length&&(e=d(`<div class="swiper-slide-shadow-${c?"left":"top"}"></div>`),t.append(e)),0===s.length&&(s=d(`<div class="swiper-slide-shadow-${c?"right":"bottom"}"></div>`),t.append(s)),e.length&&(e[0].style.opacity=Math.max(-o,0)),s.length&&(s[0].style.opacity=Math.max(o,0))}}if(s.css({"-webkit-transform-origin":`50% 50% -${l/2}px`,"transform-origin":`50% 50% -${l/2}px`}),p.shadow)if(c)h.transform(`translate3d(0px, ${i/2+p.shadowOffset}px, ${-i/2}px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`);else{const e=Math.abs(m)-90*Math.floor(Math.abs(m)/90),t=1.5-(Math.sin(2*e*Math.PI/360)/2+Math.cos(2*e*Math.PI/360)/2),s=p.shadowScale,a=p.shadowScale/t,i=p.shadowOffset;h.transform(`scale3d(${s}, 1, ${a}) translate3d(0px, ${r/2+i}px, ${-r/2/a}px) rotateX(-90deg)`)}const f=o.isSafari||o.isWebView?-l/2:0;s.transform(`translate3d(0px,0,${f}px) rotateX(${e.isHorizontal()?0:m}deg) rotateY(${e.isHorizontal()?-m:0}deg)`)},setTransition:t=>{const{$el:s,slides:a}=e;a.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t),e.params.cubeEffect.shadow&&!e.isHorizontal()&&s.find(".swiper-cube-shadow").transition(t)},perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0})})},function({swiper:e,extendParams:t,on:s}){t({flipEffect:{slideShadows:!0,limitRotation:!0,transformEl:null}}),F({effect:"flip",swiper:e,on:s,setTranslate:()=>{const{slides:t,rtlTranslate:s}=e,a=e.params.flipEffect;for(let i=0;i<t.length;i+=1){const r=t.eq(i);let n=r[0].progress;e.params.flipEffect.limitRotation&&(n=Math.max(Math.min(r[0].progress,1),-1));const l=r[0].swiperSlideOffset;let o=-180*n,d=0,p=e.params.cssMode?-l-e.translate:-l,c=0;if(e.isHorizontal()?s&&(o=-o):(c=p,p=0,d=-o,o=0),r[0].style.zIndex=-Math.abs(Math.round(n))+t.length,a.slideShadows){let t=e.isHorizontal()?r.find(".swiper-slide-shadow-left"):r.find(".swiper-slide-shadow-top"),s=e.isHorizontal()?r.find(".swiper-slide-shadow-right"):r.find(".swiper-slide-shadow-bottom");0===t.length&&(t=Z(a,r,e.isHorizontal()?"left":"top")),0===s.length&&(s=Z(a,r,e.isHorizontal()?"right":"bottom")),t.length&&(t[0].style.opacity=Math.max(-n,0)),s.length&&(s[0].style.opacity=Math.max(n,0))}const u=`translate3d(${p}px, ${c}px, 0px) rotateX(${d}deg) rotateY(${o}deg)`;U(a,r).transform(u)}},setTransition:t=>{const{transformEl:s}=e.params.flipEffect;(s?e.slides.find(s):e.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t),K({swiper:e,duration:t,transformEl:s})},perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!e.params.cssMode})})},function({swiper:e,extendParams:t,on:s}){t({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0,transformEl:null}}),F({effect:"coverflow",swiper:e,on:s,setTranslate:()=>{const{width:t,height:s,slides:a,slidesSizesGrid:i}=e,r=e.params.coverflowEffect,n=e.isHorizontal(),l=e.translate,o=n?t/2-l:s/2-l,d=n?r.rotate:-r.rotate,p=r.depth;for(let e=0,t=a.length;e<t;e+=1){const t=a.eq(e),s=i[e],l=(o-t[0].swiperSlideOffset-s/2)/s*r.modifier;let c=n?d*l:0,u=n?0:d*l,h=-p*Math.abs(l),m=r.stretch;"string"==typeof m&&-1!==m.indexOf("%")&&(m=parseFloat(r.stretch)/100*s);let f=n?0:m*l,g=n?m*l:0,v=1-(1-r.scale)*Math.abs(l);Math.abs(g)<.001&&(g=0),Math.abs(f)<.001&&(f=0),Math.abs(h)<.001&&(h=0),Math.abs(c)<.001&&(c=0),Math.abs(u)<.001&&(u=0),Math.abs(v)<.001&&(v=0);const w=`translate3d(${g}px,${f}px,${h}px)  rotateX(${u}deg) rotateY(${c}deg) scale(${v})`;if(U(r,t).transform(w),t[0].style.zIndex=1-Math.abs(Math.round(l)),r.slideShadows){let e=n?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),s=n?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===e.length&&(e=Z(r,t,n?"left":"top")),0===s.length&&(s=Z(r,t,n?"right":"bottom")),e.length&&(e[0].style.opacity=l>0?l:0),s.length&&(s[0].style.opacity=-l>0?-l:0)}}},setTransition:t=>{const{transformEl:s}=e.params.coverflowEffect;(s?e.slides.find(s):e.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t)},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})},function({swiper:e,extendParams:t,on:s}){t({creativeEffect:{transformEl:null,limitProgress:1,shadowPerProgress:!1,progressMultiplier:1,perspective:!0,prev:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1},next:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1}}});const a=e=>"string"==typeof e?e:`${e}px`;F({effect:"creative",swiper:e,on:s,setTranslate:()=>{const{slides:t,$wrapperEl:s,slidesSizesGrid:i}=e,r=e.params.creativeEffect,{progressMultiplier:n}=r,l=e.params.centeredSlides;if(l){const t=i[0]/2-e.params.slidesOffsetBefore||0;s.transform(`translateX(calc(50% - ${t}px))`)}for(let s=0;s<t.length;s+=1){const i=t.eq(s),o=i[0].progress,d=Math.min(Math.max(i[0].progress,-r.limitProgress),r.limitProgress);let p=d;l||(p=Math.min(Math.max(i[0].originalProgress,-r.limitProgress),r.limitProgress));const c=i[0].swiperSlideOffset,u=[e.params.cssMode?-c-e.translate:-c,0,0],h=[0,0,0];let m=!1;e.isHorizontal()||(u[1]=u[0],u[0]=0);let f={translate:[0,0,0],rotate:[0,0,0],scale:1,opacity:1};d<0?(f=r.next,m=!0):d>0&&(f=r.prev,m=!0),u.forEach(((e,t)=>{u[t]=`calc(${e}px + (${a(f.translate[t])} * ${Math.abs(d*n)}))`})),h.forEach(((e,t)=>{h[t]=f.rotate[t]*Math.abs(d*n)})),i[0].style.zIndex=-Math.abs(Math.round(o))+t.length;const g=u.join(", "),v=`rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,w=p<0?`scale(${1+(1-f.scale)*p*n})`:`scale(${1-(1-f.scale)*p*n})`,b=p<0?1+(1-f.opacity)*p*n:1-(1-f.opacity)*p*n,x=`translate3d(${g}) ${v} ${w}`;if(m&&f.shadow||!m){let e=i.children(".swiper-slide-shadow");if(0===e.length&&f.shadow&&(e=Z(r,i)),e.length){const t=r.shadowPerProgress?d*(1/r.limitProgress):d;e[0].style.opacity=Math.min(Math.max(Math.abs(t),0),1)}}const y=U(r,i);y.transform(x).css({opacity:b}),f.origin&&y.css("transform-origin",f.origin)}},setTransition:t=>{const{transformEl:s}=e.params.creativeEffect;(s?e.slides.find(s):e.slides).transition(t).find(".swiper-slide-shadow").transition(t),K({swiper:e,duration:t,transformEl:s,allSlides:!0})},perspective:()=>e.params.creativeEffect.perspective,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!e.params.cssMode})})},function({swiper:e,extendParams:t,on:s}){t({cardsEffect:{slideShadows:!0,transformEl:null}}),F({effect:"cards",swiper:e,on:s,setTranslate:()=>{const{slides:t,activeIndex:s}=e,a=e.params.cardsEffect,{startTranslate:i,isTouched:r}=e.touchEventsData,n=e.translate;for(let l=0;l<t.length;l+=1){const o=t.eq(l),d=o[0].progress,p=Math.min(Math.max(d,-4),4);let c=o[0].swiperSlideOffset;e.params.centeredSlides&&!e.params.cssMode&&e.$wrapperEl.transform(`translateX(${e.minTranslate()}px)`),e.params.centeredSlides&&e.params.cssMode&&(c-=t[0].swiperSlideOffset);let u=e.params.cssMode?-c-e.translate:-c,h=0;const m=-100*Math.abs(p);let f=1,g=-2*p,v=8-.75*Math.abs(p);const w=(l===s||l===s-1)&&p>0&&p<1&&(r||e.params.cssMode)&&n<i,b=(l===s||l===s+1)&&p<0&&p>-1&&(r||e.params.cssMode)&&n>i;if(w||b){const e=(1-Math.abs((Math.abs(p)-.5)/.5))**.5;g+=-28*p*e,f+=-.5*e,v+=96*e,h=-25*e*Math.abs(p)+"%"}if(u=p<0?`calc(${u}px + (${v*Math.abs(p)}%))`:p>0?`calc(${u}px + (-${v*Math.abs(p)}%))`:`${u}px`,!e.isHorizontal()){const e=h;h=u,u=e}const x=`\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${g}deg)\n        scale(${p<0?""+(1+(1-f)*p):""+(1-(1-f)*p)})\n      `;if(a.slideShadows){let e=o.find(".swiper-slide-shadow");0===e.length&&(e=Z(a,o)),e.length&&(e[0].style.opacity=Math.min(Math.max((Math.abs(p)-.5)/.5,0),1))}o[0].style.zIndex=-Math.abs(Math.round(d))+t.length;U(a,o).transform(x)}},setTransition:t=>{const{transformEl:s}=e.params.cardsEffect;(s?e.slides.find(s):e.slides).transition(t).find(".swiper-slide-shadow").transition(t),K({swiper:e,duration:t,transformEl:s})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!e.params.cssMode})})}];return H.use(J),H}));
//# sourceMappingURL=swiper-bundle.min.js.map
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Sweetalert2=t()}(this,function(){"use strict";const t="SweetAlert2:",o=e=>e.charAt(0).toUpperCase()+e.slice(1),a=e=>Array.prototype.slice.call(e),r=e=>{console.warn("".concat(t," ").concat("object"==typeof e?e.join(" "):e))},s=e=>{console.error("".concat(t," ").concat(e))},n=[],i=(e,t)=>{t='"'.concat(e,'" is deprecated and will be removed in the next major release. Please use "').concat(t,'" instead.'),n.includes(t)||(n.push(t),r(t))},c=e=>"function"==typeof e?e():e,l=e=>e&&"function"==typeof e.toPromise,u=e=>l(e)?e.toPromise():Promise.resolve(e),d=e=>e&&Promise.resolve(e)===e,p={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0},m=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],g={},h=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],f=e=>Object.prototype.hasOwnProperty.call(p,e),b=e=>-1!==m.indexOf(e),y=e=>g[e],v=e=>{!e.backdrop&&e.allowOutsideClick&&r('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');for(const o in e)n=o,f(n)||r('Unknown parameter "'.concat(n,'"')),e.toast&&(t=o,h.includes(t)&&r('The parameter "'.concat(t,'" is incompatible with toasts'))),t=o,y(t)&&i(t,y(t));var t,n};var e=e=>{const t={};for(const n in e)t[e[n]]="swal2-"+e[n];return t};const w=e(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error"]),C=e(["success","warning","info","question","error"]),A=()=>document.body.querySelector(".".concat(w.container)),k=e=>{const t=A();return t?t.querySelector(e):null},B=e=>k(".".concat(e)),P=()=>B(w.popup),x=()=>B(w.icon),E=()=>B(w.title),S=()=>B(w["html-container"]),T=()=>B(w.image),L=()=>B(w["progress-steps"]),O=()=>B(w["validation-message"]),j=()=>k(".".concat(w.actions," .").concat(w.confirm)),M=()=>k(".".concat(w.actions," .").concat(w.deny));const D=()=>k(".".concat(w.loader)),H=()=>k(".".concat(w.actions," .").concat(w.cancel)),I=()=>B(w.actions),q=()=>B(w.footer),V=()=>B(w["timer-progress-bar"]),N=()=>B(w.close),F=()=>{const e=a(P().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((e,t)=>(e=parseInt(e.getAttribute("tabindex")),(t=parseInt(t.getAttribute("tabindex")))<e?1:e<t?-1:0));var t=a(P().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(e=>"-1"!==e.getAttribute("tabindex"));return(t=>{const n=[];for(let e=0;e<t.length;e++)-1===n.indexOf(t[e])&&n.push(t[e]);return n})(e.concat(t)).filter(e=>ae(e))},R=()=>!K(document.body,w["toast-shown"])&&!K(document.body,w["no-backdrop"]),U=()=>P()&&K(P(),w.toast);function z(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];const n=V();ae(n)&&(t&&(n.style.transition="none",n.style.width="100%"),setTimeout(()=>{n.style.transition="width ".concat(e/1e3,"s linear"),n.style.width="0%"},10))}const W={previousBodyPadding:null},_=(t,e)=>{if(t.textContent="",e){const n=new DOMParser,o=n.parseFromString(e,"text/html");a(o.querySelector("head").childNodes).forEach(e=>{t.appendChild(e)}),a(o.querySelector("body").childNodes).forEach(e=>{t.appendChild(e)})}},K=(t,e)=>{if(!e)return!1;var n=e.split(/\s+/);for(let e=0;e<n.length;e++)if(!t.classList.contains(n[e]))return!1;return!0},Y=(e,t,n)=>{var o,i;if(o=e,i=t,a(o.classList).forEach(e=>{Object.values(w).includes(e)||Object.values(C).includes(e)||Object.values(i.showClass).includes(e)||o.classList.remove(e)}),t.customClass&&t.customClass[n]){if("string"!=typeof t.customClass[n]&&!t.customClass[n].forEach)return r("Invalid type of customClass.".concat(n,'! Expected string or iterable object, got "').concat(typeof t.customClass[n],'"'));$(e,t.customClass[n])}},Z=(e,t)=>{if(!t)return null;switch(t){case"select":case"textarea":case"file":return e.querySelector(".".concat(w.popup," > .").concat(w[t]));case"checkbox":return e.querySelector(".".concat(w.popup," > .").concat(w.checkbox," input"));case"radio":return e.querySelector(".".concat(w.popup," > .").concat(w.radio," input:checked"))||e.querySelector(".".concat(w.popup," > .").concat(w.radio," input:first-child"));case"range":return e.querySelector(".".concat(w.popup," > .").concat(w.range," input"));default:return e.querySelector(".".concat(w.popup," > .").concat(w.input))}},J=e=>{var t;e.focus(),"file"!==e.type&&(t=e.value,e.value="",e.value=t)},X=(e,t,n)=>{e&&t&&(t="string"==typeof t?t.split(/\s+/).filter(Boolean):t).forEach(t=>{Array.isArray(e)?e.forEach(e=>{n?e.classList.add(t):e.classList.remove(t)}):n?e.classList.add(t):e.classList.remove(t)})},$=(e,t)=>{X(e,t,!0)},G=(e,t)=>{X(e,t,!1)},Q=(e,t)=>{var n=a(e.childNodes);for(let e=0;e<n.length;e++)if(K(n[e],t))return n[e]},ee=(e,t,n)=>{(n=n==="".concat(parseInt(n))?parseInt(n):n)||0===parseInt(n)?e.style[t]="number"==typeof n?"".concat(n,"px"):n:e.style.removeProperty(t)},te=function(e){e.style.display=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"flex"},ne=e=>{e.style.display="none"},oe=(e,t,n,o)=>{const i=e.querySelector(t);i&&(i.style[n]=o)},ie=(e,t,n)=>{t?te(e,n):ne(e)},ae=e=>!(!e||!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),re=()=>!ae(j())&&!ae(M())&&!ae(H()),se=e=>!!(e.scrollHeight>e.clientHeight),ce=e=>{const t=window.getComputedStyle(e);var n=parseFloat(t.getPropertyValue("animation-duration")||"0"),e=parseFloat(t.getPropertyValue("transition-duration")||"0");return 0<n||0<e},le=()=>"undefined"==typeof window||"undefined"==typeof document,ue=100,de={},pe=()=>{de.previousActiveElement&&de.previousActiveElement.focus?(de.previousActiveElement.focus(),de.previousActiveElement=null):document.body&&document.body.focus()},me=o=>new Promise(e=>{if(!o)return e();var t=window.scrollX,n=window.scrollY;de.restoreFocusTimeout=setTimeout(()=>{pe(),e()},ue),window.scrollTo(t,n)}),ge='\n <div aria-labelledby="'.concat(w.title,'" aria-describedby="').concat(w["html-container"],'" class="').concat(w.popup,'" tabindex="-1">\n   <button type="button" class="').concat(w.close,'"></button>\n   <ul class="').concat(w["progress-steps"],'"></ul>\n   <div class="').concat(w.icon,'"></div>\n   <img class="').concat(w.image,'" />\n   <h2 class="').concat(w.title,'" id="').concat(w.title,'"></h2>\n   <div class="').concat(w["html-container"],'" id="').concat(w["html-container"],'"></div>\n   <input class="').concat(w.input,'" />\n   <input type="file" class="').concat(w.file,'" />\n   <div class="').concat(w.range,'">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(w.select,'"></select>\n   <div class="').concat(w.radio,'"></div>\n   <label for="').concat(w.checkbox,'" class="').concat(w.checkbox,'">\n     <input type="checkbox" />\n     <span class="').concat(w.label,'"></span>\n   </label>\n   <textarea class="').concat(w.textarea,'"></textarea>\n   <div class="').concat(w["validation-message"],'" id="').concat(w["validation-message"],'"></div>\n   <div class="').concat(w.actions,'">\n     <div class="').concat(w.loader,'"></div>\n     <button type="button" class="').concat(w.confirm,'"></button>\n     <button type="button" class="').concat(w.deny,'"></button>\n     <button type="button" class="').concat(w.cancel,'"></button>\n   </div>\n   <div class="').concat(w.footer,'"></div>\n   <div class="').concat(w["timer-progress-bar-container"],'">\n     <div class="').concat(w["timer-progress-bar"],'"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),he=()=>{const e=A();return!!e&&(e.remove(),G([document.documentElement,document.body],[w["no-backdrop"],w["toast-shown"],w["has-column"]]),!0)},fe=()=>{de.currentInstance.resetValidationMessage()},be=()=>{const e=P(),t=Q(e,w.input),n=Q(e,w.file),o=e.querySelector(".".concat(w.range," input")),i=e.querySelector(".".concat(w.range," output")),a=Q(e,w.select),r=e.querySelector(".".concat(w.checkbox," input")),s=Q(e,w.textarea);t.oninput=fe,n.onchange=fe,a.onchange=fe,r.onchange=fe,s.oninput=fe,o.oninput=()=>{fe(),i.value=o.value},o.onchange=()=>{fe(),o.nextSibling.value=o.value}},ye=e=>"string"==typeof e?document.querySelector(e):e,ve=e=>{const t=P();t.setAttribute("role",e.toast?"alert":"dialog"),t.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||t.setAttribute("aria-modal","true")},we=e=>{"rtl"===window.getComputedStyle(e).direction&&$(A(),w.rtl)},Ce=(e,t)=>{e instanceof HTMLElement?t.appendChild(e):"object"==typeof e?((e,t)=>{if(e.jquery)Ae(t,e);else _(t,e.toString())})(e,t):e&&_(t,e)},Ae=(t,n)=>{if(t.textContent="",0 in n)for(let e=0;e in n;e++)t.appendChild(n[e].cloneNode(!0));else t.appendChild(n.cloneNode(!0))},ke=(()=>{if(le())return!1;var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&void 0!==e.style[n])return t[n];return!1})(),Be=(e,t)=>{var n,o,i,a,r,s=I(),c=D();(t.showConfirmButton||t.showDenyButton||t.showCancelButton?te:ne)(s),Y(s,t,"actions"),n=s,o=c,i=t,a=j(),r=M(),s=H(),Pe(a,"confirm",i),Pe(r,"deny",i),Pe(s,"cancel",i),function(e,t,n,o){if(!o.buttonsStyling)return G([e,t,n],w.styled);$([e,t,n],w.styled),o.confirmButtonColor&&(e.style.backgroundColor=o.confirmButtonColor,$(e,w["default-outline"]));o.denyButtonColor&&(t.style.backgroundColor=o.denyButtonColor,$(t,w["default-outline"]));o.cancelButtonColor&&(n.style.backgroundColor=o.cancelButtonColor,$(n,w["default-outline"]))}(a,r,s,i),i.reverseButtons&&(i.toast?(n.insertBefore(s,a),n.insertBefore(r,a)):(n.insertBefore(s,o),n.insertBefore(r,o),n.insertBefore(a,o))),_(c,t.loaderHtml),Y(c,t,"loader")};function Pe(e,t,n){ie(e,n["show".concat(o(t),"Button")],"inline-block"),_(e,n["".concat(t,"ButtonText")]),e.setAttribute("aria-label",n["".concat(t,"ButtonAriaLabel")]),e.className=w[t],Y(e,n,"".concat(t,"Button")),$(e,n["".concat(t,"ButtonClass")])}const xe=(e,t)=>{var n,o,i=A();i&&(o=i,"string"==typeof(n=t.backdrop)?o.style.background=n:n||$([document.documentElement,document.body],w["no-backdrop"]),o=i,(n=t.position)in w?$(o,w[n]):(r('The "position" parameter is not valid, defaulting to "center"'),$(o,w.center)),n=i,!(o=t.grow)||"string"!=typeof o||(o="grow-".concat(o))in w&&$(n,w[o]),Y(i,t,"container"))};var Ee={awaitingPromise:new WeakMap,promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap};const Se=["input","file","range","select","radio","checkbox","textarea"],Te=(e,o)=>{const i=P();e=Ee.innerParams.get(e);const a=!e||o.input!==e.input;Se.forEach(e=>{var t=w[e];const n=Q(i,t);((e,t)=>{const n=Z(P(),e);if(n){Le(n);for(const o in t)n.setAttribute(o,t[o])}})(e,o.inputAttributes),n.className=t,a&&ne(n)}),o.input&&(a&&(e=>{if(!De[e.input])return s('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input,'"'));const t=Me(e.input),n=De[e.input](t,e);te(n),setTimeout(()=>{J(n)})})(o),(e=>{const t=Me(e.input);if(e.customClass)$(t,e.customClass.input)})(o))},Le=t=>{for(let e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;["type","value","style"].includes(n)||t.removeAttribute(n)}},Oe=(e,t)=>{e.placeholder&&!t.inputPlaceholder||(e.placeholder=t.inputPlaceholder)},je=(e,t,n)=>{if(n.inputLabel){e.id=w.input;const i=document.createElement("label");var o=w["input-label"];i.setAttribute("for",e.id),i.className=o,$(i,n.customClass.inputLabel),i.innerText=n.inputLabel,t.insertAdjacentElement("beforebegin",i)}},Me=e=>{e=w[e]||w.input;return Q(P(),e)},De={};De.text=De.email=De.password=De.number=De.tel=De.url=(e,t)=>("string"==typeof t.inputValue||"number"==typeof t.inputValue?e.value=t.inputValue:d(t.inputValue)||r('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof t.inputValue,'"')),je(e,e,t),Oe(e,t),e.type=t.input,e),De.file=(e,t)=>(je(e,e,t),Oe(e,t),e),De.range=(e,t)=>{const n=e.querySelector("input"),o=e.querySelector("output");return n.value=t.inputValue,n.type=t.input,o.value=t.inputValue,je(n,e,t),e},De.select=(e,t)=>{if(e.textContent="",t.inputPlaceholder){const n=document.createElement("option");_(n,t.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return je(e,e,t),e},De.radio=e=>(e.textContent="",e),De.checkbox=(e,t)=>{const n=Z(P(),"checkbox");n.value="1",n.id=w.checkbox,n.checked=Boolean(t.inputValue);var o=e.querySelector("span");return _(o,t.inputPlaceholder),e},De.textarea=(n,e)=>{n.value=e.inputValue,Oe(n,e),je(n,n,e);return setTimeout(()=>{if("MutationObserver"in window){const t=parseInt(window.getComputedStyle(P()).width);new MutationObserver(()=>{var e,e=n.offsetWidth+(e=n,parseInt(window.getComputedStyle(e).marginLeft)+parseInt(window.getComputedStyle(e).marginRight));e>t?P().style.width="".concat(e,"px"):P().style.width=null}).observe(n,{attributes:!0,attributeFilter:["style"]})}}),n};const He=(e,t)=>{const n=S();Y(n,t,"htmlContainer"),t.html?(Ce(t.html,n),te(n,"block")):t.text?(n.textContent=t.text,te(n,"block")):ne(n),Te(e,t)},Ie=(e,t)=>{var n=q();ie(n,t.footer),t.footer&&Ce(t.footer,n),Y(n,t,"footer")},qe=(e,t)=>{const n=N();_(n,t.closeButtonHtml),Y(n,t,"closeButton"),ie(n,t.showCloseButton),n.setAttribute("aria-label",t.closeButtonAriaLabel)},Ve=(e,t)=>{var n=Ee.innerParams.get(e),e=x();return n&&t.icon===n.icon?(Re(e,t),void Ne(e,t)):t.icon||t.iconHtml?t.icon&&-1===Object.keys(C).indexOf(t.icon)?(s('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon,'"')),ne(e)):(te(e),Re(e,t),Ne(e,t),void $(e,t.showClass.icon)):ne(e)},Ne=(e,t)=>{for(const n in C)t.icon!==n&&G(e,C[n]);$(e,C[t.icon]),Ue(e,t),Fe(),Y(e,t,"icon")},Fe=()=>{const e=P();var t=window.getComputedStyle(e).getPropertyValue("background-color");const n=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let e=0;e<n.length;e++)n[e].style.backgroundColor=t},Re=(e,t)=>{var n;e.textContent="",t.iconHtml?_(e,ze(t.iconHtml)):"success"===t.icon?_(e,'\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    '):"error"===t.icon?_(e,'\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    '):(n={question:"?",warning:"!",info:"i"},_(e,ze(n[t.icon])))},Ue=(e,t)=>{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(const n of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])oe(e,n,"backgroundColor",t.iconColor);oe(e,".swal2-success-ring","borderColor",t.iconColor)}},ze=e=>'<div class="'.concat(w["icon-content"],'">').concat(e,"</div>"),We=(e,t)=>{const n=T();if(!t.imageUrl)return ne(n);te(n,""),n.setAttribute("src",t.imageUrl),n.setAttribute("alt",t.imageAlt),ee(n,"width",t.imageWidth),ee(n,"height",t.imageHeight),n.className=w.image,Y(n,t,"image")},_e=(e,o)=>{const i=L();if(!o.progressSteps||0===o.progressSteps.length)return ne(i);te(i),i.textContent="",o.currentProgressStep>=o.progressSteps.length&&r("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),o.progressSteps.forEach((e,t)=>{var n,e=(n=e,e=document.createElement("li"),$(e,w["progress-step"]),_(e,n),e);i.appendChild(e),t===o.currentProgressStep&&$(e,w["active-progress-step"]),t!==o.progressSteps.length-1&&(t=(e=>{const t=document.createElement("li");return $(t,w["progress-step-line"]),e.progressStepsDistance&&(t.style.width=e.progressStepsDistance),t})(o),i.appendChild(t))})},Ke=(e,t)=>{const n=E();ie(n,t.title||t.titleText,"block"),t.title&&Ce(t.title,n),t.titleText&&(n.innerText=t.titleText),Y(n,t,"title")},Ye=(e,t)=>{var n=A();const o=P();t.toast?(ee(n,"width",t.width),o.style.width="100%",o.insertBefore(D(),x())):ee(o,"width",t.width),ee(o,"padding",t.padding),t.color&&(o.style.color=t.color),t.background&&(o.style.background=t.background),ne(O()),((e,t)=>{if(e.className="".concat(w.popup," ").concat(ae(e)?t.showClass.popup:""),t.toast){$([document.documentElement,document.body],w["toast-shown"]);$(e,w.toast)}else $(e,w.modal);if(Y(e,t,"popup"),typeof t.customClass==="string")$(e,t.customClass);if(t.icon)$(e,w["icon-".concat(t.icon)])})(o,t)},Ze=(e,t)=>{Ye(e,t),xe(e,t),_e(e,t),Ve(e,t),We(e,t),Ke(e,t),qe(e,t),He(e,t),Be(e,t),Ie(e,t),"function"==typeof t.didRender&&t.didRender(P())},Je=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),Xe=()=>{const e=a(document.body.children);e.forEach(e=>{e===A()||e.contains(A())||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")),e.setAttribute("aria-hidden","true"))})},$e=()=>{const e=a(document.body.children);e.forEach(e=>{e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")})},Ge=["swal-title","swal-html","swal-footer"],Qe=e=>{const o={};return a(e.querySelectorAll("swal-param")).forEach(e=>{rt(e,["name","value"]);var t=e.getAttribute("name");let n=e.getAttribute("value");"boolean"==typeof p[t]&&"false"===n&&(n=!1),"object"==typeof p[t]&&(n=JSON.parse(n)),o[t]=n}),o},et=e=>{const n={};return a(e.querySelectorAll("swal-button")).forEach(e=>{rt(e,["type","color","aria-label"]);var t=e.getAttribute("type");n["".concat(t,"ButtonText")]=e.innerHTML,n["show".concat(o(t),"Button")]=!0,e.hasAttribute("color")&&(n["".concat(t,"ButtonColor")]=e.getAttribute("color")),e.hasAttribute("aria-label")&&(n["".concat(t,"ButtonAriaLabel")]=e.getAttribute("aria-label"))}),n},tt=e=>{const t={},n=e.querySelector("swal-image");return n&&(rt(n,["src","width","height","alt"]),n.hasAttribute("src")&&(t.imageUrl=n.getAttribute("src")),n.hasAttribute("width")&&(t.imageWidth=n.getAttribute("width")),n.hasAttribute("height")&&(t.imageHeight=n.getAttribute("height")),n.hasAttribute("alt")&&(t.imageAlt=n.getAttribute("alt"))),t},nt=e=>{const t={},n=e.querySelector("swal-icon");return n&&(rt(n,["type","color"]),n.hasAttribute("type")&&(t.icon=n.getAttribute("type")),n.hasAttribute("color")&&(t.iconColor=n.getAttribute("color")),t.iconHtml=n.innerHTML),t},ot=e=>{const n={},t=e.querySelector("swal-input");t&&(rt(t,["type","label","placeholder","value"]),n.input=t.getAttribute("type")||"text",t.hasAttribute("label")&&(n.inputLabel=t.getAttribute("label")),t.hasAttribute("placeholder")&&(n.inputPlaceholder=t.getAttribute("placeholder")),t.hasAttribute("value")&&(n.inputValue=t.getAttribute("value")));e=e.querySelectorAll("swal-input-option");return e.length&&(n.inputOptions={},a(e).forEach(e=>{rt(e,["value"]);var t=e.getAttribute("value"),e=e.innerHTML;n.inputOptions[t]=e})),n},it=(e,t)=>{const n={};for(const o in t){const i=t[o],a=e.querySelector(i);a&&(rt(a,[]),n[i.replace(/^swal-/,"")]=a.innerHTML.trim())}return n},at=e=>{const t=Ge.concat(["swal-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);a(e.children).forEach(e=>{e=e.tagName.toLowerCase();-1===t.indexOf(e)&&r("Unrecognized element <".concat(e,">"))})},rt=(t,n)=>{a(t.attributes).forEach(e=>{-1===n.indexOf(e.name)&&r(['Unrecognized attribute "'.concat(e.name,'" on <').concat(t.tagName.toLowerCase(),">."),"".concat(n.length?"Allowed attributes are: ".concat(n.join(", ")):"To set the value, use HTML within the element.")])})};var st={email:(e,t)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid email address"),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid URL")};function ct(e){var t,n;(t=e).inputValidator||Object.keys(st).forEach(e=>{t.input===e&&(t.inputValidator=st[e])}),e.showLoaderOnConfirm&&!e.preConfirm&&r("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),(n=e).target&&("string"!=typeof n.target||document.querySelector(n.target))&&("string"==typeof n.target||n.target.appendChild)||(r('Target parameter is not valid, defaulting to "body"'),n.target="body"),"string"==typeof e.title&&(e.title=e.title.split("\n").join("<br />")),(e=>{var t=he();if(le())s("SweetAlert2 requires document to initialize");else{const n=document.createElement("div");n.className=w.container,t&&$(n,w["no-transition"]),_(n,ge);const o=ye(e.target);o.appendChild(n),ve(e),we(o),be()}})(e)}class lt{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=(new Date).getTime()-this.started.getTime()),this.remaining}increase(e){var t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}const ut=()=>{null===W.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(W.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight="".concat(W.previousBodyPadding+(()=>{const e=document.createElement("div");e.className=w["scrollbar-measure"],document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t})(),"px"))},dt=()=>{null!==W.previousBodyPadding&&(document.body.style.paddingRight="".concat(W.previousBodyPadding,"px"),W.previousBodyPadding=null)},pt=()=>{var e;(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints)&&!K(document.body,w.iosfix)&&(e=document.body.scrollTop,document.body.style.top="".concat(-1*e,"px"),$(document.body,w.iosfix),(()=>{const e=A();let t;e.ontouchstart=e=>{t=mt(e)},e.ontouchmove=e=>{if(t){e.preventDefault();e.stopPropagation()}}})(),(()=>{const e=!navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i);if(e){const t=44;if(P().scrollHeight>window.innerHeight-t)A().style.paddingBottom="".concat(t,"px")}})())},mt=e=>{var t,n=e.target,o=A();return!((t=e).touches&&t.touches.length&&"stylus"===t.touches[0].touchType||(e=e).touches&&1<e.touches.length)&&(n===o||!(se(o)||"INPUT"===n.tagName||"TEXTAREA"===n.tagName||se(S())&&S().contains(n)))},gt=()=>{var e;K(document.body,w.iosfix)&&(e=parseInt(document.body.style.top,10),G(document.body,w.iosfix),document.body.style.top="",document.body.scrollTop=-1*e)},ht=10,ft=e=>{const t=P();if(e.target===t){const n=A();t.removeEventListener(ke,ft),n.style.overflowY="auto"}},bt=(e,t)=>{ke&&ce(t)?(e.style.overflowY="hidden",t.addEventListener(ke,ft)):e.style.overflowY="auto"},yt=(e,t,n)=>{pt(),t&&"hidden"!==n&&ut(),setTimeout(()=>{e.scrollTop=0})},vt=(e,t,n)=>{$(e,n.showClass.backdrop),t.style.setProperty("opacity","0","important"),te(t,"grid"),setTimeout(()=>{$(t,n.showClass.popup),t.style.removeProperty("opacity")},ht),$([document.documentElement,document.body],w.shown),n.heightAuto&&n.backdrop&&!n.toast&&$([document.documentElement,document.body],w["height-auto"])},wt=e=>{let t=P();t||new fn,t=P();var n=D();U()?ne(x()):((e,t)=>{const n=I(),o=D();if(!t&&ae(j()))t=j();if(te(n),t){ne(t);o.setAttribute("data-button-to-replace",t.className)}o.parentNode.insertBefore(o,t),$([e,n],w.loading)})(t,e),te(n),t.setAttribute("data-loading",!0),t.setAttribute("aria-busy",!0),t.focus()},Ct=(t,n)=>{const o=P(),i=e=>kt[n.input](o,Bt(e),n);l(n.inputOptions)||d(n.inputOptions)?(wt(j()),u(n.inputOptions).then(e=>{t.hideLoading(),i(e)})):"object"==typeof n.inputOptions?i(n.inputOptions):s("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof n.inputOptions))},At=(t,n)=>{const o=t.getInput();ne(o),u(n.inputValue).then(e=>{o.value="number"===n.input?parseFloat(e)||0:"".concat(e),te(o),o.focus(),t.hideLoading()}).catch(e=>{s("Error in inputValue promise: ".concat(e)),o.value="",te(o),o.focus(),t.hideLoading()})},kt={select:(e,t,i)=>{const a=Q(e,w.select),r=(e,t,n)=>{const o=document.createElement("option");o.value=n,_(o,t),o.selected=Pt(n,i.inputValue),e.appendChild(o)};t.forEach(e=>{var t=e[0];const n=e[1];if(Array.isArray(n)){const o=document.createElement("optgroup");o.label=t,o.disabled=!1,a.appendChild(o),n.forEach(e=>r(o,e[1],e[0]))}else r(a,n,t)}),a.focus()},radio:(e,t,a)=>{const r=Q(e,w.radio);t.forEach(e=>{var t=e[0],e=e[1];const n=document.createElement("input"),o=document.createElement("label");n.type="radio",n.name=w.radio,n.value=t,Pt(t,a.inputValue)&&(n.checked=!0);const i=document.createElement("span");_(i,e),i.className=w.label,o.appendChild(n),o.appendChild(i),r.appendChild(o)});const n=r.querySelectorAll("input");n.length&&n[0].focus()}},Bt=n=>{const o=[];return"undefined"!=typeof Map&&n instanceof Map?n.forEach((e,t)=>{let n=e;"object"==typeof n&&(n=Bt(n)),o.push([t,n])}):Object.keys(n).forEach(e=>{let t=n[e];"object"==typeof t&&(t=Bt(t)),o.push([e,t])}),o},Pt=(e,t)=>t&&t.toString()===e.toString(),xt=(e,t)=>{var n=Ee.innerParams.get(e),o=((e,t)=>{const n=e.getInput();if(!n)return null;switch(t.input){case"checkbox":return n.checked?1:0;case"radio":return(o=n).checked?o.value:null;case"file":return(o=n).files.length?null!==o.getAttribute("multiple")?o.files:o.files[0]:null;default:return t.inputAutoTrim?n.value.trim():n.value}var o})(e,n);n.inputValidator?((t,n,o)=>{const e=Ee.innerParams.get(t);t.disableInput();const i=Promise.resolve().then(()=>u(e.inputValidator(n,e.validationMessage)));i.then(e=>{t.enableButtons();t.enableInput();if(e)t.showValidationMessage(e);else if(o==="deny")Et(t,n);else Lt(t,n)})})(e,o,t):e.getInput().checkValidity()?("deny"===t?Et:Lt)(e,o):(e.enableButtons(),e.showValidationMessage(n.validationMessage))},Et=(t,n)=>{const e=Ee.innerParams.get(t||void 0);if(e.showLoaderOnDeny&&wt(M()),e.preDeny){Ee.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>u(e.preDeny(n,e.validationMessage)));o.then(e=>{!1===e?t.hideLoading():t.closePopup({isDenied:!0,value:void 0===e?n:e})}).catch(e=>Tt(t||void 0,e))}else t.closePopup({isDenied:!0,value:n})},St=(e,t)=>{e.closePopup({isConfirmed:!0,value:t})},Tt=(e,t)=>{e.rejectPromise(t)},Lt=(t,n)=>{const e=Ee.innerParams.get(t||void 0);if(e.showLoaderOnConfirm&&wt(),e.preConfirm){t.resetValidationMessage(),Ee.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>u(e.preConfirm(n,e.validationMessage)));o.then(e=>{ae(O())||!1===e?t.hideLoading():St(t,void 0===e?n:e)}).catch(e=>Tt(t||void 0,e))}else St(t,n)},Ot=(n,e,o)=>{e.popup.onclick=()=>{var e,t=Ee.innerParams.get(n);t&&((e=t).showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton||t.timer||t.input)||o(Je.close)}};let jt=!1;const Mt=t=>{t.popup.onmousedown=()=>{t.container.onmouseup=function(e){t.container.onmouseup=void 0,e.target===t.container&&(jt=!0)}}},Dt=t=>{t.container.onmousedown=()=>{t.popup.onmouseup=function(e){t.popup.onmouseup=void 0,e.target!==t.popup&&!t.popup.contains(e.target)||(jt=!0)}}},Ht=(n,o,i)=>{o.container.onclick=e=>{var t=Ee.innerParams.get(n);jt?jt=!1:e.target===o.container&&c(t.allowOutsideClick)&&i(Je.backdrop)}};const It=()=>j()&&j().click();const qt=(e,t,n)=>{const o=F();if(o.length)return(t+=n)===o.length?t=0:-1===t&&(t=o.length-1),o[t].focus();P().focus()},Vt=["ArrowRight","ArrowDown"],Nt=["ArrowLeft","ArrowUp"],Ft=(e,t,n)=>{var o,i,a=Ee.innerParams.get(e);a&&(a.stopKeydownPropagation&&t.stopPropagation(),"Enter"===t.key?(o=e,i=a,(e=t).isComposing||e.target&&o.getInput()&&e.target.outerHTML===o.getInput().outerHTML&&(["textarea","file"].includes(i.input)||(It(),e.preventDefault()))):"Tab"===t.key?((e,t)=>{const n=e.target,o=F();let i=-1;for(let e=0;e<o.length;e++)if(n===o[e]){i=e;break}if(!e.shiftKey)qt(t,i,1);else qt(t,i,-1);e.stopPropagation(),e.preventDefault()})(t,a):[...Vt,...Nt].includes(t.key)?(e=>{const t=j(),n=M(),o=H();if([t,n,o].includes(document.activeElement)){var i=Vt.includes(e)?"nextElementSibling":"previousElementSibling";const a=document.activeElement[i];a instanceof HTMLElement&&a.focus()}})(t.key):"Escape"===t.key&&((e,t,n)=>{if(c(t.allowEscapeKey)){e.preventDefault();n(Je.esc)}})(t,a,n))},Rt=e=>"object"==typeof e&&e.jquery,Ut=e=>e instanceof Element||Rt(e);const zt=()=>{if(de.timeout)return(()=>{const e=V();var t=parseInt(window.getComputedStyle(e).width);e.style.removeProperty("transition"),e.style.width="100%";t=t/parseInt(window.getComputedStyle(e).width)*100;e.style.removeProperty("transition"),e.style.width="".concat(t,"%")})(),de.timeout.stop()},Wt=()=>{if(de.timeout){var e=de.timeout.start();return z(e),e}};let _t=!1;const Kt={};const Yt=t=>{for(let e=t.target;e&&e!==document;e=e.parentNode)for(const o in Kt){var n=e.getAttribute(o);if(n)return void Kt[o].fire({template:n})}};var Zt=Object.freeze({isValidParameter:f,isUpdatableParameter:b,isDeprecatedParameter:y,argsToParams:n=>{const o={};return"object"!=typeof n[0]||Ut(n[0])?["title","html","icon"].forEach((e,t)=>{t=n[t];"string"==typeof t||Ut(t)?o[e]=t:void 0!==t&&s("Unexpected type of ".concat(e,'! Expected "string" or "Element", got ').concat(typeof t))}):Object.assign(o,n[0]),o},isVisible:()=>ae(P()),clickConfirm:It,clickDeny:()=>M()&&M().click(),clickCancel:()=>H()&&H().click(),getContainer:A,getPopup:P,getTitle:E,getHtmlContainer:S,getImage:T,getIcon:x,getInputLabel:()=>B(w["input-label"]),getCloseButton:N,getActions:I,getConfirmButton:j,getDenyButton:M,getCancelButton:H,getLoader:D,getFooter:q,getTimerProgressBar:V,getFocusableElements:F,getValidationMessage:O,isLoading:()=>P().hasAttribute("data-loading"),fire:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return new this(...t)},mixin:function(n){class e extends this{_main(e,t){return super._main(e,Object.assign({},n,t))}}return e},showLoading:wt,enableLoading:wt,getTimerLeft:()=>de.timeout&&de.timeout.getTimerLeft(),stopTimer:zt,resumeTimer:Wt,toggleTimer:()=>{var e=de.timeout;return e&&(e.running?zt:Wt)()},increaseTimer:e=>{if(de.timeout){e=de.timeout.increase(e);return z(e,!0),e}},isTimerRunning:()=>de.timeout&&de.timeout.isRunning(),bindClickHandler:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"data-swal-template";Kt[e]=this,_t||(document.body.addEventListener("click",Yt),_t=!0)}});function Jt(){var e=Ee.innerParams.get(this);if(e){const t=Ee.domCache.get(this);ne(t.loader),U()?e.icon&&te(x()):(e=>{const t=e.popup.getElementsByClassName(e.loader.getAttribute("data-button-to-replace"));if(t.length)te(t[0],"inline-block");else if(re())ne(e.actions)})(t),G([t.popup,t.actions],w.loading),t.popup.removeAttribute("aria-busy"),t.popup.removeAttribute("data-loading"),t.confirmButton.disabled=!1,t.denyButton.disabled=!1,t.cancelButton.disabled=!1}}var Xt={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};function $t(e,t,n,o){U()?tn(e,o):(me(n).then(()=>tn(e,o)),de.keydownTarget.removeEventListener("keydown",de.keydownHandler,{capture:de.keydownListenerCapture}),de.keydownHandlerAdded=!1),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)?(t.setAttribute("style","display:none !important"),t.removeAttribute("class"),t.innerHTML=""):t.remove(),R()&&(dt(),gt(),$e()),G([document.documentElement,document.body],[w.shown,w["height-auto"],w["no-backdrop"],w["toast-shown"]])}function Gt(e){e=void 0!==(n=e)?Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},n):{isConfirmed:!1,isDenied:!1,isDismissed:!0};const t=Xt.swalPromiseResolve.get(this);var n=(e=>{const t=P();if(!t)return false;const n=Ee.innerParams.get(e);if(!n||K(t,n.hideClass.popup))return false;G(t,n.showClass.popup),$(t,n.hideClass.popup);const o=A();return G(o,n.showClass.backdrop),$(o,n.hideClass.backdrop),en(e,t,n),true})(this);this.isAwaitingPromise()?e.isDismissed||(Qt(this),t(e)):n&&t(e)}const Qt=e=>{e.isAwaitingPromise()&&(Ee.awaitingPromise.delete(e),Ee.innerParams.get(e)||e._destroy())},en=(e,t,n)=>{var o,i,a,r=A(),s=ke&&ce(t);"function"==typeof n.willClose&&n.willClose(t),s?(o=e,i=t,a=r,s=n.returnFocus,t=n.didClose,de.swalCloseEventFinishedCallback=$t.bind(null,o,a,s,t),i.addEventListener(ke,function(e){e.target===i&&(de.swalCloseEventFinishedCallback(),delete de.swalCloseEventFinishedCallback)})):$t(e,r,n.returnFocus,n.didClose)},tn=(e,t)=>{setTimeout(()=>{"function"==typeof t&&t.bind(e.params)(),e._destroy()})};function nn(e,t,n){const o=Ee.domCache.get(e);t.forEach(e=>{o[e].disabled=n})}function on(e,t){if(!e)return!1;if("radio"===e.type){const n=e.parentNode.parentNode,o=n.querySelectorAll("input");for(let e=0;e<o.length;e++)o[e].disabled=t}else e.disabled=t}const an=e=>{e.isAwaitingPromise()?(rn(Ee,e),Ee.awaitingPromise.set(e,!0)):(rn(Xt,e),rn(Ee,e))},rn=(e,t)=>{for(const n in e)e[n].delete(t)};e=Object.freeze({hideLoading:Jt,disableLoading:Jt,getInput:function(e){var t=Ee.innerParams.get(e||this);return(e=Ee.domCache.get(e||this))?Z(e.popup,t.input):null},close:Gt,isAwaitingPromise:function(){return!!Ee.awaitingPromise.get(this)},rejectPromise:function(e){const t=Xt.swalPromiseReject.get(this);Qt(this),t&&t(e)},closePopup:Gt,closeModal:Gt,closeToast:Gt,enableButtons:function(){nn(this,["confirmButton","denyButton","cancelButton"],!1)},disableButtons:function(){nn(this,["confirmButton","denyButton","cancelButton"],!0)},enableInput:function(){return on(this.getInput(),!1)},disableInput:function(){return on(this.getInput(),!0)},showValidationMessage:function(e){const t=Ee.domCache.get(this);var n=Ee.innerParams.get(this);_(t.validationMessage,e),t.validationMessage.className=w["validation-message"],n.customClass&&n.customClass.validationMessage&&$(t.validationMessage,n.customClass.validationMessage),te(t.validationMessage);const o=this.getInput();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedby",w["validation-message"]),J(o),$(o,w.inputerror))},resetValidationMessage:function(){var e=Ee.domCache.get(this);e.validationMessage&&ne(e.validationMessage);const t=this.getInput();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedby"),G(t,w.inputerror))},getProgressSteps:function(){return Ee.domCache.get(this).progressSteps},update:function(t){var e=P(),n=Ee.innerParams.get(this);if(!e||K(e,n.hideClass.popup))return r("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");const o={};Object.keys(t).forEach(e=>{b(e)?o[e]=t[e]:r('Invalid parameter to update: "'.concat(e,'". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'))}),n=Object.assign({},n,o),Ze(this,n),Ee.innerParams.set(this,n),Object.defineProperties(this,{params:{value:Object.assign({},this.params,t),writable:!1,enumerable:!0}})},_destroy:function(){var e=Ee.domCache.get(this);const t=Ee.innerParams.get(this);t?(e.popup&&de.swalCloseEventFinishedCallback&&(de.swalCloseEventFinishedCallback(),delete de.swalCloseEventFinishedCallback),de.deferDisposalTimer&&(clearTimeout(de.deferDisposalTimer),delete de.deferDisposalTimer),"function"==typeof t.didDestroy&&t.didDestroy(),e=this,an(e),delete e.params,delete de.keydownHandler,delete de.keydownTarget,delete de.currentInstance):an(this)}});let sn;class cn{constructor(){if("undefined"!=typeof window){sn=this;for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=Object.freeze(this.constructor.argsToParams(t));Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0,configurable:!0}});o=this._main(this.params);Ee.promise.set(this,o)}}_main(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};v(Object.assign({},t,e)),de.currentInstance&&(de.currentInstance._destroy(),R()&&$e()),de.currentInstance=this;e=un(e,t);ct(e),Object.freeze(e),de.timeout&&(de.timeout.stop(),delete de.timeout),clearTimeout(de.restoreFocusTimeout);t=dn(this);return Ze(this,e),Ee.innerParams.set(this,e),ln(this,t,e)}then(e){const t=Ee.promise.get(this);return t.then(e)}finally(e){const t=Ee.promise.get(this);return t.finally(e)}}const ln=(r,s,c)=>new Promise((e,t)=>{const n=e=>{r.closePopup({isDismissed:!0,dismiss:e})};var o,i,a;Xt.swalPromiseResolve.set(r,e),Xt.swalPromiseReject.set(r,t),s.confirmButton.onclick=()=>(e=>{var t=Ee.innerParams.get(e);e.disableButtons(),t.input?xt(e,"confirm"):Lt(e,!0)})(r),s.denyButton.onclick=()=>(e=>{var t=Ee.innerParams.get(e);e.disableButtons(),t.returnInputValueOnDeny?xt(e,"deny"):Et(e,!1)})(r),s.cancelButton.onclick=()=>((e,t)=>{e.disableButtons(),t(Je.cancel)})(r,n),s.closeButton.onclick=()=>n(Je.close),o=r,e=s,t=n,Ee.innerParams.get(o).toast?Ot(o,e,t):(Mt(e),Dt(e),Ht(o,e,t)),i=r,e=de,t=c,a=n,e.keydownTarget&&e.keydownHandlerAdded&&(e.keydownTarget.removeEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1),t.toast||(e.keydownHandler=e=>Ft(i,e,a),e.keydownTarget=t.keydownListenerCapture?window:P(),e.keydownListenerCapture=t.keydownListenerCapture,e.keydownTarget.addEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!0),t=r,"select"===(e=c).input||"radio"===e.input?Ct(t,e):["text","email","number","tel","textarea"].includes(e.input)&&(l(e.inputValue)||d(e.inputValue))&&(wt(j()),At(t,e)),(e=>{const t=A(),n=P();"function"==typeof e.willOpen&&e.willOpen(n);var o=window.getComputedStyle(document.body).overflowY;vt(t,n,e),setTimeout(()=>{bt(t,n)},ht),R()&&(yt(t,e.scrollbarPadding,o),Xe()),U()||de.previousActiveElement||(de.previousActiveElement=document.activeElement),"function"==typeof e.didOpen&&setTimeout(()=>e.didOpen(n)),G(t,w["no-transition"])})(c),pn(de,c,n),mn(s,c),setTimeout(()=>{s.container.scrollTop=0})}),un=(e,t)=>{var n=(e=>{e="string"==typeof e.template?document.querySelector(e.template):e.template;if(!e)return{};e=e.content;return at(e),Object.assign(Qe(e),et(e),tt(e),nt(e),ot(e),it(e,Ge))})(e);const o=Object.assign({},p,t,n,e);return o.showClass=Object.assign({},p.showClass,o.showClass),o.hideClass=Object.assign({},p.hideClass,o.hideClass),o},dn=e=>{var t={popup:P(),container:A(),actions:I(),confirmButton:j(),denyButton:M(),cancelButton:H(),loader:D(),closeButton:N(),validationMessage:O(),progressSteps:L()};return Ee.domCache.set(e,t),t},pn=(e,t,n)=>{var o=V();ne(o),t.timer&&(e.timeout=new lt(()=>{n("timer"),delete e.timeout},t.timer),t.timerProgressBar&&(te(o),setTimeout(()=>{e.timeout&&e.timeout.running&&z(t.timer)})))},mn=(e,t)=>{if(!t.toast)return c(t.allowEnterKey)?void(gn(e,t)||qt(t,-1,1)):hn()},gn=(e,t)=>t.focusDeny&&ae(e.denyButton)?(e.denyButton.focus(),!0):t.focusCancel&&ae(e.cancelButton)?(e.cancelButton.focus(),!0):!(!t.focusConfirm||!ae(e.confirmButton))&&(e.confirmButton.focus(),!0),hn=()=>{document.activeElement instanceof HTMLElement&&"function"==typeof document.activeElement.blur&&document.activeElement.blur()};Object.assign(cn.prototype,e),Object.assign(cn,Zt),Object.keys(e).forEach(e=>{cn[e]=function(){if(sn)return sn[e](...arguments)}}),cn.DismissReason=Je,cn.version="11.3.3";const fn=cn;return fn.default=fn,fn}),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2);
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto);grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;height:.25em;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 3px}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .5s;animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .8s;animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-question-mark .8s;animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@-webkit-keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}");