const Names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const Roles = ['Attacker', 'Defender', 'Support', 'Scout'];

function seededUsers() {
    const users = [];
    for (let i = 0; i < 10; i++) { 
        users.push({
            id: i + 1,
            name: Names[i % Names.length],
            team: i % 2 === 0 ? 'red' : 'blue',
            role: Roles[i % Roles.length],
            scoreContribution: 0,
            lastAction: "Initialized"
        });
    }
    return users;
}

export class RealTimeUpdates {
    constructor(handlers) {
        this.handlers = handlers;
        this.timer = null;
        this.users = seededUsers();;
        this.scores = { red: 0, blue: 0 };
    }

    start() {
        this.handlers.onTick({ users: this.users, connection: { status: 'connected', lastActive: Date.now() } });
        this.loop();
    }

    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.handlers.onTick({ users: [], connection: { status: 'offline', lastActive: Date.now() } });
    }

    loop() { 
        const user = this.users[Math.floor(Math.random() * this.users.length)];
        const delta = Math.floor(Math.random() * 10) + 1;
        if (user.team === 'red') {
            this.scores.red += delta;
        } else {
            this.scores.blue += delta;
        }

        user.lastAction = this.randomeActions();
        user.scoreContribution += delta;

        const activity = {
            id: `a-${Date.now()}`,
            userId: user.id,
            at: Date.now(),
            summary: `${user.name} scored ${delta} points for team ${user.team}`,
            delta: delta,
        };

        this.handlers.onTick({
            users: [...this.users],
            scores: {...this.scores},
            activity: { [user.id]: [activity] },
            connection: { status: 'connected', lastActive: Date.now() }
        });

        this.timer = setTimeout(() => this.loop(), 1000 + Math.floor(Math.random() * 2000));
    }

    randomeActions() {
        const action = [
            "Phishing",
            'Firewall Breach',
            'Data Leak',
            'Unauthorized Access',
            'Malware Attack',
            'DDoS Attack',
            'SQL Injection',
        ];
        return action[Math.floor(Math.random() * action.length)];
    }
}