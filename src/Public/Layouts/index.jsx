import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import SideModal from "../Components/SideModal";
import CartContent from "../Components/CartContent";


export default function Layout() {
    const location = useLocation();
    const [isOpenCart, setIsOpenCart] = useState(false);


    const toggleCartModal = () => {
        setIsOpenCart((prevState) => !prevState);
    };


    // TODO: ver si hay una mejor manera de hacer esto
    const pathName = location.pathname.split("/");
    const isCheckout = pathName.includes("checkout");
    // const isCheckout = true
    return (
        <div id="layout">
            <SideModal toggleModal={toggleCartModal}>
                {isOpenCart && (
                    <CartContent toggleCartModal={toggleCartModal} />
                )}
            </SideModal>

            {!isCheckout && <Header toggleCartModal={toggleCartModal} />}

            <main>
                <Outlet />
            </main>
            {!isCheckout && <Footer />}
        </div>
    );
}
