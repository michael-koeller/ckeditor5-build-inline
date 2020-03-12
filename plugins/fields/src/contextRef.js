/**
 * @module contextRef
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import '../theme/contextRef.css';

const CONTEXT_REF = 'context-ref';

export default class ContextRef extends Plugin {
	static get pluginName() {
		return 'ContextRef';
	}

	init() {
		const editor = this.editor;

		// Register new model element
		editor.model.schema.register( CONTEXT_REF, {
			// Allow wherever blocks are allowed:
			allowWhere: '$block',
			// Declare allowed model attributes:
			allowAttributes: [ 'name', 'href' ],

			// Context references are isolated block objects
			isBlock: true,
			// The inline-widget is self-contained so cannot be split by the caret and can be selected:
			isObject: true
		} );

		// Convert view element -> model element
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'x-field',
				classes: CONTEXT_REF
			},
			model: ( viewElement, modelWriter ) => {
				const attrs = {
					name: viewElement.getAttribute( 'data-name' ),
					href: viewElement.getAttribute( 'data-href' )
				};
				return modelWriter.createElement( CONTEXT_REF, attrs );
			}
		} );

		// Convert model element -> view element
		editor.conversion.for( 'dataDowncast' ).elementToElement( {
			model: CONTEXT_REF,
			view: ( modelElement, viewWriter ) => {
				const attrs = {
					class: CONTEXT_REF,
					'data-name': modelElement.getAttribute( 'name' ),
					'data-href': modelElement.getAttribute( 'href' )
				};
				return viewWriter.createContainerElement( 'x-field', attrs );
			}
		} );

		// Convert model element -> view element
		editor.conversion.for( 'editingDowncast' ).elementToElement( {
			model: CONTEXT_REF,
			view: ( modelElement, viewWriter ) => {
				const elP = viewWriter.createContainerElement( 'p', {
					class: CONTEXT_REF,
					title: modelElement.getAttribute( 'name' )
				} );
				viewWriter.setAttribute( 'contenteditable', 'false', elP );

				const elA = viewWriter.createContainerElement( 'a', {
					href: modelElement.getAttribute( 'href' )
				} );
				viewWriter.insert( viewWriter.createRangeIn( elP ).start, elA );

				const elSpan = viewWriter.createContainerElement( 'span', { class: 'oi oi-document' } );
				viewWriter.insert( viewWriter.createRangeIn( elA ).start, elSpan );

				return elP;
			}
		} );
	}
}
