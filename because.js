const figlet = require( 'figlet' );
const _ = require( 'lodash' );
const fs = require( 'fs' );

let phrase = [
  'Tinder Superlatives'
];

let font = [
	'contessa',
	'pepper',
	'short',
	'straight',
	'tombstone'
];

module.exports = function (cb) {
	figlet.text( _.sample( phrase ), {
		font: _.sample( font )
	}, function ( err, data ) {
		if ( err ) {
			console.log( 'Figlet broke.' );
			console.dir( err );
			return;
		}
		console.log( data );
		cb();
	});
}
