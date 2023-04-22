// import { useRef, useState, useEffect} from 'react';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
// import AuthContext from "./context/AuthProvider";
import axios from 'axios';
// const LOGIN_URL = '/auth';

const Login = () => {


    // const { setAuth } = useContext(AuthContext);
    // const userRef = useRef();
    // const errRef = useRef();


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [user, pwd])

    const handleUsernameChange = (event) => {
        setUser(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPwd(event.target.value);
      };



    const clientId = '973282407747-5e4l7ut9st7c6aqace5d1avdjcjp8o3s.apps.googleusercontent.com';

    const onSuccess = async (res) => {
        // res.preventDefault()
        // console.log("Login Success! User:", res.profileObj);
        // setSuccess(true)
        console.log(res)
        try {
            const google_response = await axios.post('http://localhost:3000/api/users/google_login', {
              idToken: res.tokenObj.id_token
            });
            console.log("Login Success! User:", res.profileObj);
            console.log(google_response);
            // setUser('');
            // setPwd('');
            // setSuccess(true);
            // localStorage.setItem('token', response.data.token);
            // history.push('/dashboard');
          } catch (error) {
            // setErrMsg(res);
            console.log("Login Failed! res=", error)
          }
        }
    
    // const onFailure = (res) => {
    //     console.log("Login Failed! res=", res)
    //     }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Got in the server");
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', {
              emailormobile: user, password: pwd
            });
            console.log(response.data);
            // setUser('');
            // setPwd('');
            // setSuccess(true);
            // localStorage.setItem('token', response.data.token);
            // history.push('/dashboard');
          } catch (error) {
            setErrMsg(error.response.data);
            console.log(error.response.data);
          }
        };


    const handleFacebookLogin = async () => {
        try {
            // Redirect to the Facebook Login page
            window.location.href = "http://localhost:4001/facebook_login";
          } catch (error) {
            console.log(error);
          }

        try {
            const response = await axios.post("http://localhost:4001/facebook_login", {
            access_token: "FACEBOOK_ACCESS_TOKEN",
            });
            setUser(response.data);
            } catch (error) {
            console.log(error);
            }
        };

    // async function responseFacebook(response) {
    //   try {
    //     const facebook_response = await axios.post('/api/users/facebook_login', {
    //     access_token: response.accessToken
    //     });
    //     console.log(facebook_response);
    //     } catch (error) {
    //     console.log(error.response);
    //     }
    // };


    // function handleLogin(response) {
    //     axios
    //     .get(`http://localhost:4001/facebook_login/callback?access_token=${response.accessToken}`)
    //     .then((res) => {
    //         console.log(res.data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    //     setUser(response);
    // }


        // const responseFacebook = async (response) => {
        //     try {
        //       const res = await fetch('/api/signin/facebook', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ access_token: response.accessToken }),
        //       });
        //       const data = await res.json();
        //       console.log(data);
        //     //   localStorage.setItem('token', data.token);
        //     //   history.push('/dashboard');
        //     } catch (error) {
        //       setErrMsg(error.response.data.message);
        //     }


        // try {
        //         const response = await axios.post("http://localhost:3000/api/users/login",
        //             JSON.stringify({emailormobile:user, password:pwd}),
        //             {
        //                 headers: { 'Content-Type': 'application/json' },
        //                 withCredentials: true
        //             }
        //         );
        //         console.log(JSON.stringify(response?.data));
        //         //console.log(JSON.stringify(response));
        //         // const accessToken = response?.data?.accessToken;
        //         // const roles = response?.data?.roles;
        //         setAuth({emailormobile:user, password:pwd});
        //         setUser('');
        //         setPwd('');
        //         setSuccess(true);
        //     } catch (err) {
        //         if (!err?.response) {
        //             setErrMsg('No Server Response');
        //         } else if (err.response?.status === 400) {
        //             setErrMsg('Missing Username or Password');
        //         } else if (err.response?.status === 401) {
        //             setErrMsg('Unauthorized');
        //         } else {
        //             setErrMsg('Login Failed');
        //         }
        //         errRef.current.focus();
        //     }
        // axios.post("http://localhost:3000/api/users/login", {emailormobile:user, password:pwd}).then((data) => {
        //     console.log(data);
        // }).catch((err) => {
        //     setErrMsg('Missing Username or Password');
        //     console.log(err)
        // })
        // // console.log(user, pwd);
        // setUser('');
        // setPwd('');
        // setSuccess(true);

    // }

    // const responseFacebook = (response) => {
    //     console.log(response);
    //   };
      

    // const clientId = '973282407747-5e4l7ut9st7c6aqace5d1avdjcjp8o3s.apps.googleusercontent.com';

    // function login() {
    //     const onSuccess = (res) => {
    //         console.log("Login Success");
    //     }

    //     const onFailure = (res) => {
    //         console.log("Login Failed")
            
    //     }
    // }



        // try {
        //     const response = await axios.post(LOGIN_URL,
        //         JSON.stringify({ user, pwd }),
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         }
        //     );
        //     console.log(JSON.stringify(response?.data));
        //     //console.log(JSON.stringify(response));
        //     const accessToken = response?.data?.accessToken;
        //     const roles = response?.data?.roles;
        //     setAuth({ user, pwd, roles, accessToken });
        //     setUser('');
        //     setPwd('');
        //     setSuccess(true);
        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 400) {
        //         setErrMsg('Missing Username or Password');
        //     } else if (err.response?.status === 401) {
        //         setErrMsg('Unauthorized');
        //     } else {
        //         setErrMsg('Login Failed');
        //     }
        //     errRef.current.focus();
        // }
    // }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}


                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>


                        <label htmlFor="username">Email/Phone No.:</label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={handleUsernameChange}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>

                    <div id='signInButton'>
                        <GoogleLogin 
                        clientId= {clientId}
                        buttonText="Login"
                        onSuccess={onSuccess}
                        // onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                    </div>

                    <div>
                    {!user ? (
                        <button onClick={handleFacebookLogin}>Login with Facebook</button>
                    ) : (
                        <p>Welcome {user.name}</p>
                    )}
                    </div>
                    
                </section>

            )}
        </>
    )
}

export default Login
