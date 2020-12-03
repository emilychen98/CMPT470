# https://hub.docker.com/_/httpd
FROM httpd:2.4

# Install vim to more easily debug files
RUN apt-get update
RUN apt-get install vim -y

# Add files to be displayed to the user
COPY ./public-html/ /usr/local/apache2/htdocs/

# Replace conf file
COPY ./conf/my-httpd.conf /usr/local/apache2/conf/httpd.conf

# Add ssl certificate and key
COPY ./SSL/new.cert.cert /usr/local/apache2/conf/server.crt
COPY ./SSL/new.cert.key /usr/local/apache2/conf/server.key

# https://www.whoishostingthis.com/resources/htaccess/
COPY ./htaccess/.htpasswd /usr/local/apache2/passwd/.htpasswd
COPY ./htaccess/.htgroup /usr/local/apache2/passwd/.htgroup
