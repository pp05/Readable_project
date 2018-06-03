import * as DBServices from '../utils/DBServices'
export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'

export const setCategory = (category) =>({
	type:SET_CATEGORY,
	category
})

export const postsById = (posts) =>({
  type: GET_POSTS,
  posts

})

export const getCategories = (categories) => ({
	type: GET_CATEGORIES,
	categories
});

/**Using thunk middleware to make asynchronous calls **/
export const fetchPosts = () => dispatch => (
  DBServices
      .fetchPostsFromServer()
      .then(posts => dispatch(postsById(posts)))
);

export const fetchCategories = () => dispatch => (
  DBServices
      .fetchCategoriesFromServer()
      .then(categories => dispatch(getCategories(categories)))
);
