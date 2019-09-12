<!--
射线装置台账管理信息弹窗
-->
<template>
	<div class="fs-window">
		<!--输入框-->
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>单位名称：</span>
			</div>
			<div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledOne" v-model="unitId">
					<el-option v-for="item in InterOne" :key="item.pkid" :label="item.unitName" :value="item.pkid" @click.native="clickRadiation">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>工作场所：</span>
			</div>
			<div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="workplaceId">
					<el-option v-for="item in InterTwo" :key="item.pkid" :label="item.workplaceName" :value="item.pkid" v-if="unitId == item.unitId">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>射线装置名称：</span>
			</div>
			<div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="deviceId">
					<el-option v-for="item in InterThree" :key="item.pkid" :label="item.deviceName" :value="item.pkid" v-if="unitId == item.unitId">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>规格型号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="specificationsModels">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>射线装置类别：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="category">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>用途：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="purpose">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>来源/去向：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="sourceTo">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>审核人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="auditor">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>审核日期：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" placeholder="--请选择审核日期--" :disabled="disabledFlag" readonly="readonly" v-model="auditDate"
				 id="surface1">
			</div>
		</div>
		<div class="block">
		</div>
		<div class="foot" v-if="operateNum">
			<div class="btn_wrap">
				<span class="btn_m btn_cancle" @click='cancle'>取消</span>
			</div>
			<div class="btn_wrap left">
				<span class="btn_m btn_confirm" @click="save()">保存</span>
			</div>
		</div>
	</div>
</template>

<script>
	// 引入子组件
	export default {
		name: 'app',
		data() {
			return {
				InterOne: [],
				InterTwo: [],
				InterThree: [],
				auditDate: '', //审核时间
				auditor: '', //审核人
				category: '', //类别
				deviceId: '', //射线装置id
				purpose: '', //用途
				sourceTo: '', //来源/去向
				specificationsModels: '', //规格型号
				unitId: '', //所属单位id
				workplaceId: '', //工作场所id
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledOne: false,
				disabledFlag: false
			};
		},
		mounted() {
			this.getDetailData();
			this.lastInterface();

			let _this = this;
			setTimeout(function() {
				layui.use("laydate", function() {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1", //指定元素
						type: "date",
						done: function(value) {
							_this.auditDate = value;
						}
					});
				});
			}, 0);
		},
		methods: {
			// 保存后关闭弹窗
			cancle() {
				this.closeIframe();
			},
			closeIframe() {
				this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
				parent.layer.close(this.frameIndex); //再执行关闭
			},
			showToggle: function(item) {
				item.isSubShow = !item.isSubShow;
			},
			// 清空工作场所
			clickRadiation() {
				this.workplaceId = "";
				this.deviceId = ""
			},
			// 获取上一个接口数据
			lastInterface() {
				let _this = this;
				_this.$http
					.get(`${_this.baseurl}unitInfo/listJson?flag=2`)
					.then(function(res) {
						if (res.status == 200 || res.data.status == 1)
							_this.InterOne = res.data.data;
					});
				_this.$http
					.get(`${_this.baseurl}WorkplaceInfo/listJson`)
					.then(function(res) {
						if (res.status == 200 || res.data.status == 1) {
							_this.InterTwo = res.data.data;
						}
					});
				_this.$http
					.get(`${_this.baseurl}radialdevice/listJson`)
					.then(function(res) {
						if (res.status == 200 || res.data.status == 1) {
							_this.InterThree = res.data.data;
						}
					});
			},
			// 新增 
			save() {
				let _this = this;
				let submitFlag = true;
				let submitMC = true;
				console.log('pkid', this.pkid);
				var a = [
					this.unitId, //单位id
					this.workplaceId, //工作场所id
					this.deviceId, //射线装置id
					this.specificationsModels, //规格型号
					this.category, //类别
					this.purpose, //用途
					this.sourceTo, //来源/去向
					this.auditor, //审核人
					this.auditDate, //审核时间
				]
				var b = [
					'请选择单位名称',
					'请选择工作场所',
					'请选择射线装置名称',
					'请填写规格型号',
					'请填写射线装置类别',
					'请填写用途',
					'请填写来源/去向',
					'请填写审核人',
					'请填写审核时间',
				]
				for (var i = 0, l = a.length; i < l; i++) {
					if (!a[i] || a[i].length == 0) {
						submitFlag = false;
						for (var j = i, len = b.length; j < len; j++) {
							if (b[j]) {
								submitMC = false;
								layer.msg(b[j], {
									icon: 2
								});
								break;
							}
						}
						break;
					}
				}
				if (submitFlag) {
					this.$http({
						method: "post",
						url: this.baseurl + "RadialdevicebookInfo/save",
						data: {
							pkid: this.pkid,
							unitId: this.unitId, //单位id
							workplaceId: this.workplaceId, //工作场所id
							deviceId: this.deviceId, //射线装置id
							specificationsModels: this.specificationsModels, //规格型号
							category: this.category, //类别
							purpose: this.purpose, //用途
							sourceTo: this.sourceTo, //来源/去向
							auditor: this.auditor, //审核人
							auditDate: this.auditDate, //审核时间
						}
					}).then(function(res) {
						if (res.status === 200 && res.data.status === '1') {
							layer.msg('保存成功！', {
								icon: 1
							});
							let timer = setTimeout(function() {
								_this.closeIframe();
								clearTimeout(timer);
							}, 1000);
						} else if (res.status === 200 && res.data.status === '-1') {
							layer.msg(res.data.message, {
								icon: 2,
							});
							console.log(res)
						}
					});
				}
			},
			// 查看或修改 
			getDetailData() {
				// this.fixedHeight(); //适应高度
				let id = this.$route.params.id;
				let _this = this;
				if (id !== 'save') { // 不是新增 
					this.operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
					id = id + '';
					console.log("id是", id)
					if (this.operateNum === 0) { //0详情
						this.disabledFlag = true;
					} else { // 修改
						this.disabledOne = true;
						this.disabledFlag = false;
					}
					this.$http({
							method: 'get',
							url: `${this.baseurl}RadialdevicebookInfo/data/${id}`
						})
						.then(function(res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data;
								_this.details = res.data.data;
								_this.pkid = _this.details.pkid;
								_this.unitId = _this.details.unitId, //单位id
									_this.workplaceId = _this.details.workplaceId, //工作场所id
									_this.deviceId = _this.details.deviceId, //射线装置id
									_this.specificationsModels = _this.details.specificationsModels, //规格型号
									_this.category = _this.details.category, //类别
									_this.purpose = _this.details.purpose, //用途
									_this.sourceTo = _this.details.sourceTo, //来源/去向
									_this.auditor = _this.details.auditor, //审核人
									_this.auditDate = _this.details.auditDate.slice(0, 10) //审核时间
							}
							console.log("hu", res)
						});
				}
			}
		}
	}
</script>
<style scoped>
	.name {
		width: 104px;
		flex: 0 0 104px;
	}

	.block:nth-child(even) .name {
		width: 82px;
		flex: 0 0 82px;
	}
</style>
