/**
 * @module calculation
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
			allowAttributes: [ 'formula', 'alias', 'precision' ],

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
				name: 'x-field',
				classes: CALCULATION
			},
			model: ( viewElement, modelWriter ) => {
				const attrs = {
					formula: viewElement.getAttribute( 'data-formula' )
				};
				if ( viewElement.hasAttribute( 'data-alias' ) ) {
					attrs.alias = viewElement.getAttribute( 'data-alias' );
				}
				if ( viewElement.hasAttribute( 'data-precision' ) ) {
					attrs.precision = viewElement.getAttribute( 'data-precision' );
				}
				if ( viewElement.hasAttribute( 'data-eval-formula' ) ) {
					attrs.evalFormula = viewElement.getAttribute( 'data-eval-formula' );
				}
				return modelWriter.createElement( CALCULATION, attrs );
			}
		} );

		// Convert model element -> view element
		// Handles both situations: dataDowncast and editingDowncast
		editor.conversion.for( 'dataDowncast' ).elementToElement( {
			model: CALCULATION,
			view: ( modelElement, viewWriter ) => {
				const attrs = {
					class: CALCULATION,
					'data-formula': modelElement.getAttribute( 'formula' )
				};
				if ( modelElement.hasAttribute( 'alias' ) ) {
					attrs[ 'data-alias' ] = modelElement.getAttribute( 'alias' );
				}
				if ( modelElement.hasAttribute( 'precision' ) ) {
					attrs[ 'data-precision' ] = modelElement.getAttribute( 'precision' );
				}
				if ( modelElement.hasAttribute( 'evalFormula' ) ) {
					attrs[ 'data-eval-formula' ] = modelElement.getAttribute( 'evalFormula' );
				}
				return viewWriter.createContainerElement( 'x-field', attrs );
			}
		} );

		// Convert model element -> view element
		// Handles both situations: dataDowncast and editingDowncast
		editor.conversion.for( 'editingDowncast' ).elementToElement( {
			model: CALCULATION,
			view: ( modelElement, viewWriter ) => {
				const el = viewWriter.createEditableElement( 'span', {
					class: CALCULATION,
					'data-formula': modelElement.getAttribute( 'formula' ),
					'data-html': 'true',
					title: modelElement.getAttribute( 'formula' ) +
							( modelElement.hasAttribute( 'evalFormula' ) ? ' = ' + modelElement.getAttribute( 'evalFormula' ) : '' ) +
							( modelElement.hasAttribute( 'alias' ) ? ' -> ' + modelElement.getAttribute( 'alias' ) : '' )
				} );
				viewWriter.setAttribute( 'contenteditable', 'false', el );
				return el;
			}
		} );
	}
}
