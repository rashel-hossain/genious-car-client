import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';


const Login = () => {
    // const { signInUser, providerLoginGoogle, providerLoginFacebook, providerLoginGithub } = useContext(AuthContext);
    const { signInUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    // const googleProvider = new GoogleAuthProvider();
    // const facebookProvider = new FacebookAuthProvider();
    // const githubProvider = new GithubAuthProvider();

    // signInWithEmailAndPassword:
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signInUser(email, password)
            .then(result => {
                const user = result.user;

                const currentUser = {
                    email: user.email
                }
                console.log(currentUser);

                // get jwt token
                fetch('https://genious-car-server-eosin.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        // local storage is the easiest But not the best place to store jwt token
                        localStorage.setItem('genius-token', data.token);
                        navigate(from, { replace: true });
                    })
                form.reset();
            })
            .catch(err => console.log(err));
    }

    /*
        // signInWithGoogle
        const handleSignInWithGoogle = () => {
            providerLoginGoogle(googleProvider)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    navigate(from, { replace: true });
                })
                .catch(err => console.log(err));
        }
    
        // signInWithFacebook
        const handleSignInWithFacebook = () => {
            providerLoginFacebook(facebookProvider)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    navigate(from, { replace: true });
                })
                .catch(err => console.error(err));
        }
        // SignInWithGitHub
        const handleSignInWithGitHub = () => {
            providerLoginGithub(githubProvider)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    navigate(from, { replace: true });
                })
                .catch(err => console.error(err));
        }
    */

    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-8">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className='btn btn-primary' type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='text-center'>New to Genius Car? <Link className='text-orange-600 font-bold' to='/signup'>Sign Up</Link></p>

                    <SocialLogin></SocialLogin>

                    {/* <div className='flex justify-center'>
                        <button onClick={handleSignInWithGoogle} className="btn btn-outline btn-primary border-none"><FcGoogle className='text-2xl'></FcGoogle></button>
                        <button onClick={handleSignInWithFacebook} className="btn btn-outline btn-primary border-none"><FaFacebook className='text-2xl'></FaFacebook></button>
                        <button onClick={handleSignInWithGitHub} className="btn btn-outline btn-primary border-none"><FaGithub className='text-2xl'></FaGithub></button>
                    </div> */}

                </div>

            </div>

        </div>

    );
};

export default Login;