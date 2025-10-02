# Artwork Gallery DataTable

A React application that displays artwork data from the Art Institute of Chicago API in an interactive data table with advanced selection features.

## Features

- **Server-Side Pagination**: Fetches data only when needed, preventing memory issues
- **Smart Row Selection**: Select individual rows or bulk select across multiple pages
- **Persistent Selection**: Your selections stay saved even when switching between pages
- **Custom Selection Panel**: Enter any number to select that many rows automatically across pages
- **Loading States**: Clear feedback when data is being fetched
- **Toast Notifications**: Get notified when each page loads successfully

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- PrimeReact for the data table component
- Sonner for toast notifications

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your computer (version 16 or higher recommended).

### Installation

1. Clone this repository or download the code
```bash
git clone <your-repo-url>
cd art-gallery-datatable
```

2. Install all the required packages
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

## How to Use

### Basic Navigation
- The table shows 12 artworks per page
- Use the pagination buttons at the bottom to move between pages
- Each time you change pages, fresh data is loaded from the API

### Selecting Rows
1. **Individual Selection**: Click the checkbox next to any row to select it
2. **Select All on Page**: Click the checkbox in the header to select all 12 rows on the current page
3. **Custom Selection**: Click the down arrow icon next to the header checkbox
   - Enter any number (like 15 or 25)
   - Click Submit
   - The system will automatically select that many rows across multiple pages
   - Switch to the next page to see the remaining selections

### Smart Selection Memory
- Select some rows on page 2
- Go to page 3 or any other page
- Come back to page 2
- Your previously selected rows will still be selected!

## Project Structure

```
src/
├── components/
│   ├── ArtworkTable.tsx          # Main table component
│   └── SelectionPanel.tsx        # Custom selection overlay
├── hooks/
│   └── useSelectionManager.ts    # Handles all selection logic
├── services/
│   └── api.ts                    # API calls to fetch artwork data
├── types/
│   └── index.ts                  # TypeScript type definitions
├── App.tsx                       # Main app component
└── main.tsx                      # App entry point
```


## API Used

This project uses the Art Institute of Chicago API:
- Base URL: `https://api.artic.edu/api/v1/artworks`
- No API key required
- Free to use

## Important Notes

- **Memory Efficient**: The app only stores data for the current page, not all fetched pages
- **Fresh Data**: Every page change makes a new API call to get the latest data
- **TypeScript**: Full type safety throughout the application
- **No Data Hoarding**: Old page data is replaced, not accumulated

## Common Issues

**Table not showing data?**
- Check your internet connection
- Open browser console (F12) to see if there are any errors

**Selections not persisting?**
- Make sure you're clicking the checkboxes, not just the rows
- The system tracks selections by row ID, so they should persist correctly

**Build fails?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try building again with `npm run build`

## Development

Want to modify the code? Here's what you need to know:

- **Add new columns**: Edit the `<Column>` components in `ArtworkTable.tsx`
- **Change page size**: Modify the `rows={12}` prop in the DataTable component
- **Styling**: PrimeReact uses theme files - check `App.tsx` for theme imports
- **API changes**: All API logic is in `services/api.ts`
