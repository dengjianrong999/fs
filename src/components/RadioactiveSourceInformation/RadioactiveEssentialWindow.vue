<!--
放射源基本信息弹窗 
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
					<el-option v-for="item in Inter" :key="item.pkid" :label="item.unitName" :value="item.pkid">
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
				<span>批准的总活度：</span>
			</div>
			<div class="value">
				<input type="text" placeholder="请输入数字" class="myinput" :disabled="disabledFlag" v-model="totalApprovedActivity"
				 oninput="value=value.replace(/[^\d]/g,'')">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>活度：</span>
			</div>
			<div class="value">
				<input type="text" placeholder="请输入数字" class="myinput" :disabled="disabledFlag" v-model="activity" oninput="value=value.replace(/[^\d]/g,'')">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>总枚数：</span>
			</div>
			<div class="value">
				<input type="text" placeholder="请输入数字" class="myinput" :disabled="disabledFlag" v-model="totalNumber" oninput="value=value.replace(/[^\d]/g,'')">
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
				<span>经纬度：</span>
			</div>
			<div class="value">
				<span class="warp-weft">经度</span>
				<input type="text" class="myinput inp-one" :disabled="disabledFlag" v-model="longitude">
				<span class="warp-weft">纬度</span>
				<input type="text" class="myinput inp-two" :disabled="disabledFlag" v-model="latitude">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>类型：</span>
			</div>
			<div class="value">
				<div class="radio">
					<input type="radio" name="solidShift" id="fixed" value='固定' v-model="radiatiotType" :disabled="disabledFlag" />
					<div class="option"></div>
					<label for="fixed">固定</label>
				</div>
				<div class="radio">
					<input type="radio" name="solidShift" id="move" value='移动' v-model="radiatiotType" :disabled="disabledFlag" />
					<div class="option"></div>
					<label for="move">移动</label>
				</div>
			</div>
		</div>
		<div class="block">
		</div>
		<div class="remark">
			<div class="name">
				<span>备注：</span>
			</div>
			<div class="value">
				<textarea type="text" class="myinput" :disabled="disabledFlag" v-model="remarks"></textarea>
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
				Inter: [],
				Interface: [],
				activitiesType: '', //活动种类
				activity: '', //活度
				category: '', //放射源类别
				latitude: '', //纬度
				longitude: '', //经度
				nuclideName: '', //核素名称
				radiatiotType: '', //辐射源类型
				remarks: '', //备注
				sourceDirection: '', //来源/去向
				totalApprovedActivity: '', //批准的总活度
				totalNumber: '', //总枚数
				unitId: '', //所属单位id
				unitName: '', //所属单位名称
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
							_this.productTime = value;
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
			// 获取上一个接口数据
			lastInterface() {
				let _this = this;
				_this.$http
					.get(`${_this.baseurl}unitInfo/listJson?flag=2`)
					.then(function(res) {
						if (res.status == 200 || res.data.status == 1)
							_this.Inter = res.data.data;
					});
			},
			save() {
				let _this = this;
				let submitFlag = true;
				let submitMC = true;
				console.log('pkid', this.pkid);
				var a = [
					this.unitId, //所属单位id
					this.nuclideName, //核素名称
					this.category, //放射源类别
					this.totalApprovedActivity, //批准的总活度
					this.activity, //活度
					this.totalNumber, //总枚数
					this.activitiesType, //活动种类
					this.radiatiotType, //辐射源类型
				]
				var b = [
					'请选择单位名称',
					'请填写核素名称',
					'请填写放射源类别',
					'请填写批准的总活度',
					'请填写活度',
					'请填写总枚数',
					'请填写活动种类',
					'请填写类型',
					'请填写密封程度',
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
						url: this.baseurl + "rediationsource/save",
						data: {
							pkid: this.pkid,
							activitiesType: this.activitiesType, //活动种类
							activity: this.activity, //活度
							category: this.category, //放射源类别
							latitude: this.latitude, //纬度
							longitude: this.longitude, //经度
							nuclideName: this.nuclideName, //核素名称
							radiatiotType: this.radiatiotType, //辐射源类型
							remarks: this.remarks, //备注
							sourceDirection: this.sourceDirection, //来源/去向
							totalApprovedActivity: this.totalApprovedActivity, //批准的总活度
							totalNumber: this.totalNumber, //总枚数
							unitId: this.unitId, //所属单位id
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
							url: `${this.baseurl}rediationsource/data/${id}`
						})
						.then(function(res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data;
								console.log(datas)
								_this.pkid = datas.pkid,
									_this.unitId = datas.unitId,
									_this.activitiesType = datas.activitiesType, //活动种类
									_this.activity = datas.activity, //活度
									_this.category = datas.category, //放射源类别
									_this.latitude = datas.latitude, //纬度
									_this.longitude = datas.longitude, //经度
									_this.nuclideName = datas.nuclideName, //核素名称
									_this.radiatiotType = datas.radiatiotType, //辐射源类型
									_this.remarks = datas.remarks, //备注
									_this.sourceDirection = datas.sourceDirection, //来源/去向
									_this.totalApprovedActivity = datas.totalApprovedActivity, //批准的总活度
									_this.totalNumber = datas.totalNumber //总枚数
							}
						});
				}
			},
		}
	}
</script>
<style scoped>
	.name {
		width: 90px;
		flex: 0 0 90px;
	}

	.block:nth-child(2n) .name {
		width: 145px;
		flex: 0 0 145px;
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
