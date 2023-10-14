import React, { useContext, useEffect, useState } from 'react'
import TabContent from './TabContent'
import NewContext from '../context/NewContext'
import Modal from './Modal.js'

let lsit = [{
    "Tab": "Home",
    "TabContent": "Home"
},
{

    "Tab": "Profile",
    "TabContent": "Profile"
},
{

    "Tab": "Messages",
    "TabContent": "Messages"
}
]
let lisit = [{
    "Tab1": "Home",
    "Tab2": "Profiles",
    "Tab3": "messages"
}]
function Tabs(props) {

    const [modalState, setmodalState] = useState(false)

    const Contexts = useContext(NewContext)
    const [NewTabName, setNewTabName] = useState("NewChat")
    let adder = "v-pills-";
    const [activeTab, setactiveTab] = useState(lsit[0].Tab)

    const [tabData, settabData] = useState(lsit)
    const [tabDataCont, settabDataCont] = useState(null)

    useEffect(() => {
        settabData(Contexts.Tabs);
        // console.log("latesr, " + Contexts.Tabs[0].TabContent[0].bot)
    }, [Contexts.Tabs])

    const handleEdit = () =>{
        console.log("modalState")

    }
    useEffect(() => {

    }, [modalState])
    

    const deleteHandler = async (e) => {
        // console.log(e)
        let res = await Contexts.DeleteTab(e._id)
    }
    const createHandler = async (e) => {
        // console.log(e)
        let id = await Contexts.CreateTab("NewChat", [])
    }


    const LeftTabData = [
        {

            "id": ""
        }
    ]

    return (
        <div className="tabbar d-flex align-items-start w-100 h-100">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <p className="nav-link active" id="v-pills-home-tab" onClick={createHandler} data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">{NewTabName}</p>
                {tabData && tabData.map((e, ind) => {
                    return <p className="nav-link " id={`v-pills-${e.Tab}-tab`} key={`v-pills-${e.Tab.toLowerCase()}-tab`} data-bs-toggle="pill" data-bs-target={`#v-pills-${e.Tab.toLowerCase()}`} type="button" role="tab" aria-controls={`v-pills-${e.Tab.toLowerCase()}`} onClick={() => { setactiveTab(e.Tab) }} aria-selected="false">
                        <span class="svg-icon" className='icon3'><svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 512 512" width="16" height="16" fill="currentColor" class="bi bi-star"><path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z" /></svg></span>{e.Tab}
                        <span class="svg-icon" className='icon'><svg xmlns="http://www.w3.org/2000/svg" onClick={() => deleteHandler(e)} viewBox="0 0 448 512" width="16" height="16" fill="currentColor" class="bi bi-star" ><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></span>
                        <span class="svg-icon" className='icon2' onClick={()=>setmodalState(e)}><svg xmlns="http://www.w3.org/2000/svg"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" viewBox="0 0 512 512" width="16" height="16" fill="currentColor" class="bi bi-star"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg></span></p>
                })}

            </div>
            <div className="tab-content d-flex" id="v-pills-tabContent">
                {/* <div className="tab-pane fade  h-100 w-100 show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0"><TabContent data = {[]}/></div> */}
                {tabData && tabData.map((e, ind) => {
                    return tabData && <div className={`tab-pane fade  h-100 w-100 `} id={`v-pills-${e.Tab.toLowerCase()}`} key={`v-pills-${e.Tab.toLowerCase()}`} role="tabpanel" aria-labelledby={`v-pills-${e.Tab.toLowerCase()}-tab`} tabIndex="0"><TabContent data={e.TabContent} id = {e._id}/></div>
                })}

            </div>
            <Modal  Content = {modalState}/>
        </div>
    )
}

export default Tabs