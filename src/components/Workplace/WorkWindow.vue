<!--
	工作场所弹窗
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
					<el-option v-for="item in Interface" :key="item.pkid" :label="item.unitName" :value="item.pkid">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>工作场所名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="workplaceName" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>工作场所地址：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="workplaceSite">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>工作场所等级：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="workplaceGrade">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<i class="red_star">*</i>
				<span>负责人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="responsible">
			</div>
		</div>
		<div class="block">
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
				Interface: [],
				pkid:'',
				unitId: '',
				workplaceName: '',
				workplaceSite: '',
				workplaceGrade: '',
				responsible: '',
				remark: '',
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledOne: false,
				disabledFlag: false,
				frameIndex: 99999,
			};
		},
		mounted() {
			this.searchDetial();
			this.lastInterface();
		},
		methods: {
			cancle() { // 关闭弹窗
				this.closeIframe();
			},
			closeIframe() { // 关闭弹窗
				var frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
				parent.layer.close(frameIndex); //再执行关闭
			},
			// 获取上一个接口数据
			lastInterface() {
				let _this = this;
				_this.$http
					.get(`${_this.baseurl}unitInfo/listJson?flag=2`)
					.then(function (res) {
						if (res.status == 200 || res.data.status == 1)
							_this.Interface = res.data.data;
					})
			},
			// 新增
			save() {
				let _this = this;
				let submitFlag = true;
				let submitMC = true;
				console.log('unitId', this.unitId);
				var a = [
					this.unitId,
					this.workplaceName,
					this.workplaceSite,
					this.workplaceGrade,
					this.responsible,
				]
				var b = [
					'请选择单位名称',
					'请填写工作场所名称',
					'请填写工作场所地址',
					'请填写工作场所等级',
					'请填写负责人',
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
						url: this.baseurl + "WorkplaceInfo/save",
						data: {
							pkid: this.pkid,
							unitId: this.unitId,
							workplaceName: this.workplaceName,
							workplaceSite: this.workplaceSite,
							workplaceGrade: this.workplaceGrade,
							responsible: this.responsible,
							remark: this.remark
						}
					}).then(function (res) {
						if (res.status === 200 && res.data.status === '1') {
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
							url: `${this.baseurl}WorkplaceInfo/data/${id}`
						})
						.then(function (res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data;
								console.log("sss",datas)
								_this.pkid = datas.pkid;
								_this.unitId = datas.unitId,
									_this.workplaceName = datas.workplaceName,
									_this.workplaceSite = datas.workplaceSite,
									_this.workplaceGrade = datas.workplaceGrade,
									_this.responsible = datas.responsible,
									_this.remark = datas.remark
							}
						});
				}
			}
		}
	}
</script>
<style scoped>
	.name {
		width: 102px;
		flex: 0 0 102px;
	}
</style>
