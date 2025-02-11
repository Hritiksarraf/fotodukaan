export async function POST(req) {
    const { phoneNumber } = await req.json();

    // Generate a 6-digit OTP
    console.log("Phone Number: ", phoneNumber);
    const otp = Math.floor(100000 + Math.random() * 900000);

    const apiKey = process.env.FAST2SMS_API_KEY;
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=otp&variables_values=${otp}&flash=0&numbers=${phoneNumber}`;

    try {
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        console.log(data);

        if (data.return) {
            return Response.json({ status: true, message: data.message, otp: otp });
        } else {
            return Response.json({ status: false, message: data.message });
        }
    } catch (error) {
        return Response.json({ status: "error", message: "Failed to send OTP", error: error.message });
    }
}
