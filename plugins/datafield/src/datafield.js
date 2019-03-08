/* global console */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class DataField extends Plugin {
	init() {
		console.log( 'DataField plugin was initialized' );
	}

	static get pluginName() {
		return 'DataField';
	}
}
