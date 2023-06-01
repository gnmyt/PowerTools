module.exports = {
    variables: {
        environment: "Stabil",
    },
    steps: [
        {
            description: "Zugriff prüfen",
            command: "if [ $EUID -ne 0 ]; then exit 1; fi"
        },
        {
            description: "Docker Test installieren",
            command: "curl -sSL https://get.docker.com/ | CHANNEL=test bash && exit 0",
            condition: "environment=Test"
        },
        {
            description: "Docker installieren",
            command: "curl -sSL https://get.docker.com/ | CHANNEL=stable bash && exit 0",
            condition: "environment=Stabil"
        },
        {
            description: "Systemdienst aktivieren",
            command: "systemctl enable --now docker"
        }
    ]
}