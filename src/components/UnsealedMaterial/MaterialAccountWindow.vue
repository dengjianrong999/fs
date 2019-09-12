<!--
非密封物质台账管理弹窗
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
				<span>核素名称：</span>
			</div>
			<div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="nuclideId">
					<el-option v-for="item in InterTwo" :key="item.pkid" :label="item.nuclideName" :value="item.pkid" v-if="unitId == item.unitId">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>总活度：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="totalActivity">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>频次：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="frequency">
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
				<input type="text" class="myinput" placeholder="--请选择--" :disabled="disabledFlag" v-model="auditDate" readonly="readonly"
				 id="surface1">
			</div>
		</div>
		<div class="remark">
			<div class="name">
				<span>备注：</span>
			</div>
			<div class="value">
				<textarea type="text" class="myinput" :disabled="disabledFlag" v-model="remark"></textarea>
			</div>
		</div>
		<div class="foot" v-if="operateNum">
			<div class="btn_wrap">
				<span class="btn_m btn_cancle" @click='closeIframe'>取消</span>
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
				auditDate: '', //审核日期
				auditor: '', //审核人
				frequency: '', //频次
				nuclideId: '', //核素id
				purpose: '', //用途
				remark: '', //备注
				sourceTo: '', //来源/去向
				totalActivity: '', //总活度
				unitId: '', //单位id
				changeFlag: false,
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledOne: false,
				disabledFlag: false,
				frameIndex: 99999,
			};
		},
		mounted() {
			this.searchDetial();
			this.lastInterface();
			//时间插件 
			let _this = this;
			setTimeout(function() {
				layui.use("laydate", function() {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1",
						type: "date",
						done: function(value) {
							_this.auditDate = value;
						}
					});
				});
			}, 0);
		},
		methods: {
			cancle() { // 关闭弹窗
				this.closeIframe();
			},
			closeIframe() { // 关闭弹窗
				var frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
				parent.layer.close(frameIndex); //再执行关闭
			},
			clickRadiation() {
				this.nuclideId = ""
			},
			// 获取放射源接口数据
			lastInterface() {
				let _this = this;
				_this.$http
					.get(`${_this.baseurl}unitInfo/listJson?flag=2`)
					.then(function(res) {
						if (res.status == 200 || res.data.status == 1)
							_this.InterOne = res.data.data;
					});
				_this.$http
					.get(`${_this.baseurl}NontightInfo/listJson`)
					.then(function(res) {
						if (res.status == 200 || res.data.status == 1) {
							_this.InterTwo = res.data.data;
						}
					});
			},
			save() {
				let _this = this;
				let submitFlag = true;
				let submitMC = true;
				console.log('pkid', this.pkid);
				var a = [
					this.unitId, //单位id
					this.nuclideId, //核素id
					this.totalActivity, //总活度
					this.frequency, //频次
					this.purpose, //用途
					this.sourceTo, //来源/去向
					this.auditor, //审核人
					this.auditDate, //审核日期
				]
				var b = [
					'请选择单位名称',
					'请选择核素名称',
					'请填写总活度',
					'请填写频次',
					'请填写用途',
					'请填写来源/去向',
					'请填写审核人',
					'请填写审核日期',
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
						url: this.baseurl + "NontightbookInfo/save",
						data: {
							pkid: this.pkid,
							unitId: this.unitId, //单位id
							nuclideId: this.nuclideId, //核素id
							totalActivity: this.totalActivity, //总活度
							frequency: this.frequency, //频次
							purpose: this.purpose, //用途
							sourceTo: this.sourceTo, //来源/去向
							auditor: this.auditor, //审核人
							auditDate: this.auditDate, //审核日期
							remark: this.remark, //备注
						},
					}).then(function(res) {
						if (res.status === 200 && res.data.status === '1') {
							console.log("123", res)
							layer.msg('保存成功！', {
								icon: 1,
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
			searchDetial() {
				let id = this.$route.params.id;
				let _this = this;
				if (id !== 'save') { // 不是新增 
					this.operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
					id = id + '';
					if (this.operateNum === 0) { //0详情
						this.disabledFlag = true;
					} else { // 修改
						this.disabledOne = true;
						this.disabledFlag = false;
					}
					this.$http({
							method: 'get',
							url: `${this.baseurl}NontightbookInfo/data/${id}`
						})
						.then(function(res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data;
								_this.pkid = datas.pkid;
								_this.unitId = datas.unitId, //单位id
									_this.nuclideId = datas.nuclideId, //核素id
									_this.totalActivity = datas.totalActivity, //总活度
									_this.frequency = datas.frequency, //频次
									_this.purpose = datas.purpose, //用途
									_this.sourceTo = datas.sourceTo, //来源/去向
									_this.auditor = datas.auditor, //审核人
									_this.auditDate = datas.auditDate.slice(0, 10), //审核日期
									_this.remark = datas.remark //备注
							}
						});
				}
			}
		}
	}
</script>
<style scoped>
	.name {
		width: 80px;
		flex: 0 0 80px;
	}

	.block:nth-child(even) .name {
		width: 88px;
		flex: 0 0 88px;
	}
</style>
