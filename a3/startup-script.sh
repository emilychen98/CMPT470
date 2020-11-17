set -v

# Talk to the metadata server to get the project id
PROJECTID="emilychen301308525"
REPOSITORY="github_emilychen98_cmpt470"

# Install dependencies from apt
sudo apt-get update
sudo apt-get install -yq ca-certificates git build-essential supervisor g++ make

# Install nodejs
sudo mkdir /opt
sudo mkdir /opt/nodejs
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs

# Get the application source code from the Google Cloud Repository.
# git requires $HOME and it's not set during the startup script.
export HOME=/root
sudo git config --global credential.helper gcloud.sh
sudo rm -rf /opt/app/a3
sudo git clone https://source.developers.google.com/p/${PROJECTID}/r/${REPOSITORY} /opt/app/a3

# Install app dependencies
cd /opt/app/a3

# Open up the firewall on port 8080 of our app.
# If this is not opened, we cannot listen on port 8080.
sudo gcloud compute firewall-rules create default-allow-http-8080 \
    --allow tcp:8080 \
    --source-ranges 0.0.0.0/0 \
    --target-tags http-server \
    --description "Allow port 8080 access to http-server"

# Build server deps
cd a3
sudo npm install
sudo npm start
