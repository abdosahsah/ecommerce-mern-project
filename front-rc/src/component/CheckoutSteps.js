import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        {step1
                            ? (<li className="nav-item"><Link className="nav-link" to="/login">Sign-In</Link></li>)
                            : (<li className="nav-item"><Link className="nav-link text-dark" style={{ pointerEvents: 'none' }} to="">Sign-In</Link></li>)}

                        {step2
                            ? (<li className="nav-item"><Link className="nav-link" to="/shipping">Shipping</Link></li>)
                            : (<li className="nav-item"><Link className="nav-link text-dark" style={{ pointerEvents: 'none' }} to="">Shipping</Link></li>)}

                        {step3
                            ? (<li className="nav-item"><Link className="nav-link" to="/payment">Payment</Link></li>)
                            : (<li className="nav-item"><Link className="nav-link text-dark" style={{ pointerEvents: 'none' }} to="">Payment</Link></li>)}

                        {step4
                            ? (<li className="nav-item"><Link className="nav-link" to="/placeorder">Place Order</Link></li>)
                            : (<li className="nav-item"><Link className="nav-link text-dark" style={{ pointerEvents: 'none' }} to="">Place Order</Link></li>)}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default CheckoutSteps
