import { z } from "zod";

export const createExoplanetSchema = z.object({
  name: z.string({ message: "Name is required" }),
  distance: z.string({ message: "Distance is required" }),
  discoverYear: z.string({ message: "Discover Year is required" }),
  description: z.string().optional(),
  url: z.string().optional(),
});

export const updateExoplanetSchema = z.object({/*
  name: z.string({ message: "Name is required" }),
  distance: z.string({ message: "Distance is required" }),
  discoverYear: z.string({ message: "Discover Year is required" }),
  description: z.string().optional(),
  url: z.string().optional(),*/
});
