import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ArtworkTable } from './components/ArtworkTable';

function App() {
  return (
    <div style={{ padding: '1.5rem', width: '100vw', height: '100vh', overflow: 'auto', boxSizing: 'border-box' }}>
      <h2>Artwork Gallery</h2>
      <ArtworkTable />
    </div>
  );
}

export default App;