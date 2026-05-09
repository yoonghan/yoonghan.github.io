export const CloudMicroservices = () =>
    <article>
        <p className="text-2xl font-bold">
            Cloud Microservice
        </p>
        <p>
            <strong>Services:</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
            <li>Data Service - source within the system (not limited to DB)</li>
            <li>Business Service - abstraction that build on data services. Also known as Domain Based Services - Service is aligned with business domain.</li>
            <li>Edge Service - responsible to service data to user and external system</li>
            <li>The Platform - all encompassing infrastructure for all service operations, it include network, identity, databse, storage and etc.</li>
        </ul>
        <p>
            <strong>Patterns:</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
            <li>Strangler Pattern - split monolith application to microservice. Gradually replace function in monolith application with microservice.</li>
            <li>Sidecar Pattern - Deploy a helper container alongside the main application container to handle cross-cutting concerns such as logging, monitoring, and security.</li>
            <li>Gateway Pattern - a single entry point for all clients. It provides a unified API for multiple microservices. Split to edge(split per client) and aggregator(1 main to serve multiple client) pattern.</li>
        </ul>

    </article>
