
import Button from "../../../Components/Button/index";

import styles from "./index.module.scss";
import { useAuthContext } from "../../../Hooks/useAuthContext";

const AccountAddresses = () => {
    const {addresses } = useAuthContext();
//  const address =[addresses]
//  address.push(addresses)
console.log(addresses)
  const defaultAddress = addresses.find((address) => (address.default_address==1));
console.log(defaultAddress)
  const otherAddresses = addresses.filter((address) => (address.default_address==0));

  return (
    <div className={styles.addresses_container}>
      <div className={styles.addresses_wrapper}>
        <h3 className={styles.addresses_titles}>My Addresses</h3>
        <div className={styles.addresses_list}>
          {addresses.length === 0 && (
            <p className={styles.no_addresses}>
              You have not added an address yet
            </p>
          )}

          {addresses.length > 0 && (
            <>
            {}
              <div className={styles.address_wrapper}>
                <h3 className={styles.title}>Default address</h3>

                {/* <h4 className={styles.name}>
                  {defaultAddress.name} {defaultAddress.lastName}
                </h4> */}
                <ul className={styles.info}>
                  <li>{defaultAddress.address}</li>
                  {/* <li>
                    {defaultAddress.city}, {defaultAddress.zipCode}
                  </li> */}
                  <li>{defaultAddress.city_province}</li>
                </ul>
              </div>
              {otherAddresses.map((address) => (
                <div className={styles.address_wrapper} key={address.id}>
                  <h3 className={styles.title}>
                    Address{address.displayOrder}
                  </h3>

                  <h4 className={styles.name}>
                  address:{address.address}
                  </h4>
                  <ul className={styles.info}>
                    <li>note:{address.note}</li>
                    {/* <li>
                      {address.city}, {address.zipCode}
                    </li> */}
                    <li>city/province:{address.city_province}</li>
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
        <Button className={styles.edit_button} to="/account/address">
          Edit Addresses
        </Button>
      </div>
    </div>
  );
};

export default AccountAddresses;
