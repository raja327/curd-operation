import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FormProvider } from "../provider/FormProvider";
export default function AppLayout() {
  return (
    <FormProvider>
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        <div className="">
          <main className="">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </FormProvider>
  );
}
