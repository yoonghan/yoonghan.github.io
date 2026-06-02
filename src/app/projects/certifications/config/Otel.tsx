import Link from "@/components/Link";

export const Otel = () =>
    <article>
        <p className="text-2xl font-bold">
            Open Telemetry
        </p>
        <Link href="https://github.com/LinkedInLearning/mastering-observability-with-opentelemetry-4515650" target="_blank">Read Up</Link>
        <ol className="list-decimal ml-4">
            <li>
                <strong>W3C Trace Context</strong><br />
                <span>traceparent: 00-0a12323-b7adf-01</span>
                <ul className="list-disc list-inside ml-4">
                    <li>Header Name - traceparent</li>
                    <li>version - 00</li>
                    <li>traceid - 0a12323, span id</li>
                    <li>parentid - b7adf, span id that create this span</li>
                    <li>trace flags - 01, trace time</li>
                </ul>
            </li>
            <li>
                <strong>Observability</strong>
                <ul>
                    <li>Metrics - Quantitaive information of the system</li>
                    <li>Logs - Understand by looking at stack traces</li>
                    <li>Traces - Show where problem appears</li>
                </ul>
            </li>
            <li>Monkey Patching - auto instrumentation / the process of adding observability features to applications.</li>
            <li>Collector - intermediate program to send OTLP -&gt; Collector -&gt; Jaeger. It can batch, aggregrate, transform, sample.</li>
            <li>
                See `opentelemetry-instrument --traces_exporter otlp --metrics_exporter otlp --logs_exporter console --service_name gateway flask run --port 3001`, where
                it can "trace", "metric" and "log export automatically via bridge"
            </li>
        </ol>
    </article>