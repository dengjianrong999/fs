<!--
	台账明细登记（一，放射源）
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
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.NUCLIDE_NAME:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>出厂日期：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.RELEASE_DATE:'' | time">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>出厂活度：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.RELEASE_ACTIVITY:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>标号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.LABEL:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>编码：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="datafs.length>0?currentData.ENCODING:''">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>类别：</span>
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
				fsLicenseNo:"",
				NUCLIDE_NAME: '',
				RELEASE_DATE: '',
				RELEASE_ACTIVITY: '',
				LABEL: '',
				ENCODING: '',
				CATEGORY: '',
				PURPOSE: '',
				WORKPLACE_NAME: '',
				SOURCE_TO: '',
				AUDITOR: '',
				AUDIT_DATE: '',
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
				_this.burl = 'xkzfb5Word';
				window.top.layer.open({
					title: "打印预览",
					type: 2,
					area: ["80%", "100%"],
					maxmin: true,
					anim: [parseInt(6 * Math.random())],
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
						url: `${this.baseurl}unitInfo/xkzfb5dy/${id}`
					}).then(function(res) {
						if (res.status === 200) {
							console.log("台账·放射源:",res)
							let datas = res.data.data.maplist.zsbh[0];
							_this.fsLicenseNo = datas.fsLicenseNo;
							console.log("datas:",datas)
							
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
		width: 70px;
		flex: 0 0 70px;
	}

	.block:nth-child(2n) .name {
		width: 77px;
		flex: 0 0 77px;
	}
</style>
