import Vue from 'vue'
import Router from 'vue-router'
import RadiantSystem from '@/components/RadiantSystem'

// 单位信息管理弹窗 
import CompanyWindow from '@/components/UnitInformationManagement/CompanyWindow.vue'
// 工作场所弹窗
import WorkWindow from '@/components/Workplace/WorkWindow.vue'
// 放射源信息弹窗 
import RadioactiveEssentialWindow from '@/components/RadioactiveSourceInformation/RadioactiveEssentialWindow.vue'
import RadioactiveAccountWindow from '@/components/RadioactiveSourceInformation/RadioactiveAccountWindow.vue'
// 射线装置信息弹窗
import RayDeviceEssentialWindow from '@/components/RayDeviceInformation/RayDeviceEssentialWindow.vue'
import RayDeviceAccountWindow from '@/components/RayDeviceInformation/RayDeviceAccountWindow.vue'
// 非密封物质基本信息
import MaterialEssentialWindow from '@/components/UnsealedMaterial/MaterialEssentialWindow.vue'
import MaterialAccountWindow from '@/components/UnsealedMaterial/MaterialAccountWindow.vue'
// 辐射检查管理弹窗
import InspectionManagementWindow from '@/components/RadiometricExamination/InspectionManagementWindow.vue'
// 辐射许可证弹窗 
import QueryRadiationLicenseWD from '@/components/RadiationLicense/QueryAndCount/QueryRadiationLicenseWD.vue'
import QueryRadiationLicPrintBase from '@/components/RadiationLicense/QueryRadiationLicPrint/QueryRadiationLicPrintBase.vue'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'RadiantSystem',
            component: RadiantSystem
        },
        //单位信息管理弹窗 
        {
            path: '/CompanyWindow/:id',
            name: 'CompanyWindow',
            component: CompanyWindow
        },
		//工作场所弹窗 
		{
			path: '/WorkWindow/:id',
			name: 'WorkWindow',
			component: WorkWindow
		},
        //放射源信息弹窗 
        {
            path: '/RadioactiveEssentialWindow/:id',
            name: 'RadioactiveEssentialWindow',
            component: RadioactiveEssentialWindow
        },
		{
			path: '/RadioactiveAccountWindow/:id',
			name: 'RadioactiveAccountWindow',
			component: RadioactiveAccountWindow
		},
        // 射线装置信息弹窗
        {
            path: '/RayDeviceEssentialWindow/:id',
            name: 'RayDeviceEssentialWindow',
            component: RayDeviceEssentialWindow
        },
		{
			path: '/RayDeviceAccountWindow/:id',
			name: 'RayDeviceAccountWindow',
			component: RayDeviceAccountWindow
		},
		// 非密封物质基本信息
		{
			path: '/MaterialEssentialWindow/:id',
			name: 'MaterialEssentialWindow',
			component: MaterialEssentialWindow
		},
		{
			path: '/MaterialAccountWindow/:id',
			name: 'MaterialAccountWindow',
			component: MaterialAccountWindow
		},
		// 辐射检查管理弹窗
		{
			path: '/InspectionManagementWindow/:id',
			name: 'InspectionManagementWindow',
			component: InspectionManagementWindow
		},
        // 辐射许可证弹窗
        {
            path: '/QueryRadiationLicenseWD/:id',
            name: 'QueryRadiationLicenseWD',
            component: QueryRadiationLicenseWD
        },
		{
			path: '/QueryRadiationLicPrintBase/:id/:pkids/:burl',
			name: 'QueryRadiationLicPrintBase',
			component: QueryRadiationLicPrintBase
		},
    ]
})
