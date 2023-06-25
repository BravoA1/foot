import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import ReactGA from "react-ga4";
import { createBrowserHistory } from "history";

// Google Analytics
const TRACKING_ID = "G-W7Q3B0D2WC";
ReactGA.initialize(TRACKING_ID, { debug: "true" });
const history = createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.send(location.pathname);
});

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <Header />
        <div className="d-flex flex-column flex-fill">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
