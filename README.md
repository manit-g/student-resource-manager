# Student Resource Manager

A comprehensive full-stack web application built with Next.js 15 that helps students organize and manage their study materials including notes, assignments, and useful links.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure JWT-based authentication
- **Resource Management**: Full CRUD operations for study materials
- **Resource Types**: Support for notes, assignments, links, and files
- **Organization**: Categorize resources by subject with tags
- **Search & Filter**: Advanced search and filtering capabilities


### Technical Features
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Database**: MongoDB with Mongoose ODM
- **Security**: Data validation, sanitization, and secure authentication
- **Performance**: Optimized with Next.js 15 features (SSR, SSG, caching)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### AI Integration
- **OpenAI API** - AI-powered features
- **AI SDK** - Modern AI integration

### Deployment
- **Vercel** - Hosting platform
- **MongoDB Atlas** - Cloud database

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- OpenAI API key (optional, for AI features)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd student-resource-manager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-resource-manager?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# OpenAI (optional)
OPENAI_API_KEY=your-openai-api-key-here
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Getting Started
1. **Sign Up**: Create a new account with your email and password
2. **Sign In**: Access your personalized dashboard
3. **Add Resources**: Start by adding your first study resource

### Managing Resources
- **Add Resource**: Click "Add Resource" to create new study materials
- **Edit Resource**: Click the edit button on any resource card
- **Delete Resource**: Click the delete button to remove resources
- **Search & Filter**: Use the search bar and filters to find specific resources

### AI Features
- **Summarize Notes**: Paste your notes to get AI-generated summaries
- **Study Tips**: Get personalized study recommendations for any subject

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── resources/     # Resource CRUD operations
│   │   └── ai/            # AI-powered features
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions
├── models/               # Database models
└── types/                # TypeScript type definitions
```



## 👨‍💻 Developer

**Manit Gera**
- 🌐 Portfolio: [https://portfoliobymg.netlify.app/](https://portfoliobymg.netlify.app/)
- 💻 GitHub: [https://github.com/manit-g](https://github.com/manit-g)
- 💼 LinkedIn: [https://linkedin.com/in/manitgeraa](https://linkedin.com/in/manitgeraa)
- 📧 Email: manitgera@gmail.com

---

**Live Demo:** [View Application](https://studentresourcemanagerbymg.vercel.app)

> Built by Manit Gera - VIT Student



Manit Gera