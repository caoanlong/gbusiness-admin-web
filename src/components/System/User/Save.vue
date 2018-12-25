<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{$route.query.id ? '编辑' : '添加'}}用户</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
						<el-form-item label="头像" prop="avatar">
							<el-upload
								class="avatar-uploader" 
								name="image"
								:action="baseURL + '/file/imageUpload'"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload" 
								:headers="uploadHeaders">
								<img v-if="model.avatar" :src="model.avatar" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="用户名" prop="userName">
							<el-input v-model="model.userName"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="mobile">
							<el-input v-model="model.mobile"></el-input>
						</el-form-item>
						<el-form-item label="角色" prop="roleId">
							<el-select v-model="model.roleId" placeholder="请选择" style="width:100%">
								<el-option 
									v-for="item in roles" 
									:key="item.roleId" 
									:label="item.roleName" 
									:value="item.roleId">
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
import User from '../../../api/User'
import { baseURL } from '../../../utils/request'
export default {
	data() {
		return {
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			roles: [
				{
                    roleId: 1,
                    roleName: '超级管理员'
                },{
                    roleId: 2,
                    roleName: '运营管理员'
                }
			],
			model: {
				avatar: '',
				userName: '',
				mobile: '',
				roleId: ''
			},
			rules: {
				userName: [
					{required: true, message: '请输入用户名'},
					{min: 2, max: 200, message: '长度在 2 到 200 个字符'}
				]
			}
		}
	},
	computed: {
		baseURL: () => baseURL
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const userId = this.$route.query.id
			User.findById({ userId }).then(res => {
				this.model = res
			})
		},
		handleAvatarSuccess(res, file) {
			this.model.avatar = URL.createObjectURL(file.raw)
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg'
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!')
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus">
.avatar-uploader .el-upload
	border 1px dashed #d9d9d9
	border-radius 6px
	cursor pointer
	position relative
	overflow hidden
.avatar-uploader .el-upload:hover
	border-color #409EFF
.avatar-uploader-icon
	font-size 28px
	color #8c939d
	width 100px
	height 100px
	line-height 100px
	text-align center
.avatar
	width 100px
	height 100px
	display block
</style>