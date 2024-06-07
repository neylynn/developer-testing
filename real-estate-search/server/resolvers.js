const resolvers = {
    Query: {
      listings: async (_, { saleOrRent, minPrice, maxPrice, minBedrooms, maxBedrooms, minArea, maxArea }, { dataSources }) => {
        let filters = {};
        
        if (saleOrRent) filters.saleOrRent = saleOrRent;
        if (minPrice != null) filters.price = { $gte: minPrice };
        if (maxPrice != null) filters.price = { ...filters.price, $lte: maxPrice };
        if (minBedrooms != null) filters.bedrooms = { $gte: minBedrooms };
        if (maxBedrooms != null) filters.bedrooms = { ...filters.bedrooms, $lte: maxBedrooms };
        if (minArea != null) filters.area = { $gte: minArea };
        if (maxArea != null) filters.area = { ...filters.area, $lte: maxArea };
  
        return dataSources.listingsAPI.getListings(filters);
      }
    }
  };
  
  module.exports = resolvers;
  