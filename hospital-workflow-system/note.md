## Project Title -> TASK 1- Inter-Department Workflow Automation

# Live Deployment Link -

# Clear Documentation of TASK 1- Inter-Department Workflow Automation (hospital-workflow-system)
 

# INDEX 
 
 1. Abstract
2. Introduction
3. Problem Statement
4. Objectives
5. System Overview
6. Architecture Diagram
7. Features
8. Technology Stack
9. Database Design
10. API Endpoints
11. How To Run Locally (Installation Guide )
12. Working Flow
13. Implementation Details
14. Screenshots
14. Challenges & Solutions
15. Future Scope
16. Conclusion
17. References

1. Abstract

This project presents a backend-driven hospital workflow management system that routes patient requests across diagnostic and support departments using predefined workflows. The system tracks request movement, status transitions, department queues, and historical logs in real time. It ensures transparency, reduces manual coordination, and improves operational efficiency in non-clinical hospital environments such as diagnostics, billing, and reporting.

2. Introduction

Hospitals often rely on manual coordination between departments like registration, billing, radiology, pathology, and report desks. This leads to delays, poor tracking, and lack of visibility into request progress.

This system introduces a structured backend workflow engine that automates request routing and provides real-time tracking across departments.

3. Problem Statement

#TASK -1 Inter-Department Workflow Automation

Create a backend system that routes patient queries or requests across hospital departments using defined workflows. The solution should track movement, status, and progress of requests.


# Hospitals face the following challenges:

• No centralized tracking of patient requests
• Manual coordination between departments
• Delays due to unclear status updates
• No audit history of request movement
• Difficulty monitoring department workload

There is a need for a structured workflow-based backend system that ensures transparent and trackable request routing.

4. Objectives

# Design a defined workflow for each request type (MRI, Blood Test, etc.)

• Route requests automatically between departments
• Track real-time status and department queue
• Maintain request movement history
• Provide role-based access to departments
• Improve operational efficiency

5. System Overview

# The system works as a centralized backend platform where:

1.A patient request is created at registration. 
2.The system assigns it to the first department in the workflow.
3.Each department updates status after completing its task.
4.The system automatically routes the request to the next department.
5.All transitions are logged in request history.
6.The request is marked completed once final step finishes.

6. Architecture Diagram    /// remain

# Layers:


• API Layer (Express Controllers)

• Service Layer (Workflow Logic)

• Database Layer (MongoDB)

7. Features

• Workflow-based request routing
• Real-time status tracking
• Department-wise request queue
• Request movement history log
• Role-based access control
• Manual override option (admin)


8. Technology Stack

• Backend: Node.js
• Framework: Express.js
• Database: MongoDB
• Authentication: JWT
• API Testing: Postman
• Version Control: Git/Github

9. Database Design   // remaining

# Patients

• patientId
• name
• contact
• age

# Departments

• departmentId
• name

# Workflows                       

• type (MRI, Blood Test)
steps [
{ order, departmentId }
]

# Requests

•requestId
• patientId
• type
• currentStep
• currentDepartment
• status
• createdAt

# Request History

• requestId
• departmentId
• status
• timestamp

10. API Endpoints    // remaining

• POST /api/request
• PATCH /api/request/:id/status
• GET /api/request/:id
• GET /api/department/:name/queue

11. How To Run Locally   // remain


1. Clone repository
   git clone https://github.com/

2. Go inside project
   cd hospital-workflow-system

3. Install dependencies
   npm install

4. Setup environment variables
   Copy .env.example and create a new file named .env

5. Add your values inside .env

6. Start server
   npm run dev

7.  For login as Admin (It is created on starting server automatically)

   Email: admin@hospital.com
   Password: admin123




12. Working Flow     // remain

# Example: For MRI Request

Registration
↓
Radiology (In Progress → Done)
↓
Billing (Payment Pending → Paid)
↓
Radiology (In Progress → Done)
↓
Report Desk (Generated)
↓
Completed

13. Implementation Details   // remain 

# Backend modules:

• Auth Module (Login/Register)
• Patient Module
• Workflow Module
• Request Module
• Department Module

# Core logic:

1.Create request
2.Fetch workflow
3.Assign first step
4.On status update → move to next step
5.Log history

14. Screenshots     // remaining 

Show Postman request  -- img 

Show response JSON

Show database data

Show workflow transition

15. Challenges & Solutions

| Challenge                  | Solution                            |
| -------------------------- | ----------------------------------- |
 Handling state transitions  | Implement controlled status mapping |

| Tracking request movement  | Separate request history collection |

| Avoiding duplicate routing | Use workflow step index tracking    |

| Managing department queues | Filter by currentDepartment         |

16. Future Scope

• Integration with hospital ERP systems
• Real-time notifications
• SMS updates to patients
• AI-based load balancing between departments
• Analytics dashboard
• Multi-hospital deployment

17. Conclusion

The workflow-based routing system improves transparency, efficiency, and traceability in hospital diagnostic and support operations. By automating department transitions and tracking request movement, the system reduces manual coordination errors and enhances operational control.

18. References    // remaining 

REST API Design Principles -- link
MongoDB Official Documentation --
Express.js Documentation --
JWT Authentication Guide --

