
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Home.css";

// const API_BASE_URL = "https://mockapi-mauve.vercel.app/api/v1";

// const Home = () => {
//   const [courses, setCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const [homeResponse, categoriesResponse] = await Promise.all([
//           fetch(`${API_BASE_URL}/lms/home`),
//           fetch(`${API_BASE_URL}/lms/categories`),
//         ]);

//         if (!homeResponse.ok || !categoriesResponse.ok) {
//           throw new Error("Unable to load home page data.");
//         }

//         const homeData = await homeResponse.json();
//         const categoriesData = await categoriesResponse.json();

//         const courseList =
//           homeData?.courses ||
//           homeData?.data?.courses ||
//           homeData?.featuredCourses ||
//           homeData?.data?.featuredCourses ||
//           [];

//         const categoryList = Array.isArray(categoriesData)
//           ? categoriesData
//           : categoriesData?.categories ||
//           categoriesData?.data?.categories ||
//           categoriesData?.data ||
//           [];

//         setCourses(Array.isArray(courseList) ? courseList : []);
//         setCategories(Array.isArray(categoryList) ? categoryList : []);
//       } catch (err) {
//         console.error("Home page error:", err);
//         setError(
//           "Unable to load courses. Please check the API connection."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHomeData();
//   }, []);

//   const getCourseId = (course) =>
//     course._id || course.id || course.courseId;

//   const getCourseTitle = (course) =>
//     course.title || course.name || "Untitled Course";

//   const getCourseImage = (course) =>
//     course.thumbnail ||
//     course.image ||
//     course.thumbnailUrl ||
//     course.imageUrl ||
//     "";

//   const getCoursePrice = (course) =>
//     course.price ?? course.pricing?.price ?? 0;

//   const getCourseLevel = (course) =>
//     course.level || course.difficulty || "All Levels";

//   const getCategoryName = (category) =>
//     typeof category === "string"
//       ? category
//       : category.name || category.title || category.categoryName;

//   return (
//     <main className="home-page">
//       {/* Hero Section */}
//       <section className="home-hero">
//         <div className="hero-content">
//           <span className="hero-badge">YOUR NEXT CHAPTER STARTS HERE</span>

//           <h1>
//             Unlock Your Potential Through Learning<span>new today</span>
//           </h1>

//           <p>
//             Discover in-demand skills, learn from expert-led courses, and turn your ambitions into achievements.          </p>

//           <Link to="/courses" className="home-primary-button">
//             Explore Courses
//             <span>→</span>
//           </Link>
//         </div>

//         <div className="hero-decoration">
//           <div className="hero-icon">✦</div>
//           <div className="hero-stat">
//             <span>Keep learning</span>
//             <strong>Grow your skills</strong>
//           </div>
//         </div>
//       </section>

//       {/* LMS Marketplace */}
//       {/* i have to add lms and courses here */}




//       <section className="home-marketplace">
//         <div>
//           <span className="section-label">DISCOVER MORE</span>
//           <h2>LMS Marketplace</h2>
//           <p>
//             Browse published courses, wishlist favourites, watch lectures
//             with saved progress and earn certificates. Instructors can publish
//             courses; admins manage the marketplace.
//           </p>
//         </div>

//         <Link to="/lms" className="home-secondary-button">
//           Open LMS Marketplace →
//         </Link>
//       </section>

//       {/* Categories */}
//       <section className="home-section">
//         <div className="home-section-heading">
//           <div>
//             <span className="section-label">FIND YOUR INTEREST</span>
//             <h2>Categories</h2>
//           </div>

//           <Link to="/courses" className="home-text-link">
//             View all courses →
//           </Link>
//         </div>

//         <div className="home-categories">
//           {categories.length > 0 ? (
//             categories.map((category, index) => {
//               const name = getCategoryName(category);

//               if (!name) return null;

