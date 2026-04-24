import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Heading } from "@/components/Heading";
import Statistics from "./Statistics";


export const metadata: Metadata = {
    title: "Dashboard",
    ...NO_INDEX_PAGE
}

const Dashboard = () => {
    return <div>
        <Heading title="Statistics" />
        <Statistics/>
    </div>
}

export default Dashboard