import React, {createContext, useState} from 'react';
import styles from "./index.module.scss"
export const AccordionContext = createContext({
    active: 0,
    setActive: () => {}
});

const AccordionWrapper = ({children}) => {

    const [active, setActive] = useState(0);

    return (
        <AccordionContext.Provider
            value={{
                active, setActive
            }}
        >
        <div className={styles.accordion_wrapper}>
            <form>
                {children}
            </form>
        </div>
        </AccordionContext.Provider>
    )
}

export default AccordionWrapper; 