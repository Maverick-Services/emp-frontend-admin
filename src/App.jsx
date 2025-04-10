import './App.css'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Profile } from './components/core/dashboard/Profile'
import Navbar from './components/Navbar'
import { EditUserDetails } from './components/core/dashboard/employee/EditUserDetails'
import { AddUser } from './components/core/dashboard/employee/AddUser'
import { AddAdmin } from './components/core/dashboard/admin/AddUser'
import { EditAdminDetails } from './components/core/dashboard/admin/EditUserDetails'
import { EditTeamDetails } from './components/core/dashboard/team/EditTeamDetails'
import { AddTeam } from './components/core/dashboard/team/AddTeam'
import { AdminLogin } from './pages/Login'
import Employees from './components/core/dashboard/Employees'
import Teams from './components/core/dashboard/Teams'
import OpenRoute from './components/core/auth/OpenRoute'
import PrivateRoute from './components/core/auth/PrivateRoute'
import Home from './components/core/dashboard/Home'
import Queries from './components/core/dashboard/queries/Queries'
import Query from './components/core/dashboard/queries/Query'
import Announcements from './components/core/dashboard/announcements/Announcements'
import NewAnnouncement from './components/core/dashboard/announcements/NewAnnouncement'
import AnnouncementDetails from './components/core/dashboard/announcements/AnnouncementDetails'

function App() {
  return (
    <div id='wrapper' className='bg-[#F3F6FE]'>
      {/* Admin  */}
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={
          <OpenRoute>
            <AdminLogin />
          </OpenRoute>
        } />
        <Route
          // path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/home' element={<Home />} />
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/addUser' element={<AddUser />} />
          <Route path='/dashboard/users/:empId' element={<EditUserDetails />} />
          <Route path='/dashboard/users' element={<Employees />} />
          <Route path='/dashboard/addTeam' element={<AddTeam />} />
          <Route path='/dashboard/teams/:teamId' element={<EditTeamDetails />} />
          <Route path='/dashboard/teams' element={<Teams />} />
          <Route path='/dashboard/queries' element={<Queries />} />
          <Route path='/dashboard/queries/:queryId' element={<Query />} />
          <Route path='/dashboard/announcements' element={<Announcements />} />
          <Route path='/dashboard/announcements/newAnnouncement' element={<NewAnnouncement />} />
          <Route path='/dashboard/announcements/:announcementId' element={<AnnouncementDetails />} />
          <Route
            path='*'
            element={<p>404 Error - Page Not Found</p>}
          />
        </Route>
        <Route
          path='*'
          element={<p>404 Error - Page Not Found</p>}
        />
      </Routes>
    </div>
  )
}

export default App
