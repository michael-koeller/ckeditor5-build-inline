/**
 * @module property
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { enablePlaceholder } from '@ckeditor/ckeditor5-engine/src/view/placeholder';
import { keyCodes } from '@ckeditor/ckeditor5-utils/src/keyboard';

import '../theme/fields.css';

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
		const viewDocument = editor.editing.view.document;

		// Register new model element
		editor.model.schema.register( PROPERTY, {
			// Allow wherever text is allowed:
			allowWhere: '$text',
			// Declare allowed model attributes:
			allowAttributes: [ 'alias' ],

			// Properties will act as an inline node:
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
				el.on( 'change', ( evt, node ) => {
					// TODO: validate input: only numbers allowed
					// console.log('editor.plugin.property.editingDowncast[change]', evt )
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
				return w;
			}
		} );

		viewDocument.on( 'keydown', ( evt, data ) => {
			// const selection = viewDocument.selection;
			if ( data.keyCode == keyCodes.delete ) {
				// const next = selection.getLastPosition().nodeAfter;
				// console.log('editor.editing.view.document[keydown]: next = ', next);
			} else if ( data.keyCode == keyCodes.backspace ) {
				// const prev = selection.getFirstPosition().nodeBefore;
				// console.log('editor.editing.view.document[keydown]: prev = ', prev);
			}
			// console.log( 'Oops: You deleted a data field. If it was by accident, press undo button or type \'Ctrl-Z\'.' );
		} );
	}
}
