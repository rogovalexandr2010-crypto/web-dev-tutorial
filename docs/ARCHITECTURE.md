# Architecture Documentation - WebDev Academy

## System Overview

WebDev Academy is a full-stack educational platform built with Node.js and vanilla JavaScript.

```
┌─────────────────────────────────────────────────────────┐
│                   Browser / Client                      │
├─────────────────────────────────────────────────────────┤
│  HTML/CSS/JS │ LocalStorage │ Editor │ Progress Tracker │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP/REST
                  │
┌─────────────────┴───────────────────────────────────────┐
│              Node.js / Express Server                   │
├─────────────────────────────────────────────────────────┤
│  Routes: /api/lessons  /api/tasks  /api/progress        │
│  Middleware: CORS, BodyParser                           │
│  Static Files: public/                                  │
└─────────────────────────────────────────────────────────┘
                  │
┌─────────────────┴───────────────────────────────────────┐
│                  Data Layer                             │
├─────────────────────────────────────────────────────────┤
│  JSON Files: lessons.json, tasks.json, achievements.json│
└─────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Module Structure

```javascript
// app.js - Main application
├── init()           - Initialize app
├── setupTheme()     - Theme management
├── setupEventListeners()
└── switchSection()  - Navigation

// lessons.js - Lesson management
├── loadLessons()    - Fetch lessons from API
├── filterByModule() - Filter lessons by HTML/CSS/JS
├── openLesson()     - Display lesson content
├── loadTasks()      - Load tasks for lesson
└── openTask()       - Open task modal

// editor.js - Code editor
├── init()           - Setup editors
├── switchLanguage() - Switch HTML/CSS/JS tabs
├── updatePreview()  - Live preview
└── saveCode()       - Auto-save code

// progress.js - Progress tracking
├── loadProgress()   - Load user progress
├── markLessonComplete()
├── markTaskComplete()
├── updateStreak()   - Track learning streak
└── updateAchievements()

// utils.js - Utility functions
├── localStorage operations
├── Code formatting
├── Notifications
└── Debouncing
```

## Backend Architecture

### Server Structure

```
server.js
├── Express app setup
├── Middleware configuration
│   ├── CORS
│   ├── Body Parser
│   └── Static files
├── Route mounting
│   ├── /api/lessons
│   ├── /api/tasks
│   └── /api/progress
└── Error handlers

src/routes/
├── lessons.js
│   ├── GET /api/lessons
│   ├── GET /api/lessons/:id
│   └── GET /api/lessons/module/:moduleName
├── tasks.js
│   ├── GET /api/tasks
│   ├── GET /api/tasks/:id
│   ├── GET /api/tasks/lesson/:lessonId
│   └── POST /api/tasks/validate/:id
└── progress.js
    ├── GET /api/progress/user/:userId
    ├── POST /api/progress/save
    └── GET /api/progress/achievements/:userId
```

## Data Models

### Lesson Object

```json
{
  "id": "html-1",
  "module": "html",
  "level": 1,
  "title": "What is HTML?",
  "description": "Learn HTML basics",
  "duration": "5 minutes",
  "content": {
    "theory": "HTML explanation...",
    "codeExample": "<html>...</html>",
    "explanation": "How it works..."
  },
  "keyPoints": ["Point 1", "Point 2"]
}
```

### Task Object

```json
{
  "id": "task-html-1-1",
  "lessonId": "html-1",
  "title": "Create first page",
  "difficulty": "easy",
  "description": "...",
  "starterCode": "<!DOCTYPE html>...",
  "hints": ["Hint 1", "Hint 2"],
  "solution": "<!DOCTYPE html>...",
  "testCases": [
    { "check": "contains", "value": "<h1>" }
  ]
}
```

### User Progress Object

```json
{
  "completedLessons": ["html-1", "html-2"],
  "completedTasks": ["task-1", "task-2"],
  "achievements": [
    { "id": "first-step", "unlocked": true }
  ],
  "streak": 5,
  "totalTime": 3600
}
```

## State Management

### LocalStorage Keys

```javascript
// User data
localStorage.theme              // light/dark
localStorage.user              // { name, id }
localStorage.progress          // Progress data
localStorage.code              // { html, css, javascript }
localStorage.lastStudyDate     // Date string
```

### Global Objects

```javascript
// Main namespace
App                 // Application state
Lessons             // Lessons manager
Editor              // Code editor
Progress            // Progress tracker
Utils               // Utility functions
```

## API Endpoints

### RESTful Routes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/lessons` | Get all lessons |
| GET | `/api/lessons/:id` | Get lesson by ID |
| GET | `/api/lessons/module/:name` | Get lessons by module |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| GET | `/api/tasks/lesson/:id` | Get tasks for lesson |
| POST | `/api/tasks/validate/:id` | Validate solution |
| GET | `/api/progress/user/:id` | Get user progress |
| POST | `/api/progress/save` | Save progress |
| GET | `/api/progress/achievements/:id` | Get achievements |

