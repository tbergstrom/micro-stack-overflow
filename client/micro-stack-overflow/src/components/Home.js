import logo from '../overflow.svg';

function Home() {
    return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Micro Stack Overflow
            </p>
            {/* <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Ask a Question
            </a> */}
        </header>
    </div>
    );
}

export default Home;