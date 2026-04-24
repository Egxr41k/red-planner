import Loader from "@/components/Loader"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

const GlobalLoader = () => {
    const isMutation = useIsMutating()
    const isFetching = useIsFetching()
    return isMutation || isFetching ? <div className='fixed top-layout right-layout z-50'>
			<Loader />
		</div> : null
}

export default GlobalLoader