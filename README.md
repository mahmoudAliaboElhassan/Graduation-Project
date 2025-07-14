# eduPlay Frontend - Educational Gaming Platform

## 🎥 Demo Video

[![Watch the demo video](https://img.shields.io/badge/🎬-Watch_Video-blue)](https://drive.google.com/file/d/1pVYPq8VXbxTDoTSbtr2dF1f-tlwbCcao/view)

⬆️ Click the image to watch the demo video hosted on Google Drive.

## 🚀 Overview

A modern, responsive web application built with React and TypeScript that gamifies the learning experience. This educational platform allows students to solve questions, earn points, compete in rankings, while providing an engaging and interactive interface for both educational and entertainment content.

## ✨ Key Features

### 🎯 Core Functionality

- **Interactive Learning Games**: Subject-specific questions with real-time feedback
- **Entertainment Quizzes**: General knowledge games across multiple categories
- **Dynamic Ranking System**: Live leaderboards with point-based scoring
- **Multi-Role Dashboard**: Tailored interfaces for different user types
- **Real-time Updates**: Instant feedback and live ranking updates

### 🎮 Game Types

#### **Five Hints** 🔍

Five Hints is a thrilling guessing game where you test your knowledge by uncovering the correct answer with minimal hints! You start with no clues, and every 10 seconds, a new hint is revealed. The faster you guess, the higher your rank! If you crack the mystery on the first try, you'll achieve the top rank. But beware—every additional hint lowers your score. Can you solve the puzzle before all hints are revealed? Challenge yourself and climb the leaderboard!

#### **Offside** ⚖️

Offside is a fast-paced logic game that tests your ability to distinguish between truth and deception! You start with 50 points and are presented with six statements—some are true, and some are false. Your goal is to identify the correct ones while avoiding the false ones. But be careful! Every wrong choice deducts points from your score. Can you keep your score high and make the right calls? Challenge yourself and prove your sharp judgment!

#### **The Question Journey** 🗺️

In each round, you'll receive 6 questions from easiest to hardest — answer them correctly to win! Progress through increasingly challenging questions as you test your knowledge across different difficulty levels.

## 👥 User Roles & Permissions

### 👨‍💼 Admin

**Complete Platform Management**

- **Academic Structure**: Add and manage grades, subjects, and chapters
- **Subject Assignment**: Link subjects to specific grades
- **Content Moderation**: View, approve, or reject educational and entertainment questions
- **System Oversight**: Monitor platform activity and user performance
- **Data Management**: Full access to all platform data and analytics

### 👨‍🎓 Student

**Learning-Focused Experience**

- **Account Setup**: Create account by selecting their current grade level
- **Educational Gaming**: Play educational questions based on their grade and subjects
- **Game Selection**: Choose from various educational game types (Five Hints, Offside, Question Journey)
- **Points & Ranking**: Earn points and compete with classmates on leaderboards
- **Progress Tracking**: Monitor learning progress across different subjects
- **Entertainment Access**: Play and create entertainment questions for fun

### 👨‍🏫 Teacher

**Content Creation & Education**

- **Account Setup**: Create account by specifying the subject(s) they teach
- **Educational Content**: Create educational questions for their subject area
- **Game Development**: Design questions for all game types (Five Hints, Offside, Question Journey)
- **Student Monitoring**: Track student progress in their subjects
- **Entertainment Participation**: Play and create entertainment questions
- **Quality Assurance**: Ensure educational content meets curriculum standards

### 🎮 Entertainment Features (All Users)

**Universal Access for Logged-In Users**

- **Question Creation**: Any logged-in user (student, teacher, or admin) can create entertainment questions
- **Game Participation**: Play entertainment games across various categories
- **Social Competition**: Compete with other users in entertainment leaderboards
- **Category Variety**: Sports, movies, science, general knowledge, and more

## 🎯 Core Features Implementation

### Authentication & Authorization

- **Role-based Access Control** - Different interfaces for Admin, Teacher, Student roles
- **Grade-based Registration** - Students select their grade during account creation
- **Subject-based Registration** - Teachers specify their teaching subjects
- **Secure Session Management** - Token-based authentication
- **Protected Routes** - Route guards based on user permissions and roles

### Academic Management (Admin Only)

- **Grade Management** - Create and organize grade levels
- **Subject Management** - Add subjects and assign them to grades
- **Chapter Organization** - Structure content by chapters within subjects
- **Content Approval** - Review and approve/reject submitted questions

### Form Management

- **Dynamic Form Generation** - Configurable forms using Formik
- **Real-time Validation** - Instant feedback using Yup schemas
- **Role-specific Forms** - Different form fields based on user type
- **Error Handling** - User-friendly error messages and states

### Game Mechanics

- **Educational Questions** - Subject and grade-specific content
- **Entertainment Questions** - Cross-category fun content
- **Scoring System** - Different point calculations for each game type
- **Progress Tracking** - Visual progress indicators and statistics
- **Leaderboards** - Top 10 user rankings with real-time updates

### Internationalization

- **Multi-language Support** - English and Arabic language support
- **RTL/LTR Layout** - Automatic layout direction switching
- **Dynamic Content** - Localized content based on user preference

### 🎨 User Experience

- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Intuitive Navigation**: Clean, modern interface with smooth transitions
- **Interactive Animations**: Engaging micro-interactions and visual effects
- **Accessibility First**: WCAG compliant design principles

## 🛠️ Technology Stack

### Core Technologies

- **React 18** - Modern component-based UI library
- **TypeScript** - Type-safe JavaScript development
- **Material-UI (MUI)** - Comprehensive React component library
- **Framer Motion** - Production-ready motion library for React

### Form & Validation

- **Formik** - Build forms without tears
- **Yup** - JavaScript schema builder for value parsing and validation

### HTTP & API

- **Axios** - Promise-based HTTP client for API communication

### User Experience

- **i18next** - Internationalization framework for multi-language support
- **Theme Switching** - Dynamic light/dark mode toggle
- **Custom Hooks** - Reusable stateful logic components

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   ├── forms/           # Form-specific components
│   ├── games/           # Game-specific components
│   └── layout/          # Layout components
├── pages/               # Application pages/routes
│   ├── admin/           # Admin-specific pages
│   ├── student/         # Student dashboard pages
│   ├── teacher/         # Teacher dashboard pages
│   └── games/           # Game pages
├── hooks/               # Custom React hooks
├── services/            # API service functions
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # Application constants
├── themes/              # MUI theme configurations
├── locales/             # Translation files
└── assets/              # Static assets
```

## 🎨 Design System

### Theme Features

- **Material Design 3** - Latest Material Design principles
- **Dynamic Theming** - Automatic light/dark mode detection
- **Custom Color Palette** - Brand-consistent color scheme
- **Typography Scale** - Hierarchical text styling
- **Responsive Breakpoints** - Mobile-first responsive design

### Animation Philosophy

- **Meaningful Motion** - Animations that enhance UX, not distract
- **Performance Optimized** - 60fps smooth animations
- **Accessibility Aware** - Respects user motion preferences
- **Micro-interactions** - Subtle feedback for user actions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/mahmoudAliaboElhassan/Graduation-Project.git
cd Graduation-Project
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start development server**

```bash
npm start
# or
yarn start
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint for code quality
- `npm run type-check` - Runs TypeScript compiler

## 📱 Responsive Design

### Breakpoint Strategy

- **Mobile First**: Base styles target mobile devices
- **Progressive Enhancement**: Enhanced features for larger screens
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Optimized for touch interactions

### Performance Optimization

- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - WebP format with fallbacks
- **Bundle Analysis** - Webpack bundle analyzer integration
- **Caching Strategy** - Service worker for offline capability

### IDE Configuration

- **VSCode Extensions** - Recommended extensions for React/TypeScript
- **Debug Configuration** - Browser debugging setup
- **Snippets** - Custom code snippets for faster development

## 📊 Performance Metrics

### Core Web Vitals

- **First Contentful Paint (FCP)** - < 1.5s
- **Largest Contentful Paint (LCP)** - < 2.5s
- **Cumulative Layout Shift (CLS)** - < 0.1
- **First Input Delay (FID)** - < 100ms

### Bundle Size Targets

- **Initial Bundle** - < 250KB gzipped
- **Route Chunks** - < 100KB gzipped each
- **Vendor Chunks** - Cached separately for better performance

## 🏆 Game Scoring System

### Five Hints Scoring

- **1st Hint (Perfect)**: Maximum points
- **2nd-5th Hints**: Decreasing point values
- **Time Bonus**: Additional points for quick answers
- **Rank Calculation**: Based on hints used and time taken

### Offside Scoring

- **Starting Points**: 50 points per round
- **Correct Answer**: Maintain points
- **Wrong Answer**: Point deduction
- **Final Score**: Remaining points after all questions

### Question Journey Scoring

- **Progressive Difficulty**: Increasing points for harder questions
- **Completion Bonus**: Extra points for completing all 6 questions
- **Accuracy Bonus**: Perfect run rewards

## 🤝 Contributing

### Code Standards

- **TypeScript** - Strict type checking enabled
- **Component Design** - Reusable, composable components
- **Performance** - Optimize for Core Web Vitals
- **Accessibility** - WCAG 2.1 AA compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- **Real-time Collaboration** - WebSocket integration for live features
- **Advanced Analytics** - Detailed user behavior tracking
- **Mobile App** - React Native mobile application
- **AI Integration** - Intelligent question recommendations
- **Social Features** - User interaction and collaboration tools
- **Multiplayer Games** - Real-time competitive gaming

---

**Live Demo**: [https://graduation-project-sage.vercel.app/](https://graduation-project-sage.vercel.app/)

_Built with ❤️ using React, TypeScript, and Material-UI_
