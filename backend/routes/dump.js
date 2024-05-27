const axios = require('axios');

async function dumpData() {
    try {
        const response = await axios.post("https://httpdump.app/dumps/a7ccec35-d1e4-4958-98fe-0235940c3519", {
            username: "harshit",
            password: "11234"
        }, {
            headers: {
                "Authorization": "Bearer 1234567890",
            }
        }
        );
    } catch (error) {
        return res.json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

dumpData();