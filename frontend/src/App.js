import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Userprofile } from './component/userprofile';
import { Signin } from './component/signin';
import { Signup } from './component/siginup';
import {Home} from './component/home';
import { ErorrPage } from "./component/404";
import { CourseMilstone } from "./component/coursemilestone";
import { Coursepage } from "./component/coursepage";
import { Admin } from "./component/admin";
import { Coursetopic } from "./component/coursetopic";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route index element={<Home/>} />
          <Route path="userprofile" element={<Userprofile/>} />
          <Route path="signin" element={<Signin/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path={`coursemilestone/:cid/:cc`} element={<CourseMilstone/>} />
          <Route path={`course/:id/:cid/:ch`} element={<Coursepage/>} />
          <Route path="admin" element={<Admin/>} />
          <Route path="coursetopic" element={<Coursetopic/>} />
          <Route path="*" element={<ErorrPage/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
