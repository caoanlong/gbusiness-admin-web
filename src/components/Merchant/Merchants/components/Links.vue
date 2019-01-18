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
                <span style="margin-left:10px;color:#ff6900">{{item.price}}元</span>
                <a 
                    :href="'http://m.gbusiness.cn/#/?activityId='+item.activityId" 
                    style="margin-left:20px;color:#409EFF" :id="'link' + item.activityId">
                    http://m.gbusiness.cn/#/?activityId={{item.activityId}}
                </a>
                <el-button 
                    style="margin-left:10px;" 
                    class="linkBtn" 
                    :data-clipboard-target="'#link' + item.activityId">
                    复制链接
                </el-button>
            </el-card>
            <div v-if="activities.length == 0" style="text-align:center">暂无活动</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { Message } from 'element-ui'
import ClipboardJS from 'clipboard'
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
    mounted() {
        const linkClipboard = new ClipboardJS('.linkBtn')
        linkClipboard.on('success', function(e) {
            Message.success('已复制到剪贴板！')
            e.clearSelection()
        })
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
