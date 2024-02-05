import { useEffect, useState } from 'react'
import {useLocation } from 'react-router-dom'
import DashProfile from '../components/DashProfile'
import DashSidebar from '../components/DashSidebar'
import DashPost from '../components/DashPost'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
export default function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
    
  }, [location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
    <div className='md:w-56'>
      <DashSidebar></DashSidebar>
    </div>
    {tab === 'profile' && <DashProfile/>}
    {tab === 'posts' && <DashPost></DashPost>}
    {tab === 'users' && <DashUsers></DashUsers>}
    {tab === 'comments' && <DashComments/>}
    </div>
  )
}
