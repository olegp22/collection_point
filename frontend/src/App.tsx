
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { DashboardLayout } from './components/DashboardLayout';

import { Home } from './pages/Home';
import { Tests } from './pages/Tests';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DashboardLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/testing" element={<Home />} />

          <Route path="/tests" element={<Tests />} />

          <Route
            path="*"
            element={<Navigate to="/testing" replace />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
