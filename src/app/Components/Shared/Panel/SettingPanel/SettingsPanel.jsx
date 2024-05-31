import React from 'react'
import './settingPanel.css'
import { Tabs, Tab } from 'react-bootstrap';

import Face1 from '../../../../../assets/images/faces/face1.jpg'
import Face2 from '../../../../../assets/images/faces/face2.jpg'
import Face3 from '../../../../../assets/images/faces/face3.jpg'
import Face4 from '../../../../../assets/images/faces/face4.jpg'
import Face5 from '../../../../../assets/images/faces/face5.jpg'
import Face6 from '../../../../../assets/images/faces/face6.jpg'


const SettingsPanel = (props) => {
    const closeRightSidebar = () =>{
        document.querySelector('.right-sidebar').classList.remove('open');
    }
    
    const todos = [
        {
            id: 1,
            task: 'Pick up kids from school',
            isCompleted: false
        },
        {
            id: 2,
            task: 'Prepare for presentation',
            isCompleted: true
        },
        {
            id: 3,
            task: 'Print Statements',
            isCompleted: false
        },
        {
            id: 4,
            task: 'Create invoice',
            isCompleted: false
        },
        {
            id: 5,
            task: 'Call John',
            isCompleted: true
        },
        {
            id: 6,
            task: 'Meeting with Alisa',
            isCompleted: false
        }
    ]
    return (
        <>
            <div id="right-sidebar" className="settings-panel right-sidebar">
                <i className="settings-close mdi mdi-close"  onClick={closeRightSidebar}></i>
                <Tabs defaultActiveKey="TODOLIST" className="bg-gradient-primary" id="uncontrolled-tab-example">
                    <Tab eventKey="TODOLIST" title="TO DO LIST" className="test-tab">
                        <div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="px-3">
                                        <div>
                                            <h4 className="card-title">< >Todo List </></h4>
                                            <form  className="add-items d-flex">
                                                <input 
                                                    type="text" 
                                                    className="form-control h-auto" 
                                                    placeholder="What do you need to do today?" 
                                                    value={""} 
                                                    required 
                                                />
                                                <button type="submit" className="btn btn-gradient-primary font-weight-bold">< >Add </></button>
                                            </form>
                                            <div className="list-wrapper">
                                                <ul className="todo-list">
                                                    {
                                                        todos.map(item =>
                                                            <li className={(item.isCompleted ? 'completed' : null)}>
                                                                <div className="form-check">
                                                                    <label htmlFor="" className="form-check-label"> 
                                                                        <input className="checkbox" type="checkbox" 
                                                                            checked={item.isCompleted} 
                                                                            onChange={item.changed} 
                                                                            /> {item.task} <i className="input-helper"></i>
                                                                    </label>
                                                                </div>
                                                                <i className="remove mdi mdi-close-circle-outline" onClick={item.remove}></i>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="events py-4 border-bottom px-3">
                                <div className="wrapper d-flex mb-2">
                                    <i className="mdi mdi-circle-outline text-primary mr-2"></i>
                                    <span>< >Feb </> 11 2018</span>
                                </div>
                                <p className="mb-0 font-weight-thin text-gray">< >Creating component page </></p>
                                <p className="text-gray mb-0">< >build a js based app </></p>
                            </div>
                            <div className="events pt-4 px-3">
                                <div className="wrapper d-flex mb-2">
                                    <i className="mdi mdi-circle-outline text-primary mr-2"></i>
                                    <span>< >Feb </> 7 2018</span>
                                </div>
                                <p className="mb-0 font-weight-thin text-gray">< >Meeting with Alisa </></p>
                                <p className="text-gray mb-0 ">< >Call Sarah Graves </></p>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="CHATS" title="CHATS">
                        <div>
                            <div className="d-flex align-items-center justify-content-between border-bottom">
                            <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">< >FRIENDS </></p>
                            <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">< >See All </></small>
                            </div>
                            <ul className="chat-list">
                            <li className="list active">
                                <div className="profile"><img src={Face1} alt="profile" /><span className="online"></span></div>
                                <div className="info">
                                <p>< >Thomas Douglas </></p>
                                <p>< >Available </></p>
                                </div>
                                <small className="text-muted my-auto">19 < >min </></small>
                            </li>
                            <li className="list">
                                <div className="profile"><img src={Face2} alt="profile" /><span className="offline"></span></div>
                                <div className="info">
                                <div className="wrapper d-flex">
                                    <p>< >Catherine </></p>
                                </div>
                                <p>< >Away </></p>
                                </div>
                                <div className="badge badge-success badge-pill my-auto mx-2">4</div>
                                <small className="text-muted my-auto">23 < >min </></small>
                            </li>
                            <li className="list">
                                <div className="profile"><img src={Face3} alt="profile" /><span className="online"></span></div>
                                <div className="info">
                                <p>< >Daniel Russell </></p>
                                <p>< >Available </></p>
                                </div>
                                <small className="text-muted my-auto">14 < >min </></small>
                            </li>
                            <li className="list">
                                <div className="profile"><img src={Face4} alt="profile" /><span className="offline"></span></div>
                                <div className="info">
                                <p>< >James Richardson </></p>
                                <p>< >Away </></p>
                                </div>
                                <small className="text-muted my-auto">2 < >min </></small>
                            </li>
                            <li className="list">
                                <div className="profile"><img src={Face5} alt="profile" /><span className="online"></span></div>
                                <div className="info">
                                <p>< >Madeline Kennedy </></p>
                                <p>< >Available </></p>
                                </div>
                                <small className="text-muted my-auto">5 < >min </></small>
                            </li>
                            <li className="list">
                                <div className="profile"><img src={Face6} alt="profile" /><span className="online"></span></div>
                                <div className="info">
                                <p>< >Sarah Graves </></p>
                                <p>< >Available </></p>
                                </div>
                                <small className="text-muted my-auto">47 < >min </></small>
                            </li>
                            </ul>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default SettingsPanel
