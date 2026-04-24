import { CalendarRange, KanbanSquare, LayoutDashboardIcon, Settings, Timer } from "lucide-react";
import type { IMenu } from "./menu.interface";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";




export const MENU: IMenu[] = [
    {
        icon: LayoutDashboardIcon,
        link: DASHBOARD_PAGES.HOME,
        name: "Dashboard"
    },
    {
		icon: KanbanSquare,
		link: DASHBOARD_PAGES.TASKS,
		name: 'Tasks'
	},
	{
		icon: Timer,
		link: DASHBOARD_PAGES.TIMER,
		name: 'Pomodoro'
	},
	{
		icon: CalendarRange,
		link: DASHBOARD_PAGES.TIME_BLOCKING,
		name: 'Time blocking'
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings'
	}
]