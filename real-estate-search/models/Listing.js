import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema({
  projectName: String,
  shortTitle: String,
  price: Number,
  bedrooms: Number,
  area: Number,
  shortDescription: String,
  saleOrRent: String,
  images: [String]
});

const Listing = mongoose.models.Listing || mongoose.model('Listing', ListingSchema);
export default Listing;
