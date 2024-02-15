import { Provider } from "react-redux";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import store from "./redux/store";
import { Router } from "./routes/router";
import { Loader } from "./shared/Loader";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router />
        <Toaster />
        <Loader />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
