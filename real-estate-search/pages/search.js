import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GET_PROPERTIES = gql`
  query GetProperties(
    $saleOrRent: String,
    $minPrice: Float,
    $maxPrice: Float,
    $bedrooms: Int,
    $minArea: Float,
    $maxArea: Float
  ) {
    properties(
      saleOrRent: $saleOrRent,
      minPrice: $minPrice,
      maxPrice: $maxPrice,
      bedrooms: $bedrooms,
      minArea: $minArea,
      maxArea: $maxArea
    ) {
      id
      name
      title
      price
      bedrooms
      area
      description
      images
    }
  }
`;

const Search = () => {
    const [filters, setFilters] = useState({
      saleOrRent: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      minArea: '',
      maxArea: ''
    });
  
    const { loading, error, data } = useQuery(GET_PROPERTIES, {
      variables: {
        saleOrRent: filters.saleOrRent || null,
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : null,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : null,
        bedrooms: filters.bedrooms ? parseInt(filters.bedrooms, 10) : null,
        minArea: filters.minArea ? parseFloat(filters.minArea) : null,
        maxArea: filters.maxArea ? parseFloat(filters.maxArea) : null
      }
    });
  
    const handleChange = (e) => {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value
      });
    };
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: true,
      swipe: true,
    };
  
    return (
      <div>
        <h1>Search Properties</h1>
        <form>
          <label>
            Sale or Rent:
            <select name="saleOrRent" onChange={handleChange}>
              <option value="">Both</option>
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>
          </label>
          <label>
            Min Price:
            <input type="number" name="minPrice" onChange={handleChange} />
          </label>
          <label>
            Max Price:
            <input type="number" name="maxPrice" onChange={handleChange} />
          </label>
          <label>
            Bedrooms:
            <input type="number" name="bedrooms" onChange={handleChange} />
          </label>
          <label>
            Min Area:
            <input type="number" name="minArea" onChange={handleChange} />
          </label>
          <label>
            Max Area:
            <input type="number" name="maxArea" onChange={handleChange} />
          </label>
        </form>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && data.properties.map(property => (
            <div key={property.id} className="property-card">
              <h2>{property.name}</h2>
              <h3>{property.title}</h3>
              <p>Price: ${property.price}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Area: {property.area} sqft</p>
              <p>{property.description}</p>
              <Slider {...settings}>
                {property.images.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image}
                      alt={`Property ${index + 1}`}
                      width={500}
                      height={300}
                      layout="responsive"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ))}
        </div>
        <style jsx>{`
          .property-card {
            border: 1px solid #ddd;
            padding: 16px;
            margin-bottom: 16px;
          }
        `}</style>
      </div>
    );
  };
  
  export default Search;
