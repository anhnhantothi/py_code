import { Routes, Route, useLocation } from 'react-router-dom';
import NavigationMenu from './components/navigationMenu';
import Workspace from './pages/work-space/workspace';
import HomePage from './pages/home/home-page';
import LoginPage from './pages/login/login-page';
import RegisterPage from './pages/register/register-page';
import LessonPage from './pages/py-runner/lesson';
import ExercisePage from './pages/exercise/exercise-page';
import PatientProfileUI from './pages/info/info';
import PracticePage from './pages/practice/PracticePage';
import CustomerManage from './pages/customer/customer';
import PermissionManage from './pages/permission/permission';
import DashboardPage from './pages/dashboard/dashboard';
import PracticeDetailPage from './pages/practice/PracticeDetailPage';
import PracticeManage from './pages/practice-management/practice-management';
import { useAuth } from './contexts/auth_context';
import AdminRoute from './untils/adminRouter';
import LessonManage from './pages/lesson-management/lesson-management';
import LessonDetail from './pages/lesson-management/lesson-detail';
import Footer from './components/footer';

function App() {
  const { user } = useAuth();
  const isAdmin = user?.is_admin ?? false;

  const location = useLocation();
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';
  const isAdminRoute = location.pathname.startsWith('/admin'); // 👈 thêm dòng này

  return (
    <>
      <div className="pt-12 w-screen bg-white">
        {!hideLayout && <NavigationMenu />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/profile" element={<PatientProfileUI />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/:slug" element={<PracticeDetailPage />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/lesson/:lessonId/exercise" element={<ExercisePage />} />

          <Route
            path="/admin/lesson-detail"
            element={
              <AdminRoute isAdmin={isAdmin}>
                <LessonDetail />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/customer"
            element={
              <AdminRoute isAdmin={isAdmin}>
                <CustomerManage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/permission"
            element={
              <AdminRoute isAdmin={isAdmin}>
                <PermissionManage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute isAdmin={isAdmin}>
                <DashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/practice-management"
            element={
              <AdminRoute isAdmin={isAdmin}>
                <PracticeManage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/lesson-management"
            element={
              <AdminRoute isAdmin={isAdmin}>
                <LessonManage />
              </AdminRoute>
            }
          />
        </Routes>

        {/* 👇 Footer chỉ hiển thị nếu không ở trang đăng nhập/đăng ký và không ở admin */}
        {!hideLayout && !isAdminRoute && <Footer />}
      </div>
    </>
  );
}

export default App;