## Styling Architecture

### CSS Files

```
public/styles/
├── main.css          - Base styles, layout, components
├── editor.css        - Code editor specific styles
├── theme.css         - Light/dark theme definitions
└── responsive.css    - Media queries, mobile styles
```

### CSS Variables (main.css)

```css
:root {
  --primary: #6366f1;     /* Indigo */
  --secondary: #8b5cf6;   /* Purple */
  --accent: #ec4899;      /* Pink */
  --success: #10b981;     /* Green */
  --dark: #1f2937;
  --light: #f3f4f6;
  --gray: #6b7280;
  --border: #e5e7eb;
}
```

### Theme Variables (theme.css)

```css
:root[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #1f2937;
}

:root[data-theme="dark"] {
  --bg-primary: #1f2937;
  --text-primary: #f3f4f6;
}
```

## Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── Theme Toggle
│   └── User Profile
├── Main Content
│   ├── Home Section
│   │   ├── Hero
│   │   └── Features Grid
│   ├── Lessons Section
│   │   ├── Module Tabs
│   │   └── Lessons Grid
│   ├── Lesson Detail
│   │   ├── Theory Section
│   │   └── Practice Section
│   ├── Editor Section
│   │   ├── Editor Tabs
│   │   ├── Code Editors (3x)
│   │   └── Preview Frame
│   └── Progress Section
│       ├── Stats Grid
│       ├── Module Progress
│       └── Achievements
├── Modals
│   └── Task Modal
└── Footer
```

## Data Flow Diagrams

### Lesson Loading

```
User clicks "Lessons" 
    ↓
App.switchSection('lessons')
    ↓
Lessons.loadLessons() → API call
    ↓
/api/lessons response
    ↓
Lessons.renderLessons()
    ↓
Display in Grid
```

### Code Editing

```
User types in editor
    ↓
Editor.updatePreview() (debounced)
    ↓
Get HTML/CSS/JS from textareas
    ↓
Generate iframe src
    ↓
Update iframe preview
    ↓
Editor.saveCode() (auto-save)
    ↓
Store in localStorage
```

### Progress Tracking

```
User completes lesson
    ↓
Progress.markLessonComplete()
    ↓
Add to completedLessons array
    ↓
Check achievements
    ↓
Update streak
    ↓
Progress.saveProgress()
    ↓
Store in localStorage
```

## Performance Considerations

1. **Debouncing** - Editor updates debounced at 500ms
2. **Lazy Loading** - Images use lazy loading
3. **LocalStorage** - Reduces server calls
4. **Code Splitting** - Each module is separate file
5. **CSS** - Minimal, no heavy frameworks

## Security Measures

1. **Sandboxing** - User code in isolated iframe
2. **No Backend Processing** - Code doesn't run on server
3. **CORS** - Prevents unauthorized API access
4. **Input Sanitization** - HTML escaped in examples
5. **No File Upload** - Code only via text input

## Extensibility Points

### Adding New Modules

1. Add lessons to `src/data/lessons.json`
2. Add tasks to `src/data/tasks.json`
3. Add achievements to `src/data/achievements.json`
4. No code changes needed!

### Custom Themes

Add theme CSS to `public/styles/theme.css`:

```css
:root[data-theme="custom"] {
  --bg-primary: #..;
  --text-primary: #..;
}
```

### Extended Features

1. **Authentication** - Add to middleware
2. **Database** - Replace JSON with MongoDB/SQL
3. **Real-time** - Add WebSockets for live collaboration
4. **Analytics** - Add tracking service

---

Last Updated: June 2026
Version: 1.0.0
