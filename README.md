# LegalHelpBuddy - Auto-Generated Legal Documents & Guides

A React application built with MVC architecture for generating legal documents automatically.

## 🏗️ Architecture

This application follows **MVC (Model-View-Controller)** architecture strictly:

### 📁 Folder Structure

```
src/
 ├── models/          # Business logic and data storage
 │   ├── DocumentModel.js
 │   └── TemplateModel.js
 ├── controllers/     # Handle user actions, validate input
 │   └── DocumentController.js
 ├── views/          # React components (UI only)
 │   ├── Home.jsx
 │   ├── DocumentSelection.jsx
 │   ├── DocumentForm.jsx
 │   ├── GeneratedDocument.jsx
 │   └── LegalGuides.jsx
 ├── styles/         # CSS files
 ├── App.jsx         # Main app with routing
 └── index.jsx       # Entry point
```

### 🔄 MVC Flow

```
User Action → View → Controller → Model → Controller → View
```

**Example Flow:**
1. User fills form in **View** (DocumentForm.jsx)
2. **View** calls **Controller** method (handleDocumentGeneration)
3. **Controller** validates input and calls **Model** (generateDocument)
4. **Model** processes business logic (replacePlaceholders)
5. **Model** returns data to **Controller**
6. **Controller** returns data to **View**
7. **View** displays result to user

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build

```bash
npm run build
```

## 📋 Features

- **Document Types:**
  - Affidavit
  - Rental Agreement
  - Non-Disclosure Agreement (NDA)

- **Functionality:**
  - Dynamic placeholder replacement ({{name}}, {{date}}, etc.)
  - Form validation
  - Copy document to clipboard
  - Download document as .txt file
  - Legal guides and information

## 🎯 MVC Implementation

### Model Layer (`src/models/`)
- **TemplateModel.js**: Stores document templates
- **DocumentModel.js**: Contains business logic for document generation

**Why it's a Model:**
- Stores data (templates)
- Contains business logic (placeholder replacement)
- No UI dependencies
- Can be tested independently

### Controller Layer (`src/controllers/`)
- **DocumentController.js**: Handles user actions, validates input

**Why it's a Controller:**
- Receives user input from View
- Validates input before passing to Model
- Calls Model methods
- Returns processed data to View
- Acts as intermediary (MVC pattern)

### View Layer (`src/views/`)
- **Home.jsx**: Home page
- **DocumentSelection.jsx**: Document type selection
- **DocumentForm.jsx**: Input form
- **GeneratedDocument.jsx**: Display generated document
- **LegalGuides.jsx**: Legal information guides

**Why it's a View:**
- Only handles UI rendering
- Calls Controller methods on user actions
- Displays data received from Controller
- No business logic

## 🧪 Code Quality

- Well-commented code explaining MVC structure
- Clear separation of concerns
- Readable variable names
- MVC pattern clearly visible in code
- Suitable for college-level demo and viva

## 📝 Notes

- This is a demo application for educational purposes
- Documents generated are templates and should be reviewed by legal professionals
- Laws vary by jurisdiction - consult a lawyer for actual legal matters

## 🛠️ Technologies Used

- React 18
- React Router DOM 6
- Vite (Build Tool)
- CSS3 (No heavy frameworks)

## 📚 Learning Resources

This codebase demonstrates:
- MVC architecture in React
- Separation of concerns
- Component-based architecture
- Form handling and validation
- Dynamic content generation
