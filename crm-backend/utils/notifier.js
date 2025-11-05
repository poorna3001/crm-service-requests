
module.exports = {
  sendEmail: (to, subject, body) => {
    console.log('--- mock email ---');
    console.log('to:', to, 'subject:', subject, 'body:', body);
  }
};
