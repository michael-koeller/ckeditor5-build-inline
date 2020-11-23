import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class CustomTableClasses extends Plugin {
	static get pluginName() {
		return 'CustomTableClasses';
	}

	afterInit() {
		const editor = this.editor;
		setupCustomClassConversion( 'table', 'table', editor );
		editor.conversion.for( 'upcast' ).add( upcastCustomClasses( 'figure' ), { priority: 'low' } );
	}
}

function upcastCustomClasses( elementName ) {
	return dispatcher => dispatcher.on( `element:${ elementName }`, ( evt, data, conversionApi ) => {
		const viewItem = data.viewItem;
		const modelRange = data.modelRange;

		const modelElement = modelRange && modelRange.start.nodeAfter;

		if ( !modelElement ) {
			return;
		}

		// The upcast conversion picks up classes from the base element and from the <figure> element so it should be extensible.
		const currentAttributeValue = modelElement.getAttribute( 'customClass' ) || [];

		currentAttributeValue.push( ...viewItem.getClassNames() );

		conversionApi.writer.setAttribute( 'customClass', currentAttributeValue, modelElement );
	} );
}

function setupCustomClassConversion( viewElementName, modelElementName, editor ) {
	editor.model.schema.extend( modelElementName, { allowAttributes: [ 'customClass' ] } );
	editor.conversion.for( 'upcast' ).add( upcastCustomClasses( viewElementName ), { priority: 'low' } );
	editor.conversion.for( 'downcast' ).add( downcastCustomClassesToFigure( modelElementName ), { priority: 'low' } );
}

function downcastCustomClassesToFigure( modelElementName ) {
	return dispatcher => dispatcher.on( `insert:${ modelElementName }`, ( evt, data, conversionApi ) => {
		const modelElement = data.item;

		const viewFigure = conversionApi.mapper.toViewElement( modelElement );

		if ( !viewFigure ) {
			return;
		}

		// The code below assumes that classes are set on the <figure> element.
		conversionApi.writer.addClass( modelElement.getAttribute( 'customClass' ), viewFigure );
	} );
}

