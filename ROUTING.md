# App Routing Structure

This document explains the URL structure and routing implementation for the Salesforce Planning App.

## Route Structure

The app now uses React Router to provide proper URL-based navigation. The app directly opens to the Sales Volume Planning workspace by default.

### Available Routes

#### Default Route
- **URL:** `/`
- **Redirects to:** `/sales-volume/setup`
- **Description:** Root path automatically redirects to Sales Volume Planning setup page

#### Sales Volume Planning Workspace
- **Setup Page:** `/sales-volume/setup`
  - Main setup page with steps and configuration options
  
- **Planning View:** `/sales-volume/planning`
  - Planning view with data grid and planning tools
  
- **Grid Configuration:** `/sales-volume/grid-config`
  - Configure grid layout, dimensions, and measures
  
- **Hierarchy Setup:** `/sales-volume/hierarchy-setup`
  - Configure hierarchies and their levels
  
- **Measures Page:** `/sales-volume/measures`
  - Manage measures and measure sets

#### Commercial Planning for Manufacturing Workspace
- **Setup Page:** `/commercial-manufacturing/setup`
  - Main setup page with steps and configuration options
  
- **Planning View:** `/commercial-manufacturing/planning`
  - Planning view with data grid and planning tools
  
- **Grid Configuration:** `/commercial-manufacturing/grid-config`
  - Configure grid layout, dimensions, and measures
  
- **Hierarchy Setup:** `/commercial-manufacturing/hierarchy-setup`
  - Configure hierarchies and their levels
  
- **Measures Page:** `/commercial-manufacturing/measures`
  - Manage measures and measure sets

## Key Features

### 1. **Bookmarkable URLs**
Every page can be bookmarked and shared. Users can directly navigate to any specific page without starting from the landing page.

### 2. **Browser Navigation**
- Back/Forward buttons work correctly
- Users can navigate through their history
- URL updates automatically when navigating between pages

### 3. **Refresh-Safe**
Users can refresh any page without losing their place. The app will load the correct workspace and page based on the URL.

### 4. **GitHub Pages Compatibility**
The router is configured with `basename={process.env.PUBLIC_URL}` to work correctly when deployed to GitHub Pages.

## Implementation Details

### Router Setup
```javascript
<BrowserRouter basename={process.env.PUBLIC_URL}>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/:workspace/setup" element={<WorkspaceLayout page="setup" />} />
    <Route path="/:workspace/planning" element={<WorkspaceLayout page="planning" />} />
    <Route path="/:workspace/grid-config" element={<WorkspaceLayout page="gridconfig" />} />
    <Route path="/:workspace/hierarchy-setup" element={<WorkspaceLayout page="hierarchySetup" />} />
    <Route path="/:workspace/measures" element={<WorkspaceLayout page="measures" />} />
  </Routes>
</BrowserRouter>
```

### Navigation
All navigation now uses `useNavigate()` hook from React Router:
```javascript
const navigate = useNavigate();
navigate('/sales-volume/planning'); // Navigate to planning view
```

### Workspace Detection
The workspace is detected using the `:workspace` URL parameter:
```javascript
const { workspace } = useParams();
// workspace will be 'sales-volume' or 'commercial-manufacturing'
```

## Usage Examples

### Direct Access
Users can navigate directly to any page by typing the URL:
- `http://localhost:3000/sales-volume/planning`
- `http://localhost:3000/commercial-manufacturing/hierarchy-setup`

### In-App Navigation
All navigation buttons and links update the URL automatically:
- Clicking "Go to Planning View" → Updates URL to `/sales-volume/planning`
- Clicking "Configure Grid" → Updates URL to `/sales-volume/grid-config`

### Sharing Links
Users can share links to specific pages:
- Share setup page: `/sales-volume/setup`
- Share planning view: `/commercial-manufacturing/planning`

## Benefits

1. **Better User Experience:** Users can use browser back/forward buttons naturally
2. **No Lost Progress:** Refreshing the page keeps the user on the same page
3. **Shareable Links:** Users can share specific pages with colleagues
4. **Bookmarkable:** Users can bookmark frequently used pages
5. **SEO-Friendly:** Each page has its own URL (useful for documentation)
6. **Analytics-Ready:** URL-based tracking for analytics tools

## Maintenance Notes

### Adding New Routes
To add a new route:
1. Add a new `<Route>` component in `App.js`
2. Create or update the page component
3. Add navigation handlers using `useNavigate()`
4. Update this documentation

### Workspace Configuration
Workspace configurations are defined in the `workspaces` object in `App.js`:
```javascript
const workspaces = {
  'sales-volume': {
    key: 'salesVolume',
    title: 'Sales Volume Planning',
    description: '...',
    isCommercial: false
  },
  'commercial-manufacturing': {
    key: 'salesVolumeAaf',
    title: 'Commercial Planning for Manufacturing',
    description: '...',
    isCommercial: true
  }
};
```

## Troubleshooting

### 404 on Refresh (Production)
If you get a 404 error when refreshing a page in production:
- GitHub Pages needs a 404.html redirect
- Current implementation includes this in the public folder

### Wrong Workspace Loading
If the wrong workspace loads:
- Check the URL parameter matches 'sales-volume' or 'commercial-manufacturing'
- Verify workspace configuration in App.js

### Navigation Not Working
If navigation doesn't work:
- Ensure you're using `navigate()` from `useNavigate()` hook
- Check that the target route exists in the Routes configuration
