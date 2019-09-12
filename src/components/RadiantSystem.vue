<template>

	<div class="tabs">
		<!-- 头部 -->
		<div class="top">
			<!--左头部-->
			<div class="logo">
				<img src="../assets/images/logo_1920.png" alt="">
				<img src="../assets/images/fushe2_1920.png" alt="">
			</div>
			<!-- 退出登录 -->
			<div class="logo-login">
				<a>
					<img src="../assets/images/user_1920.png" alt=""> 管理员</a>
				<!-- <a href='http://124.42.41.43:9001/bjsy-sys/'> -->
				<a href='http://117.121.97.120:9001/bjsy-sys/'>
					<i class="icon iconfont icon-shouye3"></i> 首页导航</a>
				<a href="javascript:void(0)" @click="loginout()">
					<i class="icon iconfont icon-tuichu"></i> 退出</a>
			</div>
		</div>
		<div class="navigationBar">
			<ul class="First-navigationBar">
				<li v-for='(item,index) in data' :key="index">
					<a href="#" @click="tabInt(item,index)" :class="{isChecked: item.target === currentIndex}">
						<i :class="item.icon"></i>
						{{item.name}}
						<div class="triangle" v-if="item.childList.length"></div>
					</a>
					<ul class="Second-navigationBar">
						<li @click="tabInter(item,index,itm)" v-for='(itm,index) in item.childList' :key="index">
							<a :class="{isChecke: CurtIndex === itm.target}">{{itm.name}}</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="content">
			<!-- 内容 -->
			<!--主题内容-->
			<component :is="componentData"></component>
		</div>
	</div>
</template>

