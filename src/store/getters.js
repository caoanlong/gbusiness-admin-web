const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	username: state => state.user.username,
	sidebar: state => state.app.sidebar
}
export default getters