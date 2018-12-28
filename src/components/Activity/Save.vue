<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{activityId ? '编辑' : '添加'}}活动</span>
			</div>
			<el-row>
				<el-col :span="16" :offset="4">
					<el-form label-width="120px" :model="model" :rules="rules" ref="ruleForm">
						<el-form-item label="活动大图" prop="banner">
							<el-upload
								class="avatar-uploader" 
								name="image"
								:action="baseURL + '/file/imageUpload'"
								:show-file-list="false"
								:on-success="handleImageSuccess"
								:headers="uploadHeaders" 
								:onError="uploadError" 
								:onSuccess="uploadSuccess">
								<img v-if="model.banner" :src="model.banner" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="活动名称" prop="name">
							<el-input v-model="model.name"></el-input>
						</el-form-item>
						<el-form-item label="活动价格" prop="price">
							<el-input v-model="model.price">
                                <template slot="append">元</template>
                            </el-input>
						</el-form-item>
                        <el-form-item label="活动商家" prop="merchants">
							<el-select v-model="model.merchants" placeholder="请选择" style="width:100%" multiple>
								<el-option 
									v-for="item in merchants" 
									:key="item.merchantId" 
									:label="item.merchantName" 
									:value="item.merchantId">
								</el-option>
							</el-select>
						</el-form-item>
                        <el-form-item label="活动介绍" prop="introduction">
							<el-input type="textarea" rows="3" v-model="model.introduction"></el-input>
						</el-form-item>
                        <el-form-item label="购买须知" prop="notes">
                            <textarea name="editor" id="editor" rows="10" cols="80"></textarea>
						</el-form-item>
                        <el-form-item label="截止时间" prop="endTime">
                            <el-date-picker 
                                v-model="model.endTime"
                                type="datetime" 
                                :clearable="false" 
                                style="width:100%">
                            </el-date-picker>
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
import { baseURL } from '../../utils/request'
import Activity from '../../api/Activity'
import Merchant from '../../api/Merchant'
import { checkFloat2 } from '../../utils/validator'
export default {
	data() {
		return {
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			activityId: '',
			merchants: [],
			model: {
				activityId: '',
				name: '',
				banner: '',
                price: '',
                merchants: [],
				notes: '',
				introduction: '',
				endTime: ''
			},
			rules: {
				banner: [{required: true, message: '请上传大图'}],
				name: [{required: true, message: '请输入活动名称'}],
				merchants: [{required: true, message: '请选择活动商家'}],
				notes: [{required: true, message: '请输入购买须知'}],
				introduction: [{required: true, message: '请输入活动介绍'}],
				price: [
                    {required: true, message: '请输入活动价格'},
                    {validator: checkFloat2}
                ],
                endTime: [{required: true, message: '请选择截止时间'}]
			}
		}
	},
	computed: {
		baseURL: () => baseURL
	},
	created() {
        this.activityId = this.$route.query.id
        this.getMerchants()
		this.activityId && this.getInfo()
    },
    mounted() {
		CKEDITOR.replace('editor')
	},
	methods: {
        getMerchants() {
            Merchant.findAll().then(res => {
                this.merchants = res
            })
        },
		getInfo() {
			Activity.findById({ activityId: this.activityId }).then(res => {
				this.model = res
			})
		},
		handleImageSuccess(res, file) {
			this.model.banner = URL.createObjectURL(file.raw)
		},
		// 上传成功
		uploadSuccess(res) {
			if (res.code == 200) {
				this.model.banner = res.data
			} else{
				Message.error(res.msg)
			}
		},
		uploadError(res) {
			console.log(res)
		},
		save() {
            this.model.notes = CKEDITOR.instances.editor.getData()
            console.log(this.model)
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				if (this.activityId) {
					Activity.update(this.model).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'activity'})
					})
				} else {
					Activity.add(this.model).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'activity'})
					})
				}
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
	min-width 300px
	max-width 500px
	min-height 200px
	line-height 200px
	text-align center
.avatar
	min-width 100px
    max-width 500px
	min-height 200px
	display block
</style>