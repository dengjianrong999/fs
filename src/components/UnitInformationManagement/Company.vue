<!--
单位信息管理
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
				<span class="input-group-addon">单位地址：</span>
				<input type="text" class="form-control" v-model='zsgcValue2'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">法人：</span>
				<input type="text" class="form-control" v-model='zsgcValue3'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">证书编号：</span>
				<input type="text" class="form-control" v-model='zsgcValue4'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">有效期开始时间：</span>
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="form-control" placeholder="--请选择开始时间--" v-model='zsgcValue5' readonly="readonly" id="surface1">
			</div>
			<div class="input-group">
				<span class="input-group-addon">有效期结束时间：</span>
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="form-control" placeholder="--请选择结束时间--" v-model='zsgcValue6' readonly="readonly" id="surface2">
			</div>
			<!-- 新 -->
			<div class="input-group">
				<span class="input-group-addon">发证开始日期：</span>
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="form-control" placeholder="--请选择开始时间--" v-model='zsgcValue7' readonly="readonly" id="surface3">
			</div>
			<div class="input-group">
				<span class="input-group-addon">发证结束日期：</span>
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="form-control" placeholder="--请选择结束时间--" v-model='zsgcValue8' readonly="readonly" id="surface4">
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
				<span class="btn_content btn_empty" @click='empty()' id="empty">
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
						<th scope="col">序号</th>
						<th scope="col">单位名称</th>
						<th scope="col">单位地址</th>
						<th scope="col" width="80px">法人</th>
						<th scope="col" width="200px">证书编号</th>
						<th scope="col" width="100px">有效期至</th>
						<th scope="col" width="100px">发证日期</th>
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
						<td :title="item.unitAddress">
							{{item.unitAddress}}
						</td>
						<td :title="item.legalPerson" width="80px">
							{{item.legalPerson}}
						</td>
						<td :title="item.fsLicenseNo" width="200px">
							{{item.fsLicenseNo}}
						</td>
						<td width="100px" :title="item.periodValidity | time">
							{{item.periodValidity | time}}
						</td>
						<td width="100px" :title="item.openingDate | time">
							{{item.openingDate | time}}
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
				zsgcValue1: "",
				zsgcValue2: "",
				zsgcValue3: "",
				zsgcValue4: "",
				zsgcValue5: "",
				zsgcValue6: "",
				zsgcValue7: "",
				zsgcValue8: "",
				page: 1,
				rows: 10,
				total: 0,
				flag: 2,
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
		components: {
			panigation
		},
		mounted() {
			this.getpage();
			this.tableResize(); // 初始化计算table等高度
			this.resizeCall(); // 监听resize
			let _this = this;
			setTimeout(function() {
				layui.use("laydate", function() {
					var $ = layui.$;
					var laydate = layui.laydate;
					var nowTime = new Date().valueOf();
					var max = null;
					//执行一个laydate实例
					var start = laydate.render({
						elem: "#surface1",
						type: "date",
						btns: ['confirm'],
						done: function(value, date) {
							// endMax = end.config.max;
							end.config.min = date;
							end.config.min.month = date.month - 1;
							_this.zsgcValue5 = value;
						}
					});
					var end = laydate.render({
						elem: "#surface2",
						type: "date",
						btns: ['confirm'],
						done: function(value, date) {
							if ($.trim(value) == '') {
								var curDate = new Date();
								date = {
									'date': curDate.getpage(),
									'month': curDate.getMonth() + 1,
									'year': curDate.getFullYear()
								};
							}
							start.config.max = date;
							start.config.max.month = date.month - 1;
							_this.zsgcValue6 = value;
						}
					});
					var startTime = laydate.render({
						elem: "#surface3",
						type: "date",
						btns: ['confirm'],
						done: function(value, date) {
							// endMax = end.config.max;
							endTime.config.min = date;
							endTime.config.min.month = date.month - 1;
							_this.zsgcValue7 = value;
						}
					});
					var endTime = laydate.render({
						elem: "#surface4",
						type: "date",
						btns: ['confirm'],
						done: function(value, date) {
							if ($.trim(value) == '') {
								var curDate = new Date();
								date = {
									'date': curDate.getpage(),
									'month': curDate.getMonth() + 1,
									'year': curDate.getFullYear()
								};
							}
							startTime.config.max = date;
							startTime.config.max.month = date.month - 1;
							_this.zsgcValue8 = value;
						}
					});
					var empty = document.getElementById('empty');
					empty.onclick = function() {
						end.config.min = '1900-1-1';
						start.config.max = end.config.max;
						endTime.config.min = '1900-1-1';
						startTime.config.max = endTime.config.max;
					}
				});
			}, 0);
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
					this.page < this.total ? this.page++ : (this.page = this.total);
				} else if (opt === 0) { // opt = 0 上一页 
					this.page > 1 ? this.page-- : (this.page = 1);
				}
			},
			getpage() { // 按页获取数据
				this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					unitName: this.zsgcValue1,
					unitAddress: this.zsgcValue2,
					legalPerson: this.zsgcValue3,
					fsLicenseNo: this.zsgcValue4.replace("[", "a").replace("]", "b"),
					startTime: this.zsgcValue5,
					endTime: this.zsgcValue6,
					fzstartTime: this.zsgcValue7,
					fzendTime: this.zsgcValue8,
					page: this.page,
					rows: this.rows,
					flag: this.flag
				};
				
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}unitInfo/listPageJson`,
							params: temData
						})
						.then(function(res) {
							console.log('单位信息管理：', res)
							if (res.status == 200 || res.data.data.status == 1) {
								_this.items = res.data.data.rows;
								_this.total = res.data.data.total;
								_this.fullscreenLoading = false;
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
				let temData = {
					unitName: this.zsgcValue1,
					unitAddress: this.zsgcValue2,
					legalPerson: this.zsgcValue3,
					fsLicenseNo: this.zsgcValue4.replace("[", "a").replace("]", "b"),
					startTime: this.zsgcValue5,
					endTime: this.zsgcValue6,
					fzstartTime: this.zsgcValue7,
					fzendTime: this.zsgcValue8,
					page: this.page,
					rows: this.rows,
					flag: this.flag
				};
				if (this.zsgcValue1 == "" &
					this.zsgcValue2 == "" &
					this.zsgcValue3 == "" &
					this.zsgcValue4 == "" &
					this.zsgcValue5 == "" &
					this.zsgcValue6 == "" &
					this.zsgcValue7 == "" &
					this.zsgcValue8 == "") {
					// layer.msg('请输入查询条件！！！', {
					// 	icon: 2
					// });
					setTimeout(() => {
						_this.fullscreenLoading = false;
					    _this.getpage();
					}, 500);
				} else {
					setTimeout(() => {
						_this.$http({
								method: 'get',
								url: `${_this.baseurl}unitInfo/listPageJson`,
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
					top.layer.open({
				    type: 2,
				    title: "委托业务",
				    area: ["90%", "90%"],
				    content: '#/CompanyWindow/' + id,
				    shade:0,
				    skin:"red-skin",
				    maxmin: true,
				    resize: true,
				    moveOut:true,
				    zIndex: layer.zIndex, //多窗口模式，层叠打开
				    success: function(layero){
				        //top.layer.setTop(layero);
				    },
				    end :function(){
						//tableObj.trigger("reloadGrid");
					}
				});
				layer.open({
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
					content: '#/CompanyWindow/' + id,
					end: function() {
						_this.getpage();
					}
				});
			},
			// 导出
			derive() {
				var _this = this;
				let temData = {
					unitName: this.zsgcValue1,
					unitAddress: this.zsgcValue2,
					legalPerson: this.zsgcValue3,
					fsLicenseNo: this.zsgcValue4.replace("[", "a").replace("]", "b"),
					startTime: this.zsgcValue5,
					endTime: this.zsgcValue6,
					fzstartTime: this.zsgcValue7,
					fzendTime: this.zsgcValue8,
					flag: this.flag
				};
				let temDatas = {
					unitName: this.zsgcValue1,
					unitAddress: this.zsgcValue2,
					legalPerson: this.zsgcValue3,
					fsLicenseNo: this.zsgcValue4.replace("[", "a").replace("]", "b"),
					startTime: this.zsgcValue5,
					endTime: this.zsgcValue6,
					fzstartTime: this.zsgcValue7,
					fzendTime: this.zsgcValue8,
					page: this.page,
					rows: this.rows,
					flag: this.flag
				}
				_this.$http({
					method: 'get',
					url: '/bjsy-jdc/fs/unitInfo/export',
					params: temData,
					responseType: 'blob'
				}).then(res => {
					_this.deriveAll(res);
				})
				_this.$http({
						method: 'get',
						url: `${_this.baseurl}unitInfo/listPageJson`,
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
				this.zsgcValue1 = "";
				this.zsgcValue2 = "";
				this.zsgcValue3 = "";
				this.zsgcValue4 = "";
				this.zsgcValue5 = "";
				this.zsgcValue6 = "";
				this.zsgcValue7 = "";
				this.zsgcValue8 = "";
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
					content: '#/CompanyWindow/' + id,
					// btn:['确认','取消'],     
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
					"删除操作不可恢复，将会删除相关联的工作场所、放射源信息和射线装置信息，确定要删除该业务数据吗？", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function(index) {
						console.log("id", id);

						_this.$http({
								method: "post",
								url: _this.baseurl + "unitInfo/delete/" + id
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
		}
	}
</script>
<style scoped>
	/*element日期图标位置*/

	.input-group .el-icon-date {
		left: 112px;
	}

	/*输入框*/

	.input-group-addon {
		width: 104px;
		flex: 0 0 104px;
	}

	.input-group:nth-last-child(2) {
		display: none;
	}

	.input-group:nth-child(3),
	.input-group:nth-child(7) {
		border-left: none;
	}

	.input-group:nth-child(n+5):nth-child(-n+8) {
		border-top: none;
	}

	@media screen and (min-width: 1921px) {

		/*输入框*/
		.input-group {
			width: 20%;
		}

		.input-group:nth-last-child(2) {
			display: block;
			width: 40%;
		}

		.input-group:nth-child(5) {
			border-top: 1px solid #ededed !important;
			border-left: none;
		}

		.input-group:nth-child(6) {
			border-left: 1px solid #ededed;
		}
	}

	@media screen and (min-width: 1030px) and (max-width: 1300px) {

		/*输入框*/
		.input-group {
			width: 33.33333333333333333333%;
		}

		.input-group:nth-last-child(2) {
			display: block;
			width: 33.33333333333333333333%;
		}

		.input-group:nth-child(n+3):nth-child(odd):nth-child(-n+5) {
			border-left: none;
		}

		.input-group:nth-child(n+4):nth-child(3n+1):nth-child(-n+7) {
			border-left: 1px solid #ededed;
		}

		.input-group:nth-child(n+4):nth-child(-n+6) {
			border-top: none;
		}
	}

	@media screen and (max-width: 1024px) {

		/*输入框*/
		.input-group {
			width: 50%;
		}

		.input-group:nth-last-child(2) {
			display: none;
		}

		.input-group:nth-child(3),
		.input-group:nth-child(7) {
			border-left: 1px solid #ededed;
		}

		.input-group:nth-child(n+3):nth-child(-n+4) {
			border-top: none;
		}
	}
</style>
