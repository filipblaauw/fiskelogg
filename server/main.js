import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Sparkpost } from 'meteor/agoldman:sparkpost-mail';


Accounts.emailTemplates.siteName = "Fiskelogg.no";
Accounts.emailTemplates.from = "Fiskelogg.no <post@fiskelogg.no>";

Accounts.emailTemplates.resetPassword = {
  subject(user) {
    return "Nullstill passord på Fiskelogg.no";
  },
  text(user, url) {
    return `Hei!
Klikk her for å nullstille passordet ditt på Fiskelogg.no:
${url}
Om du ikke ba om denne e-posten, vennligst ignorer den.
Hilsen Fiskelogg.no`
  },
  html(user, url) {
    // This is where HTML email content would go.
    // See the section about html emails below.
  }
};

Meteor.startup(() => {
  Sparkpost.config('5791502b4ff91c95bd112be8e0ecc7ee1f48486d');
});
