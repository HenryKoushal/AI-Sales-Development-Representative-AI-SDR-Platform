# API Specification - AI SDR & Lead Finder

## Authentication Service (`authService.ts`)

- `POST /auth/register`: Create a new user account.
- `POST /auth/login`: Authenticate and receive JWT tokens.
- `GET /auth/me`: Retrieve current user profile (requires token).

## Lead Service (`leadService.ts`)

- `GET /api/leads`: Fetch all leads with enrichment data.
- `POST /api/search-leads`: Scan market for prospects based on query.
- `POST /api/add-lead`: Manually add a new prospect profile.
- `DELETE /api/lead/{id}`: Remove a prospect from the dashboard.
- `GET /api/lead-score/{id}`: Recalculate ML score and explanation.
- `GET /api/analytics`: Aggregate metrics and historical growth data.
- `GET /api/export-leads`: Generate CSV download of current dataset.

## Email Service (`emailService.ts`)

- `POST /api/generate-email`: Use AI to draft personalized outreach based on lead profile.
- `POST /api/send-email`: Dispatch outreach email via SMTP/API.

## Agent SDK Events (AI SDR Agent)

- `lead_search_completed` (sync): Triggered after search to highlight top 3 prospects.
- `lead_score_threshold_met` (async): Triggered when a lead score exceeds 85.
- `email_draft_requested` (sync): Triggered during draft generation for personalization.

## Environment Configuration

- `VITE_API_BASE_URL`: Backend API endpoint.
- `VITE_USE_MOCK_DATA`: Set to `true` to enable realistic mock simulation mode.
- `VITE_AGENT_BASE_URL`: Uptiq Agent Service endpoint.
