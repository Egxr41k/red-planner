


import { Metadata } from "next";


import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Heading } from "@/components/Heading";
import Settings from "./Settings";


export const metadata: Metadata = {
    title: "Settings",
    ...NO_INDEX_PAGE
}

const SettingsPage = () => {
    return <div>
        <Heading title="Settings" />
        <Settings/>
    </div>
}

export default SettingsPage