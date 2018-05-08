TO-DO:
    Get mailer working for reimbursements

---
05/08/2018
---
ISSUE: Server Error when trying to push commit for Devise to Heroku. 
Correctly redirected to /users/sign_in when visiting the home page but receive a 500.
FIX: 
Added rails_12factor for logging.
Found following error in Heroku logs:

    ActiveRecord::StatementInvalid (PG::UndefinedTable: ERROR:  relation "users" does not exist
    
Found following fix: https://teamtreehouse.com/community/deploying-to-heroku-error

PROBLEM: Adding association between members and events, where events have attendees and members have attended events
SOLUTION:
    Used reference: https://www.learneroo.com/modules/137/nodes/767