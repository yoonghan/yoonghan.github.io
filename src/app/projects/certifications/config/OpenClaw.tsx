export function OpenClaw() {
    return (
        <article>
            <p className="text-2xl">OpenClaw</p>
            <ol className="list-decimal list-inside">
                <li>Install Docker</li>
                <li> Download<br />
                    <code className="text-sm text-slate-600">
                        docker pull ghcr.io/openclaw/openclaw:latest
                    </code>
                </li>
                <li> Run foreground with persistant storage: <br />
                    <code className="text-sm text-slate-600">
                        docker run -d \
                        --name openclaw-agent \
                        -v ~/.openclaw:/home/node/.openclaw \
                        -v ~/openclaw-workspace:/app/workspace \
                        -p 18789:18789 \
                        ghcr.io/openclaw/openclaw:latest \
                        openclaw gateway --bind lan --allow-unconfigured</code>
                </li>
                <li>
                    Get token:<br />
                    <code className="text-sm text-slate-600">
                        docker exec -it openclaw-agent cat /home/node/.openclaw/openclaw.json | grep "token"
                    </code>
                </li>
                <li>
                    Login: http://localhost:18789
                </li>
                <li>
                    Run command: <br />
                    <code className="text-sm text-slate-600">
                        docker stop openclaw-agent && docker rm openclaw-agent;
                        docker run -d \
                        --name openclaw-agent \
                        -e GOOGLE_API_KEY="YOUR_GEMINI_KEY_HERE" \
                        -v ~/.openclaw:/home/node/.openclaw \
                        -v ~/openclaw-workspace:/app/workspace \
                        -p 18789:18789 \
                        ghcr.io/openclaw/openclaw:latest \
                        openclaw gateway --bind lan --allow-unconfigured;
                        docker exec -it openclaw-agent openclaw config set agents.defaults.model.primary "google/gemini-1.5-pro";
                        docker exec -it openclaw-agent rm /home/node/.openclaw/agents/main/agent/auth-profiles.json;
                    </code>
                </li>

            </ol>
        </article>
    )
}