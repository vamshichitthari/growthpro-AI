
import { BusinessData } from "../types/business";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated business data generator
const generateBusinessData = (name: string, location: string): Omit<BusinessData, 'name' | 'location'> => {
  // Generate realistic ratings between 3.8 and 4.9
  const rating = Math.round((3.8 + Math.random() * 1.1) * 10) / 10;
  
  // Generate realistic review counts
  const reviewRanges = [
    { min: 25, max: 75 },
    { min: 76, max: 150 },
    { min: 151, max: 300 },
    { min: 301, max: 500 }
  ];
  const range = reviewRanges[Math.floor(Math.random() * reviewRanges.length)];
  const reviews = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  
  // Generate AI-style headline
  const headlines = [
    `Why ${name} is ${location}'s Best-Kept Secret in ${new Date().getFullYear()}`,
    `${name}: The ${location} Gem Everyone's Talking About`,
    `How ${name} Became ${location}'s Most Trusted Local Business`,
    `${name} - Where ${location} Meets Excellence`,
    `The Ultimate Guide to ${name}: ${location}'s Rising Star`,
    `${name} Sets the Standard for Quality in ${location}`,
    `Discover Why ${name} is ${location}'s Hidden Treasure`,
    `${name}: Transforming the ${location} Business Landscape`
  ];
  
  const headline = headlines[Math.floor(Math.random() * headlines.length)];
  
  return { rating, reviews, headline };
};

// Simulate POST /business-data endpoint
export const getBusinessData = async (name: string, location: string): Promise<BusinessData> => {
  await delay(1500); // Simulate network delay
  
  // Simulate occasional network errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Network error - please try again");
  }
  
  const generatedData = generateBusinessData(name, location);
  
  return {
    name,
    location,
    ...generatedData
  };
};

// Simulate GET /regenerate-headline endpoint
export const regenerateHeadline = async (name: string, location: string): Promise<string> => {
  await delay(1000); // Simulate network delay
  
  // Simulate occasional network errors (3% chance)
  if (Math.random() < 0.03) {
    throw new Error("Failed to regenerate headline - please try again");
  }
  
  const headlines = [
    `${name}: The Future of ${location}'s Business Scene`,
    `Breaking: ${name} Revolutionizes ${location} Market`,
    `${name} - Your Next Favorite ${location} Destination`,
    `Why Smart ${location} Residents Choose ${name}`,
    `${name}: Excellence Redefined in ${location}`,
    `The ${name} Phenomenon Taking ${location} by Storm`,
    `From ${location} with Love: The ${name} Story`,
    `${name} - Where Innovation Meets Tradition in ${location}`,
    `${location}'s Best Investment? ${name} Delivers`,
    `${name}: Setting New Standards in ${location}`,
    `The ${name} Experience: ${location}'s Premium Choice`,
    `${name} - Proudly Serving ${location} Since Day One`
  ];
  
  return headlines[Math.floor(Math.random() * headlines.length)];
};
