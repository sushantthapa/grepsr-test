# Grepsr Microservices Project

## Overview

This project is a microservices-based application consisting of:

- **api-service**: Node.js, exposes REST API, interacts with database
- **worker-service**: Python, processes background jobs
- **frontend-service**: React, served via Nginx
- **database**: PostgreSQL, shared by API and worker

---

## Table of Contents

- [Local Setup](#local-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Database Deployment & Persistence](#database-deployment--persistence)
- [CI/CD Pipeline](#cicd-pipeline)
- [Troubleshooting](#troubleshooting)

---

## Local Setup

### 1. Clone Repository

```sh
git clone git@github.com:your-org/your-repo.git
cd your-repo
```

### 2. Install Dependencies

#### API Service

```sh
cd api-service
npm install
```

#### Worker Service

```sh
cd worker-service
pip install -r requirements.txt
```

#### Frontend Service

```sh
cd frontend-service
npm install
```

### 3. Configure Environment Variables

Create `.env` in each service:

```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
REDIS_URL=redis://localhost:6379
```

### 4. Run Locally

```sh
docker-compose up --build
```

---

## Kubernetes Deployment

### 1. Create Namespace

```sh
kubectl create namespace my-app
```

### 2. Deploy PostgreSQL with Persistence

```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres bitnami/postgresql \
  --namespace my-app \
  --set global.postgresql.postgresqlDatabase=mydb \
  --set global.postgresql.postgresqlUsername=myuser \
  --set global.postgresql.postgresqlPassword=mypassword \
  --set persistence.enabled=true \
  --set persistence.size=10Gi
```

### 3. Deploy Services

```sh
kubectl apply -f k8s/api-deployment.yaml
kubectl apply -f k8s/worker-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

### 4. Expose Services

- Use NodePort for dev/test
- Use Ingress with TLS for production

---

## Database Deployment & Persistence

- Use PersistentVolumeClaim (PVC) for data persistence.
- Schedule regular backups using Kubernetes cronjobs.
- Optional: Setup PostgreSQL replication or Patroni for high availability.

---

## CI/CD Pipeline

### Continuous Integration (CI)

- Linting & code formatting
- Unit & integration tests
- Build Docker images
- Push images to registry (Docker Hub / GitHub Container Registry / Harbor)

### Continuous Deployment (CD)

- Deploy images to Kubernetes (via kubectl or Helm)
- Use environment-specific values files (values-dev.yaml, values-prod.yaml)
- Optional: GitOps with ArgoCD or FluxCD

### Rollbacks

```sh
kubectl rollout undo deployment/api-service
```

---

## Troubleshooting

### Database Issues

- Connection fails: Verify `DATABASE_URL` & service status
- Pod crashes / OOMKilled: Increase CPU/Memory resources
- Slow queries: Use EXPLAIN and add indexes
- PVC not bound: Check `kubectl get pvc` & StorageClass

### Performance Issues

- Backend scaling: Use Horizontal Pod Autoscaler (HPA)
- Worker throughput: Adjust replicas & concurrency
- Database tuning: Enable connection pooling (PgBouncer), tune PostgreSQL parameters
- Caching: Use Redis for frequent queries

### Logs & Monitoring

- Use `kubectl logs -f <pod>` for pod logs
- Deploy Prometheus & Grafana for metrics and alerts