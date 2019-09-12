<template>
	<div id="printpage" class="print-portrait">
		<table :class='["table-printTFF",{"landscape":landscape.hidden}]'>
			<thead>
				<tr>
					<td colspan="7" style="font: bold 16px 'microsoft yahei';">活&nbsp;动&nbsp;种&nbsp;类&nbsp;和&nbsp;范&nbsp;围</td>
				</tr>
				<tr>
					<td colspan="7">（二）非密封放射性物质</td>
				</tr>
				<tr>
					<td colspan="7">
						<div>
							<span>证书编号：</span>
							<span class="model">{{fsLicenseNo}}</span>
						</div>
					</td>
				</tr>
			</thead>
			<col width="37px">
			<col width="98px">
			<col width="34px">
			<col width="49px">
			<col width="79px">
			<col width="74px">
			<col>
			<tbody>
				<tr height="50px">
					<td>序号</td>
					<td>工作场所名称</td>
					<td>场所<br>等级</td>
					<td>核素</td>
					<td>日等效最大<br>操作量（贝可）</td>
					<td>年最大用量<br>（贝可）</td>
					<td>活动种类</td>
				</tr>
				<tr v-for="(item,index) in  18" style="height:29px">
					<td class="model">{{datalists.length > index?index+1:''}}</td>
					<td class="model">{{datalists.length > index?datalists[index].workplaceName:''}}</td>
					<td class="model">{{datalists.length > index?datalists[index].workplaceGrade:''}}</td>
					<td class="model">{{datalists.length > index?datalists[index].nuclideName:''}}</td>
					<td class="model">{{datalists.length > index?datalists[index].equivalentMaximumOperand:''}}</td>
					<td class="model">{{datalists.length > index?datalists[index].annualMaximum:''}}</td>
					<td class="model">{{datalists.length > index?datalists[index].activitiesType:''}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style scoped>
	.table-printTFF{
		margin-left: 7mm;
	}
	.table-printTFF tr td div {
		width: 45%;
		height: 100%;
		float: right;
		display: flex;
		align-items: center;
	}

	.table-printTFF tr td div .model {
		width: 110px;
		display: inline-block;

	}

	table thead tr:nth-child(1) td {
		height: 34px;
		border: none !important;
	}

	table thead tr:nth-child(2) td {
		height: 23px;
		border: none !important;
	}

	table thead tr:nth-child(3) td {
		height: 22px;
		border: none !important;
	}

	table.landscape {
		margin-top: 15mm !important;
	}

	table.landscape td {
		border: none !important;
		visibility: hidden !important;
	}

	table.landscape tr .model {
		visibility: visible !important;
	}
</style>
<script>
	export default {
		props: ['landscape'],
		data() {
			return {
				datalists: [],
				fsLicenseNo:''
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
						url: `${this.baseurl}unitInfo/xkzfb3dy/${id}`,
					})
					.then(function(res) {
						if (res.data.status == 1) {
							let datas = res.data.data.maplist.zsbh[0];
							_this.fsLicenseNo = datas.fsLicenseNo;
							_this.datalists = res.data.data.maplist.fsy[0];
						}
					})
					.catch(function(res) {});
			}
		}
	};
</script>
