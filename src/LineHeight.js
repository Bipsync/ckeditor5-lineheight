import { Plugin } from 'ckeditor5/src/core';
import LineHeightEditing from './LineHeightEditing.js';
import LineHeightUI from './LineHeightUI.js';

export default class LineHeight extends Plugin {
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
