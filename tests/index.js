import { LineHeight as LineHeightDll, icons } from '../src';
import LineHeight from '../src/LineHeight';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 LineHeight DLL', () => {
	it( 'exports LineHeight', () => {
		expect( LineHeightDll ).to.equal( LineHeight );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
