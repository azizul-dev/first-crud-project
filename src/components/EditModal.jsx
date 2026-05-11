"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";

const EditModal = ({ destination }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `http://localhost:8000/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.modifiedCount > 0) {
        alert("Updated Successfully!");
        setIsOpen(false);

        // updated data show করার জন্য page refresh
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Edit Button */}
      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <BiEdit />
          Edit
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit Destination
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Destination Name */}
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Destination Name
                  </label>
                  <input
                    name="destinationName"
                    defaultValue={destination.destinationName}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Country
                  </label>
                  <input
                    name="country"
                    defaultValue={destination.country}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Category
                  </label>
                  <input
                    name="category"
                    defaultValue={destination.category}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Price
                  </label>
                  <input
                    name="price"
                    type="number"
                    defaultValue={destination.price}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Duration
                  </label>
                  <input
                    name="duration"
                    defaultValue={destination.duration}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Image URL
                  </label>
                  <input
                    name="imageUrl"
                    type="url"
                    defaultValue={destination.imageUrl}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={destination.description}
                    rows={4}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 text-sm text-white bg-blue-700 rounded-xl hover:bg-blue-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;