import DashboardLayout from "@/components/dashboard-layout/DashboardLayout"
import { PropsWithChildren } from "react"

const Layout = ({children}: PropsWithChildren<unknown>) => {
    return <DashboardLayout>{ children}</DashboardLayout>
}

export default Layout