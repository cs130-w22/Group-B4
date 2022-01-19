import React from "react";
import 'bulma/css/bulma.min.css';

function LogIn(){
    return(
        <div className="tile is-ancestory">
        <div className="tile">
            <div className="tile is-parent"></div>
            <div className="tile is-parent is-vertical">
                <div className="tile is-child"></div>
                <div className="tile is-child">
                    <form action="" className="box">
                        <div className = "field">
                            <label htmlFor="" className="label">Email</label>
                            <div className="control has-icons-left" display="flex">
                                <input type="email" placeholder="e.g. bobsmith@gmail.com" className="input" required />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className = "field">
                            <label htmlFor="" className="label">Password</label>
                            <div className="control has-icons-left">
                                <input type="password" placeholder="*************" className="input" required />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div className="filed">
                            <button>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="tile is-child"></div>
            </div>
            <div className="tile is-parent"></div>
        </div>
    </div> 
    )
}

export default LogIn;