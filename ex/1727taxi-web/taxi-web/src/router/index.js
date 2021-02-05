import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Pollution from '@/pages/pollutionmap/PollutionMap'
import NowData from '@/pages/nowdata/nowdata'
import VehicleDetail from '@/pages/vehicledetail/VehicleDetail'
import VehicleAlarm from '@/pages/vehiclealarm/VehicleAlarm'
import Online from "@/pages/online/Online"
import TeamViewer from "@/pages/teamviewer/TeamViewer"
import Login from "@/pages/Login"
import Management from "@/pages/management/Management"
// import Users from "@/pages/management/components/Users"
import Cars from "@/pages/management/components/Cars"
import Equipment from "@/pages/management/components/Equipment"
import Driver from "@/pages/management/components/Driver"
import Carsadd from "@/pages/management/components/Carsadd"
import Equipadd from "@/pages/management/components/Equipadd"
import EquipmentFactor from "@/pages/management/components/Equipmentfactor"
import Equipmentcode from "@/pages/management/components/Equipmentcode"
import Factor from "@/pages/management/components/Factor"
import Factoradd from "@/pages/management/components/Factoradd"
import Dictionary from "@/pages/management/components/Dictionary"
import Warning from "@/pages/management/components/Warning"
import Paraconfig from "@/pages/paraconfig/Paraconfig"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
    },
    {
      path:'/login',
      component:Login
    },
    {
      path: '/index',
      redirect:'/nowdata',
      component:Index,
        children:[
          {
            path:'/pollutionmap',
            component:Pollution
          },
          {
            path:'/nowdata',
            component:NowData
          },
           {
            path:'/vehicledetail',
            component:VehicleDetail
          },
          {
            path:'/vehiclealarm',
            component:VehicleAlarm
          },
          {
            path:'/online',
            component:Online
          },
          {
            path:'/teamviewer',
            name:'teamviewer',
            component:TeamViewer,
          },
          {
            path:'/paraconfig',
            name:'paraconfig',
            component:Paraconfig
          }
        ]
    },
    {
      path:'/management',
      redirect:'/management/cars',
      component:Management,
        children:[
          // {
          //   path:'users',
          //   component:Users
          // },

          {
            path:'cars',
            name:'cars',
            component:Cars,
          },
          {
            path:'carsadd',
            name:"carsadd",
            component:Carsadd
          },
          {
            path:'equipment',
            component:Equipment,
            name:'equipment',
            children:[
              {
                path:'equipadd',
                name:"equipadd",
                component:Equipadd
              },
              {
                path:'equipmentfactor',
                name:"equipmentfactor",
                component:EquipmentFactor
              },
              {
                path:'equipmentcode',
                name:"equipmentcode",
                component:Equipmentcode
              }
            ]
          },
          {
            path:'factor',
            name:"factor",
            component:Factor,
            children:[
               {
                path:'factoradd',
                name:"factoradd",
                component:Factoradd
               }
            ]
          },
          {
            path:'dictionary',
            component:Dictionary,
          },
          {
            path:'warning',
            component:Warning,
          },
          {
            path:'driver',
            component:Driver,
          }
        ]
    }
  ]
})
