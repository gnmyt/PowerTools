module.exports = {
    variables: {
        folder: "/opt/myspeed",
        environment: "Stabil",
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
            description: "Dienst gestoppt",
            command: "if command -v systemctl &> /dev/null && systemctl --all --type service | grep -n \"myspeed.service\"; then systemctl stop myspeed; fi"
        },
        {
            description: "Paketquellen aktualisiert",
            command: "apt-get update -y"
        },
        {
            description: "Pakete installiert",
            command: "apt-get install -y wget unzip curl"
        },
        {
            description: "NodeJS installiert",
            command: "curl -sSL https://deb.nodesource.com/setup_18.x | bash && apt-get install -y nodejs"
        },
        {command: "mkdir -p {folder}"},
        {
            description: "Neuste Version heruntergeladen",
            command: "wget $(curl -s https://api.github.com/repos/gnmyt/myspeed/releases/latest | grep browser_download_url | cut -d '\"' -f 4) -O {folder}/file.zip",
            condition: "environment=Stabil"
        },
        {
            description: "Entwicklerversion heruntergeladen",
            command: "wget https://github.com/gnmyt/myspeed/archive/refs/heads/development.zip -O {folder}/file.zip",
            condition: "environment=Entwicklung"
        },
        {
            description: "Dateien entpackt",
            command: "unzip {folder}/file.zip -d {folder}"
        },
        {
            description: "Dateien verschoben",
            command: "cd {folder} && rm -rf server client docs cli && mv myspeed-*/* . && rm -rf myspeed-development",
            condition: "environment=Entwicklung"
        },
        {
            description: "Panel kompiliert",
            command: "cd {folder}/client && npm install --force && cd {folder} && npm run build && cp -r {folder}/client/build . && rm -rf {folder}/client/build",
            condition: "environment=Entwicklung"
        },
        {command: "rm -rf {folder}/file.zip"},
        {
            description: "Abhängigkeiten installiert",
            command: "cd {folder} && npm install --production"
        }
    ]
}