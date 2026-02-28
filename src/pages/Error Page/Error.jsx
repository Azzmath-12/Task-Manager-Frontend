import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div className="error-container">
            <div className="error-card">

                <div className="number-section">
                    <h1 className="error-number">404</h1>
                </div>

                <div className="message-section">
                    <h2 className="title">Page Not Found</h2>
                    <p className="description">
                        Oops! The page you're looking for seems to have wandered off into the digital wilderness.
                    </p>
                </div>

                <Link to={"/Home"}>
                    <button className="home-button">Go to Home</button>
                </Link>

                <p className="help-text">
                    Need help? Try searching or contact our support team.
                </p>
            </div>
        </div>
    );
}

export default ErrorPage;