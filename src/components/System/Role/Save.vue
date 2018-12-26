<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{roleId ? '编辑' : '添加'}}角色</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
						<el-form-item label="角色名" prop="roleName">
							<el-input v-model="model.roleName"></el-input>
						</el-form-item>
                        <el-form-item label="权限">
							<el-select v-model="model.permissions" placeholder="请选择" style="width:100%" multiple>
								<el-option 
									v-for="(item, i) in permissions" 
									:key="i" 
									:label="item.name" 
									:value="item.path">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Role from '../../../api/Role'
import menus from '../../../assets/data/menus.json'
export default {
	data() {
		return {
			permissions: [],
			roleId: '',
			model: {
				roleId: '',
                roleName: '',
                permissions: []
			},
			rules: {
				roleName: [
					{required: true, message: '请输入用户名'},
					{min: 2, max: 200, message: '长度在 2 到 200 个字符'}
				]
			}
		}
    },
    created() {
		this.roleId = this.$route.query.id
		this.roleId && this.getInfo()
		this.menuPermissions(menus)
    },
	methods: {
		getInfo() {
			Role.findById({ roleId: this.roleId }).then(res => {
				this.$set(this.model, 'roleId', res.roleId)
				this.$set(this.model, 'roleName', res.roleName)
				this.$set(this.model, 'permissions', res.permissions.split(','))
			})
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				const data = Object.assign({}, this.model)
				data.permissions = data.permissions.join(',')
				if (this.roleId) {
					Role.update(data).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'role'})
					})
				} else {
					Role.add(data).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'role'})
					})
				}
			})
		},
		menuPermissions(list) {
			for (let i = 0; i < list.length; i++) {
				this.permissions.push(list[i].permission)
				if (list[i].children && list[i].children.length > 0) {
					this.menuPermissions(list[i].children)
				}
			}
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>