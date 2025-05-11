// App.tsx
import { Routes, Route } from 'react-router-dom';
import NavigationMenu from './components/navigationMenu';
import Workspace from './pages/work-space/workspace';
// import DocumentationPage from './pages/pratice/SearchSuggestionCard';
// import Lesson from './pages/py-runner/lesson';
import HomePage from './pages/home/home-page';

import LoginPage from './pages/login/login-page';
import RegisterPage from './pages/register/register-page';
import LessonPage from './pages/py-runner/lesson';
import ExercisePage from './pages/exercise/exercise-page';
import PatientProfileUI from './pages/info/info';
import PracticePage from './pages/pratice/PracticePage';


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
        <Route path="/info" element={<PatientProfileUI />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/pratice" element={<PracticePage />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/lesson/:lessonId/exercise" element={<ExercisePage />} />
        {/* <Route path="/exercise/:lessonId" element={<ExercisePage />} /> */}
      </Routes>
    </div>
  </>
  );
}

export default App;
