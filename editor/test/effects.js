/**
 * External dependencies
 */
import { expect } from 'chai';
import sinon from 'sinon';

/**
 * WordPress dependencies
 */
import { getBlockTypes, unregisterBlockType, registerBlockType, createBlock } from 'blocks';

/**
 * Internal dependencies
 */
import {
	mergeBlocks,
	focusBlock,
	replaceBlocks,
	savePost,
	trashPost,
} from '../actions';
import effects, { requestPostUpdate, trashPostRequest } from '../effects';
import { getGutenbergURL, getWPAdminURL } from '../utils/url';

describe( 'effects', () => {
	describe( '.MERGE_BLOCKS', () => {
		const handler = effects.MERGE_BLOCKS;

		afterEach( () => {
			getBlockTypes().forEach( ( block ) => {
				unregisterBlockType( block.slug );
			} );
		} );

		it( 'should only focus the blockA if the blockA has no merge function', () => {
			registerBlockType( 'core/test-block', {} );
			const blockA = {
				uid: 'chicken',
				name: 'core/test-block',
			};
			const blockB = {
				uid: 'ribs',
				name: 'core/test-block',
			};
			const dispatch = sinon.spy();
			handler( mergeBlocks( blockA, blockB ), { dispatch } );

			expect( dispatch ).to.have.been.calledOnce();
			expect( dispatch ).to.have.been.calledWith( focusBlock( 'chicken' ) );
		} );

		it( 'should merge the blocks if blocks of the same type', () => {
			registerBlockType( 'core/test-block', {
				merge( attributes, attributesToMerge ) {
					return {
						content: attributes.content + ' ' + attributesToMerge.content,
					};
				},
			} );
			const blockA = {
				uid: 'chicken',
				name: 'core/test-block',
				attributes: { content: 'chicken' },
			};
			const blockB = {
				uid: 'ribs',
				name: 'core/test-block',
				attributes: { content: 'ribs' },
			};
			const dispatch = sinon.spy();
			handler( mergeBlocks( blockA, blockB ), { dispatch } );

			expect( dispatch ).to.have.been.calledTwice();
			expect( dispatch ).to.have.been.calledWith( focusBlock( 'chicken', { offset: -1 } ) );
			expect( dispatch ).to.have.been.calledWith( replaceBlocks( [ 'chicken', 'ribs' ], [ {
				uid: 'chicken',
				name: 'core/test-block',
				attributes: { content: 'chicken ribs' },
			} ] ) );
		} );

		it( 'should not merge the blocks have different types without transformation', () => {
			registerBlockType( 'core/test-block', {
				merge( attributes, attributesToMerge ) {
					return {
						content: attributes.content + ' ' + attributesToMerge.content,
					};
				},
			} );
			registerBlockType( 'core/test-block-2', {} );
			const blockA = {
				uid: 'chicken',
				name: 'core/test-block',
				attributes: { content: 'chicken' },
			};
			const blockB = {
				uid: 'ribs',
				name: 'core/test-block2',
				attributes: { content: 'ribs' },
			};
			const dispatch = sinon.spy();
			handler( mergeBlocks( blockA, blockB ), { dispatch } );

			expect( dispatch ).to.not.have.been.called();
		} );

		it( 'should transform and merge the blocks', () => {
			registerBlockType( 'core/test-block', {
				merge( attributes, attributesToMerge ) {
					return {
						content: attributes.content + ' ' + attributesToMerge.content,
					};
				},
			} );
			registerBlockType( 'core/test-block-2', {
				transforms: {
					to: [ {
						type: 'blocks',
						blocks: [ 'core/test-block' ],
						transform: ( { content2 } ) => {
							return createBlock( 'core/test-block', {
								content: content2,
							} );
						},
					} ],
				},
			} );
			const blockA = {
				uid: 'chicken',
				name: 'core/test-block',
				attributes: { content: 'chicken' },
			};
			const blockB = {
				uid: 'ribs',
				name: 'core/test-block-2',
				attributes: { content2: 'ribs' },
			};
			const dispatch = sinon.spy();
			handler( mergeBlocks( blockA, blockB ), { dispatch } );

			expect( dispatch ).to.have.been.calledTwice();
			expect( dispatch ).to.have.been.calledWith( focusBlock( 'chicken', { offset: -1 } ) );
			expect( dispatch ).to.have.been.calledWith( replaceBlocks( [ 'chicken', 'ribs' ], [ {
				uid: 'chicken',
				name: 'core/test-block',
				attributes: { content: 'chicken ribs' },
			} ] ) );
		} );
	} );
	describe( '.REQUEST_POST_UPDATE', () => {
		describe( 'requestPostUpdate()', () => {
			it( 'should trigger a success action on success of request', () => {
				const dispatch = sinon.spy();
				const action = savePost( 'ID', [ 'edits' ] );
				const post = 'I is post';
				const wpApiMockSuccess = {
					data: post,
					success: false,
					Post( args ) {
						// Avoid linter complaints.
						const yolo = () => args;
						yolo();
						return this;
					},
					save() {
						return this;
					},
					done( callback ) {
						callback( this.data );
						this.success = true;
						return this;
					},
					fail( callback ) {
						if ( ! this.success ) {
							callback( this.error );
						}
					},
				};
				const networkCallback = ( aPost ) => {
					return wpApiMockSuccess.Post( aPost ).save();
				};
				const handler = requestPostUpdate( networkCallback );
				handler( action, { dispatch } );

				expect( dispatch ).to.have.been.calledOnce();
				expect( dispatch ).to.have.been.calledWith( {
					type: 'REQUEST_POST_UPDATE_SUCCESS',
					post: post,
					isNew: false,
				} );
			} );
			it( 'should handle creating a new post', () => {
				const dispatch = sinon.spy();
				const action = savePost( null, [ 'edits' ] );
				const newPost = 'I is post';
				const wpApiMockSuccess = {
					data: newPost,
					success: false,
					Post( args ) {
						// Avoid linter complaints.
						const yolo = () => args;
						yolo();
						return this;
					},
					save() {
						return this;
					},
					done( callback ) {
						callback( this.data );
						this.success = true;
						return this;
					},
					fail( callback ) {
						if ( ! this.success ) {
							callback( this.error );
						}
					},
				};
				const networkCallback = ( aPost ) => {
					return wpApiMockSuccess.Post( aPost ).save();
				};
				const handler = requestPostUpdate( networkCallback );
				handler( action, { dispatch } );

				expect( dispatch ).to.have.been.calledOnce();
				expect( dispatch ).to.have.been.calledWith( {
					type: 'REQUEST_POST_UPDATE_SUCCESS',
					post: newPost,
					isNew: true,
				} );
			} );
		} );
	} );
	describe( '.REQUEST_POST_UPDATE_SUCCESS', () => {
		it( 'should change the url of current window', () => {
			const post_id = '2';
			const action = {
				type: 'REQUEST_POST_UPDATE_SUCCESS',
				post: {
					id: post_id,
				},
				isNew: true,
			};
			const handler = effects.REQUEST_POST_UPDATE_SUCCESS;
			const stub = sinon.stub( window.history, 'replaceState' );

			// Trigger the side effects.
			handler( action );
			expect( stub.getCall( 0 ).args ).to.deep.equal( [ {}, 'Post 2', getGutenbergURL( { post_id } ) ] );
		} );
	} );
	describe( '.TRASH_POST', () => {
		describe( 'trashPostRequest()', () => {
			it( 'should trigger a success action on success of request', () => {
				const dispatch = sinon.spy();
				const action = trashPost( '2', 'page' );
				const post = { id: '2', postType: 'page' };
				const wpApiMockSuccess = {
					data: post,
					Post( args ) {
						// Avoid linter complaints.
						const yolo = () => args;
						yolo();
						return this;
					},
					save() {
						return this;
					},
					done( callback ) {
						callback( this.data );
						return this;
					},
					destroy() {
						return this;
					},
				};
				const networkCallback = ( aPost ) => {
					return wpApiMockSuccess.Post( aPost ).save();
				};
				const handler = trashPostRequest( networkCallback );
				handler( action, { dispatch } );

				expect( dispatch ).to.have.been.calledOnce();
				expect( dispatch ).to.have.been.calledWith( {
					type: 'TRASH_POST_SUCCESS',
					postId: '2',
					postType: 'page',
				} );
			} );
		} );
	} );
	describe( '.TRASH_POST_SUCCESS', () => {
		before( () => {
			/**
			 * Could not figure out a better way to test this.
			 * Hopefully JSDOM can fix this some day. Huge hack to make the
			 * window.location.href property writable and set a default value.
			 */
			Object.defineProperty( window.location, 'href', {
				writable: true,
				value: 'https://www.wordpress.org/wp-admin/edit.php?',
			} );
		} );

		after( () => {
			Object.defineProperty( window.location, 'href', {
				writable: false,
				value: 'about:bloank',
			} );
		} );

		it( 'should change the url of current window', () => {
			const handler = effects.TRASH_POST_SUCCESS;
			const postId = '2';
			const postType = 'page';
			const action = {
				type: 'TRASH_POST_SUCCESS',
				postId,
				postType,
			};
			handler( action );

			const url = getWPAdminURL( 'edit.php', {
				trashed: 1,
				post_type: postType,
				ids: postId,
			} );
			expect( window.location.href ).to.equal( url );
		} );
	} );
} );
