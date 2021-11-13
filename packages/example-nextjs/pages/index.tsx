import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  useAccountBalance,
  useAssetBalance,
  usePolkadotExtension,
  useSystemProperties,
} from '@substra-hooks/core';
import { useEffect } from 'react';
import Link from 'next/link'

const Home: NextPage = () => {
  const { accounts, w3enable, w3Enabled } = usePolkadotExtension();
  const balancePayload = useAccountBalance(accounts?.[5]?.address || '');
  const assetPayload = useAssetBalance(accounts?.[5]?.address || '', 8, 'statemine');
  const systemProperties = useSystemProperties();

  console.log('systemProperties', systemProperties);

  useEffect(() => {
    if (!w3Enabled) {
      w3enable();
    }
  }, [w3Enabled]);

  console.log('accounts', accounts);

  console.log('balancePayload', accounts?.[5]?.address || '', balancePayload);
  console.log('assetPayload', assetPayload);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>
        <div>Balance: {balancePayload?.balanceFormatted}</div>
        <div>Asset balance: {assetPayload?.balanceFormatted}</div>
        <Link href={'/page-two'}>Page two</Link>
      </main>


    </div>
  );
};

export default Home;
