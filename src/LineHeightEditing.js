import { Plugin } from 'ckeditor5/src/core';
import LineHeightCommand from './LineHeightCommand.js';

export default class LineHeightEditing extends Plugin {
	/**
     * @inheritDoc
     */
	static get pluginName() {
		return 'LineHeightEditing';
	}

	/**
     * @inheritDoc
     */
	init() {
		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add(
			'lineHeight',
			new LineHeightCommand( this.editor )
		);
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.extend( '$block', {
			allowAttributes: 'lineHeight'
		} );

		this.editor.model.schema.setAttributeProperties( 'lineHeight', {
			isFormatting: true
		} );
	}

	_defineConverters() {
		const options = this.editor.config.get( 'lineHeight.options' ) || [];

		const definition = {
			model: {
				key: 'lineHeight',
				values: options.slice()
			},
			view: {}
		};

		for ( const option of options ) {
			definition.view[ option ] = {
				key: 'style',
				value: {
					'line-height': option
				}
			};
		}

		this.editor.conversion.attributeToAttribute( definition );
	}
}
