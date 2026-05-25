# Project Structure

## Directory Layout

```
salesforce-planning-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── HeroContainer.js    # Top header section with breadcrumb, title, and progress
│   │   └── RightColumn.js      # Right sidebar with resource cards
│   ├── App.js                  # Main application component
│   ├── App.css                 # Main application styles
│   ├── index.js                # Application entry point
│   └── index.css               # Global styles
├── package.json
├── README.md
└── PROJECT_STRUCTURE.md
```

## Component Breakdown

### HeroContainer.js
- **Breadcrumb Navigation**: "Salesforce Go > Commercial Planning and Forecasting"
- **Page Title**: Large title with manufacturing icon
- **Description**: Brief description of the feature
- **Progress Indicator**: Shows "1 of 4 Steps Completed" with circular progress ring
- **Refresh Button**: Static button (non-functional as per requirements)
- **Favorite Menu**: Dropdown menu (static)

### RightColumn.js
Contains three resource cards:

1. **See How It Works Card**
   - Video preview image placeholder
   - Blue link title with tour icon
   - Descriptive text about Sales Volume Planning

2. **See the Latest Updates Card**
   - Title in black
   - Feature list item with link and description
   - Information about Commercial Planning updates

3. **Learning on Trailhead Card**
   - Title in black
   - Link to Trailhead basics with external link icon

## Styling Approach

- Pure CSS (no CSS frameworks)
- No Tailwind or Bootstrap dependencies
- All styles defined in App.css
- SVG icons embedded as data URIs for portability
- Responsive layout with fixed width (1347px) container

## Colors Used (from Figma)

- **Primary Blue**: #092ec3 (top bar)
- **Link Blue**: #0b5cab (links and interactive text)
- **Brand Blue**: #0176d3 (buttons and icons)
- **Text Default**: #181818 (primary text)
- **Text Weak**: #444444 (secondary text)
- **Icon Default**: #747474 (inactive icons)
- **Border Gray**: #e5e5e5 (card borders)
- **Background**: #ffffff (white backgrounds)
- **Page Background**: #f3f3f3 (light gray)

## Typography

- **Primary Font**: SF Pro Display (for headings and UI elements)
- **Secondary Font**: Segoe UI (for body text)
- **Fallback Fonts**: System fonts (-apple-system, BlinkMacSystemFont, sans-serif)

## Interactive Elements (Currently Static)

All the following are rendered but non-functional:
- Refresh button
- Favorite menu dropdown
- All links in resource cards
- Progress indicator

## Future Enhancements

When ready to add functionality:
1. Wire up the Refresh button to reload data
2. Implement the favorite menu dropdown
3. Make resource card links navigate to appropriate pages
4. Update progress indicator dynamically
5. Add left content panel functionality
6. Implement responsive design for mobile devices

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The application will be available at http://localhost:3000
