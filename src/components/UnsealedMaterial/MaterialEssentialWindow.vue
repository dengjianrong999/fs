<!--
非密封物质基本信息弹窗
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
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="nuclideName" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>日等效最大操作量：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="equivalentMaximumOperand">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>年最大用量：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="annualMaximum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>活动种类：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="activitiesType">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>类型：</span>
			</div>
			<div class="value">
				<div class="radio">
					<input type="radio" name="solidShift" id="fixed" value='固定' v-model="matterType" :disabled="disabledFlag" />
					<div class="option"></div>
					<label for="fixed">固定</label>
				</div>
				<div class="radio">
					<input type="radio" name="solidShift" id="move" value='移动' v-model="matterType" :disabled="disabledFlag" />
					<div class="option"></div>
					<label for="move">移动</label>
				</div>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>经纬度：</span>
			</div>
			<div class="value">
				<span class="warp-weft">经度</span>
				<input type="text" class="myinput inp-one" :disabled="disabledFlag" v-model="longitude">
				<span class="warp-weft">纬度</span>
				<input type="text" class="myinput inp-two" :disabled="disabledFlag" v-model="latitude">
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
				activitiesType: '',	//活动种类
				annualMaximum: '',	//年最大用量
				equivalentMaximumOperand: '',	//日等效最大操作量
				matterType: '',	//类型(固定 移动)
				nuclideName: '',	//核素名称
				remark: '',	//备注
				unitId: '',	//单位id
				workplaceId: '',	//工作场所id
				latitude: '', //纬度
				longitude: '', //经度
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
							_this.recordDate = value;
						}
					});
					laydate.render({
						elem: "#surface2",
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
				this.workplaceId = ""
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
					.get(`${_this.baseurl}WorkplaceInfo/listJson`)
					.then(function(res) {
						if (res.status == 200 || res.data.status == 1) {
							_this.InterTwo = res.data.data;
							console.log('sss',_this.InterTwo)
						}
					});
			},
			save() {
				let _this = this;
				let submitFlag = true;
				let submitMC = true;
				console.log('pkid', this.pkid);
				var a = [
					this.unitId,
					this.workplaceId,
					this.nuclideName,
					this.annualMaximum,
					this.activitiesType,
				]
				var b = [
					'请选择单位名称',
					'请选择工作场所',
					'请填写核素名称',
					'请填写年最大用量',
					'请填写活动种类',
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
					console.log("save",this.longitude)
					this.$http({
						method: "post",
						url: this.baseurl + "NontightInfo/save",
						data: {
							pkid: this.pkid,
							activitiesType: this.activitiesType,	//活动种类
							annualMaximum: this.annualMaximum,	//年最大用量
							equivalentMaximumOperand: this.equivalentMaximumOperand,	//日等效最大操作量
							matterType: this.matterType,	//类型(固定 移动)
							nuclideName: this.nuclideName,	//核素名称
							latitude: this.latitude, //纬度
							longitude: this.longitude, //经度
							remark: this.remark,	//备注
							unitId: this.unitId,	//单位id
							workplaceId: this.workplaceId,	//工作场所id
						}
					}).then(function(res) {
						if (res.status === 200 && res.data.status === '1') {
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
							url: `${this.baseurl}NontightInfo/data/${id}`
						})
						.then(function(res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data;
								_this.pkid = datas.pkid;
								_this.activitiesType = datas.activitiesType,	//活动种类
								_this.annualMaximum = datas.annualMaximum,	//年最大用量
								_this.equivalentMaximumOperand = datas.equivalentMaximumOperand,	//日等效最大操作量
								_this.matterType = datas.matterType,	//类型(固定 移动)
								_this.nuclideName = datas.nuclideName,	//核素名称
								_this.latitude = datas.latitude, //纬度
								_this.longitude = datas.longitude, //经度
								_this.addPerson = datas.addPerson, //添加人
								_this.remark = datas.remark,	//备注
								_this.unitId = datas.unitId,	//单位id
								_this.workplaceId = datas.workplaceId	//工作场所id
							}
						});
				}
			}
		}
	}
</script>
<style scoped>
	.name {
		width: 92px;
		flex: 0 0 92px;
	}

	.block:nth-child(even) .name {
		width: 120px;
		flex: 0 0 120px;
	}

	.radio input[type="radio"]:checked+div {
		/*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
		background: url(../../assets/images/duigou.png) no-repeat;
	}
</style>
