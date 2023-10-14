import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NewContext from '../context/NewContext';

function Auth(props) {
  const Navigate = useNavigate();
  const context = useContext(NewContext);
  const [Luser, setLuser] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setLuser({ ...Luser, [e.target.name]: e.target.value });
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    let Wtoken = await context.Login(Luser.email, Luser.password);

    if (Wtoken.success) {
      localStorage.setItem('Token', Wtoken.resjson.webtokendata);
      Navigate('/');
      context.FetchTabs();
    } else if (("error" in Wtoken.resjson)) {
      props.showAlert('danger', Wtoken.resjson.error);
    } else {
      props.showAlert('danger', Wtoken.resjson.errors[0].msg);

    }
  }
  return (
    <>
      <form className='Lgin' onSubmit={onSubmit}>
        <div style={{marginTop:'30px',border:'2px solid black',width:'50%',borderRadius:'10px'}} className='mx-auto'>
        <div className="mb-3" style={{ textAlign: 'center' }}>
          <h4 className='text-center mb-3' style={{ marginTop: '10px', color: 'Black', paddingTop: '20px' }}><b>Login Page</b></h4>
          <label htmlFor="LName" style={{ marginTop: '30px' }} className="form-label">Email address</label>
          <input type="email" style={{ width: '30%', border: '2px solid black', boxShadow: '5px' }}  className="form-control mx-auto" id="LName" aria-describedby="emailHelp" name="email" onChange={onChange} />
        </div>
        <div className="mb-3" style={{ textAlign: 'center' }}>
          <label htmlFor="LPass" className="form-label">Password</label>
          <input type="password" style={{ width: '30%', border: '2px solid black', boxShadow: '5px' }} className="form-control mx-auto" id="LPass" name='password' onChange={onChange} />
        </div>
        <div style={{ display: 'flex', marginTop: '40px', marginBottom:'30px' }} className='d-grid gap-2 col-2 mx-auto'>
          <button type="submit" className="auth-btn btn btn-danger" style={{ justifyItems: 'center' }}>Submit</button>
        </div>
        </div>
      </form>
    </>
  )
}

export default Auth