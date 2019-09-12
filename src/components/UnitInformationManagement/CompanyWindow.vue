<!--
单位信息管理弹窗
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
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="unitName" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>单位地址：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="unitAddress">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>法人代表人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="legalPerson">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>法人联系电话：</span>
			</div>
			<div class="value">
				<input type="phone" class="myinput" :disabled="disabledFlag" v-model="legalPerPhone">
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
				<span>证件号码：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="certificateNumber">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>统一社会信用代码：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="tyshxydm">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>行业类别：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="industryCategory">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>单位性质： </span>
			</div>
			<div class="value">
				  <label class="checkbox-inline">
						<input type='checkbox' value='生产'  v-model='natureUnit' name='checkboxinput' class='input-checkbox'> 生产
				  </label>
				  <label class="checkbox-inline">
						<input type='checkbox' value='使用' v-model='natureUnit' name='checkboxinput' class='input-checkbox'> 使用 
				  </label>  
				  <label class="checkbox-inline">
						<input type='checkbox' value='销售' v-model='natureUnit' name='checkboxinput' class='input-checkbox'> 销售
				  </label>
				<!-- <el-select placeholder="--请选择--" :disabled="disabledFlag" v-model="natureUnit">
					<el-option key="生产" label="生产" value="生产"></el-option>
					<el-option key="销售" label="销售" value="销售"></el-option>
					<el-option key="使用" label="使用" value="使用"></el-option>
				</el-select> -->
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>审批类型：</span>
			</div>
			<div class="value">
				<el-select placeholder="--请选择--" :disabled="disabledFlag" v-model="typeApproval">
					<el-option key="申领" label="申领" value="申领"></el-option>
					<el-option key="变更" label="变更" value="变更"></el-option>
					<el-option key="延续" label="延续" value="延续"></el-option>
					<el-option key="注销" label="注销" value="注销"></el-option>
					<el-option key="备案" label="备案" value="备案"></el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>许可证条件：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="licenceConditions">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>证书编号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="fsLicenseNo">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>有效期至：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" placeholder="--请选择--" :disabled="disabledFlag" v-model="periodValidity" readonly="readonly" id="surface1">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>发证日期：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" placeholder="--请选择--" :disabled="disabledFlag" v-model="openingDate" readonly="readonly" id="surface2">
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
				<span>发证机关：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="certifyingAuthority">
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
				<span>行政区划：</span>
			</div>
			<div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="administrativeDivision">
					<el-option v-for="item in Interface" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
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
				Interface: [],
				administrativeDivision: '', //行政区划
				certificateNumber: '', //证件号码
				certificateType: '', //证件类型
				certifyingAuthority: '', //发证机关
				fsLicenseNo: '', //证书编号
				industryCategory: '', //行业类别(自己填写)
				latitude: '', //纬度
				legalPerPhone: '', //法人联系电话
				legalPerson: '', //法定代表人
				licenceConditions: '', //许可证条件
				longitude: '', //经度
				natureUnit:[], //单位性质(生产、销售、使用)
				openingDate: '', //发证日期
				periodValidity: '', //有效期至
				remarks: '', //备注
				typeApproval: '', //审批类型(申领、变更、延续、注销、备案)
				typeRange: '', //种类和范围
				tyshxydm: '', //统一社会信用代码
				unitAddress: '', //单位地址
				unitName: '', //单位名称
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: false,
			};
		},
		mounted() {
			this.getDetailData();
			this.lastInterface();
			//时间插件 
			let _this = this;
			setTimeout(function () {
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1",
						type: "date",
						done: function (value) {
							_this.periodValidity = value;
						}
					});
					laydate.render({
						elem: "#surface2",
						type: "date",
						done: function (value) {
							_this.openingDate = value;
						}
					});
				});
			}, 0);
		},
		methods: {
			//行政区划下啦
			lastInterface() {
				let _this = this;
				_this.$http
					// .get('http://192.168.4.20:8080/bjsy-jdc/sys/area/listJson')
					.get(`${_this.baseurl.slice(0, 33)}/sys/area/listJson`)
					.then(function (res) {
						if (res.status == 200 || res.data.status == 1)
							_this.Interface = res.data.data;
					})
			},
			cancle() {
				this.closeIframe();
			},
			closeIframe() {
				this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
				parent.layer.close(this.frameIndex); //再执行关闭
			},
			//新增 
			save() {
				console.log('sssssssss',JSON.stringify(this.natureUnit))
				let _this = this;
				let submitFlag = true;
				let submitMC = true;
				console.log('pkid', this.pkid);
				var a = [
					this.unitName,
					this.unitAddress,
					this.legalPerson,
					this.legalPerPhone,
					this.fsLicenseNo,
					this.periodValidity,
					this.openingDate,
					this.administrativeDivision,
					this.tyshxydm,
					this.industryCategory,
					this.natureUnit,
					this.typeApproval,
					this.licenceConditions,
				]
				var b = [
					'请填写单位名称',
					'请填写单位地址',
					'请填写法人代表人',
					'请填写法人联系电话',
					'请填写证书编号',
					'请填写有效期至',
					'请填写发证日期',
					'请选择行政区划',
					'请填写统一社会信用代码',
					'请填写行业类别',
					'请填写单位性质',
					'请填写审批类型',
					'请填写许可证条件',
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
					let unitInfo = JSON.parse(sessionStorage.getItem('unitInfo'));
					console.log(unitInfo);
					// 					let reg = 11 && /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
					// 					let reg2 = /\d{3}-\d{8}|\d{4}-\d{7}/;
					// 					let sfz = 18 && /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
					// 					let sfz2 = 15 && /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
					// 					// let hz = /^[a-zA-Z0-9]{5,17}$/;
					// 					// let jd = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,4})?)|180(([.][0]{1,4})?))$/;
					// 					// let wd = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,4})?)|90(([.][0]{1,4})?))$/;
					// 					if (!reg.test(this.legalPerPhone) && !reg2.test(this.legalPerPhone)) {
					// 						layer.msg('法人联系电话格式不对', {
					// 							icon: 2
					// 						});
					// 						return;
					// 					} else if (!sfz.test(this.identityCardNumber) && !sfz2.test(this.identityCardNumber)) {
					// 						layer.msg('证件号码格式不对', {
					// 							icon: 2
					// 						});
					// 						return;
					// 					} else if (!reg.test(this.responsiblePhone) && !reg2.test(this.responsiblePhone)) {
					// 						layer.msg('负责人电话格式不对', {
					// 							icon: 2
					// 						});
					// 						return;
					// 					}
					var indexValue = this.natureUnit;
					var resultArray = indexValue.sort(
						function compareFunction(param1, param2) {
							return param1.localeCompare(param2,'zh');
						}
					);
					this.$http({
						method: "post",
						url: this.baseurl + "unitInfo/save",
						data: {
							pkid: this.pkid,
							administrativeDivision: this.administrativeDivision, //行政区划
							certificateNumber: this.certificateNumber, //证件号码
							certificateType: this.certificateType, //证件类型
							certifyingAuthority: this.certifyingAuthority, //发证机关
							fsLicenseNo: this.fsLicenseNo, //证书编号
							industryCategory: this.industryCategory, //行业类别(自己填写)
							latitude: this.latitude, //纬度
							legalPerPhone: this.legalPerPhone, //法人联系电话
							legalPerson: this.legalPerson, //法定代表人
							licenceConditions: this.licenceConditions, //许可证条件
							longitude: this.longitude, //经度
							natureUnit: indexValue.toString(), //单位性质(生产、销售、使用)
							openingDate: this.openingDate, //发证日期
							periodValidity: this.periodValidity, //有效期至0
							remarks: this.remarks, //备注
							typeApproval: this.typeApproval, //审批类型(申领、变更、延续、注销、备案)
							typeRange: this.typeRange, //种类和范围
							tyshxydm: this.tyshxydm, //统一社会信用代码
							unitAddress: this.unitAddress, //单位地址
							unitName: this.unitName, //单位名称					
						},
						 paramsSerializer: function(params) {
                           return Qs.stringify(params, {arrayFormat: 'repeat'})
                        }
					}).then(function (res) {
						if (res.status === 200 && res.data.status === '1') {
							let layerIndex = JSON.parse(sessionStorage.getItem('layerIndex'));
							layer.close(layerIndex);
							layer.msg('保存成功！', {
								icon: 1,
							});
							let timer = setTimeout(function () {
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
				let id = this.$route.params.id;
				let _this = this;
				if (id !== 'save') { // 不是新增 
					this.operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
					id = id + '';
					if (this.operateNum === 0) { //0详情
						this.disabledFlag = true;
					} else { // 修改
						this.disabledFlag = false;
					}
					this.$http({
							method: 'get',
							url: `${this.baseurl}unitInfo/data/${id}`
						})
						.then(function (res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data;
								_this.details = res.data.data;
								_this.pkid = _this.details.pkid,
									_this.unitName = _this.details.unitName,
									_this.unitAddress = _this.details.unitAddress,
									_this.administrativeDivision = _this.details.administrativeDivision, //行政区划
									_this.certificateNumber = _this.details.certificateNumber, //证件号码
									_this.certificateType = _this.details.certificateType, //证件类型
									_this.certifyingAuthority = _this.details.certifyingAuthority, //发证机关
									_this.fsLicenseNo = _this.details.fsLicenseNo, //证书编号
									_this.industryCategory = _this.details.industryCategory, //行业类别(自己填写)
									_this.latitude = _this.details.latitude, //纬度
									_this.legalPerPhone = _this.details.legalPerPhone, //法人联系电话
									_this.legalPerson = _this.details.legalPerson, //法定代表人
									_this.licenceConditions = _this.details.licenceConditions, //许可证条件
									_this.longitude = _this.details.longitude, //经度
									_this.natureUnit = _this.details.natureUnit.split(','), //单位性质(生产、销售、使用)
									_this.openingDate = _this.details.openingDate.slice(0, 10), //发证日期
									_this.periodValidity = _this.details.periodValidity.slice(0, 10), //有效期至
									_this.remarks = _this.details.remarks, //备注
									_this.typeApproval = _this.details.typeApproval, //审批类型(申领、变更、延续、注销、备案)
									_this.typeRange = _this.details.typeRange, //种类和范围
									_this.tyshxydm = _this.details.tyshxydm, //统一社会信用代码
									_this.unitAddress = _this.details.unitAddress, //单位地址
									_this.unitName = _this.details.unitName //单位名称
							}
						});
				}
			},
		}
	}
</script>
<style scoped>
	.name {
		width: 125px;
		flex: 0 0 125px;
	}
	.block:nth-child(even) .name{
		width: 105px;
		flex: 0 0 105px;
	}

	.radio input[type="radio"]:checked+div {
		/*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
		background: url(../../assets/images/duigou.png) no-repeat;
	}
</style>
