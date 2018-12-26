<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="用户名称">
						<el-input placeholder="请输入..." v-model="find.userName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="primary" size="mini" icon="el-icon-plus" @click="$router.push({name: 'saveuser'})">添加用户</el-button>
				<el-button type="danger" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
                    :data="list" 
                    border 
                    style="width: 100%" 
                    size="mini" 
                    @selection-change="selectionChange">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="用户名" prop="userName"></el-table-column>
					<el-table-column label="角色" prop="roleName"></el-table-column>
					<el-table-column label="创建人" prop="createName" width="100" align="center"></el-table-column>
					<el-table-column label="修改人" prop="updateName" width="100" align="center"></el-table-column>
					<el-table-column label="创建日期" align="center" width="170">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">
                                {{ scope.row.createTime | transDate('YYYY年MM月DD日 HH:mm:ss') }}
                            </span>
						</template>
					</el-table-column>
                    <el-table-column label="修改日期" align="center" width="170">
						<template slot-scope="scope">
							<span v-if="scope.row.updateTime">
                                {{ scope.row.updateTime | transDate('YYYY年MM月DD日 HH:mm:ss') }}
                            </span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="250" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="warning" icon="el-icon-edit" @click="$router.push({name: 'saveuser', query: {id: scope.row.userId}})">编辑</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.userId)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
			</div>
		</el-card>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { mixin } from '../../../utils/mixin'
import User from '../../../api/User'
export default {
    mixins: [mixin],
    data() {
        return {
            find: {
                userName: ''
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        reset() {
            this.find.userName = ''
        },
        selectionChange() {

        },
        getList() {
            User.find({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                userName: this.find.userName
            }).then(res => {
                this.total = res.total
                this.list = res.list
            })
        },
        del(userId) {
            User.del({ userId }).then(res => {
                Message.success(res.data.msg)
                this.getList()
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
