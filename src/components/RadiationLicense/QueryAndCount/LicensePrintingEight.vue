<!--
	台账明细登记(三，射线装置)
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
				<span>装置名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.DEVICE_NAME:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>规格型号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.SPECIFICATIONS_MODELS:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>射线装置类别：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.CATEGORY:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>用途：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.PURPOSE:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>工作场所：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.WORKPLACE_NAME:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>来源/去向：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.SOURCE_TO:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>审核人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.AUDITOR:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>审核日期：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.AUDIT_DATE:'' | time">
			</div>
		</div>
		<div class="block">
		</div>
		<div class="foot">
			<el-pagination background layout="prev, pager, next" :page-size='1' @current-change="handleCurrentChange" :total="datafs.length == 0 ? 1 : datafs.length">
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
		props: ['id'],
		data() {
			return {
				deviceName: '',
				fsLicenseNo: "",
				specificationsModels: '',
				deviceCategory: '',
				purpose: '',
				workplaceName: '',
				sourceTo: '',
				auditor: '',
				auditDate: '',
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: true,
				page: 0,
				currentData: [],
				datafs: [],
				burl: '',
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
				_this.burl = 'xkzfb7Word';
				window.top.layer.open({
					title: "打印预览",
					type: 2,
					area: ["80%", "100%"],
					anim: [parseInt(6 * Math.random())],
					maxmin: true,
					resize: false,
					content: [
						"#/QueryRadiationLicPrintBase/" + _this.id + "/" + _this.pkids + '/' + _this.burl
					],
					success: function(layero, index) {
						layero.find('.layui-layer-min').remove()
						window.top.layer.full(index);
					},
				});
			},
			handleCurrentChange(val) {
				return (this.currentData = this.datafs[val - 1]);
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
						url: `${this.baseurl}unitInfo/xkzfb7dy/${id}`
					}).then(function(res) {
						if (res.status === 200) {
							console.log("台账·射线:", res);
							let datas = res.data.data.maplist.zsbh[0];
							console.log("datas:", datas)
							_this.fsLicenseNo = datas.fsLicenseNo;


							_this.datafs = res.data.data.maplist.fsy[0];
							_this.currentData = _this.datafs[_this.page];
							console.log("currentData:", _this.datafs);
						}
					});
				}
			}
		}
	};
</script>
<style scoped>
	.name {
		width: 77px;
		flex: 0 0 77px;
	}

	.block:nth-child(2n) .name {
		width: 95px;
		flex: 0 0 95px;
	}
</style>
