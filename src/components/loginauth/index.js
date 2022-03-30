// import { selector, useRecoilValue } from "recoil";
// import axios from "axios";

// const authUser = selector(
//     {
//         key: 'authUser',
//         get: async () => {
//             let user = null;
//             try {
//                 const { data } = await axios.get('http://127.0.0.1:3002/user/5');
//                 user = { user: data };
//             } catch (e) {
//                 user = { user: e.message }
//             }
//             return user;
//         }
//     }
// );


// export { authUser };