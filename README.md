Grocerease — Smart Grocery Management Platform

Grocerease is a modern, full-stack web application designed to simplify grocery shopping and streamline store management.
The platform delivers a customer-friendly shopping experience along with a professional inventory and order management dashboard for staff users.
Built with scalable architecture and a visually clean green-themed UI, Grocerease demonstrates a complete role-based e-commerce workflow using web technologies.

Core Highlights

Intuitive Shopping
Smooth product browsing, cart management, and checkout experience for customers.

Role-Based Control
Separate dashboards for customers and staff with access-controlled features.

Inventory Management
Staff can create, update, and manage grocery products with realistic data.

Order Workflow
Customers place orders; staff monitors and updates order status using a structured system.

Modern UI Design
Green-themed interface symbolizing freshness, sustainability, and market identity.

Data-Driven Structure
Pre-loaded placeholder products and user data for a complete demonstration without empty sections.

System Usage Guide
Customer Features

Browse grocery categories and individual products

View product descriptions, ratings, and images

Add products to cart and modify quantities

Proceed with checkout and place orders

Access order history through the dashboard

Staff Features

Manage and update product listings

Modify item details such as price, stock, and category

Monitor customer orders with status controls

View order statistics and inventory activity

Application Modules
Product Management

Product creation and updates using staff privileges

Image placeholders for real-world catalog simulation

Categorization for vegetables, fruits, bakery, meat, snacks, beverages, and more

Stock and pricing controls applied through secured routes

Order Handling Module

Supports complete order lifecycle (Pending, Packed, Delivered)

Dynamic cart calculation at checkout

Structured order storage tied to user accounts

Staff can update order progress in real-time

Authentication and Authorization

Role separation enabled through JWT

Customer and staff dashboards accessible only to respective users

Secure login and signup using Django authentication base

Platform Design Principles

User-Focused Layouts
Readable typography, ample spacing, full-width containers, and responsive layouts across devices.

Green-Unified Aesthetic
Soft neutral tones with darker accents to emphasize freshness and product visibility.

Scrollable Product Sections
Grid layouts for fast and convenient browsing across categories.

Optimized Navigation Flow
Buttons, links, and routes strictly lead to functional, data-filled pages for a complete experience.

Technical Specifications
Architecture Workflow

HTTP requests from frontend routed to Django backend

Backend performs authentication, database operations, and product/order logic

JSON responses delivered through REST API

React views dynamically render data using state hooks and asynchronous calls

Technologies Used

Frontend: React + Vite, Tailwind CSS
Backend: Django REST Framework, JWT Authentication
Database: SQLite with sample grocery dataset

Sample Dataset Overview

Multiple product categories with prices, ratings, nutrition attributes, and placeholder images

User accounts divided into customer and staff roles

Order samples with automated timestamps and itemized pricing
