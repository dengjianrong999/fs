<template>
	<div id="printpage" class="print-landscape">
		<table :class='["table-printSSE",{"landscape":landscape.hidden}]'>
			<thead>
				<tr>
					<td colspan="13" style="font: bold 16px 'microsoft yahei';">台&nbsp;&nbsp;账&nbsp;&nbsp;明&nbsp;&nbsp;细&nbsp;&nbsp;登&nbsp;&nbsp;记</td>
				</tr>
				<tr>
					<td colspan="13">
						<div>
							<span>（一）放射源</span>
							<span>证书编号：</span>
							<span class="model">{{fsLicenseNo}}</span>
						</div>
					</td>
				</tr>
				<tr height="37px">
					<td>序<br>号</td>
					<td>核素</td>
					<td>出厂日期</td>
					<td>出厂活度<br>（贝可）</td>
					<td>标号</td>
					<td>编码</td>
					<td>类<br>别</td>
					<td>用途</td>
					<td>场所</td>
					<td colspan="2">来源/去向</td>
					<td>审核人</td>
					<td>审核日期</td>
				</tr>
			</thead>
			<col width="20px">
			<col width="46px">
			<col width="49px">
			<col width="57px">
			<col width="30px">
			<col width="82px">
			<col width="28px">
			<col width="86px">
			<col width="81px">
			<col width="30px">
			<col width="">
			<col width="38px">
			<col width="49px">
			<tbody v-for="(item,index) in 8">
				<tr>
					<td class="model" rowspan="2">{{datas.length > index?index+1:''}}</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].NUCLIDE_NAME:''}}</td>
					<td class="model" rowspan="2" >
						<div style='word-break:break-word;height:41px;line-height:20px;text-align:center'>
                                {{datas.length > index?datas[index].RELEASE_DATE.replace("-", ".").replace("-", "."):'' | time}}
						</div>	
					</td>
					<td class="model" rowspan="2">
						<div  style='word-break:break-word;line-height:20px;text-align:center'>
                             {{datas.length > index?datas[index].RELEASE_ACTIVITY:''}}
						</div>
					</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].LABEL:''}}</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].ENCODING:''}}</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].CATEGORY:''}}</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].PURPOSE:''}}</td>
					<td class="model" rowspan="2">{{datas.length > index?datas[index].WORKPLACE_NAME:''}}</td>
					<td v-if="datas.length > index">来源</td>
					<td v-else></td>
					<td class="model">{{datas.length > index?datas[index].SOURCE_TO:''}}</td>
					<td class="model"></td>
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
	/* @page  {
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
		justify-content: center;
	}

	.table-printSSE tr td div span:nth-child(1) {
		display: inline-block;
		margin-left: 45%;
	}

	.table-printSSE tr td div span:nth-child(2) {
		display: inline-block;
		margin-left: 17%;
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
				source: '',
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
						url: `${this.baseurl}unitInfo/xkzfb5dy/${id}`,
					})
					.then(function(res) {
						if (res.data.status == 1) {
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
