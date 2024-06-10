import { useLazyQuery, gql } from '@apollo/client';
import { useState } from 'react';
import Layout from '../components/Layout';
import '../src/styles/Listings.css';

const LISTINGS_QUERY = gql`
  query Listings(
    $saleOrRent: String
    $minPrice: Float
    $maxPrice: Float
    $minBedrooms: Int
    $maxBedrooms: Int
    $minArea: Float
    $maxArea: Float
  ) {
    listings(
      saleOrRent: $saleOrRent
      minPrice: $minPrice
      maxPrice: $maxPrice
      minBedrooms: $minBedrooms
      maxBedrooms: $maxBedrooms
      minArea: $minArea
      maxArea: $maxArea
    ) {
      id
      projectName
      shortTitle
      price
      bedrooms
      area
      shortDescription
      saleOrRent
      images
    }
  }
`;

const Listings = () => {
  const [filters, setFilters] = useState({
    saleOrRent: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    minArea: '',
    maxArea: ''
  });

  const [getListings, { loading, error, data }] = useLazyQuery(LISTINGS_QUERY);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearch = () => {
    const variables = {
      saleOrRent: filters.saleOrRent,
      minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
      minBedrooms: filters.minBedrooms ? parseInt(filters.minBedrooms, 10) : undefined,
      maxBedrooms: filters.maxBedrooms ? parseInt(filters.maxBedrooms, 10) : undefined,
      minArea: filters.minArea ? parseFloat(filters.minArea) : undefined,
      maxArea: filters.maxArea ? parseFloat(filters.maxArea) : undefined,
    };
    getListings({ variables });
  };

  return (
    <Layout>
      <h1>Listings</h1>
      <div>
        <label>
          Sale or Rent:
          <select name="saleOrRent" value={filters.saleOrRent} onChange={handleInputChange}>
            <option value="">Any</option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </label>
        <label>
          Min Price:
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleInputChange} />
        </label>
        <label>
          Max Price:
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleInputChange} />
        </label>
        <label>
          Min Bedrooms:
          <input type="number" name="minBedrooms" value={filters.minBedrooms} onChange={handleInputChange} />
        </label>
        <label>
          Max Bedrooms:
          <input type="number" name="maxBedrooms" value={filters.maxBedrooms} onChange={handleInputChange} />
        </label>
        <label>
          Min Area:
          <input type="number" name="minArea" value={filters.minArea} onChange={handleInputChange} />
        </label>
        <label>
          Max Area:
          <input type="number" name="maxArea" value={filters.maxArea} onChange={handleInputChange} />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="listings-grid">
          {data.listings.map((listing) => (
            <div key={listing.id} className="listing-item">
              <h2>{listing.shortTitle}</h2>
              <p>Price: {listing.price}</p>
              <p>Bedrooms: {listing.bedrooms}</p>
              <p>Area: {listing.area} sq ft</p>
              <p>{listing.shortDescription}</p>
              <div className="image-grid">
                {listing.images.slice(0, 5).map((image, index) => (
                  <div key={index} className={`grid-item img${index + 1}`}>
                    <img src={image} alt={`Image ${index + 1}`} />
                  </div>
                ))}
                {listing.images.length < 5 && // Add placeholders if there are fewer than 5 images
                  Array.from({ length: 5 - listing.images.length }).map((_, index) => (
                    <div key={listing.images.length + index} className={`grid-item img${listing.images.length + index + 1}`}>
                      <img src="placeholder.jpg" alt="Placeholder" />
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Listings;

