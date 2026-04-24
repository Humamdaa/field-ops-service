# 🚀 Field Ops Service API

A scalable backend API for managing field service operations, built with **Node.js**, **Express**, and **MongoDB**.

This system handles the full lifecycle of service requests, technician management, assignment workflows, and advanced querying.

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Zod (validation)
- Swagger (API docs)
- Docker

---

## ✨ Features

### 👷 Technician Management
- Create, update, delete technicians
- Activate / deactivate technicians
- Update technician location
- Validate technician existence

### 📋 Service Request Management
- Create, update, delete service requests
- Auto-generated reference numbers
- Prevent invalid updates on terminal states

### 🔄 Assignment Workflow
- Assign service request to technician
- Unassign technician
- Prevent:
  - Assigning inactive technicians
  - Assigning technician with active job
  - Updating completed/cancelled requests

### 🔁 Status Management
- Supported statuses:
  - `pending`
  - `assigned`
  - `in_progress`
  - `completed`
  - `cancelled`

### 🔍 Advanced Querying
- Filtering:
  - status
  - priority
  - area
  - technicianId
  - assignment state
  - date range
- Search:
  - reference number
  - customer name
  - customer phone
- Sorting:
  - createdAt
  - updatedAt
  - priority
  - status

### 📊 Pagination
- Page / limit
- Total count
- Metadata response

---

## 📑 API Documentation

Swagger UI available at:
http://localhost:3000/docs


---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/field-ops
