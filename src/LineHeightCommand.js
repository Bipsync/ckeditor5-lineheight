import { Command, first } from 'ckeditor5';

export default class LineHeightCommand extends Command {
	/**
     * @inheritDoc
     */
	refresh() {
		const model = this.editor.model;

		const firstBlock = first( model.document.selection.getSelectedBlocks() );
		this.isEnabled = firstBlock ? model.schema.checkAttribute( firstBlock, 'lineHeight' ) : false;
		this.value = this.isEnabled && firstBlock.hasAttribute( 'lineHeight' ) ? firstBlock.getAttribute( 'lineHeight' ) : '';
	}

	/**
     * Given a line height value, sets the line height attribute of the selected blocks
     *
     * @param {String} value The value to apply.
     */
	execute( value ) {
		const model = this.editor.model;

		model.change( writer => {
			const blocks = Array.from( model.document.selection.getSelectedBlocks() ).filter( block =>
				model.schema.checkAttribute( block, 'lineHeight' )
			);

			if ( !blocks.length ) {
				return;
			}

			if ( value ) {
				const currentValue = blocks[ 0 ].getAttribute( 'lineHeight' ) || '';
				if ( currentValue === value ) {
					return;
				}

				for ( const block of blocks ) {
					writer.setAttribute( 'lineHeight', value, block );
				}
			} else {
				for ( const block of blocks ) {
					writer.removeAttribute( 'lineHeight', block );
				}
			}
		} );

		this.fire( 'lineheight:change', {
			to: value
		} );
	}
}
