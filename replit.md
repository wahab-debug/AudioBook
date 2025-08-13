# AudioBookment

## Overview

AudioBookment is a comprehensive web application that provides various calculators to optimize audiobook listening experiences. The application helps users calculate finished listening times, time remaining, optimal speeds, pricing, and various other audiobook-related metrics. Built as a full-stack TypeScript application, it features a React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript and utilizes a modern component-based architecture:

- **Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling with shadcn/ui component library
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized production builds
- **Component Library**: Radix UI primitives with custom shadcn/ui styling

The application follows a page-based routing structure with individual calculator pages and reusable UI components. Each calculator is implemented as a separate page component with its own state management and calculation logic.

### Backend Architecture
The backend follows a simple Express.js server architecture:

- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage Layer**: Currently implements an in-memory storage pattern with interface abstraction for easy database integration
- **API Design**: RESTful API endpoints with proper error handling and validation
- **Development Setup**: Custom Vite integration for seamless development experience

The server uses a layered architecture with separate route handlers and storage abstraction, making it easy to switch from in-memory storage to actual database implementation.

### Database Schema
The application defines a PostgreSQL schema using Drizzle ORM:

- **Contact Messages Table**: Stores user contact form submissions with fields for name, email, subject, message, and creation timestamp
- **Schema Validation**: Uses Zod for runtime type validation and drizzle-zod for schema inference
- **Migration Support**: Configured with Drizzle Kit for database migrations

### Development and Build Process
- **Development**: Uses tsx for TypeScript execution in development with hot reload
- **Production Build**: Vite builds the frontend, esbuild bundles the backend
- **Database Management**: Drizzle Kit handles schema changes and migrations
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas

### Design Patterns
- **Separation of Concerns**: Clear separation between frontend UI, backend API, and data storage layers
- **Type Safety**: Comprehensive TypeScript usage with shared types between frontend and backend
- **Component Composition**: Reusable UI components built with Radix UI primitives
- **Storage Abstraction**: Interface-based storage layer allowing easy swapping of storage implementations
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migration and introspection toolkit
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component APIs
- **lucide-react**: Icon library with React components

### React Ecosystem
- **@tanstack/react-query**: Server state management and data fetching
- **react-hook-form**: Form handling and validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **wouter**: Lightweight routing library for React

### Development Tools
- **vite**: Build tool and development server
- **@vitejs/plugin-react**: Vite plugin for React support
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Validation and Utilities
- **zod**: TypeScript-first schema validation
- **date-fns**: Date utility library
- **nanoid**: URL-safe unique ID generator
- **clsx**: Utility for constructing className strings