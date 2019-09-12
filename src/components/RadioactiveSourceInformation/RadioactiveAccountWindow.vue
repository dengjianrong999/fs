<!--
放射源台账管理弹窗
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
				<span>核素名称：</span>
			</div>
			<div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="nuclideId">
					<el-option v-for="item in InterThree" :key="item.pkid" :label="item.nuclideName" :value="item.pkid" v-if="unitId == item.unitId">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>出厂日期：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" placeholder="--请选择出厂日期--" :disabled="disabledFlag" readonly="readonly" v-model="releaseDate" id="surface1">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>出厂活度：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="releaseActivity">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>标号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="label">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>放射源编码：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="encoding">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>放射源类别：</span>
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
				<span>审核人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="auditor">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>审核日期：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" placeholder="--请选择审核日期--" :disabled="disabledFlag" readonly="readonly" v-model="auditDate"
				 id="surface2">
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
				auditDate: '', //审核日期
				auditor: '', //审核人
				category: '', //类别
				encoding: '', //编码
				label: '', //标号
				nuclideId: '', //核素ID
				nuclideName: '', //核素名称
				purpose: '', //用途
				releaseActivity: '', //出厂活度
				releaseDate: '', //出厂日期
				remark: '', //备注
				sourceTo: '', //来源/去向
				unitId: '', //单位id
				unitName: '', //单位名称
				workplaceId: '', //工作场所id
				workplaceName: '', //工作场所名称
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledOne: false,
				disabledFlag: false,
			};
		},
		mounted() {
			this.getDetailData();
			this.lastInterface();
			//时间插件 
			let _this = this;
			setTimeout(function() {
				layui.use("laydate", function() {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1", //指定元素
						type: "date",
						done: function(value) {
							_this.releaseDate = value;
						}
					});
					laydate.render({
						elem: "#surface2", //指定元素
						type: "date",
						done: function(value) {
							_this.auditDate = value;
						}
					});
				});
			}, 0);
		},
		methods: {
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
			clickRadiation() {
				this.workplaceId = "";
				this.nuclideId = "";
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
					.get(`${_this.baseurl}rediationsource/listJson`)
					.then(function(res) {
						if (res.status == 200 || res.data.status == 1) {
							_this.InterThree = res.data.data;
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
					this.workplaceId, //工作场所id
					this.nuclideId, //核素ID
					this.releaseDate, //出厂日期
					this.category, //类别
					this.purpose, //用途
					this.sourceTo	//来源/去向
				]
				var b = [
					'请选择单位名称',
					'请选择工作场所',
					'请选择核素名称',
					'请填写出厂日期',
					'请填写放射源类别',
					'请填写用途',
					'请填写来源/去向',
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
				   this.id = this.$route.params.id;
					this.$http({
						method: "post",
						url: this.baseurl + "RadioactivesourceledgerInfo/save",
						data: {
							pkid: this.pkid ,
							auditDate:this.auditDate,	//审核日期
							auditor:this.auditor,	//审核人
							category:this.category,	//类别
							encoding:this.encoding,	//编码
							label:this.label,	//标号
							nuclideId:this.nuclideId,	//核素ID
							nuclideName:this.nuclideName,	//核素名称
							purpose:this.purpose,	//用途
							releaseActivity:this.releaseActivity,	//出厂活度
							releaseDate:this.releaseDate,	//出厂日期
							remark:this.remark,	//备注
							sourceTo:this.sourceTo,	//来源/去向
							unitId:this.unitId,	//单位id
							unitName:this.unitName,	//单位名称
							workplaceId:this.workplaceId,	//工作场所id
							workplaceName:this.workplaceName,	//工作场所名称
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
			getDetailData() {
				// 操作 operateNum0详情 1修改
				let id = this.$route.params.id;
				console.log('id',id);
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
							url: `${this.baseurl}RadioactivesourceledgerInfo/data/${id}`
						})
						.then(function(res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data;
								console.log("123",datas)
								_this.pkid = datas.pkid,
									_this.auditDate = datas.auditDate.slice(0 , 10),	//审核日期
									_this.auditor = datas.auditor,	//审核人
									_this.category = datas.category,	//类别
									_this.encoding = datas.encoding,	//编码
									_this.label = datas.label,	//标号
									_this.nuclideId = datas.nuclideId,	//核素ID
									_this.nuclideName = datas.nuclideName,	//核素名称
									_this.purpose = datas.purpose,	//用途
									_this.releaseActivity = datas.releaseActivity,	//出厂活度
									_this.releaseDate = datas.releaseDate.slice(0 , 10),	//出厂日期
									_this.remark = datas.remark,	//备注
									_this.sourceTo = datas.sourceTo,	//来源/去向
									_this.unitId = datas.unitId,	//单位id
									_this.unitName = datas.unitName,	//单位名称
									_this.workplaceId = datas.workplaceId,	//工作场所id
									_this.workplaceName = datas.workplaceName	//工作场所名称
							}
						});
				}
			},
		}
	}
</script>
<style scoped>
	.name {
		width: 83px;
		flex: 0 0 83px;
	}

	.block:nth-child(2n) .name {
		width: 93px;
		flex: 0 0 93px;
	}

	.block:nth-child(2n) .value {
		width: -moz-calc(100% - 104px);
		width: -webkit-calc(100% - 104px);
		width: calc(100% - 104px);
	}

	.radio input[type="radio"]:checked+div {
		/*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
		background: url(../../assets/images/duigou.png) no-repeat;
	}
</style>
