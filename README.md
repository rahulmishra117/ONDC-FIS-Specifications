# ONDC Financial Services - Modern Developer Guide

A modern, user-friendly web application for exploring ONDC Financial Services specifications and documentation.

## Features

- **Modern UI/UX**: Built with React, TypeScript, and Tailwind CSS
- **Interactive API Documentation**: Integrated Swagger UI for exploring APIs
- **Branch Management**: Easy switching between different specification branches
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type Safety**: Full TypeScript support for better development experience
- **Performance Optimized**: Built with Vite for fast development and builds

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API Documentation**: Swagger UI React
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ondc-modern
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header
│   ├── TabNavigation.tsx # Tab navigation component
│   └── SwaggerUI.tsx   # Swagger UI wrapper
├── hooks/              # Custom React hooks
│   └── useApi.ts       # API data fetching hooks
├── pages/              # Page components
│   └── BranchesPage.tsx # Branches selection page
├── services/           # API services
│   └── api.ts          # GitHub API service
├── types/              # TypeScript type definitions
│   └── index.ts        # Core types
├── utils/              # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Key Improvements Over Legacy Version

### 1. **Modern Architecture**
- Component-based architecture with React
- TypeScript for type safety
- Custom hooks for data management
- Service layer for API interactions

### 2. **Enhanced User Experience**
- Intuitive navigation with modern UI components
- Responsive design for all devices
- Loading states and error handling
- Smooth transitions and animations

### 3. **Developer Experience**
- Hot module replacement with Vite
- TypeScript for better IDE support
- Modular code structure
- Easy to extend and maintain

### 4. **Performance**
- Optimized bundle size
- Lazy loading capabilities
- Efficient state management
- Modern build tools

### 5. **Security**
- No hardcoded API tokens
- Secure API calls
- Proper error handling

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. Create components in `src/components/`
2. Add types in `src/types/`
3. Create hooks in `src/hooks/` for data management
4. Add services in `src/services/` for API calls

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Customization

### Theming
The application uses Tailwind CSS with custom color schemes. You can modify colors in `tailwind.config.js`.

### Components
All components are modular and can be easily customized or extended.

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in `dist/` can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Related Links

- [ONDC Official Website](https://ondc.org/)
- [ONDC GitHub](https://github.com/ONDC-Official)
- [Financial Services Specification](https://github.com/ONDC-Official/ONDC-FIS-Specifications)
