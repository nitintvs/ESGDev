import React, {useEffect} from 'react'
import Navbar from '../Components/Shared/Navbar/Navbar'
import SideBar from '../Components/Shared/Panel/SideBar/SideBar'

const Layout = ({ children }) => {
  let navbarComponent = <Navbar/>
  let sidebarComponent = <SideBar />
  //let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
  // let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
  // let SettingsPanelComponent = !this.state.isFullPageLayout ? <SettingsPanel/> : '';
  // let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
  
  return (
    <>
      <div className="container-scroller">
        {navbarComponent}
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              <main>{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
