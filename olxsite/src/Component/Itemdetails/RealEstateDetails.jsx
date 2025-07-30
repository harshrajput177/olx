import React from "react";

export default function RealEstateDetails({ data, setData }) {
  return (
    <div className="real-estate-details">
      <input
        type="number"
        placeholder="Bedrooms"
        value={data.bedrooms}
        onChange={(e) => setData({ ...data, bedrooms: e.target.value })}
      />
      <input
        type="number"
        placeholder="Bathrooms"
        value={data.bathrooms}
        onChange={(e) => setData({ ...data, bathrooms: e.target.value })}
      />
      <input
        type="text"
        placeholder="Furnishing (e.g. Furnished, Semi-Furnished)"
        value={data.furnishing}
        onChange={(e) => setData({ ...data, furnishing: e.target.value })}
      />
      <input
        type="text"
        placeholder="Area in sq.ft"
        value={data.area}
        onChange={(e) => setData({ ...data, area: e.target.value })}
      />
    </div>
  );
}
