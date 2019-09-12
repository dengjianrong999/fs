<template>
	<div class="print-printOne" id="printpage">
		<table :class='["table-printOne",{"landscape":landscape.hidden}]'>
			<thead>
				<tr>
					<td colspan="3" style="font:bold 48px '宋体';">
						辐射安全许可证
					</td>
				</tr>
			</thead>
			<col width="305px">
			<col width="250px">
			<col width="">
			<tbody>
				<tr>
					<td colspan="3" style="font: 37px '宋体'; text-indent: 2em;">
						根据《中华人民共和国放射性污染防治法》和《放
					</td>
				</tr>
				<tr>
					<td colspan="3" style="font: 37px '宋体'; ">
						射性同位素与射线装置安全和防护条例》等法律法规的
					</td>
				</tr>
				<tr>
					<td colspan="3" style="font: 37px '宋体'; text-align: left; padding-left: 3px;">
						规定，经审查准予在许可种类和范围内从事活动。
					</td>
				</tr>
				<tr>
					<td colspan="3"></td>
				</tr>
				<tr>
					<td class="print-name">
						<span class="fourWords">单位名称</span>：
					</td>
					<td colspan="2">
						<div class="print-top model model-one">{{datas.unitName}}</div>
					</td>
				</tr>
				<tr>
					<td class="print-name ">
						<span class="twoWords">地址</span>：
					</td>
					<td colspan="2">
						<div class="print-top model model-two">{{datas.unitAddress}}</div>
					</td>
				</tr>
				<tr>
					<td class="print-name">
						法定代表人：
					</td>
					<td colspan="2">
						<div class="print-top model model-three">{{datas.legalPerson}}</div>
					</td>
				</tr>
				<tr>
					<td class="print-name">
						种类和范围：
					</td>
					<td colspan="2">
						<div class="print-top model model-four">{{datas.typeRange}}</div>
					</td>
				</tr>
				<tr>
					<td colspan="4"></td>
				</tr>
				<tr>
					<td class="print-name">
						<span class="fourWords">证书编号</span>：
					</td>
					<td colspan="2">
						<div class="print-top model model-five">{{datas.fsLicenseNo}}</div>
					</td>
				</tr>
				<tr>
					<td class="print-name">
						<span class="fourWords">有效期至</span>：
					</td>
					<td colspan="2">
						<div class="print-top" style="text-align: left;">
							<span class="time-one model">{{Year}}</span>年
							<span class="time-two model">{{mounth}}</span>月
							<span class="time-three model">{{data}}</span>日
						</div>
					</td>
				</tr>
				<tr>
					<td></td>
					<td class="print-er-name">
						发证机关：
					</td>
					<td>
						<p class="print-bot model model-six"></p>
					</td>
				</tr>
				<tr>
					<td></td>
					<td class="print-er-name">
						发证日期：
					</td>
					<td>
						<div class="print-bot" style="text-align: left;">
							<span class="time-four model">{{Year2}}</span>年
							<span class="time-five model">{{mounth2}}</span>月
							<span class="time-six model">{{data2}}</span>日
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="3"></td>
				</tr>
			</tbody>
		</table>

	</div>
</template>
<style scoped>
	.fourWords {
		letter-spacing: 10px;
	}

	.fourWords:after {
		content: '';
		margin-left: -10px;
	}

	.twoWords {
		letter-spacing: 92px;
	}

	.twoWords:after {
		content: '';
		margin-left: -92px;
	}

	.print-name {
		font: bold 30px 宋体;
		text-align: right;
	}

	.print-er-name {
		font: 549 30px 宋体;
		text-align: right;
	}

	.time-one,
	.time-two,
	.time-three,
	.time-four,
	.time-five,
	.time-six {
		display: inline-block;
	}

	.table-printOne tr td .print-top {
		font: bold 28px 宋体;
		text-align: left;
	}
	.table-printOne tr td .print-bot {
		font: 500 26px 宋体;
	}

	table.landscape {
		margin-top: 15mm !important;
	}

	table.landscape td {
		visibility: hidden !important;
	}

	table.landscape tr .model {
		visibility: visible !important;
		position: absolute;
		font: 500 22px 宋体;
		left:390px;
	}
	table.landscape tr .model-one,
	table.landscape tr .model-two,
	table.landscape tr .model-three,
	table.landscape tr .model-four,
	table.landscape tr .model-five{
		width: 470px;
	}

	table.landscape tr .model-one{
		top: 672px;
	}
	table.landscape tr .model-two{
		top: 730px;
	}
	table.landscape tr .model-three{
		top: 788px;
	}
	table.landscape tr .model-four{
		top: 840px;
	}
	table.landscape tr .model-five{
		top: 932px;
	}
	table.landscape tr .model-six{
		bottom: 230px;
		left:625px;
	}
	table.landscape tr .time-one{
		top: 983px;
		left:390px;
	}
	table.landscape tr .time-two{
		top: 983px;
		left: 510px;
	}
	table.landscape tr .time-three{
		top: 983px;
		left: 605px;
	}
	table.landscape tr .time-four{
		bottom: 175px;
		left: 610px;
	}
	table.landscape tr .time-five{
		bottom: 175px;
		left: 710px;
	}
	table.landscape tr .time-six{
		bottom: 175px;
		left: 788px;
	}
	table.landscape {
		border: none !important;
	}

	table.landscape+.foot-table {
		visibility: hidden;
	}
</style>
<script>
	export default {
		props: ['landscape'],
		data() {
			return {
				datas: [],
				Year: "",
				mounth: "",
				data: "",
				Year2: "",
				mounth2: "",
				data2: ""
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
						url: `${this.baseurl}unitInfo/xkzzb/${id}`
					})
					.then(function(res) {
						if (res.status === 200) {
							console.log("正文打印:", res);
							_this.datas = res.data.data;
							console.log(_this.datas)
							//发证日期
							_this.Year = _this.datas.periodValidity.slice(0, 4);
							_this.mounth = _this.datas.periodValidity.slice(5, 7);
							_this.data = _this.datas.periodValidity.slice(8, 10);
							//有效期
							_this.Year2 = _this.datas.openingDate.slice(0, 4);
							_this.mounth2 = _this.datas.openingDate.slice(5, 7);
							_this.data2 = _this.datas.openingDate.slice(8, 10);
						}
					})
					.catch(function(res) {});
			}
		}
	};
</script>
