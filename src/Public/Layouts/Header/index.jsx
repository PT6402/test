/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import SideModal from '../../Components/SideModal';
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import style from './index.module.scss';
import Nav from './Nav';
import SideNav from './SideNav';
export default function Header({ toggleCartModal,toggleFilterModal }) {
  
    const [isOpen, setIsOpen] = useState(false);

    const toggleSideNav = () => {
      setIsOpen((prevState) => !prevState);
    };
  
    const isBigScreen = useMediaQuery({
      query: '(min-width: 900px)',
    });
  
    useEffect(() => {
      if (isBigScreen && isOpen) {
        setIsOpen(false);
      }
    }, [isBigScreen, isOpen]);
  
    return (
      <header>
        <SideModal
          toggleModal={toggleSideNav}
          backdropClassName={cx("backdrop")}
          modalClassName={cx("side_nav")}
        >
          {isOpen && <SideNav toggleSideNav={toggleSideNav} />}
       
        </SideModal>
        <Nav toggleSideNav={toggleSideNav} toggleCartModal={toggleCartModal} toggleFilterModal={toggleFilterModal} />
      </header>
    );
}
