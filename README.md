# Sonar Report Renderer (TypeScript)

## Overview

Sonar Report Renderer is a Node.js application built with TypeScript, Express, and EJS for generating software quality reports from SonarQube data. The app receives project information and a token via API, fetches metrics from SonarQube, renders a visual report in HTML, and converts it to an image for client consumption.

## Features

- Connects to SonarQube and retrieves key project metrics (Security, Reliability, Maintainability, Coverage, Duplications, Hotspots Reviewed, etc.).
- Renders a visually appealing report using EJS templates.
- Converts HTML reports to PNG images using Puppeteer.
- Provides an API endpoint to receive project info and return the report image.
- Supports environment configuration via `.env` file.

## Installation

```bash
git clone https://github.com/vuankhanh/sonar-report-renderer-typescript.git
cd sonar-report-renderer-typescript
npm install
```

## Usage

### Development mode (auto reload)
```bash
npm run start:dev
```

### Production build and run
```bash
npm run build
npm start
```

## Configuration

Create a `.env` file with the following variables:

```
APP_PORT=3900
SONAR_QUBE_URL=http://localhost:9000
```

## API Usage

**POST** `/api/sonar-report`

Request body:
```json
{
  "projectKey": "your_project_key",
  "token": "your_sonarqube_token"
}
```

Response: PNG image containing the project quality report.

## Main Structure

- `src/service/`: Service logic (SonarQube API, EJS rendering, HTML-to-image conversion).
- `src/template/`: EJS templates for report rendering.
- `src/interface/`: Type definitions.
- `server.ts`: Application entry point.