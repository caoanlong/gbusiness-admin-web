import Base from './Base'
import request from '../utils/request'

class Role extends Base {
    findAll() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findAll'
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new Role('/role', request)