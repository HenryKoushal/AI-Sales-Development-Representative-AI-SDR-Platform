# AI SDR + B2B Lead Finder & Enrichment Platform - Application Plan

## Overview
A production-ready B2B sales automation platform that helps users find, enrich, score, and reach out to potential leads using AI.

## Core Features
- **Lead Discovery**: Search for leads by company domain or business niche.
- **Data Enrichment**: Automated population of contact details, LinkedIn profiles, and job roles.
- **Smart Lead Scoring**: ML-based scoring with detailed explanations.
- **AI Outreach**: Personalized cold email generation and direct sending functionality.
- **SaaS Dashboard**: Comprehensive UI with interactive analytics and growth metrics.
- **Data Management**: Export leads as CSV, manual lead addition, and deletion.
- **Secure Authentication**: JWT-based login and registration system.

## Tech Stack
- **Frontend**: React.js (TypeScript)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Agent Integration**: Uptiq Headless Agent SDK
- **Backend**: FastAPI (Python) & Hono (Node.js)

## Implementation Roadmap

### Phase 1: Foundation & Data
- [x] Setup folder structure and basic routing.
- [x] Create realistic mock data for B2B leads.
- [x] Configure Agent SDK with provided SDR agent.

### Phase 2: Backend Services
- [x] Implement Lead Scraper & Enrichment logic.
- [x] Implement ML-based Scoring with explanations.
- [x] Create Analytics & Export endpoints.
- [x] Implement Email Generation & Sending API.
- [x] Setup background tasks for lead processing.

### Phase 3: UI & UX
- [x] Build Professional SaaS Layout (Sidebar, Navbar).
- [x] Create Advanced Lead Table with actions and tooltips.
- [x] Implement Analytics Dashboard with Recharts.
- [x] Design Email Outreach Modal with sending status.
- [x] Implement Auth Pages (Login/Register).

### Phase 4: Integration & Polish
- [x] Connect services to UI components.
- [x] Integrate Agent trigger events for search and email generation.
- [x] Add CSV export and manual lead management.
- [x] Run build and verify.

## Agent Events
- `lead_search_completed`: Analysis of search results.
- `lead_score_threshold_met`: Notifications for high-score leads.
- `email_draft_requested`: Personalized email generation.