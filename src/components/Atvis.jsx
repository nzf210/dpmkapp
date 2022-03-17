import { authUser } from "../components/loginauth";
import { useRecoilValue } from "recoil";

const Atvis = () => {
    const { user } = useRecoilValue(authUser);
    console.log(user.nama);
    return (
        <div>
            <div className="h-40"></div>
            Atvis
            <span> {user.password}</span>

        </div>
    )
}

export default Atvis