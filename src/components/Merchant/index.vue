<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>商家列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="商家名称">
						<el-input placeholder="请输入..." v-model="find.merchantName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="primary" size="mini" icon="el-icon-plus" @click="add">添加联盟商</el-button>
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
					<el-table-column label="商家名称" prop="merchantName"></el-table-column>
					<el-table-column label="推广/人" prop="promotionCount"></el-table-column>
					<el-table-column label="购买/单" prop="buyCount"></el-table-column>
					<el-table-column label="链接" prop="link">
                        <template slot-scope="scope">
                            <a :href="scope.row.link">链接</a>
                        </template>
                    </el-table-column>
					<el-table-column label="创建人" prop="createBy" width="100" align="center"></el-table-column>
					<el-table-column label="创建日期" align="center" width="170">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{ scope.row.createTime | transDate('YYYY年MM月DD日 hh:mm:ss') }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="warning" icon="el-icon-edit" @click="edit(scope.row.merchantId)">编辑</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.merchantId)">删除</el-button>
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
export default {
    data() {
        return {
            total: 400,
            pageIndex: 1,
            pageSize: 100,
            find: {
                merchantName: ''
            },
            list: [
                {
                    merchantId: 1,
                    merchantName: '缤纷鸟美术教育',
                    promotionCount: 45,
                    buyCount: 20,
                    link: 'http://www.baidu.com',
                    createBy: '龙哥',
                    createTime: new Date()
                }
            ],
            selectedList: []
        }
    },
    methods: {
        reset() {
            this.find.merchantName = ''
        },
        handleSizeChange() {

        },
        handleCurrentChange() {

        },
        selectionChange() {

        },
        search() {

        },
        add() {

        },
        edit() {

        },
        del() {

        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
