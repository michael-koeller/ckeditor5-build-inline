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
			allowAttributes: [ 'source', 'alias' ],

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
				name: 'span',
				classes: DATAFIELD
			},
			model: ( viewElement, modelWriter ) => {
				const attrs = {
					source: viewElement.getAttribute( 'data-source' )
				};
				if ( viewElement.hasAttribute( 'data-alias' ) ) {
					attrs.alias = viewElement.getAttribute( 'data-alias' );
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
				if ( modelElement.hasAttribute( 'data-alias' ) ) {
					attrs[ 'data-alias' ] = modelElement.getAttribute( 'alias' );
				}
				return viewWriter.createContainerElement( 'span', attrs );
			}
		} );

		// Convert model element -> view element
		editor.conversion.for( 'editingDowncast' ).elementToElement( {
			model: DATAFIELD,
			view: ( modelElement, viewWriter ) => {
				return viewWriter.createContainerElement( 'span', {
					class: DATAFIELD,
					title: modelElement.getAttribute( 'source' )
				} );
			}
		} );
	}
}
