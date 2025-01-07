import { Helmet } from "react-helmet"
import AllLostAndRecover from "./AllLostAndRecover"
import Banner from "./Banner"

function Home() {
    return (
        <>
            <Helmet>
                <title>Home - BackToMe</title>
                <meta name="description" content="This is the homepage where you can find lost and recovered items." />
            </Helmet>

            <div className="mt-10">
                <Banner></Banner>
                <AllLostAndRecover></AllLostAndRecover>
            </div>
        </>
    )
}

export default Home