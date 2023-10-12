import { Form } from '@/components/Form';
import styles from './styles.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page',
};

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.contentTextContainer}>
        <h2>Encurte seus links :)</h2>
        <p>
          Linkly é um serviço de encurtamento de URL eficiente e fácil de usar
          que agiliza sua experiência online.
        </p>
      </section>

      <Form />
    </main>
  );
}
