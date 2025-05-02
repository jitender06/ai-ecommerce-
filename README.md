# Github Settings 

1. Clear Existing Git Configuration
First, clear any existing Git configuration related to the ex-employee.

# Open the global Git configuration file
nano ~/.gitconfig

Remove or update the sections related to the ex-employee's details, such as [user].

Alternatively, you can reset the global configuration:

git config --global --unset user.name

git config --global --unset user.email

2. Set Up Your GitHub Configuration
Configure Git with your GitHub username and email.

git config --global user.name "Your GitHub Username"

git config --global user.email "your-email@example.com""

3. Clear Existing SSH Keys
Check if there are existing SSH keys and remove them if necessary.

ls ~/.ssh

If you see files like id_rsa, id_rsa.pub, or any other key files, you can move or delete them.

# Backup existing keys (optional)
mkdir ~/.ssh/backup
mv ~/.ssh/id_rsa* ~/.ssh/backup/

# Or simply remove them
rm ~/.ssh/id_rsa*

4. Generate a New SSH Key
Generate a new SSH key for your GitHub account.

ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

When prompted, save the key with the default name (or a new name if you prefer).

5. Add SSH Key to ssh-agent
Start the ssh-agent and add your new key.

eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_rsa

6. Add SSH Key to Your GitHub Account
Copy your new SSH key to the clipboard.

cat ~/.ssh/id_rsa.pub
paste that code and you will get the key 

Go to GitHub SSH Settings.
Click "New SSH key", paste the key, and save it.

7. Update Remote URLs for Existing Repositories
If you have existing repositories, update their remote URLs to use your credentials.

First, check the current remote URL:

git remote -v

Then, set the new remote URL using your GitHub username:

git remote set-url origin git@github.com:your-username/repository.git

8. Clear Cached Credentials
If Git is caching credentials, clear them to ensure you are using the correct credentials.

git credential-cache exit

9. Test the Configuration
Clone a repository to ensure everything is set up correctly:

git clone git@github.com:your-username/repository.git
