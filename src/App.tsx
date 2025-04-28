// App.tsx
import { Routes, Route } from 'react-router-dom';
import NavigationMenu from './components/navigationMenu';
import Workspace from './pages/work-space/workspace';
import DocumentationPage from './pages/documents/document';
// import Lesson from './pages/py-runner/lesson';
import HomePage from './pages/home/home-page';

import LoginPage from './pages/login/login-page';
import RegisterPage from './pages/register/register-page';
import LessonPage from './pages/py-runner/lesson';


function App() {
  return (
    <>
      <NavigationMenu />
    <div className="pt-12 w-screen bg-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/document" element={<DocumentationPage />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </div>
  </>
  );
}

export default App;
