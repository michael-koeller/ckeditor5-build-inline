/**
 * @module datafield
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import '../theme/datafield.css';

const DATAFIELD = 'datafield';

export default class DataField extends Plugin {
	static get pluginName() {
		return 'DataField';
	}

	init() {
		const editor = this.editor;

		// Register new model element
		editor.model.schema.register( DATAFIELD, {
			// Allow wherever text is allowed:
			allowWhere: '$text',
			// The placeholder can have many types, like date, name, surname, etc:
			allowAttributes: [ 'source', 'alias', 'final' ],

			// The placeholder will acts as an inline node:
			isInline: true,
			// The inline-widget is self-contained so cannot be split by the caret and can be selected:
			isObject: true
		} );
		editor.model.schema.extend( '$text', {
			allowIn: DATAFIELD
		} );

		// Convert view element -> model element
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'x-field',
				classes: DATAFIELD
			},
			model: ( viewElement, modelWriter ) => {
				const attrs = {
					source: viewElement.getAttribute( 'data-source' )
				};
				if ( viewElement.hasAttribute( 'data-alias' ) ) {
					attrs.alias = viewElement.getAttribute( 'data-alias' );
				}
				if ( viewElement.hasAttribute( 'data-final' ) ) {
					attrs.final = viewElement.getAttribute( 'data-final' );
				}
				return modelWriter.createElement( DATAFIELD, attrs );
			}
		} );

		// Convert model element -> view element
		editor.conversion.for( 'dataDowncast' ).elementToElement( {
			model: DATAFIELD,
			view: ( modelElement, viewWriter ) => {
				const attrs = {
					class: DATAFIELD,
					'data-source': modelElement.getAttribute( 'source' )
				};
				if ( modelElement.hasAttribute( 'alias' ) ) {
					attrs[ 'data-alias' ] = modelElement.getAttribute( 'alias' );
				}
				if ( modelElement.hasAttribute( 'final' ) ) {
					attrs[ 'data-final' ] = modelElement.getAttribute( 'final' );
				}
				return viewWriter.createContainerElement( 'x-field', attrs );
			}
		} );

		// Convert model element -> view element
		editor.conversion.for( 'editingDowncast' ).elementToElement( {
			model: DATAFIELD,
			view: ( modelElement, viewWriter ) => {
				const el = viewWriter.createEditableElement( 'span', {
					class: DATAFIELD,
					title: modelElement.getAttribute( 'source' ) +
							( modelElement.hasAttribute( 'alias' ) ? ' -> ' + modelElement.hasAttribute( 'alias' ) : '' )
				} );
				viewWriter.setAttribute( 'contenteditable', 'false', el );
				return el;
			}
		} );
	}
}
