import React from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import AddCategory from "./AddCategory";
import Admin from "./Admin";
import Acts from "./AdminComponents/Acts";
import Adminaddsetting from "./AdminComponents/Adminaddsetting";
import AdminChapter from "./AdminComponents/AdminChapter";
import AdminCommunities from "./AdminComponents/AdminCommunities";
import Adminsetting from "./AdminComponents/Adminsetting";
import User from "./AdminComponents/User";
import CategoryList from "./CategoryList";
import Profile from "./Profile";
//Add Option
import AboutUs from "./AdminComponents/AboutUs";
import TermsOfUse from "./AdminComponents/TermsOfUse"
import ContactUs from "./AdminComponents/ContactUs"
import AddAds from "./AdminComponents/AddAds"
import GoogleAdds from "./AdminComponents/GoogleAdds";



const Layout = () => {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("userToken");
  return (
    <>
      <Admin>
        <Routes>
        {isLoggedIn?<>
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/adminprofile" element={<Profile />} />
          <Route path="/category/categorylist" element={<CategoryList />} />
          <Route path="/user" element={<User />} />
          <Route path="/acts" element={<Acts />} />
          <Route path="/communities" element={<AdminCommunities />} />
          <Route path="/chapters" element={<AdminChapter />} />
          <Route path="/settings" element={<Adminsetting />} />
          <Route path="/addsettings" element={<Adminaddsetting />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/addads" element={<AddAds />} />
          <Route path="/googleadds" element={<GoogleAdds />} />
          </>:
          navigate("/adminlogin")
        }
        </Routes>
      </Admin>
    </>
  );
};

export default Layout;
