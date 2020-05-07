/**
 * @module datafield
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import '../theme/whitespaces.css';

const NBSP = '\u00A0';

export default class Whitespaces extends Plugin {
	static get pluginName() {
		return 'Whitespaces';
	}

	init() {
		this.editor.keystrokes.set( 'ctrl+shift+space', ( key, stop ) => {
			// console.log('ReportEditComponent.ngEditorOnReady()', 'Alt-space typed');
			this.editor.execute( 'input', { text: NBSP } );
			stop();
		} );

		this.editor.conversion.for( 'editingDowncast' ).add( dispatcher => {
			dispatcher.on( 'insert:$text', ( evt, data, conversionApi ) => {
				// Here should be an `if` that would check whether the feature's command is enabled.
				// If the command is not enabled, the converter should return.

				if ( !conversionApi.consumable.consume( data.item, 'insert' ) ) {
					return;
				}

				const viewWriter = conversionApi.writer;

				let modelPosition = data.range.start;
				let viewPosition = conversionApi.mapper.toViewPosition( modelPosition );

				const dataChunks = data.item.data.split( NBSP );
				for ( let i = 0; i < dataChunks.length; i++ ) {
					const chunk = dataChunks[ i ];

					// Chunks may be empty (consider `'foo '.split( ' ' )`).
					// Thankfully, `'foo  bar'.split( ' ' )` returns `[ 'foo', '', 'bar' ]` which is perfect for this algorithm.
					if ( chunk != '' ) {
						viewWriter.insert( viewPosition, viewWriter.createText( chunk ) );

						// Need to recalculate `viewPosition` after every inserted item.
						modelPosition = modelPosition.getShiftedBy( chunk.length );
						viewPosition = conversionApi.mapper.toViewPosition( modelPosition );
					}

					// Do not insert `<span>.</span>` after the last chunk.
					if ( i == dataChunks.length - 1 ) {
						break;
					}

					// Insert dot instead of a space.
					// We will wrap in in a span in following lines.
					viewWriter.insert( viewPosition, viewWriter.createText( '•' ) );

					// I admit this is a little clunky :(.
					const viewSpaceSpan = viewWriter.createAttributeElement( 'span', { class: 'ws-nbsp' } );
					const modelWrapRange = this.editor.model.createRange( modelPosition, modelPosition.getShiftedBy( 1 ) );
					const viewWrapRange = conversionApi.mapper.toViewRange( modelWrapRange );

					viewWriter.wrap( viewWrapRange, viewSpaceSpan );

					// Need to recalculate `viewPosition` after every inserted item.
					modelPosition = modelPosition.getShiftedBy( 1 );
					viewPosition = conversionApi.mapper.toViewPosition( modelPosition );
				}
			}, { priority: 'high' } );
		} );
	}
}
