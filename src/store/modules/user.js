import User from '../../api/User'

const user = {
	state: {
		userName: localStorage.getItem('userName'),
		token: localStorage.getItem('token'),
		avatar: localStorage.getItem('avatar')
	},
	mutations: {
		SET_USERNAME: (state, userName) => {
			state.userName = userName
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		}
	},
	actions: {
		login ({commit}, token) {
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', token)
				localStorage.setItem('token', token)
				resolve()
			})
		},
		logOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				commit('SET_USERNAME', '')
				commit('SET_AVATAR', '')
				commit('SET_TOKEN', '')
				localStorage.clear()
				sessionStorage.clear()
				resolve()
			})
		},
		getUserInfo({ commit }) {
			return new Promise((resolve, reject) => {
				User.findByToken().then(res => {
					commit('SET_USERNAME', res.userName)
					commit('SET_AVATAR', res.avatar)
					localStorage.setItem('userName', res.userName)
					localStorage.setItem('avatar', res.avatar)
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}

export default user