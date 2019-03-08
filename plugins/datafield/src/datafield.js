/* global console */

/**
 * @module datafield
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import '../theme/datafield.css';

const DATAFIELD = 'datafield';

export default class DataField extends Plugin {
	init() {
		console.log( 'DataField plugin was initialized' );

		const editor = this.editor;
		// Allow datafield attribute on text nodes.
		editor.model.schema.extend( '$text', { allowAttributes: DATAFIELD } );

		editor.conversion.attributeToElement( {
			model: DATAFIELD,
			view: {
				name: 'span',
				classes: 'datafield'
			}
		} );
	}

	static get pluginName() {
		return 'DataField';
	}
}
