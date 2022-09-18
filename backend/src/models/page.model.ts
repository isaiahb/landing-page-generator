import mongoose, { ObjectId } from 'mongoose';

// export interface DocumentI {
//   _id?: string | ObjectId;
//   creator: string | ObjectId;
//   title: string;
//   content: string;

//   // Optional Prompt.
//   brief?: string;
//   tone?: string;

// }
// type LandingPageOutput = {

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

const PageSchema = new mongoose.Schema<PageI>(
  {
    title: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    actionButtonText: { type: String, required: true },
    problemStatement: { type: String, required: false },
    solutionStatment: { type: String, required: false },
    teammates: { type: Array, required: false },
    testimonials: { type: Array, required: false },
    image: { type: String, required: false },

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Page = mongoose.model('Page', PageSchema);
// Document.syncIndexes();
