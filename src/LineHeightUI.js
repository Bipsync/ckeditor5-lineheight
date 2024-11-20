import {
	Plugin,
	Collection,
	addListToDropdown,
	createDropdown as CreateDropdown,
	ViewModel
} from 'ckeditor5';

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
		const lineHeightIcon =
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 4H21V6H11V4ZM6 7V11H4V7H1L5 3L9 7H6ZM6 17H9L5 21L1 17H4V13H6V17ZM11 18H21V20H11V18ZM9 11H21V13H9V11Z"></path></svg>';
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
