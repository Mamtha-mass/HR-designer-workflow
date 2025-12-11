# HR Workflow Designer 🎨

A modern, interactive frontend application designed for Human Resources professionals to visualize, build, and simulate operational workflows (such as Employee Onboarding). This project features a drag-and-drop interface, elegant UI components, and real-time state management.

## ✨ Key Features

- **Drag & Drop Canvas**: Built on top of React Flow, allowing intuitive node placement and connection.
- **Custom Node Library**:
  - ▶️ **Start Trigger**: Define entry points and metadata.
  - 👤 **Human Task**: Assign tasks with due dates and assignees.
  - ✅ **Approval Step**: Configure roles and auto-approval thresholds.
  - ⚡ **Automation**: Mock integrations (Email, Slack, HRMS).
  - 🏁 **End Point**: Summary generation and termination messages.
- **Interactive Configuration**: dynamic properties panel that updates based on the selected node type.
- **Workflow Simulation**: Visual simulation engine to validate flow logic and execution paths.
- **Elegant UI**: High-quality design using Tailwind CSS with gradients, glassmorphism effects, and smooth animations.
- **Global Settings**: Modal with interactive form elements, validation, and visual feedback.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Visualization**: React Flow (Graph/Node engine)
- **Styling**: Tailwind CSS + Custom CSS Animations
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **State Management**: React Hooks

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/hr-workflow-designer.git
    cd hr-workflow-designer
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Open your browser to `http://localhost:5173` (or the port shown in your terminal).

## 📖 Usage Guide

1.  **Adding Nodes**: Drag items from the **Node Library** (left sidebar) onto the canvas.
2.  **Connecting Nodes**: Click and drag from the right handle of a node to the left handle of another to create a relationship.
3.  **Editing Properties**: Click on any node on the canvas to open the **Configuration Panel** (right sidebar). fill in details like Assignees, API Actions, or Thresholds.
4.  **Settings**: Click the **Settings** button in the header to configure the workflow name and category.
5.  **Simulation**: Click **Simulate Run** to verify the logic of your workflow. A modal will appear showing the execution logs.

## 📂 Project Structure

/
├── components/
│   ├── nodes/           # Custom React Flow Node components
│   ├── PropertiesPanel  # Right sidebar for editing node data
│   ├── Sidebar          # Left sidebar draggable library
│   ├── SimulationModal  # Results display
│   └── WorkflowSettings # Global settings form
├── services/
│   └── mockApi.ts       # Simulates backend latency and logic
├── types.ts             # TypeScript interfaces and Enums
├── App.tsx              # Main application layout and logic
├── index.html           # Entry point (Tailwind config & styles)
└── index.tsx            # React root mount
```

## 🎨 UI/UX Highlights

- **Gradient Headers**: Distinct color coding for different node types (Blue for Start, Purple for Approvals, etc.).
- **Micro-interactions**: Hover effects, focus states on form inputs, and animated modals.
- **Feedback**: Loading states during simulation and success animations upon saving settings.
## Workflow Canvas Preview
![Workflow Canvas](Screenshot%202025-12-11%20104307.png)

## Node Properties Panel
![Node Properties](Screenshot%202025-12-11%20104320.png)

