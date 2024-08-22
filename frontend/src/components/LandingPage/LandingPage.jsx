import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css"

function LandingPage () {
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/notebooks`)
    };

    return (
        <div className="home-container">
          {sessionUser ? (
            <div>
                <h1>Welcome back, {sessionUser.firstName}!</h1>
                <button onClick={() => handleClick()}>View notebooks</button>
                <button>View tasks</button>
            </div>
          ) : (
            <>
                <h1>Tame your work, organize your life</h1>
                <p>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</p>
                <div className="features-container">
                    <div className="feature-item">
                        {/* <img src="/path/to/your/work-anywhere-icon.svg" alt="Work anywhere" /> */}
                        <h2>Work anywhere</h2>
                        <p>Keep important info handy—your notes sync automatically to all your devices.</p>
                    </div>
                    <div className="feature-item">
                        {/* <img src="/path/to/your/remember-everything-icon.svg" alt="Remember everything" /> */}
                        <h2>Remember everything</h2>
                        <p>Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
                    </div>
                    <div className="feature-item">
                        {/* <img src="/path/to/your/turn-to-do-icon.svg" alt="Turn to-do into done" /> */}
                        <h2>Turn to-do into done</h2>
                        <p>Bring your notes, tasks, and schedules together to get things done more easily.</p>
                    </div>
                    <div className="feature-item">
                        {/* <img src="/path/to/your/find-things-fast-icon.svg" alt="Find things fast" /> */}
                        <h2>Find things fast</h2>
                        <p>Get what you need, when you need it with powerful and flexible search capabilities.</p>
                    </div>
                </div>
            </>
          )}
        </div>
    );
}

export default LandingPage;