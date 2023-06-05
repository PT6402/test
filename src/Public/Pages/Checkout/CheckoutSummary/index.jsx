

import { useCheckout } from '../../../Hooks/useCheckout';
import { useCheckoutContext } from '../../../Hooks/useCheckoutContext';
import styles from './index.module.scss';

const CheckoutSummary = () => {
  const { currentStep, email, shippingAddress, shippingOption } =
    useCheckoutContext();
  const { selectStep } = useCheckout();
  // const { currentStep, email, shippingAddress, shippingOption } =
  //   [];
  // const { selectStep } = [];

  let shipping_option;

  if (shippingOption.standard) {
    shipping_option = 'Estandard - $750';
  } else {
    shipping_option = 'Rápido - $1.500';
  }

  if (currentStep === 2)
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contact</p>
          <p className={styles.content}>{email}</p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 1)}
          >
            Modify
          </p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Address</p>
          <p className={styles.content}>
            {shippingAddress.address} - {shippingAddress.city},{' '}
            {shippingAddress.zipCode} - {shippingAddress.province}
          </p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 1)}
          >
            Modify
          </p>
        </li>
      </ul>
    );

  if (currentStep === 3)
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contact</p>
          <p className={styles.content}>{email}</p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 2)}
          >
            Modify
          </p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Address</p>
          <p className={styles.content}>
            {shippingAddress.address} - {shippingAddress.city},
            {shippingAddress.zipCode} - {shippingAddress.province}
          </p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 2)}
          >
            Modify
          </p>
        </li>
        {/* TODO: Agregar contenido */}
        <li className={styles.method}>
          <p className={styles.label}>shipping</p>
          <p className={styles.content}>{shipping_option}</p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 1)}
          >
            Modify
          </p>
        </li>
      </ul>
    );
};

export default CheckoutSummary;