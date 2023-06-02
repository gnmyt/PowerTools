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
            description: "Betriebssystem prüfen",
            command: "if [ $(lsb_release -si) != \"Debian\" ]; then exit 1; fi"
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
            command: "apt install -y sudo lsb-release ca-certificates apt-transport-https software-properties-common gnupg2"
        },
        {
            command: "echo \"deb https://packages.sury.org/php/ $(lsb_release -sc) main\" | tee /etc/apt/sources.list.d/sury-php.list"
        },
        {
            command: "wget -qO - https://packages.sury.org/php/apt.gpg | apt-key add -"
        },
        {command: "apt update"},
        {
            description: "Pakete installieren",
            command: "apt install -y unzip mariadb-server mariadb-client apache2 apache2-utils php-cli php-common php-mbstring php-gd php-imagick php-intl php-bz2 php-xml php-mysql php-zip php-dev php-curl php-fpm php-dompdf redis-server php-redis php-smbclient php-ldap wget curl unzip"
        },
        {
            description: "Apache konfigurieren",
            command: "a2enmod proxy_fcgi setenvif mpm_event rewrite headers env dir mime ssl http2 && a2enconf php$(php --ini | grep Loaded | cut -d'/' -f4)-fpm && systemctl reload apache2"
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
            description: "Domain hinzufügen",
            command: "cd {folder} && sudo -su www-data php occ config:system:set trusted_domains 1 --value={domain}"
        }
    ]
}