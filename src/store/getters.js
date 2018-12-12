const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	userName: state => state.user.userName,
	sidebar: state => state.app.sidebar
}
export default getters