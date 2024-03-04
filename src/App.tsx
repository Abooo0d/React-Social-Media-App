import "./globals.css";
import { Routes, Route } from "react-router-dom";
import {
  Explore,
  HomePage,
  Saved,
  AllUsers,
  CreatePost,
  EditPost,
  PostDetails,
  Profile,
  UpdateProfile,
} from "./_root/Pages";
import SignInForm from "./_auth/Forms/SignInForm";
import SignUpForm from "./_auth/Forms/SignUpForm";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AutLayout";
import { Toaster } from "@/components/ui/toaster";
import ChatPage from "./_root/Pages/ChatPage";
import StanderLayout from "./_root/StanderdLayout";
import ChatForm from "./components/Forms/ChatForm";
const App = () => {
  return (
    <main className="flex h-screen ">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
        {/* Private routes  */}
        <Route element={<StanderLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/explore" element={<Explore />} />

          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/chats" element={<ChatPage />}>
            <Route path={"/chats/:id"} element={<ChatForm />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
