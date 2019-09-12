<!--
	辐射许可证副本第一页
-->
<template>
	<div class="fs-window License-window">
		<!--输入框-->
		<div class="block">
			<div class="name">
				<span>单位名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="unitName">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>单位地址：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="unitAddress">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>法定代表人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="legalPerson">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>电话：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="legalPerPhone">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>证件类型：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="certificateType">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>号码：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="certificateNumber">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>种类和范围：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="typeRange">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>许可证条件：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="licenceConditions">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>证书编号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="fsLicenseNo">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>有效期至：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="periodValidity">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>发证日期：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="openingDate">
			</div>
		</div>
		<div class="block">
		</div>
		<div class="works block">
			<span>涉源部门</span>
		</div>
		<div class="block worksp">
			<div class="name">
				<span>工作场所名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="item.length > 0?items.workplaceName:''">
			</div>
		</div>
		<div class="block worksp">
			<div class="name">
				<span>工作场所地址：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="item.length > 0?items.workplaceSite:''">
			</div>
		</div>
		<div class="block worksp">
			<div class="name">
				<span>负责人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="item.length > 0?items.responsible:''">
			</div>
		</div>
		<div class="block worksp">
		</div>
		<div class="foot">
			<el-pagination background layout="prev, pager, next" :page-size='1' @current-change="handleCurrentChange" :total="item.length == 0 ? 1 : item.length"">
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
		props: ["id"],
		data() {
			return {
				item: [],
				items: [],
				unitName: '',
				unitAddress: '',
				legalPerson: '',
				legalPerPhone: '',
				certificateType: '',
				certificateNumber: '',
				typeRange: '',
				licenceConditions: '',
				fsLicenseNo: '',
				periodValidity: '',
				openingDate: '',
				page: 0,
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: true,
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
				_this.burl = "xkzfb1Word";
				window.top.layer.open({
					title: "打印预览",
					type: 2,
					area: ["80%", "100%"],
					maxmin: true,
					resize: false,
					anim: [parseInt(6 * Math.random())],
					content: [
						"#/QueryRadiationLicPrintBase/" +
						_this.id +
						"/" +
						_this.pkids +
						"/" +
						_this.burl
					],
					success: function(layero, index) {
						layero.find(".layui-layer-min").remove();
						window.top.layer.full(index);
					}
				});
			},
			handleCurrentChange(val) {
				return (this.items = this.item[val - 1]);
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
						url: `${this.baseurl}unitInfo/xkzfb1dy/${id}`,
					}).then(function(res) {
						if (res.status === 200) {
							console.log("副本:", res);
							let datas = res.data.data.maplist.dw[0];
							console.log("datas:", datas)
							_this.unitName = datas.unitName;
							_this.unitAddress = datas.unitAddress;
							_this.legalPerson = datas.legalPerson;
							_this.legalPerPhone = datas.legalPerPhone;
							_this.certificateType = datas.certificateType;
							_this.certificateNumber = datas.certificateNumber;
							_this.typeRange = datas.typeRange;
							_this.licenceConditions = datas.licenceConditions;
							_this.fsLicenseNo = datas.fsLicenseNo;
							_this.periodValidity = datas.periodValidity;
							_this.openingDate = datas.openingDate;

							_this.item = res.data.data.maplist.gzcs[0];
							_this.items = _this.item[_this.page];
							console.log(_this.page)
							console.log("items:", _this.item);
						}
					});
				}
			}
		}
	};
</script>
<style scoped>
	.name {
		width: 93px;
		flex: 0 0 93px;
	}

	.works {
		width: 100%;
		height: 50px;
		font: bold 16px "microsoft yahei";
		justify-content: center;
	}

	.workspancs {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.workspancs .worksp:nth-child(1),
	.workspancs .worksp:nth-child(2) {
		border-top: 0;
	}
</style>
