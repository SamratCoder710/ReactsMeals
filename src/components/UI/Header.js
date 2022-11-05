import React from 'react';
import styles from './Header.module.css';
import CartSection from '../Cart/CartSection';

const Header = (props) =>{
    return (
        <section className={styles.header}>
            <div>
                <span className={styles.title}>ReactMeals</span>
                <span className={styles.cart} onClick={props.onShowCart}><CartSection/></span>
            </div>
        </section>
    );

}

export default Header;