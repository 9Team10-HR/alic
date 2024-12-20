document.getElementById("otp-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting in the traditional way
    
    const phoneNumber = document.getElementById("phone_number").value;
    const responseMessage = document.getElementById("response-message");

    if (!phoneNumber) {
        responseMessage.textContent = "Please enter a valid phone number.";
        responseMessage.className = "error";
        return;
    }

    // API URL and headers
    const url = 'https://us-central1-doctime-465c7.cloudfunctions.net/sendAuthenticationOTPToPhoneNumber';
    const referer = 'https://doctime.com.bd/';
    const origin = 'https://doctime.com.bd';
    const user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0';

    const data = {
        'data': {
            'flag': 'https://doctime-core-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/images/country-flags/flag-800.png',
            'code': '88',
            'contact_no': phoneNumber,
            'country_calling_code': '88',
            'headers': {
                'PlatForm': 'Web'
            }
        }
    };

    const headers = {
        'Content-type': 'application/json',
        'Referer': referer,
        'Origin': origin,
        'User-Agent': user_agent
    };

    // Send the POST request to the API
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Failed to send OTP.");
    })
    .then(data => {
        // On success
        responseMessage.textContent = "OTP has been sent successfully!";
        responseMessage.className = "success";
    })
    .catch(error => {
        // On error
        responseMessage.textContent = error.message;
        responseMessage.className = "error";
    });
});
