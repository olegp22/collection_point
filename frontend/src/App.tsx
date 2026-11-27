
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { DashboardLayout } from './components/DashboardLayout';

import { Home } from './pages/Home';
import { Tests } from './pages/Tests';
import { CreateTesting } from './pages/CreateTesting';
import { TestingDetails } from './pages/TestingDetails';

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Home />} />
        <Route path="/testing/new" element={<CreateTesting />} />
        <Route path="/tests" element={<Tests />} />
        <Route
          path="/testing/:id"
          element={<TestingDetails />}
        />
        <Route
          path="*"
          element={<Navigate to="/testing" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;
