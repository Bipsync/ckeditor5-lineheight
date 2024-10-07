import {
	Essentials,
	Paragraph,
	Heading,
	ClassicEditor
} from 'ckeditor5';

import LineHeight from '../src/LineHeight.js';

/* global document */

describe( 'LineHeight', () => {
	it( 'should be named', () => {
		expect( LineHeight.pluginName ).to.equal( 'LineHeight' );
	} );

	describe( 'init()', () => {
		let domElement, editor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					LineHeight
				],
				toolbar: [
					'lineHeight'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should load LineHeight', () => {
			const myPlugin = editor.plugins.get( 'LineHeight' );

			expect( myPlugin ).to.be.an.instanceof( LineHeight );
		} );

		it( 'should add an icon to the toolbar', () => {
			expect( editor.ui.componentFactory.has( 'lineHeight' ) ).to.equal( true );
		} );
	} );
} );
