# Team034-TeamNescafe
This is a template for CS411 project repository. Please make sure that your title follows the convention: [team034]-[TeamNescafe]. All TeamIDs should have a three-digit coding (i.e. if you are team 20, you should have `team034` as your ID.). You should also ensure that your URL for this repository is [sp24-cs411-team034-TeamNescafe.git] so TAs can correctly clone your repository and keep it up-to-date.

Once you set up your project, please remember to submit your team formation to the team form.

## Project Configuration
1. Create a `config.json` file inside `backend/configs/` folder and copy the following config, replacing with the database config - 
```python
{
    "VERSION": "1.0.0",
    "ENV": "dev",
    "PORT": 3000,
    "DB_CONFIG": {
        "host": "<<ip>>",
        "user": "<<user>>",
        "password": "<<password>",
        "database": "<<database>>"
    }
}
```
2. Create a virtual environment for python, activate it and install the required dependencies mentioned in requirements.txt
```bash
python3 -m venv .venv 
source .venv/bin/activate
pip install -r backend/requirements.txt
```
3. Now start the backend server by executing the following -
```python
python3 backend/backend.py
```
4. Server will be up and running locally on port `3000`
```
(.venv) dakshpokar@Dakshs-MacBook-Pro sp24-cs411-team034-TeamNescafe % python3 backend/backend.py
 * Serving Flask app 'SuiteMate Server v1.0.0'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:3000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 512-570-134
```
## Permission
Make your repository private. TAs will be able to access it even if it's private.

## Preparing for your release
Each submission should be in its own [release](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases). Release are specific freezes to your repository. You should submit your commit hash on PrairieLearn. When tagging your stage, please use the tag `stage.x` where x is the number to represent the stage.

## Keeping things up-to-date
Please make sure you keep your project root files up-to-date. Information for each file/folder are explained.

## Code Contribution
Individual code contributions will be used to evaluate individual contributions to the project.
