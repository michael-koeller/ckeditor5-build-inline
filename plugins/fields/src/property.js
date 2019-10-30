/**
 * @module property
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { enablePlaceholder } from '@ckeditor/ckeditor5-engine/src/view/placeholder';

import '../theme/property.css';

const PROPERTY = 'property';

export default class Property extends Plugin {
	static get pluginName() {
		return 'Property';
	}

	static get requires() {
		return [ Widget ];
	}

	init() {
		const editor = this.editor;

		// Register new model element
		editor.model.schema.register( PROPERTY, {
			// Allow wherever text is allowed:
			allowWhere: '$text',
			// The placeholder can have many types, like date, name, surname, etc:
			allowAttributes: [ 'alias' ],

			// The placeholder will acts as an inline node:
			isInline: true,
			// The inline-widget is self-contained so cannot be split by the caret and can be selected:
			isObject: true
		} );
		editor.model.schema.extend( '$text', {
			allowIn: PROPERTY
		} );

		// Convert view element -> model element
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'x-field',
				classes: PROPERTY
			},
			model: ( viewElement, modelWriter ) => {
				return modelWriter.createElement( PROPERTY, { alias: viewElement.getAttribute( 'data-alias' ) } );
			}
		} );

		// Convert model element -> view element
		editor.conversion.for( 'dataDowncast' ).elementToElement( {
			model: PROPERTY,
			view: ( modelElement, viewWriter ) => {
				return viewWriter.createEditableElement( 'x-field', {
					class: PROPERTY,
					'data-alias': modelElement.getAttribute( 'alias' )
				} );
			}
		} );

		// Convert model element -> view element
		editor.conversion.for( 'editingDowncast' ).elementToElement( {
			model: PROPERTY,
			view: ( modelElement, viewWriter ) => {
				const el = viewWriter.createEditableElement( 'span', {
					class: PROPERTY,
					'data-alias': modelElement.getAttribute( 'alias' ),
					title: modelElement.getAttribute( 'alias' )
				} );
				el.on( 'change:text', ( evt, node ) => {
					// TODO: validate input: only numbers allowed
					// console.log('editor.plugin.property.editingDowncast[change:text]', evt, node )
					if ( evt && node ) {
						// todo: input validation
					}
				} );
				const w = toWidgetEditable( el, viewWriter );
				enablePlaceholder( {
					view: editor.editing.view,
					element: w,
					text: '--',
					isDirectHost: false
				} );
				return false;
			}
		} );
	}
}
