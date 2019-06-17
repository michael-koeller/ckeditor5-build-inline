/**
 * @module datafield
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import '../theme/calculation.css';

const CALCULATION = 'calculation';

export default class Calculation extends Plugin {
	static get pluginName() {
		return 'Calculation';
	}

	init() {
		const editor = this.editor;

		// Register new model element
		editor.model.schema.register( CALCULATION, {
			// Allow wherever text is allowed:
			allowWhere: '$text',
			// The placeholder can have many types, like date, name, surname, etc:
			allowAttributes: [ 'formula' ],

			// The placeholder will acts as an inline node:
			isInline: true,
			// The inline-widget is self-contained so cannot be split by the caret and can be selected:
			isObject: true
		} );
		editor.model.schema.extend( '$text', {
			allowIn: CALCULATION
		} );

		// Convert view element -> model element
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'span',
				classes: CALCULATION
			},
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( CALCULATION, { formula: viewElement.getAttribute( 'data-formula' ) } );
			}
		} );

		// Convert model element -> view element
		// Handles both situations: dataDowncast and editingDowncast
		editor.conversion.for( 'dataDowncast' ).elementToElement( {
			model: CALCULATION,
			view: ( modelElement, viewWriter ) => {
				const el = viewWriter.createContainerElement( 'span', {
					class: CALCULATION,
					'data-formula': modelElement.getAttribute( 'formula' )
				} );
				return el;
			}
		} );

		// Convert model element -> view element
		// Handles both situations: dataDowncast and editingDowncast
		editor.conversion.for( 'editingDowncast' ).elementToElement( {
			model: CALCULATION,
			view: ( modelElement, viewWriter ) => {
				const el = viewWriter.createContainerElement( 'span', {
					class: CALCULATION,
					'data-formula': modelElement.getAttribute( 'formula' ),
					title: modelElement.getAttribute( 'formula' )
				} );
				return el;
			}
		} );
	}
}
