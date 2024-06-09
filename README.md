# Hostel Elite

## Description

Hostel Elite is a Hostel Management system designed for university administrators to efficiently manage student meals and food reviews.

![Banner Image](https://i.ibb.co/cry83Dr/banner.png)

## Admin Credentials

- **Username:** admin@gmail.com
- **Password:** Admin1#

## Live Site URL

[Hostel Elite Live Site](https://hostelelite-316.web.app)

## Features of Hostel Elite

1. **User Authentication:**

   - Secure login and registration for students and administrators.
   - Token-based authentication for secure API access.

2. **Meal Management:**

   - Add, update, and delete meals in the system.
   - Categorize meals for easier management and retrieval.

3. **Meal Reviews:**

   - Students can review and rate meals.
   - Display of review counts and average ratings for meals.

4. **Search Functionality:**

   - Powerful search capabilities using MongoDB indexing.
   - Search meals by title, description, category, and more.

5. **Pagination:**

   - Efficiently handle large datasets with pagination.
   - Pagination controls on all tables for easy navigation.

6. **Sorting:**

   - Sort meals by likes and reviews to see popular options.
   - Flexible sorting options for better meal management.

7. **Filter by Price:**

   - Filter meals within a specified price range.
   - Dynamic price filters with minimum and maximum values.

8. **Category Filtering:**

   - Filter meals by specific categories.
   - Option to view all categories or select specific ones.

9. **Responsive Design:**

   - Fully responsive interface for use on mobile, tablet, and desktop devices.
   - Modern design with a user-friendly interface.

10. **Admin Dashboard:**

    - Comprehensive admin dashboard for managing all aspects of the hostel meals.
    - View and manage users, meals, and reviews from a centralized location.

11. **Payment System:**
    - Integrated payment system for meal plans and other hostel services.
    - Secure and easy payment processing for students.

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/programming-hero-web-course1/b9a12-client-side-shaishabcoding.git
   ```

2. Navigate to the project directory:
   ```bash
   cd b9a12-client-side-shaishabcoding
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file and add the necessary environment variables:
   ```env
   VITE_APIKEY=
   VITE_AUTHDOMAIN=
   VITE_PROJECTID=
   VITE_STORAGEBUCKET=
   VITE_MESSAGINGSENDERID=
   VITE_APPID=
   VITE_IMGBB_KEY=
   VITE_BASE_URL=http://localhost:5000
   # VITE_BASE_URL=https://hostel-elite.vercel.app
   VITE_STRIPE_PK_KEY=
   ```

### Running the Application

1. Start the server:

```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`.

## Dependencies

### Main Dependencies

- `@stripe/react-stripe-js`: ^2.7.1
- `@stripe/stripe-js`: ^3.5.0
- `@tanstack/react-query`: ^5.40.0
- `axios`: ^1.7.2
- `firebase`: ^10.12.2
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-hook-form`: ^7.51.5
- `react-icons`: ^5.2.1
- `react-infinite-scroll-component`: ^6.1.0
- `react-modal`: ^3.16.1
- `react-rating`: ^2.0.5
- `react-router-dom`: ^6.23.1
- `react-tabs`: ^6.0.2
- `react-toastify`: ^10.0.5
- `sweetalert2`: ^11.11.0
- `swiper`: ^11.1.4

### Dev Dependencies

- `daisyui`: ^4.11.1
- `tailwindcss`: ^3.4.3
- `vite`: ^5.2.0

## Contributing

We welcome contributions to Hostel Elite! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

```
This updated `README.md` includes the new feature for a payment system, ensuring a comprehensive overview of what your project offers.
```
