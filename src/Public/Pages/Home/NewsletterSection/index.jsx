import { useState, useRef, useEffect } from 'react';

// import { useNewsletter } from 'hooks/useNewsletter';

import Button from '../../../Components/Button';
import Toast from '../../../Components/Toast';
import ToastMessage from '../../../Components/ToastMessage';

import styles from './index.module.scss';

const NewsletterSection = () => {
//   const { subscribeToNewsletter, success, error } = useNewsletter();

  const emailInputRef = useRef();
  const scrollToRef = useRef();

  const [toastMessage, setToastMessage] = useState(null);

  const scrollTo = () => {
    scrollToRef.current.scrollIntoView();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;

    // console.log(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(email));

    // await subscribeToNewsletter({ email });
  };

  const toggleToast = () => {
    setToastMessage(null);
  };

//   useEffect(() => {
//     if (success || error) {
//       scrollTo();
//     }

//     if (error) {
//       if (error) {
//         setToastMessage({ error, details: error.details });
//       }
//     }
//   }, [success, error]);

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      <section className={styles.section}>
        <div className={`${styles.container} main-container`}>
          <h3 className={styles.title}>Subscribite a nuestra newsletter</h3>
          <div>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              ref={scrollToRef}
            >
              {/* {!success && ( */}
                <>
                  <input
                    className={styles.input}
                    placeholder="Tu Dirección de Email"
                    type="email"
                    ref={emailInputRef}
                    required
                  />
                  <Button type="submit" className={styles.button}>
                    Submit
                  </Button>
                </>
              {/* )} */}
              {/* {success && (
                <Button type="button" className={styles.success} disabled>
                  {success.content}
                </Button>
              )} */}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterSection;
