import Step from './Step';

import styles from './index.module.scss';

const CheckoutProgression = ({ steps ,status}) => {
  return (
    <div className={styles.steps_container}>
      {steps.map((step, index) => (
        <Step
          key={step.label}
          label={step.label}
          url={step.url}
          index={index}
          status={status}
        />
      ))}
    </div>
  );
};

export default CheckoutProgression;
