<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{merchantId ? '编辑' : '添加'}}商家</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
						<el-form-item label="商户名称" prop="merchantName">
							<el-input v-model="model.merchantName"></el-input>
						</el-form-item>
						<el-form-item label="联系人(报名人)" prop="merchantMemberId">
							<el-autocomplete 
								style="width:100%" 
								value-key="merchantMemberName" 
								v-model="model.merchantMemberName"
								:fetch-suggestions="getMerchantMembers"
								placeholder="请输入..." 
								@select="handSelectMerchantMember">
								<i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectMerchantMember"></i>
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="商家图片" prop="merchantImage">
							<el-upload
								class="avatar-uploader" 
								name="image"
								:action="baseURL + '/file/imageUpload'"
								:show-file-list="false"
								:before-upload="beforeImageUpload" 
								:headers="uploadHeaders" 
								:onError="uploadError" 
								:onSuccess="uploadSuccess">
								<img v-if="model.merchantImage" :src="IMGURL + model.merchantImage" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
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
import { baseURL } from '../../../utils/request'
import Merchant from '../../../api/Merchant'
import MerchantMember from '../../../api/MerchantMember'
export default {
	data() {
		return {
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			merchantId: '',
			model: {
				merchantName: '',
				merchantMemberId: '',
				merchantMemberName: '',
				merchantImage: ''
			},
			rules: {
				merchantName: [
					{required: true, message: '请输入商户名称'},
					{min: 2, max: 200, message: '长度在 2 到 200 个字符'}
				],
				merchantMemberId: [{required: true, message: '请选择报名人'}]
			}
		}
	},
	computed: {
		baseURL: () => baseURL
	},
	created() {
		this.merchantId = this.$route.query.id
		this.merchantId && this.getInfo()
	},
	methods: {
		getMerchantMembers(merchantMemberName, cb) {
			MerchantMember.findAll({ 
				merchantMemberName,
				isAddMerchant: this.merchantId ? '' : 'N'
			}).then(res => {
				cb(res)
			})
		},
		handSelectMerchantMember(merchantMember) {
			this.model.merchantMemberId = merchantMember.merchantMemberId
			this.model.merchantMemberName = merchantMember.merchantMemberName
		},
		clearSelectMerchantMember() {
			this.model.merchantMemberId = ''
			this.model.merchantMemberName = ''
		},
		getInfo() {
			Merchant.findById({ merchantId: this.merchantId }).then(res => {
				this.model = res
			})
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				if (this.merchantId) {
					const data = {
						merchantId: this.model.merchantId,
						merchantName: this.model.merchantName,
						merchantMemberId: this.model.merchantMemberId,
						merchantImage: this.model.merchantImage
					}
					Merchant.update(data).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'merchants'})
					})
				} else {
					Merchant.add(this.model).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'merchants'})
					})
				}
			})
		},
		beforeImageUpload(file) {
			const isJPG = file.type === 'image/jpeg'
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isJPG) {
				Message.error('上传头像图片只能是 JPG 格式!')
			}
			if (!isLt2M) {
				Message.error('上传头像图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		},
		// 上传成功
		uploadSuccess(res) {
			if (res.code == 200) {
				this.model.merchantImage = res.data
			} else{
				Message.error(res.msg)
			}
		},
		uploadError(res) {
			console.log(res)
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
	min-width 100px
	max-width 500px
	min-height 100px
	line-height 100px
	text-align center
.avatar
	min-width 100px
	max-width 500px
	min-height 100px
	display block
</style>