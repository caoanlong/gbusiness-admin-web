<template>
    <div>
        <el-dialog 
            title="活动链接列表" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false" 
            :modal-append-to-body="false"
            v-loading="loading">
            <el-card 
                style="margin-bottom:10px" 
                shadow="always" 
                v-for="item in activities" 
                :key="item.activityId">
                <span>{{item.name}}</span>
                <span style="margin-left:10px;color:#409EFF">{{item.price}}元</span>
            </el-card>
            <div v-if="activities.length == 0" style="text-align:center">暂无活动</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Merchant from '../../../../api/Merchant'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        merchantId: String | Number
    },
    watch: {
        isVisible(newValue) {
            newValue && this.getActivies(this.merchantId)
        }
    },
    data() {
        return {
            activities: [],
            loading: true
        }
    },
    methods: {
        getActivies(merchantId) {
            Merchant.findActivies({ merchantId }).then(res => {
                this.loading = false
                this.activities = res
            })
        },
        close() {
            this.$emit('on-close')
        }
    }
}
</script>

<style lang="stylus">

</style>
