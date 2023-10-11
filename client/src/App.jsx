import './App.css';
import { Home } from './pages/Home.jsx';
import { Download } from './pages/Download.jsx';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const adjustMainPadding = () => {
    const footerHeight = document.querySelector('footer').offsetHeight;
    document.querySelector('main').style.paddingBottom = `${
      footerHeight + 40
    }px`;
  };

  useEffect(() => {
    window.addEventListener('resize', adjustMainPadding);

    return () => {
      window.removeEventListener('resize', adjustMainPadding);
    };
  });

  useEffect(() => {
    adjustMainPadding();
  }, []);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </main>
      <footer>
        <div>
          This was made by{' '}
          <a href="https://github.com/HadyMash">Hady Mashhour</a>. A guide,
          known issues, and source code is available on{' '}
          <a href="https://github.com/HadyMash/HWU-Calendar-Timetable">
            GitHub
          </a>
          . If you are running into any issues feel free to create a{' '}
          <a href="https://github.com/HadyMash/HWU-Calendar-Timetable/issues/new">
            new issue
          </a>{' '}
          or email me at{' '}
          <a href="mailto:hady.mashhour@gmail.com">hady.mashhour@gmail.com</a>.
        </div>
      </footer>
    </>
  );
}

export default App;
