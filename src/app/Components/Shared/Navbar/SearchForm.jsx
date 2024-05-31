import React from 'react'
const SearchForm = () => {
    return (
        <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
                <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                        <i className="input-group-text border-0 mdi mdi-magnify"></i>
                    </div>
                    <input type="text" className="form-control bg-transparent border-0" placeholder="Search here ..."/>
                </div>
            </form>
        </div>
    )
}

export default SearchForm
