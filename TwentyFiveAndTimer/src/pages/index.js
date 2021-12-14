import Head from 'next/head'

import Interface from '../components/Interface';
import Footer from '../components/Footer';

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>25 & 5 Timer</title>
        <meta name="description" content="Simple-ish Timer for Timing Work/Break cycles" />
        <link rel="icon" href="./favicon.png" />
      </Head>

      <main className={styles.main}>
          <h1>25 & 5 Timer</h1>
          <Interface />
          <Footer />
      </main>
    </>
  )
}
