import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import Chat from "./Components/Chat/Chat";
import Layout from "./admin/Layout";
import Profile from "./Components/Chat/Profile";
import Editprofile from "./Components/Notification/Editprofile";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import SearchPage from "./Components/SearchPage";
import MyCommunities from "./Components/Dashboard/MyCommunities";
import CommunityDetailPage from "./Components/Community-Detail-Page/CommunityDetailPage";
import Invits from "./Components/Invits";
import CreateEdit from "./Components/create-edit-communit";
import OwEvent from "./Components/OwEvent";
import ShowChapter from "./Components/ShowChapter";
import PendingEvent from "./Components/PendingEvent";
import PendingEventEdit from "./Components/PendingEventEdit";
import EventsRemoval from "./Components/EventsRemoval";
import ViewChapter from "./Components/Chapters/ViewChapter";
import AddModal from "./Components/Chapters/AddEvents";
import Community3 from "./Components/Community-Detail-Page/Community3";
import Community4 from "./Components/Community-Detail-Page/Community4";
import Community5 from "./Components/Community-Detail-Page/Community5";
import Community6 from "./Components/Community-Detail-Page/Community6";
import Community7 from "./Components/Community-Detail-Page/Community7";
import Community8 from "./Components/Community-Detail-Page/Community8";
import Home from "./Components/home/Home";
import Login from "./admin/Login";
import Admin from "./admin/Admin";
import ChapterAdd from "./Components/create-edit-communit/modal/add-chapter";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Assets/Css/responsive.css";
import "react-perfect-scrollbar/dist/css/styles.css";
// import "react-perfect-scrollbar/dist/css/sty"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/chapteradd" element={<ChapterAdd />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<Layout />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile/:id" element={<Editprofile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search/:id" element={<SearchPage />} />
        <Route path="/mycommunities" element={<MyCommunities />} />
        <Route path="/owevent" element={<OwEvent />} />
        <Route path="/showchapter" element={<ShowChapter />} />
        <Route path="/viewchapter" element={<ViewChapter />} />
        <Route path="/pendingevent" element={<PendingEvent />} />
        <Route path="/pendingeventedit" element={<PendingEventEdit />} />
        <Route path="/eventsremoval" element={<EventsRemoval />} />
        <Route
          path="/community-details/:id"
          element={<CommunityDetailPage />}
        />
        <Route path="/my-communities" element={<MyCommunities />} />
        <Route path="/invits" element={<Invits />} />
        <Route path="/create-communities" element={<CreateEdit />} />
        <Route path="/owevent/:id" element={<OwEvent />} />
        <Route path="/addevents" element={<AddModal />} />
        <Route path="/community3" element={<Community3 />} />
        <Route path="/community4" element={<Community4 />} />
        <Route path="/community5" element={<Community5 />} />
        <Route path="/community6" element={<Community6 />} />
        <Route path="/community7" element={<Community7 />} />
        <Route path="/community8" element={<Community8 />} />
      </Routes>
    </div>
  );
}

export default App;
