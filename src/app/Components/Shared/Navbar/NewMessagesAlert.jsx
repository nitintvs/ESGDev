import React from 'react'
import { Dropdown } from 'react-bootstrap';
import Face2 from '../../../../assets/images/faces/face2.jpg'
import Face3 from '../../../../assets/images/faces/face3.jpg'
import Face4 from '../../../../assets/images/faces/face4.jpg'
function NewMessagesAlert() {
    return (
        <li className="nav-item">
            <Dropdown align={'right'}>
              <Dropdown.Toggle className="nav-link count-indicator">
                <i className="mdi mdi-email-outline"></i>
                <span className="count-symbol bg-warning"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="preview-list navbar-dropdown">
                <h6 className="p-3 mb-0">Messages</h6>
                <div className="dropdown-divider"></div>
                <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                <div className="preview-thumbnail">
                  <img src={Face4} alt="user" className="profile-pic"/>
                </div>
                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                  <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                  <p className="text-gray mb-0">
                    1 Minutes ago
                  </p>
                </div>
              </Dropdown.Item>
              <div className="dropdown-divider"></div>
                <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <img src={Face2} alt="user" className="profile-pic"/>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><>Cregh send you a message</></h6>
                    <p className="text-gray mb-0">
                      15 <>Minutes ago</>
                    </p>
                  </div>
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <img src={Face3} alt="user" className="profile-pic"/>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><>Profile picture updated</></h6>
                    <p className="text-gray mb-0">
                      18 <>Minutes ago</>
                    </p>
                  </div>
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <h6 className="p-3 mb-0 text-center cursor-pointer">4 <>new messages</></h6>
              </Dropdown.Menu>
            </Dropdown>
        </li>
    )
}

export default NewMessagesAlert
