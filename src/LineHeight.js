import { Plugin } from 'ckeditor5';
import LineHeightEditing from './LineHeightEditing.js';
import LineHeightUI from './LineHeightUI.js';

export default class LineHeight extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );
		editor.config.define( 'lineHeight', {
			options: [
				'1',
				'1.15',
				'1.5',
				'2',
				'2.5',
				'3'
			]
		} );
	}

	/**
     * @inheritDoc
     */
	static get pluginName() {
		return 'LineHeight';
	}

	/**
     * @inheritDoc
     */
	static get requires() {
		return [ LineHeightUI, LineHeightEditing ];
	}
}
