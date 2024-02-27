import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./Context/AuthContext";
import { QueryProvider } from "./lib/React-Query/QueryProvider";
import ChatsProvider from "./Context/ChatsContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <ChatsProvider>
          <App />
        </ChatsProvider>
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
