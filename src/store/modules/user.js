// import { login, logout, getUserInfo } from '../../api/login'

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
		Login ({commit}, user) {
			const userName = user.userName.trim()
			const password = user.password.trim()
			return new Promise((resolve, reject) => {
				// login(userName, password).then(response => {
				// 	let data = response.data
				// 	if (data.code == 200) {
				// 		commit('SET_TOKEN', response.headers['authorization'])
				// 		localStorage.setItem('token', response.headers['authorization'])
				// 		resolve(data.data)
				// 	} else {
				// 		reject(data.msg)
				// 	}
				// }).catch(error => {
				// 	reject(error)
				// })
			})
		},
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				commit('SET_USERNAME', '')
				commit('SET_AVATAR', '')
				commit('SET_TOKEN', '')
				localStorage.clear()
				sessionStorage.clear()
				resolve()
			})
		},
		GetUserInfo({ commit }) {
			return new Promise((resolve, reject) => {
				// getUserInfo().then(response => {
				// 	const data = response.data
				// 	commit('SET_USERNAME', data.data.userName)
				// 	commit('SET_AVATAR', data.data.avatar)
				// 	localStorage.setItem('userName', data.data.userName)
				// 	localStorage.setItem('avatar', data.data.avatar)
				// 	resolve(data)
				// }).catch(error => {
				// 	reject(error)
				// })
			})
		}
	}
}

export default user