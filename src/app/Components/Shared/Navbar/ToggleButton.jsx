import React from 'react'

function ToggleButton() {
    return (
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
        </button>
    )
}

export default ToggleButton
