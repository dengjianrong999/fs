<!--
	无效弹窗
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
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="unitName">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>地址：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="address">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>法定代表人：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="legalReprese">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>证书编号：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="certificateNo">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>种类和范围：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="typeRange">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>有效期：</span>
            </div>
            <div class="value">
				<i class="el-input__icon el-icon-date"></i>
                <input type="text" placeholder="--请选择有效期--" class="myinput" :disabled="disabledFlag" v-model="validityPeriod" readonly="readonly"  id="surface1">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>发证机关：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="issuingOrgan">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>发证日期：</span>
            </div>
            <div class="value">
				<i class="el-input__icon el-icon-date"></i>
                <input type="text" placeholder="--请选择发证时间--" class="myinput" :disabled="disabledFlag" v-model="issuingTime" readonly="readonly"  id="surface2">
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
            <div class="btn_wrap">
                <span class="btn_m btn_confirm" @click="save()">保存</span>
            </div>
			<div class="btn_wrap" style="display: none;">				
				<span class="btn_m btn_printing" @click="printing()">打印</span>
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
                addPerson: "",
                addTime: "",
                address: "",
                certificateNo: "",
                issuingOrgan: "",
                issuingTime: "",
                legalReprese: "",
                pkid: "",
                remarks: "",
                typeRange: "",
                unitName: "",
                validityPeriod: "",
                operateNum: 999, //操作类型 0查看详情 1修改
                disabledFlag: false
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.searchDetial();
            })
			//时间插件 
			let _this = this;
			setTimeout(function () {
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1", //开始
						type: "datetime",
						done: function (value) {
								_this.validityPeriod = value;
						}
					});
					laydate.render({
						elem: "#surface2", //结束
						type: "datetime",
						done: function (value) {
								_this.issuingTime = value;
						}
					});
				});
			}, 0);
        },
        methods: {
            cancle(){
                this.closeIframe();
            },
            closeIframe(){
                this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
                parent.layer.close(this.frameIndex); //再执行关闭
            },
            save() {
                let _this = this;
                if (this.operateNum === 999) { // 新增
                    this.pkid = Date.parse(new Date());
                }
                let submitFlag = true;
                let submitMC = true;
                console.log('pkid', this.pkid);
                var a = [
                    this.unitName,
                    this.address,
                    this.legalReprese,
                    this.certificateNo,
                    this.typeRange,
                    this.validityPeriod
                ]
                var b = [
                    '请填写单位名称',
                    '请填写地址',
                    '请填写法定代表人',
                    '请填写证书编号',
                    '请填写种类和范围',
                    '请填写有效期'
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
                        url: this.baseurl + "licenceorignial/save",
                        data: {
                            "pkid": this.pkid,
                            "address": this.address,
                            "certificateNo": this.certificateNo,
                            "issuingOrgan": this.issuingOrgan,
                            "issuingTime": this.issuingTime,
                            "legalReprese": this.legalReprese,
                            "typeRange": this.typeRange,
                            "unitName": this.unitName,
                            "validityPeriod": this.validityPeriod,
                            "remarks": this.remarks
                        }
                    }).then(function (res) {
                        if (res.status === 200 && res.data.status === '1') {
                            let layerIndex = JSON.parse(sessionStorage.getItem('layerIndex'));
                            layer.close(layerIndex);
                            layer.msg('保存成功！', {
                                icon: 1,
                            });
                            let timer = setTimeout(function(){
                             _this.closeIframe();
                             clearTimeout(timer);
                            },1000);
                        }
                    });
                }
            },
            searchDetial() { // 操作 operateNum0详情 1修改
                // this.fixedHeight(); //适应高度
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
                            url: `${this.baseurl}licenceorignial/data/${id}`
                        })
                        .then(function (res) {
                            if (res.status === 200 && res.data.status === '1') {
                                console.log(res.data.data)
                                let datas = res.data.data;
                                _this.pkid = datas.pkid;
                                _this.addPerson = datas.addPerson;
                                _this.addTime = datas.addTime;
                                _this.certificateNo = datas.certificateNo;
                                _this.issuingOrgan = datas.issuingOrgan;
                                _this.issuingTime = datas.issuingTime;
                                _this.legalReprese = datas.legalReprese;
                                _this.remarks = datas.remarks;
                                _this.typeRange = datas.typeRange;
                                _this.unitName = datas.unitName;
                                _this.validityPeriod = datas.validityPeriod;
                                _this.address = datas.address;
                            }
                        });
                }
            },
        }
    }
</script>
<style scoped>
    .name {
        width: 100px;
		flex: 0 0 100px;
    }
</style>
