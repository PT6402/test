/* eslint-disable react/prop-types */
import { useState } from "react";

import { BiUser, BiEnvelope, BiPhone } from "react-icons/bi";

import EditProfile from "./EditProfile";

import CenterModal from "../../../Components/CenterModal";

import styles from "./index.module.scss";

const AccountProfile = ({ name, email, lastName, phone }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEditProfile = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <CenterModal
        modalClassName={styles.modal}
        toggleModal={toggleEditProfile}
      >
        {isOpen && (
          <EditProfile
            toggleEditProfile={toggleEditProfile}
            name={name}
            lastName={lastName}
            phone={phone}
          />
        )}
      </CenterModal>

      <div className={styles.profile_container}>
        <div className={styles.profile_wrapper}>
          <h3 className={styles.profile_title}>MY PROFILE</h3>
          <ul className={styles.profile_data}>
            <li>
              <BiUser className={styles.profile_icon} />
              {name} {lastName}
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
        </div>
      </div>
    </>
  );
};

export default AccountProfile;