<script>
	// 引入子组件
	import unitInfo0 from "./UnitInformationManagement/Company"; // 单位信息管理
	import WorkplaceInfo1 from "./Workplace/Work"; // 工作场所
	import rediationsource3 from "./RadioactiveSourceInformation/RadioactiveEssential"; // 放射源信息
	import RadioactivesourceledgerInfo4 from "./RadioactiveSourceInformation/RadioactiveAccount"; // 放射源台账信息
	import NontightInfo6 from "./UnsealedMaterial/MaterialEssential"; // 非密封物质基本信息
	import NontightbookInfo7 from "./UnsealedMaterial/MaterialAccount"; // 非密封物质台账信息
	import radialdevice9 from "./RayDeviceInformation/RayDeviceEssential"; // 射线装置信息
	import RadialdevicebookInfo10 from "./RayDeviceInformation/RayDeviceAccount"; // 射线装置台账信息
	import CheckInfo11 from "./RadiometricExamination/InspectionManagement"; // 辐射检查信息
	import unitInfo12 from "./RadiationLicense/License"; // 辐射许可证
	export default {
		name: "app",
		data() {
			return {
				componentData: "unitInfo0",
				currentIndex: 0,
				CurtIndex: 0,
				data: []
				//   data: [
				//     {
				//       name: "单位信息管理",
				//       currentIndex: 0,
				// 	  componentsName: "Company",
				// 	  childList:[],
				//     },
				//     {
				//       name: "工作场所",
				//       currentIndex: 1,
				// 	  componentsName: "Work",
				// 	  childList:[],
				// 	},
				//     {
				//       name: "放射源管理",
				//       currentIndex: 2,
				// 	  childList:[
				//           {
				// 			  name: "放射源信息",
				//               CurtIndex: 0,
				// 		      componentsName: "RadioactiveEssential",
				// 		  },
				// 		  {
				// 			  name: "放射源台账信息",
				//               CurtIndex: 1,
				// 		      componentsName: "RadioactiveAccount",
				// 		  },
				// 	  ],
				// 	},
				// 	{
				// 		name: "非密封物质管理",
				// 		currentIndex: 3,
				// 		childList:[
				// 			{
				// 			  name: "非密封基本信息",
				//               CurtIndex: 2,
				// 		      componentsName: "MaterialEssential",
				// 		  },
				// 		  {
				// 			  name: "放射源台账信息",
				//               CurtIndex: 3,
				// 		      componentsName: "MaterialAccount",
				// 		  },
				// 		]
				// 	},
				// 	{
				// 		name: "射线装置管理",
				// 		currentIndex: 4,
				// 		childList:[
				// 			{
				// 			  name: "射线装置基本信息",
				//               CurtIndex: 4,
				// 		      componentsName: "RayDeviceEssential",
				// 		  },
				// 		  {
				// 			  name: "放射源台账信息",
				//               CurtIndex: 5,
				// 		      componentsName: "RayDeviceAccount",
				// 		  },
				// 		]
				// 	},
				// 	 {
				//       name: "辐射检查信息",
				//       currentIndex: 5,
				// 	  componentsName: "InspectionManagement",
				// 	  childList:[],
				// 	},
				//    {
				//       name: "辐射许可证",
				//       currentIndex: 6,
				// 	  componentsName: "License",
				// 	  childList:[],
				// 	},
				//   ],
			};
		},
		components: {
			// 声明子组件
			unitInfo0,
			WorkplaceInfo1,
			rediationsource3,
			RadioactivesourceledgerInfo4,
			NontightInfo6,
			NontightbookInfo7,
			radialdevice9,
			RadialdevicebookInfo10,
			CheckInfo11,
			unitInfo12
		},
		mounted() {
			// 加载菜单页
			var _this = this;
			_this
				.$http({
					method: "get",
					// url: `${_this.baseurl.slice(0, 33)}/sys/menu/listJson`
					url: `${_this.baseurl.slice(0, 35)}/sys/menu/listJson`
				})
				.then(function(res) {
					if (res.status === 200 && res.data.status === "1") {
						_this.data = res.data.data[2].childList.slice(0, -1);
						console.log("this.data", _this.data);
						_this.currentIndex = _this.data[0].target;
					}
				})
				.catch(function(err) {
					console.log(err);
					setTimeout(() => {
						layer.msg("加载异常", {
							icon: 2
						});
					}, 5000);
				});
		},
		methods: {
			loginout() {
				this.$http
				     .get('http://117.121.97.120:9001/bjsy-sys/logout',{
					//  .get(`http://124.42.41.43:9001/bjsy-sys/logout`, {
						headers: {
							"Content-Type": "application/json;charset=UTF-8"
						}
					})
					.then(function(res) {
						// window.location.href ="http://124.42.41.43:9001/bjsy-sys/loginPage/index.html";
						window.location.href ="http://117.121.97.120:9001/bjsy-sys/loginPage/index.html";
					});
			},
			// 标签页
			tabInter(item, index, itm) {
				this.currentIndex = item.target;
				this.CurtIndex = itm.target;
				this.componentData = itm.href.split("/")[2] + itm.target;
			},
			tabInt(item, index) {
				if (item.childList.length == 0) {
					this.currentIndex = item.target;
					this.componentData = item.href.split("/")[2] + item.target;
				}

				// this.componentData = item.componentsName;
				// this.currentIndex = item.currentIndex;
				// console.log(item.currentIndex);
				// if (item.currentIndex == 4) {
				//     return;
				// } else {
				//     this.CurtIndex = item.items[0].CurtIndex;
				// }
			}
		}
	};
