// import '../styles/globals.css'
// import styles from '../styles/Home.module.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }:AppProps) {
    return (
        <div>
        {/* <div className={styles.container}> */}
        <Component {...pageProps} />
        </div>
    )
}

export default MyApp
