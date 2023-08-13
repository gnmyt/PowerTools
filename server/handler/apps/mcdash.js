module.exports = {
    variables: {
        software: "paper",
        username: "CONSOLE",
        password: "CONSOLE",
        port: 25565,
        panel: 7868,
        version: "1.20.1",
    },
    steps: [
        {
            description: "Zugriff prüfen",
            command: "if [ $EUID -ne 0 ]; then exit 1; fi"
        },
        {
            description: "Hash generieren",
            command: "apt-get install apache2-utils -y && htpasswd -bnBC 10 \"\" {password} | tr -d ':\n' | sed 's/$2y/$2a/' > /tmp/.mchash && echo $RANDOM | md5sum | head -c 5 > /tmp/.mcinstance"
        },
        {
            description: "Spigot installieren",
            command: "curl -sSL https://create.mcdash.gnmyt.dev/install.sh | bash -s -- \"spigot\" " +
                "\"{username}: $(cat /tmp/.mchash)\" \"$(cat /tmp/.mcinstance)\" \"{port}\" \"{panel}\" \"{version}\" \"PowerTools\" \"17\"",
            condition: "software=Spigot",
        },
        {
            description: "Paper installieren",
            command: "curl -sSL https://create.mcdash.gnmyt.dev/install.sh | bash -s -- \"paper\" " +
                "\"{username}: $(cat /tmp/.mchash)\" \"$(cat /tmp/.mcinstance)\" \"{port}\" \"{panel}\" \"{version}\" \"PowerTools\" \"17\"",
            condition: "software=Paper",
        },
        {
            description: "Purpur installieren",
            command: "curl -sSL https://create.mcdash.gnmyt.dev/install.sh | bash -s -- \"purpur\" " +
                "\"{username}: $(cat /tmp/.mchash)\" \"$(cat /tmp/.mcinstance)\" \"{port}\" \"{panel}\" \"{version}\" \"PowerTools\" \"17\"",
            condition: "software=Purpur"
        }
    ]
}