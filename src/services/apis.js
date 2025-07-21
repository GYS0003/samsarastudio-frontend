import axios from "axios";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
});

const defaultHeaders = {
  headers: {
    "Content-Type": "application/json"
  }
};
const multipartHeaders = {
  headers: {
    "Content-Type": "multipart/form-data"
  }
};

export const sendOTP = async (email, name) => {
  try {
    const res = await axiosInstance.post("/auth/send-otp", { email, name }, defaultHeaders);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Send OTP failed" };
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const res = await axiosInstance.post("/auth/verify-otp", { email, otp }, defaultHeaders);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

export const bookMeeting = async (formdata) => {
  try {
    const res = await axiosInstance.post("/meeting/book-meeting", formdata, multipartHeaders);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Booking meeting failed" };
  }
};

export const fetchBooked = async (selectedDate) => {
  try {
    const res = await axiosInstance.get(`/slots/booked-times?date=${selectedDate}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to get dates" };
  }
};


// Job APIs
export const createJob = async (jobData) => {
  try {
    const res = await axiosInstance.post("/jobs", jobData, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Job creation failed" };
  }
};

export const getAllJobs = async () => {
  try {
    const res = await axiosInstance.get("/jobs", defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch jobs" };
  }
};

export const updateJob = async (jobId, updatedData) => {
  try {
    const res = await axiosInstance.put(`/jobs/${jobId}`, updatedData, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Job update failed" };
  }
};

export const deleteJob = async (jobId) => {
  try {
    const res = await axiosInstance.delete(`/jobs/${jobId}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Job deletion failed" };
  }
};

export const fetchJobById = async (id) => {
  try {
    const res = await axiosInstance.get(`/jobs/${id}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch job' };
  }
};

export const verifyAdmin = async (email, password) => {
  try {
    const res = await axiosInstance.post("/verifyadmin", { email, password }, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Admin verification failed" };
  }
};

export const getAllMeetings = async () => {
  try {
    const res = await axiosInstance.get("/meeting/all-meetings", defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch meetings" };
  }
};
export const deleteMeeting = async (id) => {
  try {
    const res = await axiosInstance.delete(`/meeting/${id}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch meetings" };
  }
};

// Time Slots APIs
export const getALLSlots = async () => {
  try {
    const res = await axiosInstance.get(`/time-slots`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch all slots" };
  }
};

// ✅ Block specific slots on a date
export const blockSlots = async (date, times) => {
  try {
    const res = await axiosInstance.patch(
      `/time-slots/${date}`,
      {
        slots: times.map((time) => ({
          time,
          isBlocked: true,
          isAvailable: false,
        })),
      },
      defaultHeaders
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to block slots" };
  }
};

// ✅ Unblock specific slots on a date
export const unblockSlots = async (date, times) => {
  try {
    const res = await axiosInstance.patch(
      `/time-slots/${date}`,
      {
        slots: times.map((time) => ({
          time,
          isBlocked: false,
          isAvailable: true,
        })),
      },
      defaultHeaders
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to unblock slots" };
  }
};


export const getTimeSlotsForDate = async (date) => {
  try {
    const res = await axiosInstance.get(`/time-slots/${date}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch time slots" };
  }
};

// Testimonials APIs
export const getTestimonials = async () => {
  try {
    const res = await axiosInstance.get("/testimonials", defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch testimonials" };
  }
};

export const createTestimonial = async (testimonialData) => {
  try {
    const res = await axiosInstance.post("/testimonials", testimonialData, multipartHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Testimonial creation failed" };
  }
};

export const updateTestimonial = async (id, testimonialData) => {
  try {
    const res = await axiosInstance.put(`/testimonials/${id}`, testimonialData, multipartHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Testimonial update failed" };
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const res = await axiosInstance.delete(`/testimonials/${id}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Testimonial deletion failed" };
  }
};

// Team APIs
export const getTeam = async () => {
  const res = await axiosInstance.get('/team', defaultHeaders);
  return res.data;
};

export const createTeamMember = async (data) => {
  const res = await axiosInstance.post('/team', data, multipartHeaders);
  return res.data;
};

export const updateTeamMember = async (id, data) => {
  const res = await axiosInstance.put(`/team/${id}`, data, multipartHeaders);
  return res.data;
};

export const deleteTeamMember = async (id) => {
  const res = await axiosInstance.delete(`/team/${id}`, defaultHeaders);
  return res.data;
};

// Service APIs

export const getServices = async () => {
  try {
    const res = await axiosInstance.get('/services', defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch services' };
  }
};

export const createService = async (serviceData) => {
  try {
    const res = await axiosInstance.post('/services', serviceData, multipartHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Service creation failed' };
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const res = await axiosInstance.put(`/services/${id}`, serviceData, multipartHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Service update failed' };
  }
};
export const getServiceById = async (id)=>{
  try {
    const res = await axiosInstance.get(`/services/${id}`, defaultHeaders);
    return res.data;
  } catch (error) {
        throw err.response?.data || { message: 'Service deletion failed' };

  }
}
export const deleteService = async (id) => {
  try {
    const res = await axiosInstance.delete(`/services/${id}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Service deletion failed' };
  }
};

//Job Application APIs
export const submitJobApplication = async (applicationData) => {
  try {
    const res = await axiosInstance.post('/job-applicants', applicationData, multipartHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Job application submission failed' };
  }
};

export const getJobApplications = async () => {
  try {
    const res = await axiosInstance.get('/job-applicants', defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch job applications' };
  }
};

export const deleteJobAplication = async(id)=>{
    try {
    const res = await axiosInstance.delete(`/job-applicants/${id}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to delete job applications' };
  }
}

//gallery
export const createGalleryImage = async (imageData) => {
  try {
    const res = await axiosInstance.post('/gallery', imageData, multipartHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to upload image' };
  }
};

// 🔁 Get all gallery images
export const getGalleryImages = async () => {
  try {
    const res = await axiosInstance.get('/gallery', defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch images' };
  }
};

// ❌ Delete a gallery image by ID
export const deleteGalleryImage = async (id) => {
  try {
    const res = await axiosInstance.delete(`/gallery/${id}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to delete image' };
  }
};

// 🆕 Create a blog (supports image upload via multipart/form-data)
export const createBlog = async (blogData) => {
  try {
    const res = await axiosInstance.post('/blogs', blogData, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to create blog' };
  }
};

// blogs
export const getAllBlogs = async () => {
  try {
    const res = await axiosInstance.get('/blogs', defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch blogs' };
  }
};

export const getBlogById = async (id) => {
  try {
    const res = await axiosInstance.get(`/blogs/${id}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch blog' };
  }
};

export const updateBlog = async (id, updatedData) => {
  try {
    const res = await axiosInstance.put(`/blogs/${id}`, updatedData, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to update blog' };
  }
};

export const deleteBlog = async (id) => {
  try {
    const res = await axiosInstance.delete(`/blogs/${id}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to delete blog' };
  }
};
export const uploadBlogImage = async (formData) => {
  try {
    const res = await axiosInstance.post('/blogs/upload', formData, multipartHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to upload blog image' };
  }
};

//category portfolio
export const getAllCategories = async () => {
  try {
    const res = await axiosInstance.get('/category', defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch categories' };
  }
};
export const getOnlyCategories = async () => {
  try {
    const res = await axiosInstance.get('/category/categories', defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch categories' };
  }
};
// ✅ 2. Get projects by category ID
export const getProjectsByCategoryId = async (categoryId) => {
  try {
    const res = await axiosInstance.get(`/category/${categoryId}`, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch projects' };
  }
};

// ✅ 3. Create new category
export const createCategory = async (data) => {
  try {
    const res = await axiosInstance.post('/category', data, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to create category' };
  }
};

// ✅ 4. Update category name
export const updateCategory = async (categoryId, data) => {
  try {
    const res = await axiosInstance.put(`/category/${categoryId}`, data, defaultHeaders);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to update category' };
  }
};

// ✅ 6. Add project to category (with image)
export const addProjectToCategory = async (categoryId, formData) => {
  try {
    const res = await axiosInstance.post(
      `/category/${categoryId}/projects`,
      formData,
      multipartHeaders
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to add project' };
  }
};

// ✅ 7. Update project in category
export const updateProjectInCategory = async (categoryId, projectId, formData) => {
  try {
    const res = await axiosInstance.put(
      `/category/${categoryId}/projects/${projectId}`,
      formData,
      multipartHeaders
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to update project' };
  }
};

// ✅ 8. Delete project from category
export const deleteProjectFromCategory = async (categoryId, projectId) => {
  try {
    const res = await axiosInstance.delete(
      `/category/${categoryId}/projects/${projectId}`,
      defaultHeaders
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to delete project' };
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const res = await axiosInstance.delete(
      `/category/${categoryId}`,
      defaultHeaders
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to delete project' };
  }
};
