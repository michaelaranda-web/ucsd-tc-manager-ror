TO-DO:
    Get mailer working for reimbursements

----------
05/08/2018
----------

***
ISSUE: Server Error when trying to push commit for Devise to Heroku. 
Correctly redirected to /users/sign_in when visiting the home page but receive a 500.
FIX: 
Added rails_12factor for logging.
Found following error in Heroku logs:

    ActiveRecord::StatementInvalid (PG::UndefinedTable: ERROR:  relation "users" does not exist
    
Found following fix: https://teamtreehouse.com/community/deploying-to-heroku-error

***
PROBLEM: Adding association between members and events, where events have attendees and members have attended events
SOLUTION:
    Used reference: https://www.learneroo.com/modules/137/nodes/767

***
ISSUE: React component rendered from a javascript_pack_tag was sometimes not loaded when visiting a page.
       Refreshing always made it render successfully.
FIX: https://github.com/rails/webpacker/issues/161
     Changed document.addEventListener('DOMContentLoaded')  
     to      document.addEventListener('turbolinks:load')
     
     ^^^ ended up not working
     
     Tried changing event to 'page:load' per https://stackoverflow.com/questions/29101155/jquery-ready-not-fired-after-rails-link-to-is-clicked
     This did not work either.
     
     Removed addEventListener completely.