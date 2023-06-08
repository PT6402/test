/* eslint-disable react/prop-types */
import { useState } from "react";

import { BiUser, BiEnvelope, BiPhone } from "react-icons/bi";

import EditProfile from "./EditProfile";

import CenterModal from "../../../Components/CenterModal";

import styles from "./index.module.scss";
import ChangePassword from "./ChangePassword";

const AccountProfile = ({ name, email, phone ,NewPassword,OldPassword}) => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);

  const toggleEditProfile = () => {
    setIsOpenProfile((prevState) => !prevState);
  };
  const toggleChangePassword = () => {
    setIsOpenChangePass((prevState) => !prevState);
  };

  return (
    <>
      <CenterModal
        modalClassName={styles.modal}
        toggleModal={toggleEditProfile}
      >
        {isOpenProfile && (
          <EditProfile
            toggleEditProfile={toggleEditProfile}
            name={name}
            phone={phone}
          />
        )}
      </CenterModal>
      <CenterModal
        modalClassName={styles.modal}
        toggleModal={toggleChangePassword}
      >
        {isOpenChangePass && (
          <ChangePassword
            toggleChangePassword={toggleChangePassword}
            OldPassword={OldPassword}
            NewPassword={NewPassword}
           
          />
        )}
      </CenterModal>

      <div className={styles.profile_container}>
        <div className={styles.profile_wrapper}>
          <h3 className={styles.profile_title}>MY PROFILE</h3>
          <ul className={styles.profile_data}>
            <li>
              <BiUser className={styles.profile_icon} />
              {name} 
            </li>
            <li>
              <BiEnvelope className={styles.profile_icon} />
              {email}
            </li>
            <li>
              <BiPhone className={styles.profile_icon} />
              {phone ? phone : "You haven't added a phone yet"}
            </li>
          </ul>
          <button className={styles.edit_button} onClick={toggleEditProfile}>
            Edit profile
          </button>
          <button className={styles.edit_button} onClick={toggleChangePassword}>
           Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountProfile;
