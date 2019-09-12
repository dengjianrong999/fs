<template>
	<div id="printpage" class="print-landscape">
		<table ref="table" :class='["table-printSSE",{"landscape":landscape.hidden}]'>
			<thead>
				<tr>
					<td colspan="9" style="font: bold 16px 'microsoft yahei';">台&nbsp;&nbsp;账&nbsp;&nbsp;明&nbsp;&nbsp;细&nbsp;&nbsp;登&nbsp;&nbsp;记</td>
				</tr>
				<tr>
					<td colspan="9">
						<div>
							<span>（二）非密封放射性物质</span>
							<span>证书编号：</span>
							<span class="model">{{fsLicenseNo}}</span>
						</div>
					</td>
				</tr>
				<tr height="33px">
					<td>序<br>号</td>
					<td>核素</td>
					<td>总活度（贝可）</td>
					<td>频次</td>
					<td>用途</td>
					<td colspan="2">来源/去向</td>
					<td>审核人</td>
					<td>审核日期</td>
				</tr>
			</thead>
			<col width="20px">
			<col width="100px">
			<col width="100px">
			<col width="90px">
			<col width="167px">
			<col width="30px">
			<col width="">
			<col width="38px">
			<col width="49px">
			<tbody v-for="(item,index) in 8">
				<tr>
					<td class="model" rowspan="2">{{datas.length > index?index+1:''}}</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].NUCLIDE_NAME:''}}</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].TOTAL_ACTIVITY:''}}</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].FREQUENCY:''}}</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].PURPOSE:''}}</td>
					<td v-if="datas.length > index">来源</td>
					<td v-else></td>
					<td class="model">{{datas.length > index?datas[index].SOURCE_TO:''}}</td>
					<!-- {{datas.length > index?datas[index].AUDITOR:''}} -->
					<td class="model"></td>
					<!-- {{datas.length > index?datas[index].AUDIT_DATE:'' | time}} -->
					<td class="model"></td>
				</tr>
				<tr>
					<td v-if="datas.length > index">去向</td>
					<td v-else></td>
					<td class="model">{{datas.length > index?datas[index].SOURCE_TO:''}}</td>
					<td class="model"></td>
					<td class="model"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style scoped>
	/* 默认A4横屏打印 */
	/* @page {
		size: A4 landscape;
	} */
.table-printSSE{
		margin-left: 12mm;
	}
	.table-printSSE tr td div {
		width: 100%;
		height: 100%;
		float: right;
		display: flex;
		align-items: center;
	}

	.table-printSSE tr td div span:nth-child(1) {
		display: inline-block;
		margin-left: 40%;
	}

	.table-printSSE tr td div span:nth-child(2) {
		display: inline-block;
		margin-left: 13%;
	}

	.table-printSSE tr td div .model {
		width: 110px;
		display: inline-block;

	}

	table thead tr:nth-child(1) td {
		height: 36px;
		border: none !important;
	}

	table thead tr:nth-child(2) td {
		height: 23px;
		border: none !important;
	}
table.landscape {
		margin-top: 22.5mm !important;
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
				datas: [],
				fsLicenseNo:'',
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
						url: `${this.baseurl}unitInfo/xkzfb6dy/${id}`,
					})
					.then(function(res) {
						if (res.data.status == 1) {
							console.log("台账·非密封:", res)
							let datas = res.data.data.maplist.zsbh[0];
							console.log("datas", datas)
							_this.fsLicenseNo = datas.fsLicenseNo;


							_this.datas = res.data.data.maplist.fsy[0];
						}
					})
					.catch(function(res) {});
			}
		}
	};
</script>
