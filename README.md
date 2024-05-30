Please fork this repository and develop a real estate property search feature using Next.js, MySQL, and GraphQL in your own repository. Include a Docker Compose configuration for Next.js and instructions to generate fake data. This test aims to assess your critical thinking and technical skills, so a complete git log showing all work done is important.

**User Story:**  

**As a Developer**, I want to build a search feature for real estate properties, allowing users to filter properties based on sale or rent, price range, number of bedrooms, and area. The search should handle a large number of fake properties (10,000, 100,000, and 1,000,000) to test query performance. Additionally, the listing page should display the project name, short title, price, bedroom count, area, short description, and an image gallery (with 5 images) that works with mouse interaction on PCs and swipe gestures on mobile devices. The page should achieve a score of 95 or higher on Google Insight.

**Acceptance Criteria:**

**Given** a user searches for properties,  
**When** they select the filter type for sale or rent,  
**Then** the search should display properties matching the selected type.  

**Given** a user searches for properties,  
**When** they specify the price range using the filter,  
**Then** the search should display properties within the specified price range for both sale and rent.  

**Given** a user searches for properties,  
**When** they filter properties based on the number of bedrooms,  
**Then** the search should display properties with the corresponding bedroom count.  

**Given** a user searches for properties,  
**When** they filter properties based on the area,  
**Then** the search should display properties within the specified area range.  

**Given** a user views the listing page,  
**When** they interact with the image gallery on a PC (using a mouse),  
**Then** they should be able to navigate between images.  

**Given** a user views the listing page,  
**When** they interact with the image gallery on a mobile device (using swipe gestures),  
**Then** they should be able to navigate between images.

**Given** the listing page,  
**When** tested with Google Insight,  
**Then** the page should achieve a score of 95 or higher.  

**Given** a large number of fake properties (10,000, 100,000, and 1,000,000),  
**When** the search is performed,  
**Then** the query performance should meet acceptable performance benchmarks.   
