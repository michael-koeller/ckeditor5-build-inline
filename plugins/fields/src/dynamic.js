/**
 * @module datafield
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import '../theme/fields.css';

const DYNAMIC = 'dynamic';

export default class Dynamic extends Plugin {
	static get pluginName() {
		return 'Dynamic';
	}

	init() {
		const editor = this.editor;

		// Register new model element
		editor.model.schema.register( DYNAMIC, {
			// Allow wherever text is allowed:
			allowWhere: '$text',
			// Declare allowed model attributes:
			allowAttributes: [ 'prop', 'test', 'style' ],

			// Data fields will act as an inline node:
			isInline: true,
			// The inline-widget is self-contained so cannot be split by the caret and can be selected:
			isObject: true
		} );
		editor.model.schema.extend( '$text', {
			allowIn: DYNAMIC
		} );

		// Convert view element -> model element
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'x-field',
				classes: DYNAMIC
			},
			model: ( viewElement, modelWriter ) => {
				const attrs = {
					prop: viewElement.getAttribute( 'data-prop' ),
					test: viewElement.getAttribute( 'data-test' )
				};
				if ( viewElement.hasAttribute( 'style' ) ) {
					attrs.style = viewElement.getAttribute( 'style' );
				}
				return modelWriter.createElement( DYNAMIC, attrs );
			}
		} );

		// Convert model element -> view element
		editor.conversion.for( 'dataDowncast' ).elementToElement( {
			model: DYNAMIC,
			view: ( modelElement, viewWriter ) => {
				const attrs = {
					class: DYNAMIC,
					'data-prop': modelElement.getAttribute( 'prop' ),
					'data-test': modelElement.getAttribute( 'test' )
				};
				if ( modelElement.hasAttribute( 'style' ) ) {
					attrs.style = modelElement.getAttribute( 'style' );
				}
				return viewWriter.createContainerElement( 'x-field', attrs );
			}
		} );

		// Convert model element -> view element
		editor.conversion.for( 'editingDowncast' ).elementToElement( {
			model: DYNAMIC,
			view: ( modelElement, viewWriter ) => {
				const attrs = {
					class: DYNAMIC,
					title: modelElement.getAttribute( 'prop' ) + ' ' + modelElement.getAttribute( 'test' )
				};
				if ( modelElement.hasAttribute( 'style' ) ) {
					attrs.style = modelElement.getAttribute( 'style' );
				}
				const el = viewWriter.createEditableElement( 'span', attrs );
				viewWriter.setAttribute( 'contenteditable', 'false', el );
				return el;
			}
		} );
	}
}
