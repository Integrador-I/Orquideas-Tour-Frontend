"use client"

import {


  BusFront,
  CalendarRange,
  CircleDollarSign,

  HelpCircleIcon,
  LayoutDashboardIcon,

  MapPinned,

  Package,
  Proportions,
  SearchIcon,
  SettingsIcon,

  UsersRound,
} from "lucide-react"

import { NavMain } from "./sidebarPrincipal"
import { NavSecondary } from "./sidebarSecundario"
import { NavUser } from "./sidebarUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,

} from "@/components/ui/sidebar"


const data = {
  user: {
    nombre: "Jhon Doe",
    email: "jhondoe@gmail.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Buses",
      url: "/dashboard/buses",
      icon: BusFront,
    },
    {
      title: "Calendario",
      url: "#",
      icon: CalendarRange,
    },
    {
      title: "Conductores",
      url: "/dashboard/conductores",
      icon: UsersRound ,
    },
    {
      title: "viajes",
      url: "/dashboard/viajes",
      icon: MapPinned  ,
    },
    {
      title: "Encomiendas",
      url: "/dashboard/encomiendas",
      icon: Package ,
    },
    {
      title: "Pagos",
      url: "#",
      icon: CircleDollarSign ,
    },
    {
      title: "Reporte",
      url: "#",
      icon: Proportions,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>

        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
