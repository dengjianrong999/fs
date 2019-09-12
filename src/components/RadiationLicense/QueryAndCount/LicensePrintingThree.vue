<!--
	辐射许可证第二页(放射源)
-->
<template>
    <div class="fs-window License-window">
        <!--输入框-->
        <div class="block">
            <div class="name">
                <span>证书编号：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" :value="fsLicenseNo">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>核素名称：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" :value="datafa.length>0?datafang.nuclideName:''">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>类别：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" :value="datafa.length>0?datafang.category:''">
            </div>
        </div>
				<div class="block">
						<div class="name">
								<span>总活度：</span>
						</div>
						<div class="value">
								<input type="text" class="myinput" :disabled="disabledFlag" :value="datafa.length>0?datafang.totalApprovedActivity:''">
						</div>
				</div>
				<div class="block">
						<div class="name">
								<span>活度种类：</span>
						</div>
						<div class="value">
								<input type="text" class="myinput" :disabled="disabledFlag" :value="datafa.length>0?datafang.activitiesType:''">
						</div>
				</div>
				<div class="block">
				</div>
        <div class="foot">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size='1'
          @current-change="handleCurrentChange"
					:total="datafa.length == 0 ? 1 : datafa.length">
        </el-pagination>
			<div class="btn_wrap">				
				<span class="btn_m btn_printing" @click="printing()">打印</span>
			</div>
        </div>

    </div>
</template>

<script>
// 引入子组件
export default {
  name: "app",
  props:['id'],
  data() {
    return {
      unitName: '',
      unitAddress: '',
      fsLicenseNo: '',
      serialNumber: '',
      nuclideName: '',
      category: '',
      totalApprovedActivity: '',
      activitiesType: '',
      operateNum: 999, //操作类型 0查看详情 1修改
      disabledFlag: true,
      page: 0,
			datafa:[],
      datafang: [],
      burl:'',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.searchDetial();
    });
  },
  methods: {
    printing() {
      let _this = this;
      _this.pkids = _this.$route.params.id;
      _this.burl  = 'xkzfb2Word';
      window.top.layer.open({
        title: "打印预览",
        type: 2,
        area: ["80%", "100%"],
        maxmin: true,
				resize :false,
				anim: [parseInt(6 * Math.random())],
        content: [
          "#/QueryRadiationLicPrintBase/" + _this.id + "/" + _this.pkids+'/'+_this.burl
					],
        success: function (layero,index) {
						layero.find('.layui-layer-min').remove()
						window.top.layer.full(index);
					},
      });
    },
    handleCurrentChange(val) {
      return (this.datafang = this.datafa[val - 1]);
    },
    cancle() {
      this.closeIframe();
    },
    closeIframe() {
      this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
      parent.layer.close(this.frameIndex); //再执行关闭
    },
    searchDetial() {
      // 操作 operateNum0详情 1修改
      // this.fixedHeight(); //适应高度
      let id = this.$route.params.id;
      let _this = this;
      if (id !== "save") {
        // 不是新增
        this.operateNum = JSON.parse(sessionStorage.getItem("operateNum")); // 操作类型 0详情 1修改
        id = id + "";
        this.$http({
          method: "get",
          url: `${this.baseurl}unitInfo/xkzfb2dy/${id}`
        }).then(function(res) {
          if (res.status === 200) {
						console.log("种类·放射源:",res);
            let datas = res.data.data.maplist.zsbh[0];
						console.log("datas",datas)
						_this.fsLicenseNo = datas.fsLicenseNo;
						
						// let datafang = res.data.data.maplist.fsy[0];
						_this.datafa = res.data.data.maplist.fsy[0];
						_this.datafang = _this.datafa[_this.page];
						console.log("datafang:",_this.datafa)
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.name {
  width: 70px;
	flex: 0 0 70px;
}
</style>
