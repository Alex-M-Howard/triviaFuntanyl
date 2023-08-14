import Image from 'next/image';
import styles from './page.module.css';
import NavBar from './components/nav';
import Game from './game/page';

export default function Home() {
  return (
    <main>
     <NavBar />

      <div>
       <Game />
      </div>

    </main>
  )
}
