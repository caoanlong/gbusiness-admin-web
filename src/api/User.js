import Base from './Base'
import request from '../utils/request'

class User extends Base {
    login(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/login',
            method: 'post',
            data
        })
    }

    findByToken() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findByToken'
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new User('/user', request)