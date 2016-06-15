import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducer({
	posts: PostsReducer,
	form: formReducer
})

export default rootReducer;