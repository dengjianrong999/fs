<!--
辐射检查管理弹窗
-->
<template>
	<div class="fs-window">
		<!--输入框-->
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>被检查单位：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="inspectedUnit" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
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
				<span>联系人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="linkman">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>联系电话：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="contactNumber">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>许可证号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="licenseKey">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>检查日期：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" placeholder="--请选择--" :disabled="disabledFlag" v-model="checkDate" readonly="readonly" id="surface1">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>检查类型：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="checkType">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>是否例行检查：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="whetherRoutineCheck">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>是否联合检查：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="whetherJointInspection">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>工作场所：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="workplaceName">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>单位性质：</span>
			</div>
			<div class="value">
				<!-- <el-select placeholder="--请选择--" :disabled="disabledFlag" v-model="natureUnit">
					<el-option key="生产" label="生产" value="生产"></el-option>
					<el-option key="销售" label="销售" value="销售"></el-option>
					<el-option key="使用" label="使用" value="使用"></el-option>
				</el-select> -->
			<label class="checkbox-inline">
					<input type='checkbox' value='生产'  v-model='natureUnit' name='checkboxinput' class='input-checkbox'> 生产
			</label>
			<label class="checkbox-inline">
					<input type='checkbox' value='使用' v-model='natureUnit' name='checkboxinput' class='input-checkbox'> 使用 
			</label> 
			<label class="checkbox-inline">
					<input type='checkbox' value='销售' v-model='natureUnit' name='checkboxinput' class='input-checkbox'> 销售
			</label>
		
		</div>
		</div>
		<div class="block">
			<div class="name">
				<span>年度评估报告：</span>
			</div>
			<div class="value">
				<el-select placeholder="--请选择--" :disabled="disabledFlag" v-model="annualAssessmentReport">
					<el-option key="未报" label="未报" value="未报"></el-option>
					<el-option key="已报" label="已报" value="已报"></el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>非密封场所：</span>
			</div>
			<div class="value">
				<el-select placeholder="--请选择--" :disabled="disabledFlag" v-model="unsealedSite">
					<el-option key="甲级" label="甲级" value="甲级"></el-option>
					<el-option key="乙级" label="乙级" value="乙级"></el-option>
					<el-option key="丙级" label="丙级" value="丙级"></el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>使用核素：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="usingNuclide">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>放射源总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radioactivesourcesSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>放射源一类总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radioactivesourcesOneSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>放射源二类总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radioactivesourcesTwoSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>放射源三类总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radioactivesourcesThreeSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>放射源四类总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radioactivesourcesFourSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>放射源五类总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radioactivesourcesFiveSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>射线装置总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="raydeviceSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>射线装置一类总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="raydeviceOneSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>射线装置二类总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="raydeviceTwoSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>射线装置三类总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="raydeviceThreeSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>是否环评验收：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="whetherEiaAcceptance">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>辐射工作人员总数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radiationWorkerSum">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>中级培训人员数量：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="intermediateTrainerNumber">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>初级培训人员数量：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="juniorTrainerNumber">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>未参加培训人数：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="notTrainerNumber">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>检查意见：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="checkOpinion">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>检查人员签字：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="checkerSign">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>被检查单位签字：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="inspectedUnitSign">
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
				inspectedUnit: '', //被检查单位
				unitAddress: '', //单位地址
				linkman: '', //联系人
				contactNumber: '', //联系电话
				licenseKey: '', //许可证号
				checkDate: '', //检查日期
				checkType: '', //检查类型
				whetherRoutineCheck: '', //是否例行检查
				whetherJointInspection: '', //是否联合检查
				workplaceName: '', //工作场所
				natureUnit: [], //单位性质（生产、销售、使用）
				annualAssessmentReport: '', //年度评估报告(已报/未报)
				unsealedSite: '', //非密封场所（甲级、已级、本级）
				usingNuclide: '', //使用核素
				radioactivesourcesSum: '', //放射源总数
				radioactivesourcesOneSum: '', //放射源一类总数
				radioactivesourcesTwoSum: '', //放射源二类总数
				radioactivesourcesThreeSum: '', //放射源三类总数
				radioactivesourcesFourSum: '', //放射源四类总数
				radioactivesourcesFiveSum: '', //放射源五类总数
				raydeviceSum: '', //射线装置总数
				raydeviceOneSum: '', //射线装置一类总数
				raydeviceTwoSum: '', //射线装置二类总数
				raydeviceThreeSum: '', //射线装置三类总数
				whetherEiaAcceptance: '', //是否环评验收
				radiationWorkerSum: '', //辐射人员总数
				intermediateTrainerNumber: '', //中级培训人员数量
				juniorTrainerNumber: '', //初级培训人员数量
				notTrainerNumber: '', //未参加培训人数
				checkOpinion: '', //检查意见
				checkerSign: '', //检查人签字
				inspectedUnitSign: '', //被检查单位签字
				changeFlag: false,
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: false,
				frameIndex: 99999,
			};
		},
		mounted() {
			this.searchDetial();
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
							_this.checkDate = value;
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
			save() {
				let _this = this;
				let submitFlag = true;
				let submitMC = true;
				console.log('pkid', this.pkid);
				var a = [
					this.inspectedUnit, //被检查单位
					this.checkDate, //检查日期
					this.checkType, //检查类型
					this.whetherRoutineCheck, //是否例行检查
					this.whetherJointInspection, //是否联合检查
					this.natureUnit, //单位性质（生产、销售、使用）
					this.checkOpinion //检查意见
				]
				var b = [
					'请填写被检查单位',
					'请填写检查日期',
					'请填写检查类型',
					'请填写是否例行检查',
					'请填写是否联合检查',
					'请填写单位性质',
					'请填写检查意见'
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
					var indexValue = this.natureUnit;
					var resultArray = indexValue.sort(
						function compareFunction(param1, param2) {
							return param1.localeCompare(param2,'zh');
						}
					);
					this.$http({
						method: "post",
						url: this.baseurl + "CheckInfo/save",
						data: {
							pkid: this.pkid,
							inspectedUnit: this.inspectedUnit, //被检查单位
							unitAddress: this.unitAddress, //单位地址
							linkman: this.linkman, //联系人
							contactNumber: this.contactNumber, //联系电话
							licenseKey: this.licenseKey, //许可证号
							checkDate: this.checkDate, //检查日期
							checkType: this.checkType, //检查类型
							whetherRoutineCheck: this.whetherRoutineCheck, //是否例行检查
							whetherJointInspection: this.whetherJointInspection, //是否联合检查
							workplaceName: this.workplaceName, //工作场所
							natureUnit: JSON.stringify(indexValue), //单位性质（生产、销售、使用）
							annualAssessmentReport: this.annualAssessmentReport, //年度评估报告(已报/未报)
							unsealedSite: this.unsealedSite, //非密封场所（甲级、已级、本级）
							usingNuclide: this.usingNuclide, //使用核素
							radioactivesourcesSum: this.radioactivesourcesSum, //放射源总数
							radioactivesourcesOneSum: this.radioactivesourcesOneSum, //放射源一类总数
							radioactivesourcesTwoSum: this.radioactivesourcesTwoSum, //放射源二类总数
							radioactivesourcesThreeSum: this.radioactivesourcesThreeSum, //放射源三类总数
							radioactivesourcesFourSum: this.radioactivesourcesFourSum, //放射源四类总数
							radioactivesourcesFiveSum: this.radioactivesourcesFiveSum, //放射源五类总数
							raydeviceSum: this.raydeviceSum, //射线装置总数
							raydeviceOneSum: this.raydeviceOneSum, //射线装置一类总数
							raydeviceTwoSum: this.raydeviceTwoSum, //射线装置二类总数
							raydeviceThreeSum: this.raydeviceThreeSum, //射线装置三类总数
							whetherEiaAcceptance: this.whetherEiaAcceptance, //是否环评验收
							radiationWorkerSum: this.radiationWorkerSum, //辐射人员总数
							intermediateTrainerNumber: this.intermediateTrainerNumber, //中级培训人员数量
							juniorTrainerNumber: this.juniorTrainerNumber, //初级培训人员数量
							notTrainerNumber: this.notTrainerNumber, //未参加培训人数
							checkOpinion: this.checkOpinion, //检查意见
							checkerSign: this.checkerSign, //检查人签字
							inspectedUnitSign: this.inspectedUnitSign, //被检查单位签字
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
						this.disabledFlag = false;
					}
					this.$http({
							method: 'get',
							url: `${this.baseurl}CheckInfo/data/${id}`
						})
						.then(function(res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data;
								_this.pkid = datas.pkid;
								_this.inspectedUnit = datas.inspectedUnit; //被检查单位
								_this.unitAddress = datas.unitAddress; //单位地址
								_this.linkman = datas.linkman; //联系人
								_this.contactNumber = datas.contactNumber; //联系电话
								_this.licenseKey = datas.licenseKey; //许可证号
								_this.checkDate = datas.checkDate.slice(0, 10); //检查日期
								_this.checkType = datas.checkType; //检查类型
								_this.whetherRoutineCheck = datas.whetherRoutineCheck; //是否例行检查
								_this.whetherJointInspection = datas.whetherJointInspection; //是否联合检查
								_this.workplaceName = datas.workplaceName; //工作场所
								_this.natureUnit = datas.natureUnit.split(','); //单位性质（生产、销售、使用）
								_this.annualAssessmentReport = datas.annualAssessmentReport; //年度评估报告(已报/未报)
								_this.unsealedSite = datas.unsealedSite; //非密封场所（甲级、已级、本级）
								_this.usingNuclide = datas.usingNuclide; //使用核素
								_this.radioactivesourcesSum = datas.radioactivesourcesSum; //放射源总数
								_this.radioactivesourcesOneSum = datas.radioactivesourcesOneSum; //放射源一类总数
								_this.radioactivesourcesTwoSum = datas.radioactivesourcesTwoSum; //放射源二类总数
								_this.radioactivesourcesThreeSum = datas.radioactivesourcesThreeSum; //放射源三类总数
								_this.radioactivesourcesFourSum = datas.radioactivesourcesFourSum; //放射源四类总数
								_this.radioactivesourcesFiveSum = datas.radioactivesourcesFiveSum; //放射源五类总数
								_this.raydeviceSum = datas.raydeviceSum; //射线装置总数
								_this.raydeviceOneSum = datas.raydeviceOneSum; //射线装置一类总数
								_this.raydeviceTwoSum = datas.raydeviceTwoSum; //射线装置二类总数
								_this.raydeviceThreeSum = datas.raydeviceThreeSum; //射线装置三类总数
								_this.whetherEiaAcceptance = datas.whetherEiaAcceptance; //是否环评验收
								_this.radiationWorkerSum = datas.radiationWorkerSum; //辐射人员总数
								_this.intermediateTrainerNumber = datas.intermediateTrainerNumber; //中级培训人员数量
								_this.juniorTrainerNumber = datas.juniorTrainerNumber; //初级培训人员数量
								_this.notTrainerNumber = datas.notTrainerNumber; //未参加培训人数
								_this.checkOpinion = datas.checkOpinion; //检查意见
								_this.checkerSign = datas.checkerSign; //检查人签字
								_this.inspectedUnitSign = datas.inspectedUnitSign; //被检查单位签字
							}
						});
				}
			}
		}
	}
</script>
<style scoped>
	.name {
		width: 118px;
		flex: 0 0 118px;
	}
	.block:nth-child(even) .name {
		width: 120px;
		flex: 0 0 120px;
	}
</style>
