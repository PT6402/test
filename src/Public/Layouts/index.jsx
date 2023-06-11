import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import SideModal from "../Components/SideModal";
import CartContent from "../Components/CartContent";
import FilterContent from "../Components/FilterContent";


export default function Layout() {
    const location = useLocation();
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [isOpenFilter, setIsOpenFilter] = useState(false);


    const toggleCartModal = () => {
        setIsOpenCart((prevState) => !prevState);
    };
    const toggleFilterModal = () => {
        setIsOpenFilter((prevState) => !prevState);
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
            <SideModal toggleModal={toggleFilterModal}>
                {isOpenFilter && (
                    <FilterContent toggleFilterModal={toggleFilterModal} />
                )}
            </SideModal>
            {!isCheckout && <Header toggleCartModal={toggleCartModal} toggleFilterModal={toggleFilterModal}/>}

            <main>
           
                <Outlet />
            </main>
            {!isCheckout && <Footer />}
        </div>
    );
}