</script>
<style scoped>
	.tabs {
		min-width: 1000px;
	}

	/*头部*/

	.top {
		background: url(../assets/images/cloud2.png) no-repeat;
		width: 100%;
		height: 60px;
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
	}

	/*logo图*/
	/*登录*/

	.logo {
		width: 40%;
		height: 100%;
		display: flex;
		align-items: center;
		padding-left: 20px;
	}

	.logo img:nth-child(1) {
		width: 45px;
		margin-right: 5px;
	}

	.logo img:nth-child(2) {
		height: 35px;
	}

	.logo-login {
		height: 100%;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.logo-login a {
		display: block;
		padding: 5px 8px;
		line-height: 35px;
		background: none;
		border: none;
		margin-right: 5px;
		color: #038fcf;
		font-size: 14px !important;
		text-decoration: none;
	}

	.logo-login a:nth-child(2) {}

	.logo-login a img {
		width: 30px;
		height: 30px;
	}

	.logo-login a .icon {
		font-size: 14px;
	}

	.logo-login a:hover {
		color: #ffffff;
		border-radius: 3px;
		background: rgba(3, 143, 207, 0.5);
	}

	/*导航栏*/

	.navigationBar {
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
		height: 36px;
		z-index: 1;
		border-bottom: 1px solid #029ad1;
		overflow: hidden;
		background-color: #fff;
		background-image: -moz-linear-gradient(90deg,
			rgb(241, 241, 241) 0%,
			rgb(248, 248, 248) 49%,
			rgb(255, 255, 255) 100%);
		background-image: -webkit-linear-gradient(90deg,
			rgb(241, 241, 241) 0%,
			rgb(248, 248, 248) 49%,
			rgb(255, 255, 255) 100%);
	}

	.navigationBar ul {
		position: absolute;
		z-index: 999;
	}

	.navigationBar .Second-navigationBar {
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
		cursor: pointer;
	}

	.navigationBar ul,
	.navigationBar li {
		list-style: none;
		margin: 0;
		padding: 0;
		float: left;
	}

	.First-navigationBar {
		width: 1000px;
	}

	.First-navigationBar>li {
		position: relative;
		height: 35px;
		margin-left: 10px;
		float: left;
	}

	.First-navigationBar li:hover ul {
		display: inline-block;
	}

	.First-navigationBar>li>a {
		width: 100%;
		padding: 0 10px;
		line-height: 35px;
		color: #333 !important;
		text-align: center;
		display: inline-block;
		text-decoration: none;
	}

	.Second-navigationBar {
		width: 100%;
		left: 0;
		display: none;
		background: #fff;
		z-index: 999;
		position: absolute;
	}

	.Second-navigationBar li {
		float: none;
		height: 32px;
		border-bottom: 1px solid #dbdbdb;
		border-top: none;
	}

	.Second-navigationBar li a {
		width: 100%;
		line-height: 32px;
		color: #333 !important;
		text-align: left;
		border-top: none;
		display: block;
		padding: 0 10px;
		text-decoration: none;
	}

	.First-navigationBar>li:hover>a,
	.Second-navigationBar>li:hover a,
	.First-navigationBar .isChecked,
	.First-navigationBar>li .isChecke,
	.Second-navigationBar .isChecked,
	.Second-navigationBar .isChecked a {
		color: #fff !important;
		height: 100%;
		background-color: rgb(0, 172, 234);
		background-image: -webkit-linear-gradient(90deg,
			rgb(0, 172, 234) 0%,
			rgb(117, 212, 246) 100%);
	}

	/* //  小三角 */
	.triangle {
		display: inline-block;
		width: 0px;
		height: 0px;
		border-width: 5px;
		border-top-width: 5px;
		border-bottom-width: 0;
		margin-bottom: 2px;
		border-style: solid;
		border-color: #999 transparent transparent transparent;
	}

	.First-navigationBar li:hover .triangle,
	.First-navigationBar .isChecked .triangle {
		border-color: #fff transparent transparent transparent;
	}

	/*头部结束*/
	/*左侧栏*/
	/*内容*/

	.content {
		width: 100%;
		height: -moz-calc(100vh - 96px);
		height: -webkit-calc(100vh - 96px);
		height: calc(100vh - 96px);
		margin: 0;
		padding: 6px 10px;
	}

	@media (width: 1366px) {
		.content {
			padding: 6px 11px;
		}
	}

	ol,
	ul {
		margin-bottom: 0px;
	}
</style>
