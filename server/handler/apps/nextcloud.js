module.exports = {
    variables: {
        folder: "/var/www/cloud",
        user: "Admin",
        pass: "admin",
        domain: "cloud.example.com"
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
            command: "apt install -y libmagickcore-6.q16-6-extra unzip mariadb-server mariadb-client apache2 apache2-utils php-cli php-apcu php-common php-mbstring php-gd php-imagick php-intl php-bz2 php-xml php-gmp php-bcmath php-mysql php-imagick php-zip php-dev php-curl php-fpm php-dompdf redis-server php-redis php-smbclient php-ldap wget curl unzip"
        },
        {
            description: "PHP konfigurieren",
            command: "sed -i 's/memory_limit = .*/memory_limit = 512M/' /etc/php/$(php --ini | grep Loaded | cut -d'/' -f4)/fpm/php.ini && sed -i 's/output_buffering = .*/output_buffering = Off/' /etc/php/$(php --ini | grep Loaded | cut -d'/' -f4)/fpm/php.ini && echo \"apc.enable_cli = 1\" >> /etc/php/$(php --ini | grep Loaded | cut -d'/' -f4)/cli/php.ini && systemctl restart php$(php --ini | grep Loaded | cut -d'/' -f4)-fpm"
        },
        {
            description: "Apache konfigurieren",
            command: "a2enmod proxy_fcgi setenvif mpm_event rewrite headers env dir mime ssl http2 && a2enconf php$(php --ini | grep Loaded | cut -d'/' -f4)-fpm && systemctl restart apache2"
        },
        {command: "mkdir -p {folder}"},
        {
            description: "Passwort generieren",
            command: "echo \"{db_pass}\" > {folder}/.db_pass",
            replace: {db_pass: () => Math.random().toString(36).slice(-8)}
        },
        {
            description: "MySQL konfigurieren",
            command: "mysql -e \"CREATE DATABASE IF NOT EXISTS nextcloud; CREATE USER IF NOT EXISTS 'nextcloud'@'localhost' IDENTIFIED BY '$(cat {folder}/.db_pass)'; GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextcloud'@'localhost'; FLUSH PRIVILEGES;\"",
        },
        {
            description: "Neuste Version herunterladen",
            command: "wget https://download.nextcloud.com/server/releases/latest.zip -O {folder}/file.zip",
        },
        {
            description: "Dateien entpacken",
            command: "unzip {folder}/file.zip -d {folder} && rm -rf {folder}/file.zip && mv {folder}/nextcloud/* {folder} && rm -rf {folder}/nextcloud"
        },
        {command: "chown -R www-data:www-data {folder} && chmod -R 755 {folder}"},
        {
            description: "Cronjob einrichten",
            command: "crontab -u www-data -l | { cat; echo \"*/5  *  *  *  * php -f {folder}/cron.php > /dev/null 2>&1\"; } | crontab -u www-data -"
        },
        {
            description: "Apache konfigurieren",
            command: "echo \"<VirtualHost *:80>\n" +
                "    ServerName {domain}\n" +
                "    DocumentRoot {folder}\n" +
                "    ErrorLog \${APACHE_LOG_DIR}/error.log\n" +
                "    CustomLog \${APACHE_LOG_DIR}/access.log combined\n" +
                "    <IfModule mod_rewrite.c>\n" +
                "        RewriteEngine on\n" +
                "        RewriteRule ^/\\.well-known/carddav /remote.php/dav [R=301,L]\n" +
                "        RewriteRule ^/\\.well-known/caldav /remote.php/dav [R=301,L]\n" +
                "        RewriteRule ^/\\.well-known/webfinger /index.php/.well-known/webfinger [R=301,L]\n" +
                "        RewriteRule ^/\\.well-known/nodeinfo /index.php/.well-known/nodeinfo [R=301,L]\n" +
                "    </IfModule>\n" +
                "    <Directory {folder}>\n" +
                "        Require all granted\n" +
                "        AllowOverride All\n" +
                "        Options FollowSymLinks MultiViews\n" +
                "        <IfModule mod_dav.c>\n" +
                "            Dav off\n" +
                "        </IfModule>\n" +
                "    </Directory>\n" +
                "</VirtualHost>\" > /etc/apache2/sites-available/nextcloud.conf && a2ensite nextcloud.conf && systemctl reload apache2"
        },
        {
            description: "Nextcloud konfigurieren",
            command: "cd {folder} && sudo -su www-data php occ maintenance:install " +
                "--database='mysql' --database-name='nextcloud' " +
                "--database-user='nextcloud' --database-pass=$(cat {folder}/.db_pass) " +
                "--admin-user='{user}' --admin-pass='{pass}'"
        },
        {
            command: "cd {folder} && sudo -su www-data php occ config:system:set trusted_domains 1 --value={domain}"
        },
        {
            command: "cd {folder} && sudo -su www-data php occ config:system:set default_phone_region --value=DE"
        },
        {
            command: "cd {folder} && sudo -su www-data php occ config:system:set memcache.local --value='\\OC\\Memcache\\APCu'"
        }
    ]
}