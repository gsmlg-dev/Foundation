# DevDocs Image

DevDocs image to deploy it to local server.

## Deploy

Kubernetes:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: devdocs
spec:
  accessModes:
  - ReadWriteOnce
  # - ReadWriteMany
  resources:
    requests:
      storage: 50Gi
  # storageClassName: -
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    workload.user.gsmlg.dev/workloadselector: deployment-devdocs
  name: devdocs
spec:
  replicas: 1
  selector:
    matchLabels:
      workload.user.gsmlg.dev/workloadselector: deployment-devdocs
  template:
    metadata:
      labels:
        workload.user.gsmlg.dev/workloadselector: deployment-devdocs
    spec:
      containers:
      -
        image: docker.io/gsmlg/devdocs:latest
        imagePullPolicy: Always
        name: devdocs
        ports:
        - containerPort: 9292
          name: http
          protocol: TCP
        volumeMounts:
        - mountPath: /devdocs/public/assets
          name: devdocs
          subPath: assets
        - mountPath: /devdocs/public/docs
          name: devdocs
          subPath: docs
      volumes:
      - name: devdocs
        persistentVolumeClaim:
          claimName: devdocs

---
apiVersion: v1
kind: Service
metadata:
  name: devdocs
spec:
  ports:
  - name: http
    port: 9292
    protocol: TCP
    targetPort: 9292
  selector:
    workload.user.gsmlg.dev/workloadselector: deployment-devdocs
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: devdocs
  annotations:
    nginx.org/websocket-services: devdocs
spec:
  ingressClassName: nginx
  rules:
  - host: devdocs.gsmlg.com
    http:
      paths:
      - backend:
          service:
            name: devdocs
            port:
              name: http
        path: /
        pathType: ImplementationSpecific
  tls:
  - secretName: tls-devdocs-ingress

---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: tls-devdocs-ingress
spec:
  dnsNames:
  - devdocs.gsmlg.com
  - '*.devdocs.gsmlg.com'
  issuerRef:
    group: cert-manager.io
    kind: ClusterIssuer
    name: letsencrypt-production
  secretName: tls-devdocs-ingress

```

Docker compose

```yaml
services:
  devdocs:
    image: docker.io/gsmlg/devdocs:latest
    container_name: devdocs
    restart: always
    ports:
      - 9292:9292
    volumes:
      - "./docs:/devdocs/public/docs"
      - "./assets:/devdocs/public/assets"

```

## Setup

Download docs

```bash
# Into container
# cd /devdocs
bundle exec thor docs:download --all
# download docs to /devdocs/public/docs
bundle exec thor assets:clean
bundle exec thor assets:compile
# compile assets to /devdocs/public/assets
```

## Update docs

It's better to run update every month by `thor docs:download --all`

```
# must setup github token or will fail cause connection limit
# Check
thor updates:check --github-token=$GITHUB_TOKEN
# Update
thor docs:download --installed
```
