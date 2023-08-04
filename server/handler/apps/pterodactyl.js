module.exports = {
    variables: {
        folder: "/var/www/pterodactyl",
        domain: "cloud.example.com",
        german: "Ja",
        mail: "unknown@exmaple.com",
        pass: "admin"
    },
    steps: [
        {
            description: "Zugriff prüfen",
            command: "if [ $EUID -ne 0 ]; then exit 1; fi"
        },
        {
            description: "Installationsort prüfen",
            command: "if [ -d {folder} ]; then exit 1; fi"
        },
        {
            description: "Paketquellen aktualisieren",
            command: "apt update"
        },
        {
            description: "PHP installieren",
            command: "apt install -y sudo lsb-release ca-certificates apt-transport-https software-properties-common gnupg2",
            os: "debian"
        },
        {
            description: "PHP installieren",
            command: "add-apt-repository --yes ppa:ondrej/php",
            os: "ubuntu"
        },
        {
            command: "echo \"deb https://packages.sury.org/php/ $(lsb_release -sc) main\" | tee /etc/apt/sources.list.d/sury-php.list && wget -qO - https://packages.sury.org/php/apt.gpg | apt-key add -",
            os: "debian"
        },
        {command: "apt update"},
        {
            description: "Pakete installieren",
            command: "apt install -y wget curl php php-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} mariadb-server nginx tar git redis-server"
        },
        {command: "mkdir -p {folder}"},
        {
            description: "Passwort generieren",
            command: "echo \"{db_pass}\" > {folder}/.db_pass",
            replace: {db_pass: () => Math.random().toString(36).slice(-8)}
        },
        {
            description: "MySQL konfigurieren",
            command: "mysql -e \"CREATE DATABASE IF NOT EXISTS panel; CREATE USER IF NOT EXISTS 'pterodactyl'@'127.0.0.1' IDENTIFIED BY '$(cat {folder}/.db_pass)'; GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION; FLUSH PRIVILEGES;\"",
        },
        {
            description: "Neuste Version herunterladen",
            command: "wget https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz -O {folder}/file.tar.gz",
        },
        {
            description: "Dateien entpacken",
            command: "tar -xzvf {folder}/file.tar.gz -C {folder}"
        },
        {
            description: "Composer installieren",
            command: "curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer"
        },
        {
            description: "Dependencies installieren",
            command: "cd {folder} && composer install --no-dev --optimize-autoloader --no-interaction --no-progress --no-suggest"
        },
        {
            description: "Artisan konfigurieren",
            command: "cd {folder} && cp .env.example .env && php artisan key:generate --force && php artisan p:environment:setup -n --author '{mail}' --url 'http://{url}' --timezone Europe/Berlin --cache --session --queue && php artisan p:environment:database --host 127.0.0.1 --port 3306 --database panel --username pterodactyl --password $(cat {folder}/.db_pass) && php artisan migrate --seed --force"
        },
        {command: "chown -R www-data:www-data {folder} && chmod -R 755 {folder}"},
        {
            description: "Cronjob einrichten",
            command: "crontab -u www-data -l | { cat; echo \"* * * * * php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1\n\"; } | crontab -u www-data -"
        },
        {
            description: "Nutzer hinzufügen",
            command: "cd {folder} && php artisan p:user:make -n --email '{mail}' --password '{pass}' --admin 1 --username=Admin --name-first=Admin --name-last=User"
        },
        {
            description: "Nginx konfigurieren",
            command: "echo \"server {\n" +
                "    listen 80;\n" +
                "    server_name {domain};\n" +
                "\n" +
                "    root /var/www/pterodactyl/public;\n" +
                "    index index.html index.htm index.php;\n" +
                "    charset utf-8;\n" +
                "\n" +
                "    location / {\n" +
                "        try_files \\$uri \\$uri/ /index.php?\\$query_string;\n" +
                "    }\n" +
                "\n" +
                "    location = /favicon.ico { access_log off; log_not_found off; }\n" +
                "    location = /robots.txt  { access_log off; log_not_found off; }\n" +
                "\n" +
                "    access_log off;\n" +
                "    error_log  /var/log/nginx/pterodactyl.app-error.log error;\n" +
                "\n" +
                "    client_max_body_size 100m;\n" +
                "    client_body_timeout 120s;\n" +
                "\n" +
                "    sendfile off;\n" +
                "\n" +
                "    location ~ \\.php\$ {\n" +
                "        fastcgi_split_path_info ^(.+\\.php)(/.+)\$;\n" +
                "        fastcgi_pass unix:/run/php/php$(php --ini | grep Loaded | cut -d'/' -f4)-fpm.sock;\n" +
                "        fastcgi_index index.php;\n" +
                "        include fastcgi_params;\n" +
                "        fastcgi_param PHP_VALUE \\\"upload_max_filesize = 100M \\n post_max_size=100M\\\";\n" +
                "        fastcgi_param SCRIPT_FILENAME \\$document_root\\$fastcgi_script_name;\n" +
                "        fastcgi_param HTTP_PROXY \\\"\\\";\n" +
                "        fastcgi_intercept_errors off;\n" +
                "        fastcgi_buffer_size 16k;\n" +
                "        fastcgi_buffers 4 16k;\n" +
                "        fastcgi_connect_timeout 300;\n" +
                "        fastcgi_send_timeout 300;\n" +
                "        fastcgi_read_timeout 300;\n" +
                "    }\n" +
                "\n" +
                "    location ~ /\\.ht {\n" +
                "        deny all;\n" +
                "    }\n" +
                "}\" > /etc/nginx/sites-available/pterodactyl.conf && ln -s /etc/nginx/sites-available/pterodactyl.conf /etc/nginx/sites-enabled/pterodactyl.conf && nginx -t && systemctl restart nginx"
        },
        {
            description: "GermanDactyl installieren",
            command: "curl -sSL https://install.germandactyl.de/ | sudo bash -s --",
            condition: "german=Ja"
        },
        {
            description: "Docker installieren",
            command: "curl -sSL https://get.docker.com/ | CHANNEL=stable bash && systemctl enable docker && systemctl start docker"
        },
        {
            description: "Wings installieren",
            command: 'curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")" && chmod u+x /usr/local/bin/wings'
        },
        {
            command: "curl -L -o /etc/systemd/system/wings.service https://raw.githubusercontent.com/pterodactyl-installer/pterodactyl-installer/master/configs/wings.service && systemctl enable wings"
        }
    ]
}