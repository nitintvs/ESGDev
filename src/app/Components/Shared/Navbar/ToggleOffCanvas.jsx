import React from 'react'

function ToggleOffCanvas() {
    const toggleOffcanvas = () =>{
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
    }
    return (
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
        </button>
    )
}

export default ToggleOffCanvas
