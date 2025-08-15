
import React from "react";

import Card from "./Card";

export default async function FeaturedRoom({ featuredRoom }) {
  return (
    <div className="flex p-10">
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16"

      >
        {featuredRoom.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

