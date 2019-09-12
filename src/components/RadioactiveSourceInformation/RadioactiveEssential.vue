<!--
放射源基本信息
-->
<template>
	<!--右-->
	<div class="fs-content">
		<!--输入框-->
		<div class="input-box">
			<div class="input-group">
				<span class="input-group-addon">单位名称：</span>
				<input type="text" class="form-control" v-model='zsgcValue1'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">核素名称：</span>
				<input type="text" class="form-control" v-model='zsgcValue2'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">放射源类别：</span>
				<input type="text" class="form-control" v-model='zsgcValue3'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">类型：</span>
				<el-select placeholder="--请选择--" v-model="zsgcValue4">
					<el-option key="固定" label="固定" value="固定"></el-option>
					<el-option key="移动" label="移动" value="移动"></el-option>
				</el-select>
			</div>
			<div class="input-group">
			</div>
			<!--按钮-->
			<div class="input-group">
				<span class="btn_content btn_query" @click="select()">
					<i class="iconfont icon-chaxun2"></i>
					<span>查询</span>
				</span>
				<span class="btn_content btn_add" @click='update()'>
					<i class="iconfont icon-tianjia-"></i>
					<span>新增</span>
				</span>
				<span class="btn_content btn_export" @click='derive()'>
					<i class="iconfont icon-group11"></i>
					<span>导出</span>
				</span>
				<span class="btn_content btn_empty" @click='empty()'>
					<i class="iconfont icon-xunhuan"></i>
					<span>清空</span>
				</span>
			</div>
		</div>
		<!--表格内容-->
		<el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中">
			<table class="table table-bordered">
				<thead>
					<tr>
						<!-- 顺序已打乱 -->
						<th scope="col">序号</th>
						<th scope="col">单位名称</th>
						<th scope="col" width="300px">核素名称</th>
						<th scope="col" width="100px">放射源类别</th>
						<th scope="col" width="50px">类型</th>
						<th scope="col" width="100px">总活度</th>
						<th scope="col" width="100px">活度</th>
						<th scope="col" width="100px">总枚数</th>
						<th scope="col">活动种类</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) of items" :key='index'>
						<td v-if="page == 1 || page == ''">{{index+1}}</td>
						<td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
						<td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
						<td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
						<td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
						<td :title="item.unitName">
							{{item.unitName}}
						</td>
						<td width="300px" :title="item.nuclideName">
							{{item.nuclideName}}
						</td>
						<td width="100px" :title="item.category">
							{{item.category}}
						</td>
						<td width="50px" :title="item.radiatiotType">
							{{item.radiatiotType}}
						</td>
						<td width="100px" :title="item.totalApprovedActivity">
							{{item.totalApprovedActivity}}
						</td>
						<td width="100px" :title="item.activity">
							{{item.activity}}
						</td>
						<td width="100px" :title="item.totalNumber">
							{{item.totalNumber}}
						</td>
						<td :title="item.activitiesType">
							{{item.activitiesType}}
						</td>
						<td>
							<span @click="SeeOrModify(item.pkid,0)"> [
								<i class="iconfont icon-chaxun">
									]
								</i>
							</span>
							<span @click="SeeOrModify(item.pkid,1)"> [
								<i class="iconfont icon-xiugai">
									]
								</i>
							</span>
							<span @click="deleted(item)"> [
								<i class="iconfont icon-shanchu">
									]
								</i>
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</el-main>
		<!--分页-->
		<panigation :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows'
		 @operatePage='optPage'></panigation>
	</div>
</template>

