import {
	Plugin,
	Collection,
	addListToDropdown,
	createDropdown as CreateDropdown,
	ViewModel
} from 'ckeditor5';

import lineHeightIcon from '../theme/icons/line-height.svg';

export default class LineHeightUI extends Plugin {
	/**
     * @inheritDoc
     */
	static get pluginName() {
		return 'LineHeightUI';
	}

	/**
     * @inheritDoc
     */
	init() {
		const editor = this.editor;
		const t = editor.t;
		const options = this.editor.config.get( 'lineHeight.options' ) || [];

		editor.ui.componentFactory.add( 'lineHeight', locale => {
			const command = editor.commands.get( 'lineHeight' );
			const view = new CreateDropdown( locale );
			addListToDropdown( view, this.getListOptions( options, command ) );

			view.buttonView.set( {
				label: t( 'Line Height' ),
				icon: lineHeightIcon,
				tooltip: true
			} );

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute a command.
			this.listenTo( view, 'execute', event => {
				editor.execute(
					event.source.commandName,
					event.source.commandParam
				);
				editor.editing.view.focus();
			} );

			return view;
		} );
	}

	getListOptions( options, command ) {
		const items = new Collection();

		for ( const option of options ) {
			const label = option || 'Default';
			const item = {
				type: 'button',
				model: new ViewModel( {
					withText: true,
					label,
					commandName: 'lineHeight',
					commandParam: option
				} )
			};

			item.model.bind( 'isOn' ).to( command, 'value', value => {
				return value === option;
			} );

			items.add( item );
		}

		return items;
	}
}
