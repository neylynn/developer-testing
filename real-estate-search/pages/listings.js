import { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Layout from '../components/Layout';

// GraphQL query with additional filter parameters
const LISTINGS_QUERY = gql`
  query Listings(
    $saleOrRent: String,
    $minPrice: Float,
    $maxPrice: Float,
    $minBedrooms: Int,
    $maxBedrooms: Int,
    $minArea: Float,
    $maxArea: Float
  ) {
    listings(
      saleOrRent: $saleOrRent,
      minPrice: $minPrice,
      maxPrice: $maxPrice,
      minBedrooms: $minBedrooms,
      maxBedrooms: $maxBedrooms,
      minArea: $minArea,
      maxArea: $maxArea
    ) {
      id
      projectName
      shortTitle
      price
      bedrooms
      area
      shortDescription
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

  const [triggerSearch, setTriggerSearch] = useState(false);

  // Lazy query to be executed on form submit
  const [fetchListings, { loading, error, data }] = useLazyQuery(LISTINGS_QUERY, {
    variables: {
      saleOrRent: filters.saleOrRent || null,
      minPrice: filters.minPrice ? parseFloat(filters.minPrice) : null,
      maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : null,
      minBedrooms: filters.minBedrooms ? parseInt(filters.minBedrooms) : null,
      maxBedrooms: filters.maxBedrooms ? parseInt(filters.maxBedrooms) : null,
      minArea: filters.minArea ? parseFloat(filters.minArea) : null,
      maxArea: filters.maxArea ? parseFloat(filters.maxArea) : null
    },
  });

  useEffect(() => {
    if (triggerSearch) {
      fetchListings();
      setTriggerSearch(false);
    }
  }, [triggerSearch, fetchListings]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle form submit
  const handleSearch = (e) => {
    e.preventDefault();
    setTriggerSearch(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Layout>
      <h1>Listings</h1>
      
      {/* Filter Form */}
      <form onSubmit={handleSearch}>
        <label>
          Sale or Rent:
          <select name="saleOrRent" value={filters.saleOrRent} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </label>
        <br />
        <label>
          Min Price:
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
        </label>
        <br />
        <label>
          Max Price:
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
        </label>
        <br />
        <label>
          Min Bedrooms:
          <input type="number" name="minBedrooms" value={filters.minBedrooms} onChange={handleFilterChange} />
        </label>
        <br />
        <label>
          Max Bedrooms:
          <input type="number" name="maxBedrooms" value={filters.maxBedrooms} onChange={handleFilterChange} />
        </label>
        <br />
        <label>
          Min Area (sq ft):
          <input type="number" name="minArea" value={filters.minArea} onChange={handleFilterChange} />
        </label>
        <br />
        <label>
          Max Area (sq ft):
          <input type="number" name="maxArea" value={filters.maxArea} onChange={handleFilterChange} />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>

      <div>
        {data && data.listings.map((listing) => (
          <div key={listing.id}>
            <h2>{listing.shortTitle}</h2>
            <p>{listing.shortDescription}</p>
            <p>Price: {listing.price}</p>
            <p>Bedrooms: {listing.bedrooms}</p>
            <p>Area: {listing.area} sq ft</p>
            {/* Add more listing details as needed */}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Listings;