<script>
	// 引入子组件
	import panigation from './../component/panigation'
	export default {
		name: 'app',
		data() {
			return {
				items: [],
				Inter: [],
				Interface: [],
				zsgcValue1: "",
				zsgcValue2: "",
				zsgcValue3: "",
				zsgcValue4: "",
				page: 1,
				rows: 10,
				total: 0,
				options: [{
						text: '10',
						value: '10'
					},
					{
						text: '20',
						value: '20'
					},
					{
						text: '50',
						value: '50'
					},
					{
						text: '100',
						value: '100'
					}
				],
				fullscreenLoading: false
			};
		},
		mounted() {
			this.getpage();
			this.tableResize(); // 初始化计算table等高度
			this.resizeCall(); // 监听resize
			this.lastInterface();
		},
		components: {
			panigation
		},
		watch: {
			page: function(newval, oldval) {
				this.page == "" ? this.total : this.getpage();
			},
			rows: function(newval, oldval) {
				this.page = 1; //改变行数，重置页数
				this.getpage();
			}
		},
		methods: {
			toRows(rows) { // 子组件panigation 触发改变rows
				this.rows = rows;
			},
			toPage(page) { // 子组件panigation 触发改变page
				this.page = page;
			},
			optPage(opt) { //翻页
				if (opt === 1) { // opt = 1 下一页  
					this.page < this.total ? this.page++ : this.page = this.total;
				} else if (opt === 0) { // opt = 0 上一页 
					this.page > 1 ? this.page-- : this.page = 1;
				}
			},
			// 获取上一个接口数据
			lastInterface(zsgcValue1) {
				let _this = this;
				_this.$http
					.get(`${_this.baseurl}unitInfo/listJson?flag=2`)
					.then(function(res) {

						if (res.status == 200 || res.data.status == 1)
							_this.Inter = res.data.data;
					});
			},
			getpage() { // 按页获取数据
				this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					unitName: this.zsgcValue1,
					nuclideName: this.zsgcValue2,
					category: this.zsgcValue3,
					radiatiotType: this.zsgcValue4,
					page: this.page,
					rows: this.rows
				};
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}rediationsource/listPageJson`,
							params: temData
						})
						.then(function(res) {
							if (res.status == 200 || res.data.data.status == 1) {
								_this.items = res.data.data.rows;
								_this.total = res.data.data.total;
								_this.fullscreenLoading = false;
								console.log("获取到的数据", res)
							}
						})
						.catch(function(err) {
							console.log(err);
							setTimeout(() => {
								layer.msg('数据加载异常！！！', {
									icon: 2
								});
								_this.fullscreenLoading = false;
							}, 5000);
						});
				}, 500);
			},
			// 查询
			select() {
				this.fullscreenLoading = true;
				let _this = this;
				this.page = 1;
				let temData = {
					unitName: this.zsgcValue1,
					nuclideName: this.zsgcValue2,
					category: this.zsgcValue3,
					radiatiotType: this.zsgcValue4,
					page: this.page,
					rows: this.rows
				};
				if (this.zsgcValue1 == "" &
					this.zsgcValue2 == "" &
					this.zsgcValue3 == "" &
					this.zsgcValue4 == "") {
					// layer.msg('请输入查询条件！！！', {
					// 	icon: 2
					// });
					setTimeout(() => {
						_this.fullscreenLoading = false;
					    _this.getpage();
					}, 500);
					_this.fullscreenLoading = false;
				} else {
					setTimeout(() => {
						_this.$http({
								method: 'get',
								url: `${_this.baseurl}rediationsource/listPageJson`,
								params: temData
							})
							.then(function(res) {
								if (res.status === 200 && res.data.status === '1') {
									_this.items = res.data.data.rows;
									_this.total = res.data.data.total;
									_this.fullscreenLoading = false;
								}
							})
							.catch(function(err) {
								console.log(err)
								setTimeout(() => {
									layer.msg('查询失败！！！', {
										icon: 2
									});
									_this.fullscreenLoading = false;
								}, 5000);
							})
					}, 500);
				}
			},
			// 新增
			update() {
				let _this = this;
				let id = 'save';
				let layerIndex = layer.open({
					type: 2,
					title: '新增',
					area: ['69%', '55%'],
					anim: [parseInt(6 * Math.random())],
					isOutAnim: true,
					scrollbar: false,
					maxmin: true,
					resize: false,
					success: function(layero, index) {
						layero.find('.layui-layer-min').remove()
						layer.full(index);
					},
					content: ['#/RadioactiveEssentialWindow/' + id],
					end: function() {
						_this.getpage();
					}
				});
				sessionStorage.setItem('layerIndex', JSON.stringify(layerIndex));
			},
			// 导出
			derive() {
				var _this = this;
				let temData = {
					unitName: this.zsgcValue1,
					nuclideName: this.zsgcValue2,
					category: this.zsgcValue3,
					radiatiotType: this.zsgcValue4,
				};
				let temDatas = {
					unitName: this.zsgcValue1,
					nuclideName: this.zsgcValue2,
					category: this.zsgcValue3,
					radiatiotType: this.zsgcValue4,
					page: this.page,
					rows: this.rows
				};
				_this.$http({
					method: 'get',
					url: '/bjsy-jdc/fs/rediationsource/export',
					params: temData,
					responseType: 'blob'
				}).then(res => {
					_this.deriveAll(res);
				});
				_this.$http({
						method: 'get',
						url: `${_this.baseurl}rediationsource/listPageJson`,
						params: temDatas
					})
					.then(function(res) {
						if (res.status === 200 && res.data.status === '1') {
							_this.items = res.data.data.rows;
							_this.total = res.data.data.total;
						}
					})
					.catch(function(err) {
						console.log(err)
					})
			},
			deriveAll(data) {
				if (!data) return;
				const fileName = decodeURI(data.headers['content-disposition'].slice(data.headers['content-disposition'].indexOf(
					'=') + 1));
				if ('download' in document.createElement('a')) { // 非IE下载
					const link = document.createElement('a')
					link.download = fileName;
					link.style.display = 'none';
					link.href = URL.createObjectURL(new Blob([data.data]));
					document.body.appendChild(link);
					link.click();
					URL.revokeObjectURL(link.href); // 释放URL 对象
					document.body.removeChild(link);
				} else { // IE10+下载
					navigator.msSaveBlob(new Blob([data.data]), fileName)
				}
			},
			// 清空
			empty() {
				this.zsgcValue1 = "",
					this.zsgcValue2 = "",
					this.zsgcValue3 = "",
					this.zsgcValue4 = "",
					this.getpage();
			},
			// 查看
			SeeOrModify(id, num) {
				let _this = this;
				sessionStorage.setItem('operateNum', JSON.stringify(num));
				let title = '';
				if (!num) {
					title = '详情';
				} else {
					title = '修改';
				}
				let layerIndex = layer.open({
					type: 2,
					title: title,
					area: ['69%', '55%'],
					anim: [parseInt(6 * Math.random())],
					isOutAnim: true,
					scrollbar: false,
					maxmin: true,
					resize: false,
					success: function(layero, index) {
						layero.find('.layui-layer-min').remove()
						layer.full(index);
					},
					content: '#/RadioactiveEssentialWindow/' + id,
					end: function() {
						if (num) {
							_this.getpage();
						}
					}
				});
			},
			// 删除
			deleted(item) {
				let _this = this;
				let id = item.pkid;
				layer.confirm(
					"删除操作不可恢复，确定要删除该业务数据吗？", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function(index) {
						console.log("id", id);

						_this
							.$http({
								method: "post",
								url: _this.baseurl + "rediationsource/delete/" + id
							})
							.then(function(res) {
								_this.getpage();
							})
							.catch(function(err) {
								console.log("err", err);
							});
						layer.msg("删除成功");
					},
					function(index) {
						layer.msg("取消删除");
					}
				);
			},
			// 自适应高度
			tableResize() {
				let tableRight = document.querySelector('.fs-content');
				let inputBox = document.querySelector('.input-box');
				let tableBox = document.querySelector('.el-main');
				tableBox.style.height = tableRight.offsetHeight - inputBox.offsetHeight - 54 + 'px';
			},
			// 监听resize
			resizeCall() {
				var optimizedResize = (function() {
					var callbacks = [],
						running = false;
					// fired on resize event
					function resize() {
						if (!running) {
							running = true;
							if (window.requestAnimationFrame) {
								window.requestAnimationFrame(runCallbacks);
							} else {
								setTimeout(runCallbacks, 66);
							}
						}
					}
					// run the actual callbacks
					function runCallbacks() {
						callbacks.forEach(function(callback) {
							callback();
						});
						running = false;
					}
					// adds callback to loop
					function addCallback(callback) {
						if (callback) {
							callbacks.push(callback);
						}
					}
					return {
						// public method to add additional callback
						add: function(callback) {
							if (!callbacks.length) {
								window.addEventListener('resize', resize);
							}
							addCallback(callback);
						}
					}
				}());

				// start process
				optimizedResize.add(this.tableResize);
			}

		},

	}
</script>
<style scoped>
	/*输入框*/

	.input-group-addon {
		width: 80px;
		flex: 0 0 80px;
	}

	.input-group:nth-last-child(2) {
		display: none;
	}

	.input-group:nth-child(3) {
		border-left: none;
	}

	@media screen and (min-width: 1030px) and (max-width: 1300px) {
		.input-group {
			width: 33.3333333%;
		}

		/*输入框*/
		.input-group:nth-last-child(2) {
			display: block;
			width: 66.6666666666666666666666%;
		}

		.input-group:nth-child(4) {
			border-top: none;
			border-left: 1px solid #ededed;
		}
	}

	@media screen and (max-width: 1024px) {
		.input-group {
			width: 50%;
		}
		/*输入框*/
		.input-group:nth-child(3) {
			border-left: 1px solid #ededed;
		}
		.input-group:nth-child(n+3):nth-child(-n+4) {
			border-top: none;
		}
	}
</style>