//               return (
//                 <Link
//                   to={`/courses?search=${encodeURIComponent(name)}`}
//                   className="home-category"
//                   key={category._id || category.id || name || index}
//                 >
//                   <span className="category-symbol">
//                     {name.charAt(0).toUpperCase()}
//                   </span>
//                   <span>{name}</span>
//                   <span className="category-arrow">↗</span>
//                 </Link>
//               );
//             })
//           ) : (
//             <>
//               <Link to="/courses?search=web" className="home-category">
//                 <span className="category-symbol">W</span>
//                 <span>Web Development</span>
//                 <span className="category-arrow">↗</span>
//               </Link>

//               <Link to="/courses?search=python" className="home-category">
//                 <span className="category-symbol">P</span>
//                 <span>Python</span>
//                 <span className="category-arrow">↗</span>
//               </Link>
//             </>
//           )}
//         </div>
//       </section>

//       {/* Featured Courses */}
//       <section className="home-section">
//         <div className="home-section-heading">
//           <div>
//             <span className="section-label">HANDPICKED FOR YOU</span>
//             <h2>Featured Courses</h2>
//             <p className="section-description">
//               Explore courses and take the next step in your learning journey.
//             </p>
//           </div>

//           <Link to="/courses" className="home-text-link">
//             Browse all →
//           </Link>
//         </div>

//         {loading ? (
//           <p className="home-status">Loading courses...</p>
//         ) : error ? (
//           <p className="home-status home-error">{error}</p>
//         ) : courses.length === 0 ? (
//           <p className="home-status">
//             No featured courses available right now.
//           </p>
//         ) : (
//           <div className="home-course-grid">
//             {courses.slice(0, 6).map((course, index) => {
//               const courseId = getCourseId(course);
//               const image = getCourseImage(course);

//               return (
//                 <article
//                   className="home-course-card"
//                   key={courseId || index}
//                 >
//                   <Link
//                     to={
//                       courseId
//                         ? `/courses/${courseId}`
//                         : "/courses"
//                     }
//                     className="course-image-link"
//                   >
//                     {image ? (
//                       <img
//                         src={image}
//                         alt={getCourseTitle(course)}
//                         className="home-course-image"
//                       />
//                     ) : (
//                       <div className="home-course-placeholder">
//                         {getCourseTitle(course).charAt(0)}
//                       </div>
//                     )}
//                   </Link>

//                   <div className="home-course-content">
//                     <span className="course-level">
//                       {getCourseLevel(course)}
//                     </span>

//                     <h3>{getCourseTitle(course)}</h3>

//                     <div className="course-card-footer">
//                       <strong>
//                         ₹{Number(getCoursePrice(course)).toLocaleString("en-IN")}
//                       </strong>

//                       <Link
//                         to={
//                           courseId
//                             ? `/courses/${courseId}`
//                             : "/courses"
//                         }
//                         className="course-view-link"
//                       >
//                         View Course →
//                       </Link>
//                     </div>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       {/* FAQ */}
//       <section className="home-faq">
//         <span className="section-label">GOT QUESTIONS?</span>
//         <h2>Frequently Asked Questions</h2>

//         <details>
//           <summary>What is jQuery?</summary>
//           <p>
//             jQuery is a JavaScript library that simplifies common DOM
//             manipulation and event-handling tasks.
//           </p>
//         </details>

//         <details>
//           <summary>What is AJAX?</summary>
//           <p>
//             AJAX allows a web page to exchange data with a server without
//             reloading the entire page.
//           </p>
//         </details>
//       </section>
//     </main>
//   );
// };

// export default Home;



// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// //import { CourseContext } from "../../state-mgmt/CourseContext";
// import "./Home.css";

// const CourseDetails = () => {
//   const { id } = useParams();

//   const {
//     getCourseById,
//     getCourseContent,
//     addReview,
//   } = useContext(CourseContext);

//   const [course, setCourse] = useState(null);
//   const [courseContent, setCourseContent] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [review, setReview] = useState("");
//   const [rating, setRating] = useState(5);
//   const [reviewLoading, setReviewLoading] = useState(false);

//   useEffect(() => {
//     const loadCourse = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await getCourseById(id);

//         const courseData =
//           response?.course ||
//           response?.data?.course ||
//           response?.data ||
//           response;

//         if (!courseData || typeof courseData !== "object") {
//           throw new Error("Course details not found.");
//         }

//         setCourse(courseData);

