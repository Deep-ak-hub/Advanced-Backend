const sendEmail = async ({ email, name }) => {
  return new Promise((resolve) => {
    console.log(`Sending email to ${email}`);
    setTimeout(() => {
      console.log(`Email sent to ${email}`);
      resolve({ sentTo: email });
    }, 5000);
  });
};

export default sendEmail;