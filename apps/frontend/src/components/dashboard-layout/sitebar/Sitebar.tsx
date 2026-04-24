import Link from "next/link"
import { MENU } from "./menu.data"
import MenuItem from "./MenuItem"
import { GanttChartSquare } from "lucide-react"
import { COLORS } from "@/constants/color.constants"
import LogoutButton from "./LogoutButton"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"

 const Sitebar = () => {
     return <aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
         <div>
             <Link href={DASHBOARD_PAGES.HOME} className='flex items-center gap-2.5 p-layout border-b border-b-border'>
             <GanttChartSquare
						color={COLORS.primary}
						size={38}
             />
             <span className='text-2xl font-bold relative'>RED plannner</span>
         </Link>
         <div className='p-3 relative'>
             <LogoutButton />
             {MENU.map(item => <MenuItem item={item} key={item.link}/>)}
             
         </div>
         </div>
         
         <footer className='text-xs opacity-40 font-normal text-center p-layout'>
				2024 &copy; With love from{' '}
				<a
					href='https://github.com/lexandr10'
					target='_blank'
					rel='noreferrer'
					className='hover:text-primary text-brand-300 transition-colors'
				>
					OLEKSANDR GITHUB
				</a>
				. <br /> All rights reserved.
			</footer>
     </aside>
         
    
}

export default Sitebar