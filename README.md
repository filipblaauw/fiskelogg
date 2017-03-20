# fiskelogg

Description: Add catches to a personal logbook. Fill in details about the fish, tackle, weather and bait. Add a picture and a location on a map. Images stored in Cloudinary. Connected to MLAB Mongo database.

### Features
- Create users with usernames
- Password reset from mail
- Upload images of the catch
- Set a map location of where the fish were caught
- Fill in details about the fish, tackle weather and bait
- Filter and sort all your catches, or search in all your catches

### Run with
    $ meteor --settings settings.json

### Deploy to galaxy
    $ DEPLOY_HOSTNAME=eu-west-1.galaxy.meteor.com meteor deploy fiskelogg --settings settings.json
