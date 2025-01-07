import { useContext } from "react"
import AuthContext from "../context/AuthContext"

function SocialLogin() {

    const {singInWithGoogle} = useContext(AuthContext)

    const handelGoogleSingIn = () => {
        singInWithGoogle()
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <button onClick={handelGoogleSingIn} className="btn btn-outline w-full">Google</button>
        </div>
    )
}

export default SocialLogin