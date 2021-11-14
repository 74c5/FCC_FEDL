import Head from 'next/head'
import { useSelector } from 'react-redux';

import { toggleSettingsModal } from '../logic/app';

import Interface from '../components/Interface';
import Modal from '../components/Modal';
import Settings from '../components/Settings';
import Footer from '../components/Footer'

import styles from '../styles/Home.module.css'


export default function Home() {
  const settingsShown = useSelector(state => state.app.showSettings);

  return (
    <>
      <Head>
        <title>PomoGoTym</title>
        <meta name="description" content="Simple-ish Timer for Timing Work/Break cycles" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
          <h1>PomoGoTym</h1>
          <Interface />
          <Footer />
          <Modal id="settings-modal" shown={settingsShown} toggle={toggleSettingsModal}>
              <Settings />
          </Modal>
      </main>
    </>
  )
}
