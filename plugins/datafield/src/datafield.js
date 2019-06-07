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

		// Register new model element
		editor.model.schema.register( DATAFIELD, {
			// Allow wherever text is allowed:
			allowWhere: '$text',
			// The placeholder can have many types, like date, name, surname, etc:
			allowAttributes: [ 'ref', 'value' ],

			// The placeholder will acts as an inline node:
			isInline: true,
			// The inline-widget is self-contained so cannot be split by the caret and can be selected:
			isObject: true
		} );

		// Convert model element -> view element
		editor.conversion.for( 'downcast' ).elementToElement( {
			model: DATAFIELD,
			view: ( modelElement, viewWriter ) => viewWriter.createContainerElement( 'span', {
				class: DATAFIELD,
				'data-ref': modelElement.getAttribute( 'ref' ),
				title: modelElement.getAttribute( 'ref' )
			} )
		} );

		// Convert view element -> model element
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'span',
				classes: DATAFIELD
			},
			model: ( viewElement, modelWriter ) => {
				const textContent = viewElement.getChild( 0 ).data;
				const el = modelWriter.createElement( DATAFIELD, { ref: viewElement.getAttribute( 'data-ref' ) } );
				modelWriter.appendText( textContent, el );
				return el;
			}
		} );
	}

	static get pluginName() {
		return 'DataField';
	}
}
