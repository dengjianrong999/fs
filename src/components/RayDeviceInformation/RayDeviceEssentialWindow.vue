<!--
射线装置信息弹窗
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
				<span>射线装置名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="deviceName" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>射线装置类别：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="deviceCategory">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>射线装置数量：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="deviceNumber">
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
				unitId: "",
				deviceName: '',
				deviceCategory: '',
				deviceNumber: '',
				activitiesType: '',
				purpose: '',
				longitude: '',
				latitude: '',
				remarks:'',
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledOne: false,
				disabledFlag: false
			};
		},
		mounted() {
			this.getDetailData();
			this.lastInterface();
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
				this.workplaceName = ""
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
			// 新增 
			save() {
				let _this = this;
				let submitFlag = true;
				let submitMC = true;
				console.log('pkid', this.pkid);
				var a = [
					this.unitId,
					this.deviceName,
					this.deviceCategory,
					this.deviceNumber,
					this.activitiesType,
				]
				var b = [
					'请选择单位名称',
					'请填写射线装置名称',
					'请填写射线装置类别',
					'请填写射线装置数量',
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
					this.$http({
						method: "post",
						url: this.baseurl + "radialdevice/save",
						data: {
							pkid: this.pkid,
							unitId: this.unitId,
							workplaceName: this.workplaceName,
							deviceName: this.deviceName,
							deviceCategory: this.deviceCategory,
							deviceNumber: this.deviceNumber,
							activitiesType: this.activitiesType,
							longitude: this.longitude,
							latitude: this.latitude,
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
					if (this.operateNum === 0) { //0详情
						this.disabledFlag = true;
					} else { // 修改
						this.disabledOne = true;
						this.disabledFlag = false;
					}
					this.$http({
							method: 'get',
							url: `${this.baseurl}radialdevice/data/${id}`
						})
						.then(function(res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data;
								_this.details = res.data.data;
								_this.pkid = _this.details.pkid;
								_this.unitId = _this.details.unitId
								_this.workplaceName = _this.details.workplaceName,
									_this.deviceName = _this.details.deviceName,
									_this.deviceCategory = _this.details.deviceCategory,
									_this.deviceNumber = _this.details.deviceNumber,
									_this.activitiesType = _this.details.activitiesType,
									_this.purpose = _this.details.purpose,
									_this.longitude = _this.details.longitude,
									_this.latitude = _this.details.latitude
							}
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
</style>
