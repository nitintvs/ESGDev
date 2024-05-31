import React from 'react'

function RightSideBar() {
    const toggleRightSidebar = () =>{
        document.querySelector('.right-sidebar').classList.toggle('open');
    }
    return (
        <li className="nav-item nav-settings d-none d-lg-block">
            <button type="button" className="nav-link border-0" onClick={toggleRightSidebar} >
              <i className="mdi mdi-format-line-spacing"></i>
            </button>
        </li>
    )
}

export default RightSideBar
