import { useState } from 'react';
import ReactDOM from 'react-dom/client'

function MyForm() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendSMSTwilio = event => {
        console.log('destiantion number: ' + phoneNumber);
        console.log('message: ' + message);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber: phoneNumber, message: message })
        };
        fetch('http://localhost:3000/sms', requestOptions)
            .then(response => response.json())
            .then(data => this.setResponse({ response: data.data }));
    }

    return (
        <form onSubmit={sendSMSTwilio}>
            <h1>New Message</h1>
            <label>Phone Number
                <br></br>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </label>
            <br></br>
            <label>Message
                <br></br>
                <textarea
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />

        </form>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);

export default MyForm