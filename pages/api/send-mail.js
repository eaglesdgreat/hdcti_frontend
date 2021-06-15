import { sendEmail } from './../../lib/send.mail'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, productName, message } = req.body;
    await sendEmail({ name, email, productName, message });

    return res.status(200).json({
      message: 'Mail send successful.'
    });
  }

  return res.status(400).json({
    error: {
      code: 'not_found',
      messgae: "The requested endpoint was not found or doesn't support this method."
    }
  })
}