//         const contentResponse = await getCourseContent(id);

//         const contentData =
//           contentResponse?.content ||
//           contentResponse?.data?.content ||
//           contentResponse?.data ||
//           contentResponse;

//         setCourseContent(
//           Array.isArray(contentData) ? contentData : []
//         );
//       } catch (err) {
//         console.error("Course details error:", err);
//         setError(err.message || "Unable to load course details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCourse();
//   }, [id, getCourseById, getCourseContent]);

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();

//     if (!review.trim()) {
//       alert("Please enter your review.");
//       return;
//     }

//     try {
//       setReviewLoading(true);

//       await addReview(id, {
//         review: review.trim(),
//         rating: Number(rating),
//       });

//       setReview("");
//       setRating(5);

//       // Reload course to display the latest reviews
//       const response = await getCourseById(id);

//       const updatedCourse =
//         response?.course ||
//         response?.data?.course ||
//         response?.data ||
//         response;

//       if (updatedCourse && typeof updatedCourse === "object") {
//         setCourse(updatedCourse);
//       }

//       alert("Review submitted successfully.");
//     } catch (err) {
//       console.error("Review error:", err);
//       alert(err.message || "Unable to submit review.");
//     } finally {
//       setReviewLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="course-detail-status">
//         Loading course details...
//       </div>
//     );
//   }

//   if (error || !course) {
//     return (
//       <div className="course-detail-status course-detail-error">
//         {error || "Course not found."}
//         <br />
//         <Link to="/courses">Back to Courses</Link>
//       </div>
//     );
//   }

//   const title = course.name || course.title || "Untitled Course";

//   const image =
//     course.thumbnail?.url ||
//     course.thumbnail ||
//     course.image ||
//     course.thumbnailUrl ||
//     "";

//   const currentPrice = course.price ?? 0;
//   const originalPrice = course.estimatedPrice;

//   const level = course.level || course.difficulty || "All Levels";

//   const benefits = Array.isArray(course.benefits)
//     ? course.benefits
//     : [];

//   const prerequisites = Array.isArray(course.prerequisites)
//     ? course.prerequisites
//     : [];

//   const reviews = Array.isArray(course.reviews)
//     ? course.reviews
//     : [];

//   const lessons =
//     courseContent.length > 0
//       ? courseContent
//       : Array.isArray(course.courseData)
//         ? course.courseData
//         : [];

//   const demoUrl = course.demoUrl || "";

//   const ratingValue = course.rating ?? 0;

//   const studentCount =
//     course.students?.length ??
//     course.enrollments?.length ??
//     course.purchasedCount ??
//     0;

//   return (
//     <main className="course-details-page">
//       <div className="course-details-container">

//         {/* Breadcrumb */}
//         <div className="course-breadcrumb">
//           <Link to="/">Home</Link>
//           <span>/</span>
//           <Link to="/courses">Courses</Link>
//           <span>/</span>
//           <span>{title}</span>
//         </div>

//         {/* Course Header */}
//         <section className="course-details-hero">

//           <div className="course-details-image">
//             {image ? (
//               <img src={image} alt={title} />
//             ) : (
//               <div className="course-image-placeholder">
//                 {title.charAt(0)}
//               </div>
//             )}
//           </div>

//           <div className="course-details-info">

//             <span className="course-details-level">
//               {level}
//             </span>

//             <h1>{title}</h1>

//             <p className="course-details-description">
//               {course.description ||
//                 "Build your skills with this practical course."}
//             </p>

//             <div className="course-details-rating">
//               <span>⭐ {ratingValue}</span>
//               <span>{studentCount} students</span>
//             </div>

//             <div className="course-details-price">
//               <strong>
//                 ₹{Number(currentPrice).toLocaleString("en-IN")}
//               </strong>

//               {originalPrice != null &&
//                 Number(originalPrice) > Number(currentPrice) && (
//                   <del>
//                     ₹{Number(originalPrice).toLocaleString("en-IN")}
//                   </del>
//                 )}
//             </div>

//             <div className="course-details-actions">
//               {demoUrl && (
//                 <a
//                   href={demoUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="course-demo-button"
//                 >
//                   Watch Demo
//                 </a>
//               )}

