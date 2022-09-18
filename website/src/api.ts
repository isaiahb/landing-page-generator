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
    create: async (page: PageI): Promise<PageI>  => (await axios.post("api/page", page)).data,
    get: async (title: string): Promise<PageI> => (await axios.get(`api/page/${title}`)).data,
    update: async (title: string, page: PageI): Promise<PageI> => (await axios.put(`api/page/${title}`, page)).data,
    delete: async (title: string) => await axios.delete(`api/page/${title}`),
    getAll: async (): Promise<PageI[]> => (await axios.get("api/page")).data,
  },

  generate: {
    create: (prompt: string) => axios.get("api/generate/" + prompt),
  },
}

export default api;