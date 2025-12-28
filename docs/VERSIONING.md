# Deployment Versioning Strategy

This document outlines the "Sync-SemVer" strategy implemented in this project to ensure predictable, traceable, and reliable deployments across all environments (Local, Homelab, and GCP).

## 1. Overview

The strategy synchronizes the application version across three critical layers:

1.  **Source Code**: The version defined in [`package.json`](package.json).
2.  **Version Control**: Git tags created during version bumps.
3.  **Container Registry**: Immutable Docker image tags (e.g., `v0.1.2`).

## 2. Core Principles

- **Single Source of Truth**: The `version` field in [`package.json`](package.json) is the definitive version of the software.
- **Immutable Tags**: Every deployment produces a Docker image with a unique version tag. The `latest` tag is also updated to point to the most recent version.
- **Traceability**: Each Docker image is labeled with its version and the specific Git commit hash from which it was built.

## 3. Impacted Files

### [`makefile`](makefile)

The central coordination point for versioning:

- Extracts `VERSION` from [`package.json`](package.json).
- Captures `GIT_HASH` from the current commit.
- Automates the creation of versioned tarballs and image tags.
- Provides new targets for version management.

### [`Dockerfile`](Dockerfile)

Modified to accept metadata as build arguments:

- `ARG VERSION` and `ARG GIT_HASH` are used during the build process.
- `LABEL` instructions embed this metadata into the final image, allowing for post-deployment inspection.

### [`cloudbuild.yaml`](cloudbuild.yaml)

Updated to support the same build arguments as the local [`makefile`](makefile), ensuring that GCP-based builds are consistent with local ones.

## 4. Versioning Commands

The following new commands are available in the [`makefile`](makefile):

| Command      | Action        | Usage Scenario                                        |
| :----------- | :------------ | :---------------------------------------------------- |
| `make patch` | Bumps `0.0.x` | Bug fixes and minor internal changes.                 |
| `make minor` | Bumps `0.x.0` | New features that don't break existing functionality. |
| `make major` | Bumps `x.0.0` | Breaking changes or major architectural shifts.       |

_Note: These commands use `npm version` internally, which also creates a Git tag for the new version._

## 5. Deployment Workflow

To deploy a new version:

1.  **Bump the version**:
    ```bash
    make patch  # Or minor/major
    ```
2.  **Deploy to your target**:
    ```bash
    make deploy-homelab  # Or deploy-local, deploy-cloud-run, etc.
    ```
    The system will automatically:
    - Build the image with the new version tag.
    - Apply the `latest` tag.
    - Transfer/Push the versioned image.
    - Start the container using the specific version tag.

## 6. Verifying Running Versions

You can inspect a running container or image to see its version metadata:

```bash
# For a running container
docker inspect <container_name_or_id> --format '{{index .Config.Labels "version"}}'
docker inspect <container_name_or_id> --format '{{index .Config.Labels "git_hash"}}'

# For a local image
docker inspect <image_name>:<tag> --format '{{index .Config.Labels "version"}}'
```

---

_Created on 2025-12-27_