//               {course.purchased ? (
//                 <Link
//                   to={`/courses/${id}/content`}
//                   className="course-buy-button"
//                 >
//                   Continue Learning
//                 </Link>
//               ) : (
//                 <button
//                   type="button"
//                   className="course-buy-button"
//                   onClick={() => {
//                     alert(
//                       "Connect your existing CheckoutModal here to purchase this course."
//                     );
//                   }}
//                 >
//                   Buy Course
//                 </button>
//               )}
//             </div>

//           </div>
//         </section>

//         {/* Course Information */}
//         <section className="course-information-section">

//           <div className="course-information-card">
//             <h2>What You Will Learn</h2>

//             {benefits.length > 0 ? (
//               <ul>
//                 {benefits.map((item, index) => (
//                   <li key={index}>
//                     <span>✓</span>
//                     {typeof item === "string"
//                       ? item
//                       : item.title || item.name || item.description}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="course-empty-text">
//                 No benefits added.
//               </p>
//             )}
//           </div>

//           <div className="course-information-card">
//             <h2>Prerequisites</h2>

//             {prerequisites.length > 0 ? (
//               <ul>
//                 {prerequisites.map((item, index) => (
//                   <li key={index}>
//                     <span>✓</span>
//                     {typeof item === "string"
//                       ? item
//                       : item.title || item.name || item.description}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="course-empty-text">
//                 No prerequisites added.
//               </p>
//             )}
//           </div>

//         </section>

//         {/* Course Content */}
//         <section className="course-content-section">
//           <div className="course-section-heading">
//             <div>
//               <span>LEARNING CURRICULUM</span>
//               <h2>Course Content</h2>
//             </div>

//             <span className="course-lesson-count">
//               {lessons.length} Lessons
//             </span>
//           </div>

//           {lessons.length > 0 ? (
//             <div className="course-content-table-wrapper">
//               <table className="course-content-table">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Lesson Title</th>
//                     <th>Description</th>
//                     <th>Duration</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {lessons.map((lesson, index) => (
//                     <tr key={lesson._id || lesson.id || index}>
//                       <td>{index + 1}</td>

//                       <td>
//                         <strong>
//                           {lesson.title || lesson.name || "Untitled Lesson"}
//                         </strong>
//                       </td>

//                       <td>
//                         {lesson.description || "No description"}
//                       </td>

//                       <td>
//                         {lesson.videoLength
//                           ? `${lesson.videoLength} min`
//                           : "Not specified"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="course-empty-text">
//               No course content available.
//             </p>
//           )}
//         </section>

//         {/* Reviews */}
//         <section className="course-reviews-section">
//           <div className="course-section-heading">
//             <div>
//               <span>STUDENT FEEDBACK</span>
//               <h2>Reviews</h2>
//             </div>

//             <span className="course-lesson-count">
//               {reviews.length} Reviews
//             </span>
//           </div>

//           {reviews.length > 0 ? (
//             <div className="course-reviews-list">
//               {reviews.map((item, index) => (
//                 <article
//                   className="course-review-card"
//                   key={item._id || item.id || index}
//                 >
//                   <div className="course-review-header">
//                     <strong>
//                       {item.user?.name ||
//                         item.name ||
//                         item.userName ||
//                         "Student"}
//                     </strong>

//                     <span>
//                       ⭐ {item.rating ?? 0}/5
//                     </span>
//                   </div>

//                   <p>
//                     {item.review ||
//                       item.comment ||
//                       "No review description."}
//                   </p>
//                 </article>
//               ))}
//             </div>
//           ) : (
//             <p className="course-empty-text">
//               No reviews yet.
//             </p>
//           )}

//           <form
//             className="course-review-form"
//             onSubmit={handleReviewSubmit}
//           >
//             <h3>Write a Review</h3>

//             <label htmlFor="review-rating">
//               Your Rating
//             </label>

//             <select
//               id="review-rating"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//             >
//               <option value="5">5 - Excellent</option>
//               <option value="4">4 - Very Good</option>
//               <option value="3">3 - Good</option>
//               <option value="2">2 - Fair</option>
//               <option value="1">1 - Poor</option>
//             </select>

