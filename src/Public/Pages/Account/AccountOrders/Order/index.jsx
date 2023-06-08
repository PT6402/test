import { useState } from 'react';



import styles from './index.module.scss';
import CenterModal from '../../../../Components/CenterModal';
import OrderContent from './OrderContent';
import { formatDate } from '../../../../helpers/format';

const Order = ({ id, items, date,order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOrderModal = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <CenterModal toggleModal={toggleOrderModal}>
        {isOpen && (
          <OrderContent
            toggleOrderModal={toggleOrderModal}
            id={id}
            items={items}
            date={date}
            order={order}
          />
        )}
      </CenterModal>
      <div className={styles.card} onClick={toggleOrderModal}>
        <h3>Orden #{id}</h3>
        <p className={styles.date}>{formatDate(date)}</p>
      </div>
    </>
  );
};

export default Order;
