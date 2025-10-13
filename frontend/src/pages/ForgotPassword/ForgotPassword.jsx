import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleVerifyUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(`${apiUrl}/api/password-reset/verify/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, phone }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Verification failed.');
            }
            setStep(2);
            setMessage("Verification successful! Please enter your new password.");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(`${apiUrl}/api/password-reset/confirm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, new_password: newPassword }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to reset password.');
            }
            setStep(3);
            setMessage(data.success);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Forgot Password</h2>

                            {/* --- Step 1: Verification Form --- */}
                            {step === 1 && (
                                <form onSubmit={handleVerifyUser}>
                                    <p>Enter your email and registered phone number to verify your account.</p>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone number</label>
                                        <PhoneInput placeholder="Enter phone number" value={phone} onChange={setPhone} defaultCountry="IN" international className="form-control" />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                                        {isLoading ? 'Verifying...' : 'Verify Account'}
                                    </button>
                                </form>
                            )}

                            {/* --- Step 2: Reset Password Form --- */}
                            {step === 2 && (
                                <form onSubmit={handleConfirmReset}>
                                    <p>Enter your new password below.</p>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                                        {isLoading ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </form>
                            )}

                            {/* --- Step 3: Success Message --- */}
                            {step === 3 && (
                                <div className="text-center">
                                    <p className="text-success">{message}</p>
                                    <button className="btn btn-success" onClick={() => navigate('/login')}>
                                        Proceed to Login
                                    </button>
                                </div>
                            )}

                            {/* --- Display Messages --- */}
                            {message && step < 3 && <div className="alert alert-info mt-3">{message}</div>}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;