<!--
	辐射许可证打印正本
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
				<span>许可证号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="fsLicenseNo">
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
				<span>有效期：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="periodValidity" readonly="readonly">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>发证机关：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="certifyingAuthority">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>发证日期：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="openingDate" readonly="readonly" id="">
			</div>
		</div>
		<div class="foot">
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
				unitName: '',
				unitAddress: '',
				legalPerson: '',
				fsLicenseNo: '',
				typeRange: '',
				periodValidity: '',
				certifyingAuthority: '',
				openingDate: '',
				pkids: "",
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: true,
				burl: ""
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
				//导出word路由变量
				_this.burl = "xkzzbWord";
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
				// this.$http({
				//     method:'get',
				//     url:'/api/bjsy-jdc/fs/unitInfo/exportxkz',
				//     responseType: 'blob'
				// }).then(res => {
				//     this.download(res);
				// });
			},
			download(data) {
				if (!data) return;
				const fileName = decodeURI(
					data.headers["content-disposition"].slice(
						data.headers["content-disposition"].indexOf("=") + 1
					)
				);
				if ("download" in document.createElement("a")) {
					// 非IE下载
					const link = document.createElement("a");
					link.download = fileName;
					link.style.display = "none";
					link.href = URL.createObjectURL(new Blob([data.data]));
					document.body.appendChild(link);
					link.click();
					URL.revokeObjectURL(link.href); // 释放URL 对象
					document.body.removeChild(link);
				} else {
					// IE10+下载
					navigator.msSaveBlob(new Blob([data.data]), fileName);
				}
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
						url: `${this.baseurl}unitInfo/xkzzb/${id}`
					}).then(function(res) {
						if (res.status === 200) {
							console.log("正本：", res);
							let datas  = res.data.data;
							console.log("asd".datas);
							_this.unitName = datas.unitName;
							_this.unitAddress = datas.unitAddress;
							_this.legalPerson = datas.legalPerson;
							_this.fsLicenseNo = datas.fsLicenseNo;
							_this.typeRange = datas.typeRange;
							_this.periodValidity = datas.periodValidity.slice(0, 10);
							_this.certifyingAuthority = datas.certifyingAuthority;
							_this.openingDate = datas.openingDate.slice(0, 10);
						}
					});
				}
			}
		}
	};
</script>
<style scoped>
	.name {
		width: 83px;
		flex: 0 0 83px;
	}
	.block:nth-child(2n) .name {
		width: 73px;
		flex: 0 0 73px;
	}
</style>
