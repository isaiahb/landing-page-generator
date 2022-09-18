import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export type PageI = {
  // Intro Section.
  title: string;
  tagline: string;
  description: string;
  actionButtonText: string;

  // Additional Info Section.
  problemStatement?: string;
  solutionStatment?: string;

  // Teammates Section.  
  teammates?: Teammate[];

  // Testimonials Section.
  testimonials?: Testimonial[];

  image?: string;
};

export type Teammate = {
  name: string;
  description: string;
  image: string;
};

export type Testimonial = {
  name: string;
  description: string;
  // image: string;
};


const api = {
  page: {
    create: (page: PageI) => axios.post("api/page", page),
    get: (title: string) => axios.get(`api/page/${title}`),
    update: (title: string, page: PageI) =>
      axios.put(`api/page/${title}`, page),
    delete: (title: string) => axios.delete(`api/page/${title}`),
    getAll: () => axios.get("api/page"),
  },
}

export default api;