//             <label htmlFor="course-review">
//               Your Review
//             </label>

//             <textarea
//               id="course-review"
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               placeholder="Share your learning experience..."
//               rows="4"
//             />

//             <button
//               type="submit"
//               disabled={reviewLoading}
//             >
//               {reviewLoading ? "Submitting..." : "Submit Review"}
//             </button>
//           </form>
//         </section>

//       </div>
//     </main>
//   );
// };

// export default CourseDetails;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import "./Home.css";
import { CourseContext } from "../../state-mgmt/CourseContext";
import { errMsg, thumbnailUrl } from "../../utils";

const API_BASE_URL = "https://mockapi-mauve.vercel.app/api/v1";

const Home = () => {
  const { courses, loading, getPublicCourses } = useContext(CourseContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getPublicCourses().catch((error) => {
      toast.error(errMsg(error, "Failed to load courses"));
    });

    fetch(`${API_BASE_URL}/lms/categories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load categories");
        }
        return response.json();
      })
      .then((data) => {
        const categoryList = Array.isArray(data)
          ? data
          : data?.categories || data?.data?.categories || data?.data || [];

        setCategories(Array.isArray(categoryList) ? categoryList : []);
      })
      .catch(() => setCategories([]));
  }, []);

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-badge">
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h1>
            Unlock Your Potential Through Learning
            <span>new today</span>
          </h1>

          <p>
            Discover in-demand skills, learn from expert-led courses,
            and turn your ambitions into achievements.
          </p>

          <Link to="/courses" className="home-primary-button">
            Explore Courses
            <span>→</span>
          </Link>
        </div>

        <div className="hero-decoration">
          <div className="hero-icon">✦</div>
          <div className="hero-stat">
            <span>Keep learning</span>
            <strong>Grow your skills</strong>
          </div>
        </div>
      </section>

      {/* LMS Marketplace */}
      <section className="home-marketplace">
        <div>
          <span className="section-label">DISCOVER MORE</span>
          <h2>LMS Marketplace</h2>
          <p>
            Browse published courses, wishlist favourites, watch lectures
            with saved progress and earn certificates. Instructors can
            publish courses; admins manage the marketplace.
          </p>
        </div>

        <Link to="/lms" className="home-secondary-button">
          Open LMS Marketplace →
        </Link>
      </section>

      

      {/* Featured Courses */}
      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <span className="section-label">HANDPICKED FOR YOU</span>
            <h2>Featured Courses</h2>
            <p className="section-description">
              Explore courses and take the next step in your learning journey.
            </p>
          </div>

          <Link to="/courses" className="home-text-link">
            Browse all →
          </Link>
        </div>

        {loading ? (
          <p className="home-status">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="home-status">
            No featured courses available right now.
          </p>
        ) : (
          <div className="home-course-grid">
            {courses.slice(0, 6).map((course) => (
              <article className="home-course-card" key={course._id}>
                <Link
                  to={`/courses/${course._id}`}
                  className="course-image-link"
                >
                  <img
                    src={thumbnailUrl(course.thumbnail)}
                    alt={course.name}
                    className="home-course-image"
                  />
                </Link>

                <div className="home-course-content">
                  <span className="course-level">
                    {course.level || "All Levels"}
                  </span>

                  <h3>{course.name}</h3>

                  <div className="course-card-footer">
                    <strong>
                      ₹{Number(course.price || 0).toLocaleString("en-IN")}
                    </strong>

                    <Link
                      to={`/courses/${course._id}`}
                      className="course-view-link"
                    >
                      View Course →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="home-faq">
        <span className="section-label">GOT QUESTIONS?</span>
        <h2>Frequently Asked Questions</h2>

        <details>
          <summary>What is jQuery?</summary>
          <p>
            jQuery is a JavaScript library that simplifies common DOM
            manipulation and event-handling tasks.
          </p>
        </details>

        <details>
          <summary>What is AJAX?</summary>
          <p>
            AJAX allows a web page to exchange data with a server without
            reloading the entire page.
          </p>
        </details>
      </section>
    </main>
  );
};

export default Home;
