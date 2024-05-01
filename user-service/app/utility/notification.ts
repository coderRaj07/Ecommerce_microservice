import twilio from "twilio";

const accountSid = "ACcxxxxxxxxxxxxxxxxxxxxxx";
const authToken = "0295xxxxxxxxxxxxxxxxxxxxxx";

const client = twilio(accountSid, authToken);

export const GenerateAccessCode = () => {
    const code = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 2 * 365 * 24 * 60 * 60 * 1000); // 2 years // Later we will make it to 30 minutes
    return { code, expiry };
};

export const SendVerificationCode = async (
    code: number,
    toPhoneNumber: string
) => {
    const response = await client.messages.create({
        body: `Your verification code is ${code} it will expire within 2 years`,// 30 minutes.`,
        from: "+16812011773",
        to: toPhoneNumber.trim(),
    });
    console.log(response);
    return response;
};