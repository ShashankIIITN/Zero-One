import React, { useContext, useState } from 'react';
import NewContext from '../context/NewContext';
import { useNavigate } from 'react-router-dom';


function Signup(props) {
  const Navigate = useNavigate();
  const context = useContext(NewContext);
  const [Nuser, setNuser] = useState({ name: "", email: "", password: "", cpassword: "" });

  const onChange = (e) => {
    setNuser({ ...Nuser, [e.target.name]: e.target.value });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (Nuser.password !== Nuser.cpassword) {
      props.showAlert('danger', "password and Confirm password doesn't match!");
      return;
    }

    let Wtoken = await context.SignUp(Nuser.name, Nuser.email, Nuser.password);

    if (Wtoken.success) {
      await context.FetchTabs();
      localStorage.setItem('Token', Wtoken.resjson.webtokendata);
      Navigate('/');
    } else if (("error" in Wtoken.resjson)) {
      props.showAlert('danger', Wtoken.resjson.error);
    } else {
      props.showAlert('danger', Wtoken.resjson.errors[0].msg);

    }
  }
  return (
    <>
      <form className='Lgin' onSubmit={onSubmit} style={{ marginTop: '4vh' }}>
        <div style={{marginTop:'30px',border:'2px solid black',width:'50%',borderRadius:'10px'}} className='mx-auto'>
        <h4 className='text-center mb-3' style={{ marginTop: '10px', color: 'Black', paddingTop: '20px' }}>Signup Page</h4>
        <div className="mb-3" style={{ textAlign: 'center' }}>
          <label htmlFor="exampleInputEmail1" style={{ marginTop: '20px' }}className="form-label">Name</label>
          <input type="text" className="form-control mx-auto"  style={{ width: '40%', border: '2px solid black', boxShadow: '5px' }} id="Nname" onChange={onChange} name="name" />
        </div>
        <div className="mb-3"style={{ textAlign: 'center' }}>
          <label htmlFor="exampleInputEmail1" style={{ marginTop: '20px' }} className="form-label">Email address</label>
          <input type="email" className="form-control mx-auto"  style={{ width: '40%', border: '2px solid black', boxShadow: '5px' }} id="NEmail" onChange={onChange} name="email" />
        </div>
        <div className="mb-3"style={{ textAlign: 'center' }}>
          <label htmlFor="exampleInputPassword1" style={{ marginTop: '20px' }} className="form-label">Password</label>
          <input type="password" className="form-control mx-auto"  style={{ width: '40%', border: '2px solid black', boxShadow: '5px' }} id="Npass" onChange={onChange} name="password" />
        </div>
        <div className="mb-3"style={{ textAlign: 'center' }}>
          <label htmlFor="exampleInputPassword1" style={{ marginTop: '20px' }}className="form-label">Confirm Password</label>
          <input type="password" className="form-control mx-auto"  style={{ width: '40%', border: '2px solid black', boxShadow: '5px' }} id="NCpass" onChange={onChange} name="cpassword" />
        </div>
        <div style={{ display: 'flex', marginTop: '40px', marginBottom:'30px' }} className='d-grid gap-2 col-2 mx-auto'>
        <button type="submit" className="auth-btn btn btn-primary">Submit</button>
        </div>
        </div>
      </form>
    </>
  )
}

export default Signup