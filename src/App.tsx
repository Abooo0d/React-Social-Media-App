import "./globals.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./_root/Pages";
import SignInForm from "./_auth/Forms/SignInForm";
import SignUpForm from "./_auth/Forms/SignUpForm";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AutLayout";
import { Toaster } from "@/components/ui/toaster";
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
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
