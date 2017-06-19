/**
 * Returns a Promise with the latest posts or an error on failure.
 *
 * @param   {Number} postsToShow       Number of posts to display.
 *
 * @returns {Promise} Returns a Promise which resolves to the latest posts.
 */
export function getLatestPosts( postsToShow = 5 ) {
	return new Promise( ( resolve, reject ) => {
		wp.api.init().then( () => {
			const posts = new wp.api.collections.Posts();
			posts.fetch( {
				data: {
					per_page: postsToShow,
				},
			} ).then( resolve, reject );
		}, reject );
	} );
}
