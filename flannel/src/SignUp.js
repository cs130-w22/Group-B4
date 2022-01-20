import React from "react";
import 'bulma/css/bulma.min.css';

function SignUp(){
    return(
        <section className = 'hero is-fullheight is-primary'>
            <div className = "tile is-ancestor hero-body">
                <div className="tile is-parent"></div>
                <div className="tile is-parent">
                    <form action = "" className = "box">
                        <div className="tile is-ancestor is-centered">
                            <div className="tile is-parent is-vertical">
                                <div className="field">
                                    <label htmlFor = "" className="label">Email</label>
                                    <div className="control">
                                        <input className="input" type="email" placeholder="e.g. bobsmith@gmail.com" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor = "" className="label">Name</label>
                                    <div className="control">
                                        <input className="input" type="email" placeholder="e.g. bobsmith@gmail.com" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor = "" className="label">Password</label>
                                    <div className="control">
                                        <input className="input" type="email" placeholder="e.g. bobsmith@gmail.com" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor = "" className="label">Confirm Password</label>
                                    <div className="control">
                                        <input className="input" type="email" placeholder="e.g. bobsmith@gmail.com" required />
                                    </div>
                                </div> 
                                </div>
                            <div className="tile is-parent is-vertical">
                                <div className="field">
                                    <label htmlFor = "" className="label">Preferences</label>
                                    <div className="control">
                                        <input className="input" type="email" placeholder="e.g. bobsmith@gmail.com" required />
                                    </div>
                                </div>
                                <div className="field">
                                <button className="button is-danger">
                                    Sign Up
                                </button>
                            </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="tile is-parent"></div>
            </div>
        </section>
    )
};

export default SignUp;
