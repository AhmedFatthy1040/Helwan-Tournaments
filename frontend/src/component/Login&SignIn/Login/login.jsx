import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { authAPI } from "../../../services/api"
import "./Login.css"

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await authAPI.login(username, password)
            
            if (response.ok) {
                navigate('/UserHome')
            } else {
                setError('Invalid username or password')
            }
        } catch (error) {
            setError('Login failed. Please try again.')
            console.error('Login error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div id="login">
                <section class="ftco-section">
                    <div class="container">
                        <div class="row justify-content-center">

                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-12 col-lg-10">
                                <div class="wrap d-md-flex">
                                    <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                        <div class="text w-100">
                                            <h2>Welcome to login</h2>
                                            <p>Don't have an account?</p>
                                            <Link to={"/regester"}><a href="#" class="btn btn-white btn-outline-white">Sign In</a>  </Link>
                                        </div>
                                    </div>
                                    <div class="login-wrap p-4 p-lg-5">
                                        <div class="d-flex">
                                            <div class="w-100">
                                                <h3 class="mb-4">Log In</h3>
                                            </div>
                                            <div class="w-100">
                                                <p class="social-media d-flex justify-content-end">
                                                    <Link to={"/AdminDashboard"}> <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class=""> <i class="fa-brands fa-google"></i></span></a> </Link> 
                                                    <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class=""> <i class="fa-brands fa-facebook"></i>  </span></a>
                                                </p>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit} class="signin-form">
                                            {error && (
                                                <div class="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                            <div class="form-group mb-3">
                                                <label class="label" for="name">Username</label>
                                                <input 
                                                    id="username" 
                                                    type="text" 
                                                    class="form-control" 
                                                    placeholder="Username" 
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required 
                                                />
                                            </div>
                                            <div class="form-group mb-3">
                                                <label class="label" for="password">Password</label>
                                                <input 
                                                    id="password" 
                                                    type="password" 
                                                    class="form-control" 
                                                    placeholder="Password" 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required 
                                                />
                                            </div>
                                            <div class="form-group">
                                                <button 
                                                    type="submit" 
                                                    class="form-control btn btn-primary submit px-3"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                                </button>
                                            </div>
                                            <div class="form-group d-md-flex">
                                                <div class="w-50 text-left">  <input type="checkbox" />
                                                    <label class="">Remember Me


                                                    </label>
                                                </div>
                                                <div class="w-50 text-md-right">
                                                    <a href="#">Forgot Password</a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        </>
    )
}
export default Login