import { useEffect, useState } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Toast from "../../Components/Toast";
import ToastMessage from "../../Components/ToastMessage";
import CenterModal from "../../Components/CenterModal";
import Address from "./Address";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import style from "./index.module.scss";
import { useAddress } from "../../Hooks/useAddress";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import { BiChevronLeft, BiPlus } from "react-icons/bi";
import Loader from "../../Components/Loader";
import AddAddress from "./AddAddress";
export default function Addresses() {
    const { addresses } = useAuthContext();
    const { deleteAddress, isLoading, error } = useAddress();

console.log(addresses)
    const [isOpen, setIsOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    const defaultAddress = addresses.find((address) => address.default_address==1);

    const otherAddresses = addresses.filter((address) => address.default_address==0);

    const toggleAddAddressModal = () => {
        setIsOpen((prevState) => !prevState);
    };

    useEffect(() => {
        if (error) {
            setToastMessage({ error, details: error.details });
        }
    }, [error]);

    const toggleToast = () => {
        setToastMessage(null);
    };

    return (
        <>
            <Toast>
                {toastMessage && (
                    <ToastMessage
                        toggleToast={toggleToast}
                        content={toastMessage}
                    />
                )}
            </Toast>
            <CenterModal
                modalClassName={cx("modal")}
                toggleModal={toggleAddAddressModal}
            >
                {isOpen && (
                    <AddAddress toggleAddAddressModal={toggleAddAddressModal} />
                )}
            </CenterModal>
            <section>
                <div className={`${cx("container")} main-container`}>
                    <Link className={cx("back_button")} to="/account">
                        <span>
                            <BiChevronLeft />
                        </span>
                        Back to my account
                    </Link>
                    <div className={cx("header_wrapper")}>
                        <p className={cx("title")}>My Addresses</p>
                        <Button
                            className={cx("add_button")}
                            onClick={toggleAddAddressModal}
                        >
                            <span>
                                <BiPlus />
                            </span>
                            Add new address
                        </Button>
                    </div>

                    <div className={cx("addresses_container")}>
                        {isLoading && (
                            <Loader
                                wrapperClassName={cx("loader_wrapper")}
                                noPortal={true}
                            />
                        )}
                        {!isLoading && (
                            <>
                                {addresses.length === 0 && (
                                    <h2 className={cx("no_addresses")}>
                                        You have not added an address yet!
                                    </h2>
                                )}

                                {addresses.length > 0 && (
                                    <div className={cx("addresses_list")}>
                                        {defaultAddress && (
                                            <Address
                                                address={defaultAddress.address}
                                                note={defaultAddress.note}
                                                city_province={
                                                    defaultAddress.city_province
                                                }
                                                id={defaultAddress.id}
                                                default_address={
                                                    defaultAddress.default_address
                                                }
                                                onDelete={deleteAddress}
                                            />
                                        )}
                                        {otherAddresses.map((address) => (
                                            <Address
                                                key={address.id}
                                                address={address.address}
                                                note={address.note}
                                                city_province={
                                                    address.city_province
                                                }
                                                id={address.id}
                                                default_address={address.isMain}
                                                onDelete={deleteAddress}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
