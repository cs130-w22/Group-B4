import React from "react";
import 'bulma/css/bulma.min.css';
import {Link} from "react-router-dom";

function LogIn(){
    return(
        <section className = 'hero is-fullheight is-primary'>
            <div className = "tile is-ancestor hero-body">
                <div className = "tile is-parent"></div>
                <div className = "tile is-parent">
                    <div className = "tile is-child">
                    <h1 className="title has-text-danger is-size-1 has-text-centered">FLANNEL</h1>
                    <form action="" className="box">
                        <h1 className="title has-text-black has-text-centered">Welcome!</h1>
                        <div className = "field" >
                            <label htmlFor="" className="label">Email</label>
                            <div className="control">
                                <input className="input" type="email" placeholder="e.g. bobsmith@gmail.com" required />
                            </div>
                        </div>
                        <div className = "field">
                            <label htmlFor="" className="label">Password</label>
                            <div className="control">
                                <input type="password" placeholder="*************" className="input" required />
                            </div>
                        </div>
                        <div className="field">
                            <button className="button is-danger">
                                Login
                            </button>
                        </div>
                        <div>
                            <Link to="/SignUp">Click to Sign Up!</Link>
                        </div>
                    </form>
                    </div>
                </div>
                <div className = "tile is-parent"></div>
            </div>
        </section>
    )
}

export default LogIn;