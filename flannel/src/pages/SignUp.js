import React from "react";
import 'bulma/css/bulma.min.css';

function SignUp(){
    return(
        <section className = 'hero is-fullheight is-primary'>
            {/* <div className = "tile is-ancestor hero-body"> */}
            <div className="columns is-multiline is-vcentered">
                <div className="column is-12">
                    <h1 className="has-text-centered title is-1">Create an Account</h1>
                </div>
                <div className="column is-11">
                    <form action = "" className = "">
                        <div className = "column is-12">
                            <h2 className="title is-2">Tell us a little about you!</h2>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Full Name</label>
                            </div>
                            <div class="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Firstname Lastname" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">School Year</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div className="control">
                                        <div className = "select">
                                            <select>
                                                <option>Freshman</option>
                                                <option>Sophmore</option>
                                                <option>Junior</option>
                                                <option>Senior</option>
                                                <option>Senior+</option>
                                                <option>Graduated</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Major</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div className = "control">
                                        <input className = "input" type="text" placeholder = "Computer Science" required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Email</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div className = "control">
                                        <input className = "input" type="Email" placeholder = "asdf@gmail.com" required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Password</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div className = "control">
                                        <input className = "input" type="password" placeholder = "password" required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Confirm Password</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div className = "control">
                                        <input className = "input" type="password" placeholder = "password" required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-12">
                            <h2 className=" title is-2">Tell us about what you're interested in!</h2>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Classes</label>
                            </div>
                            <div class="field-body">
                                <div className="field">
                                    <div className="control">
                                        <div className = "select">
                                            <select>
                                                <option>CS130</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Interests</label>
                            </div>
                            <div class="field-body">
                                <div className="field">
                                    <div className="control">
                                        <div className = "select">
                                            <select>
                                                <option>Rocket League</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Affiliations</label>
                            </div>
                            <div class="field-body">
                                <div className="field">
                                    <div className="control">
                                        <div className = "select">
                                            <select>
                                                <option>ACM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <button className="button is-danger">
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
};

export default SignUp;

                