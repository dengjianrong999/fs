<template>
	<div id="printpage" class="print-portrait">
		<table :class='["table-printTFF",{"landscape":landscape.hidden}]'>
			<thead>
				<tr>
					<td colspan="5">活&nbsp;动&nbsp;种&nbsp;类&nbsp;和&nbsp;范&nbsp;围</td>
				</tr>
				<tr>
					<td colspan="5">（三）射线装置</td>
				</tr>
				<tr>
					<td colspan="5">
						<div>
							<span>证书编号：</span>
							<span class="model">{{fsLicenseNo}}</span>
						</div>
					</td>
				</tr>
			</thead>
			<col width="38px">
			<col>
			<col width="45px">
			<col width="110px">
			<col width="70px">
			<tbody>
				<tr height="50px">
					<td>序号</td>
					<td>装置名称</td>
					<td>类别</td>
					<td>装置数量</td>
					<td>活动种类</td>
				</tr>
				 <tr v-for="(item,index) in 18" style="height:29px">
					<td class="model">{{datalists.length > index?index+1:''}}</td>
					<!-- <td class="model">{{datalists.length > index?datalists[index].deviceName:''}}</td> -->
					<td class="model">
						<div style="word-break:break-word;width:167px;height:29px;line-height:12px;text-align:center">{{datalists.length > index?datalists[index].deviceName:''}} </div>
					</td>
				
					<td class="model">{{datalists.length > index?datalists[index].deviceCategory:''}}</td>
					<td class="model">{{datalists.length > index?datalists[index].deviceNumber:''}}</td>
					<td class="model">{{datalists.length > index?datalists[index].activitiesType:''}}</td>
				</tr>
			</tbody>
		</table>
	</div>


</template>
<style scoped>
	.table-printTFF{
		margin-left: 8mm;
	}
	.table-printTFF tr td div {
		width: 44%;
		height: 100%;
		float: right;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.table-printTFF tr td div .model {
		width: 110px;
		display: inline-block;

	}

	table thead tr:nth-child(1) td {
		height: 32px;
		border: none !important;
	}

	table thead tr:nth-child(2) td {
		height: 22px;
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
						url: `${this.baseurl}unitInfo/xkzfb4dy/${id}`,
					})
					.then(function(res) {
						if (res.data.status == 1) {
							let datas = res.data.data.maplist.zsbh[0];
							console.log("datas", datas)
							_this.fsLicenseNo = datas.fsLicenseNo;
							_this.datalists = res.data.data.maplist.fsy[0];
						}
					})
					.catch(function(res) {});
			}
		}
	};
</script>
