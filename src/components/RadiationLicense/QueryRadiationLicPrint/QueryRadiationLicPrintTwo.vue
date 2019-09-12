<template>
	<div id="printpage" class="print-portrait">
		<table :class='["table-printTwo",{"landscape":landscape.hidden}]'>
			<tr>
				<td colspan="5" style="text-indent: 2em;">根据《中华人民共和国放射性污染防治法》和《放射性同位素</td>
			</tr>
			<tr>
				<td colspan="5">与射线装置安全和防护条例》等法律法规的规定，经审查准予在许</td>
			</tr>
			<tr>
				<td colspan="5" style="text-align: left; text-indent: 0.2em;">可种类和范围内从事活动。</td>
			</tr>
			<tr>
				<td width="80px">单&nbsp;位&nbsp;名&nbsp;称</td>
				<td colspan='4' class="model">{{datas.unitName}}</td>
			</tr>
			<tr>
				<td>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</td>
				<td colspan='4' class="model">{{datas.unitAddress}}</td>
			</tr>
			<tr>
				<td>法定代表人</td>
				<td width="100px" class="model">{{datas.legalPerson}}</td>
				<td width="50px">电话</td>
				<td colspan="2" class="model">{{datas.legalPerPhone}}</td>
			</tr>
			<tr>
				<td>证&nbsp;件&nbsp;类&nbsp;型</td>
				<td class="model">{{datas.certificateType}}</td>
				<td>号码</td>
				<td colspan="2" class="model">{{datas.certificateNumber}}</td>
			</tr>
			<tr>
				<td rowspan='7'>涉&nbsp;&nbsp;&nbsp;&nbsp;源<br><br>部&nbsp;&nbsp;&nbsp;&nbsp;门</td>
				<td>名 称</td>
				<td colspan="2">地 址</td>
				<td width="60px">负责人</td>
			</tr>
			<tr v-for="(item,index) in 6">
				<td class="model">{{listS.length > index?listS[index].workplaceName:''}}</td>
				<td colspan="2" class="model">{{listS.length > index?listS[index].workplaceSite:''}}</td>
				<td class="model">{{listS.length > index?listS[index].responsible:''}}</td>
			</tr>
			<tr>
				<td>种类和范围</td>
				<td colspan='4' style="height: 20mm;" class="model">{{datas.typeRange}}</td>
			</tr>
			<tr>
				<td>许可证条件</td>
				<td colspan='4' style="height: 15mm;" class="model">{{datas.licenceConditions}}</td>
			</tr>
			<tr>
				<td>证&nbsp;书&nbsp;编&nbsp;号</td>
				<td colspan='4' class="model">{{datas.fsLicenseNo}}</td>
			</tr>
			<tr>
				<td>有&nbsp;效&nbsp;期&nbsp;至</td>
				<td colspan='4'>
					<div class="timeda">
						<span class="model">{{Year2}}</span>年
						<span class="model">{{mounth2}}</span>月
						<span class="model">{{data2}}</span>日
					</div>
				</td>
				</td>
			</tr>
			<tr>
				<td>发&nbsp;证&nbsp;日&nbsp;期</td>
				<td colspan='4'>
					<div class="timeda">
						<span class="model">{{Year}}</span>年
						<span class="model">{{mounth}}</span>月
						<span class="model">{{data}}</span>日（发证机关章）
					</div>
				</td>
			</tr>
		</table>
	</div>
</template>
<style scoped>
	table.landscape {
		margin-top: 15mm !important;
	}

	table.landscape td {
		border: none !important;
		visibility: hidden !important;
	}

	table.landscape tr .model {
		visibility: visible !important;
		text-align: center;
	}
	.timeda{
		width: 100%;
		height: 100%;
		text-align: left;
		display: flex;
		align-items: center;
	}
	.timeda span{
		width: 30px;
		text-align: center;
		display: inline-block;
	}
	.timeda span:nth-child(1){
		width: 70px;
	}
</style>
<script>
	export default {
		props: ['landscape'],
		data() {
			return {
				datas: [],
				listS: [],
				Year: "",
				mounth: "",
				data: "",
				Year2: "",
				mounth2: "",
				data2: "",
				Index: '',
			};
		},
		mounted() {
			this.getdata();
		},
		methods: {
			getdata() {
				var _this = this;
				var id = _this.$route.params.pkids;
				this.$http({
						method: "get",
						url: `${this.baseurl}unitInfo/xkzfb1dy/${id}`,
					})
					.then(function(res) {
						if (res.data.status == 1) {
							console.log("副本打印:", res);
							_this.datas = res.data.data.maplist.dw[0];

							_this.listS = res.data.data.maplist.gzcs[0];
							console.log("list:", _this.listS);
							//发证日期
							_this.Year = _this.datas.openingDate.slice(0, 4);
							_this.mounth = _this.datas.openingDate.slice(5, 7);
							_this.data = _this.datas.openingDate.slice(8, 10);
							//有效期
							_this.Year2 = _this.datas.periodValidity.slice(0, 4);
							_this.mounth2 = _this.datas.periodValidity.slice(5, 7);
							_this.data2 = _this.datas.periodValidity.slice(8, 10);
						}
					})
					.catch(function(res) {});
			}
		}
	};
</script>
