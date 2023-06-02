module.exports = {
    variables: {},
    steps: [
        {
            description: "Zugriff prüfen",
            command: "if [ $EUID -ne 0 ]; then exit 1; fi"
        },
        {
            description: "Paketlisten aktualisiert",
            command: "apt-get update"
        },
        {
            description: "Pakete aktualisiert",
            command: "apt-get upgrade -y"
        },
        {
            description: "Pakete bereinigt",
            command: "apt-get autoremove -y"
        }
    ]
}