import React, { useContext, useRef } from 'react'
import NewContext from '../context/NewContext';

function Modal(props) {

  const Contexts = useContext(NewContext)

  const myref = useRef(null)

  const HandleEdit = async () => {
    let NewName = myref.current.value;

    await Contexts.UpdateTab(NewName, props.Content.TabContent, props.Content._id);

    console.log(props)

  }


  return (
    <div className="modal fade text-black" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="model modal-content">
          <div className='navmodal'>
            <h5 className="modal-title" id="staticBackdropLabel">Rename</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          <div className="model2 modal-body">
            <div class="input-group mb-3">
              <input type="text" ref={myref} className="rename form-control" placeholder="Enter New Name " aria-label="Recipient's username" aria-describedby="button-addon2" />
            </div>
          </div>
          <div className='last d-grid gap-2 d-md-flex justify-content-md-end 'type="button" id="button-addon2">
            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-success" onClick={HandleEdit}>Confirm</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Modal